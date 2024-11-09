import React, { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "./Registrations.css";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";

const Registrations = () => {
  const location = useLocation();
  const eventId = location.state?.eventId;
  const [formFields, setFormFields] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFormFields = async () => {
      try {
        const docRef = doc(db, "events", eventId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          setFormFields(data.formFields || []);
        } else {
          console.log("No such document!");
          setFormFields([]);
        }
      } catch (error) {
        console.error("Error fetching form fields: ", error);
        setFormFields([
          { label: "Demo Question", type: "text", required: true },
        ]);
      }
      setIsLoading(false);
    };

    fetchFormFields();
  }, [eventId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const submittedData = {};

    formFields.forEach((field, index) => {
      if (field.type === "checkbox") {
        // Gather all checked values for the checkbox group
        const checkboxes = formData.getAll(`field-${index}`);
        submittedData[field.label] = checkboxes; // Store as an array
      } else {
        submittedData[field.label] = formData.get(`field-${index}`);
      }
    });

    console.log("Form submitted with data:", submittedData);

    try {
      const registrationsRef = doc(
        db,
        "events",
        eventId,
        "registrations",
        Date.now().toString()
      );

      await setDoc(registrationsRef, submittedData);
      console.log("Registration successful:", submittedData);
    } catch (error) {
      console.error("Error saving registration:", error);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form className="register-event-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h1>Register Event</h1>
        <button type="button" className="close-button">
          ✖️
        </button>
      </div>

      {formFields.length > 0 ? (
        formFields.map((field, index) => (
          <div key={index} className="form-group">
            <label>
              {field.label}
              {field.required && <span>*</span>}
            </label>
            {field.type === "text" || field.type === "email" ? (
              <input
                type={field.type}
                placeholder={field.label}
                name={`field-${index}`}
                required={field.required}
              />
            ) : field.type === "select" ? (
              <select name={`field-${index}`} required={field.required}>
                {field.options.map((option, idx) => (
                  <option key={idx} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : field.type === "checkbox" ? (
              <div>
                {field.options.map((option, idx) => (
                  <label key={idx} className="checkbox-option">
                    <input
                      type="checkbox"
                      name={`field-${index}`} // Consistent name for all checkboxes in this group
                      value={option}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : field.type === "radio" && field.options ? (
              <div>
                {field.options.map((option, idx) => (
                  <label key={idx} className="radio-option">
                    <input
                      type="radio"
                      name={`field-${index}`}
                      value={option}
                      required={field.required}
                    />
                    {option}
                  </label>
                ))}
              </div>
            ) : null}
          </div>
        ))
      ) : (
        <p>No form fields available.</p>
      )}

      <button type="submit" className="submit-button">
        Submit
      </button>
    </form>
  );
};

export default Registrations;
