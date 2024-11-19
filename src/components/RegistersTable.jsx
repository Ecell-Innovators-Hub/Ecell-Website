import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import "./RegistersTable.css";
import Loader from "../components/Loader";
import * as XLSX from "xlsx";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";

const RegistersTable = () => {
  const [registrations, setRegistrations] = useState([]);
  const [teamConfig, setTeamConfig] = useState(null);
  const [formFields, setFormFields] = useState([]);
  const [marksCriteria, setMarksCriteria] = useState([]);
  const [marks, setMarks] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [expandedMembers, setExpandedMembers] = useState({});

  const staticEventId = "VlBCwvE81aieFUhTJigP"; // Replace with your actual event ID

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const eventDocRef = doc(db, "events", staticEventId);
        const eventDoc = await getDoc(eventDocRef);

        if (eventDoc.exists()) {
          const eventData = eventDoc.data();
          setTeamConfig(eventData.teamConfig || null);
          setFormFields(eventData.formFields || []);
        }

        const registrationsRef = collection(
          db,
          "events",
          staticEventId,
          "registrations"
        );
        const querySnapshot = await getDocs(registrationsRef);

        let data = querySnapshot.docs.map((docSnapshot) => ({
          id: docSnapshot.id,
          ...docSnapshot.data(),
        }));

        setRegistrations(data);
      } catch (error) {
        console.error("Error fetching event or registration data:", error);
      }
      setIsLoading(false);
    };

    fetchEventDetails();
  }, [staticEventId]);

  const toggleMemberDetails = (id) => {
    setExpandedMembers((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleMarksChange = (teamId, criteriaIndex, value) => {
    setMarks((prev) => ({
      ...prev,
      [teamId]: {
        ...prev[teamId],
        [criteriaIndex]: Number(value),
      },
    }));
  };

  const calculateTotalMarks = (teamId) => {
    const teamMarks = marks[teamId] || {};
    return Object.values(teamMarks).reduce((sum, mark) => sum + (mark || 0), 0);
  };

  const addCriteria = () => {
    const criteriaName = prompt("Enter criteria name:");
    if (!criteriaName) return;

    const totalMarks = parseInt(
      prompt("Enter total marks for this criteria:"),
      10
    );
    if (isNaN(totalMarks) || totalMarks <= 0) {
      alert("Please enter a valid number for total marks.");
      return;
    }

    setMarksCriteria((prev) => [
      ...prev,
      { name: criteriaName, totalMarks },
    ]);
  };

  const exportToExcel = () => {
    const worksheetData = [];

    registrations.forEach((registration) => {
      const teamMarks = marks[registration.teamData?.teamId] || {};
      const row = {
        "Team ID": registration.teamData?.teamId || "N/A",
        ...Object.fromEntries(
          formFields.map((field) => [
            field.label,
            Array.isArray(registration[field.label])
              ? registration[field.label].join(", ")
              : registration[field.label] || "N/A",
          ])
        ),
        "Team Size": registration.teamData?.teamSize || "N/A",
        ...Object.fromEntries(
          marksCriteria.map((criteria, index) => [
            criteria.name,
            teamMarks[index] || "N/A",
          ])
        ),
        "Total Marks": calculateTotalMarks(registration.teamData?.teamId),
      };

      worksheetData.push(row);
    });

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    XLSX.writeFile(workbook, "registrations.xlsx");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="registrations-table-container">
      <h2>Registrations</h2>
      <button onClick={addCriteria} className="add-criteria-button">
        Add Criteria
      </button>
      <button onClick={exportToExcel} className="export-button">
        Export to Excel
      </button>
      <table className="registrations-table">
        <thead>
          <tr>
            <th>Team ID</th>
            {formFields.map((field, index) => (
              <th key={`field-${index}`}>{field.label}</th>
            ))}
            <th>Team Size</th>
            {marksCriteria.map((criteria, index) => (
              <th key={`criteria-${index}`}>
                {criteria.name} ({criteria.totalMarks})
              </th>
            ))}
            <th>Total Marks</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration.id}>
              <td>{registration.teamData?.teamId || "N/A"}</td>
              {formFields.map((field, index) => (
                <td key={`field-${index}`}>
                  {Array.isArray(registration[field.label])
                    ? registration[field.label].join(", ")
                    : registration[field.label] || "N/A"}
                </td>
              ))}
              <td>{registration.teamData?.teamSize || "N/A"}</td>
              {marksCriteria.map((_, index) => (
                <td key={`marks-${index}`}>
                <input
                  type="number"
                  value={marks[registration.teamData?.teamId]?.[index] || ""}
                  onChange={(e) =>
                    handleMarksChange(
                      registration.teamData?.teamId,
                      index,
                      e.target.value
                    )
                  }
                  className="marks-input"
                  max={marksCriteria[index]?.totalMarks || 100}  // Max value based on the total marks for this criterion
                />
              </td>
              
              ))}
              <td>{calculateTotalMarks(registration.teamData?.teamId)}</td>
              <td>
                {registration.teamData?.members ? (
                  <ul>
                    {registration.teamData.members.map((member, index) => (
                      <li key={index} className="team-member-card">
                        <button
                          onClick={() =>
                            toggleMemberDetails(`${registration.id}-${index}`)
                          }
                          className="toggle-member-details"
                        >
                          {member[teamConfig?.memberDetails[0]?.label] ||
                            `Member ${index + 1}`}
                        </button>
                        {expandedMembers[`${registration.id}-${index}`] && (
                          <ul>
                            {teamConfig?.memberDetails.map(
                              (detail, detailIndex) => (
                                <li key={detailIndex}>
                                  <strong>{detail.label}:</strong>{" "}
                                  {member[detail.label] || "N/A"}
                                </li>
                              )
                            )}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  "N/A"
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RegistersTable;
