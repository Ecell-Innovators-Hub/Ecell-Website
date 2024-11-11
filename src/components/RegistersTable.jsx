import React, { useEffect, useState } from "react";
import { collection, getDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import "./RegistersTable.css";
import Loader from "../components/Loader";
import * as XLSX from "xlsx";

const RegistersTable = () => {
  const [registrations, setRegistrations] = useState([]);
  const [teamConfig, setTeamConfig] = useState(null);
  const [formFields, setFormFields] = useState([]);
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
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
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

  const exportToExcel = () => {
    const worksheetData = registrations.map((registration) => {
      const registrationRow = {};

      // Loop through the form fields and add them to the row
      formFields.forEach((field) => {
        registrationRow[field.label] = Array.isArray(registration[field.label])
          ? registration[field.label].join(", ")
          : registration[field.label] || "N/A";
      });

      // Add team size to the row
      registrationRow["Team Size"] = registration.teamData?.teamSize || "N/A";

      // If there are team members, combine their details into a single cell
      if (registration.teamData?.members) {
        const teamMembers = registration.teamData.members
          .map(
            (member) =>
              teamConfig?.memberDetails.map(
                (detail) => member[detail.label] + "," || "N/A"
              )[0] // Fetch only the first value for each member
          )
          .join("\n"); // Join each member's data with a newline

        registrationRow["Team Members"] = teamMembers || "N/A";
      } else {
        registrationRow["Team Members"] = "N/A";
      }

      return registrationRow;
    });

    // Create a worksheet from the registration data
    const worksheet = XLSX.utils.json_to_sheet(worksheetData);

    // Apply styling to the first row (header)
    const headerStyle = {
      font: { bold: true, color: { rgb: "FFFFFF" } },
      fill: { fgColor: { rgb: "000000" } },
      alignment: { horizontal: "center", vertical: "center" },
    };

    // Apply header styling and determine column widths
    const columnWidths = [];
    Object.keys(worksheet).forEach((cell) => {
      const cellRef = XLSX.utils.decode_cell(cell);
      if (cellRef.r === 0) {
        // First row: Apply header styling
        worksheet[cell].s = headerStyle;
      }

      // Calculate column widths based on the length of the content
      const content = worksheet[cell]?.v || ""; // Get cell content
      const length = content.toString().length;
      columnWidths[cellRef.c] = Math.max(
        columnWidths[cellRef.c] || 10,
        length + 2
      );
    });

    // Apply column widths
    worksheet["!cols"] = columnWidths.map((width) => ({ width }));

    // Create the workbook and append the worksheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Registrations");

    // Write the workbook to an Excel file
    XLSX.writeFile(workbook, "registrations.xlsx");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="registrations-table-container">
      <h2>Registrations</h2>
      <button onClick={exportToExcel} className="export-button">
        Export to Excel
      </button>
      <table className="registrations-table">
        <thead>
          <tr>
            {formFields.map((field, index) => (
              <th key={`field-${index}`}>{field.label}</th>
            ))}
            <th>Team Size</th>
            <th>Members</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration.id}>
              {formFields.map((field, index) => (
                <td key={`field-${index}`}>
                  {Array.isArray(registration[field.label])
                    ? registration[field.label].join(", ")
                    : registration[field.label] || "N/A"}
                </td>
              ))}
              <td>{registration.teamData?.teamSize || "N/A"}</td>
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
