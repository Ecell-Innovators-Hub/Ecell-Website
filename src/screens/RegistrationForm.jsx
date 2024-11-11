import React, { useState, useEffect } from "react";
import "./RegistrationForm.css";
import { db } from "../firebase";
import { setDoc, doc } from "firebase/firestore";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

const RegistrationForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const eventId = location.state?.eventId;

  const [questions, setQuestions] = useState([
    { question: "", type: "text", optionsCount: 0, options: [] },
  ]);

  const [teamConfig, setTeamConfig] = useState({
    isEnabled: false,
    teamSize: 1,
    memberDetails: [{ label: "", type: "text", options: [] }],
  });

  const [loading, setLoading] = useState(true); // Start with loading state as true

  // Simulate loading delay (e.g., data fetch or delay on page load)
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false); // Set loading to false after the delay (simulating data load)
    }, 1000); // Adjust the delay as needed (e.g., 1000ms = 1 second)

    return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
  }, []);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", type: "text", optionsCount: 0, options: [] },
    ]);
  };

  const handleAddTeamConfig = () => {
    setTeamConfig({
      isEnabled: true,
      teamSize: 1,
      memberDetails: [{ label: "", type: "text", options: [] }],
    });
  };

  const handleTeamSizeChange = (value) => {
    setTeamConfig((prev) => ({
      ...prev,
      teamSize: parseInt(value),
    }));
  };

  const handleAddTeamDetail = () => {
    setTeamConfig((prev) => ({
      ...prev,
      memberDetails: [
        ...prev.memberDetails,
        { label: "", type: "text", options: [] },
      ],
    }));
  };

  const handleTeamDetailChange = (index, key, value) => {
    const updatedDetails = [...teamConfig.memberDetails];
    updatedDetails[index][key] = value;
    setTeamConfig((prev) => ({
      ...prev,
      memberDetails: updatedDetails,
    }));
  };

  const handleTeamDetailTypeChange = (index, value) => {
    const updatedDetails = [...teamConfig.memberDetails];
    updatedDetails[index].type = value;
    updatedDetails[index].options = value === "radio" ? ["", ""] : [];
    setTeamConfig((prev) => ({
      ...prev,
      memberDetails: updatedDetails,
    }));
  };

  const handleQuestionChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question = value;
    setQuestions(updatedQuestions);
  };

  const handleTypeChange = (index, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = value;
    if (value === "Text") {
      updatedQuestions[index].options = [];
      updatedQuestions[index].optionsCount = 0;
    } else {
      updatedQuestions[index].options = ["", ""];
      updatedQuestions[index].optionsCount = 2;
    }
    setQuestions(updatedQuestions);
  };

  const handleOptionsCountChange = (questionIndex, count) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].optionsCount = count;
    updatedQuestions[questionIndex].options = Array(count).fill("");
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(updatedQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submission starts
    try {
      const formFields = questions.map((q) => ({
        label: q.question,
        type: q.type.toLowerCase(),
        required: true,
        ...(q.type !== "text" && { options: q.options }),
      }));

      const teamData = teamConfig.isEnabled
        ? {
            teamSize: teamConfig.teamSize,
            memberDetails: teamConfig.memberDetails,
          }
        : null;

      const eventDocRef = doc(db, "events", eventId);
      await setDoc(
        eventDocRef,
        { formFields, teamConfig: teamData },
        { merge: true }
      );

      console.log(
        "Form fields and team configuration saved successfully!",
        eventId
      );

      navigate("/reg2", { state: { eventId: eventId } });
    } catch (error) {
      console.error("Error saving form fields:", error);
    } finally {
      setLoading(false); // Set loading to false once submission completes
    }
  };

  if (loading) {
    return <Loader />; // Display Loader component if loading is true
  }

  return (
    <form className="form-builder-container" onSubmit={handleSubmit}>
      <h2>Create Registration Form</h2>

      {questions.map((q, questionIndex) => (
        <div
          key={questionIndex}
          className="question-container"
          data-question-number={`Question ${questionIndex + 1}`}
        >
          <div className="group">
            <div className="input-group question-field">
              <label>Enter your Question</label>
              <input
                type="text"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, e.target.value)
                }
                placeholder="Enter question"
                required
              />
            </div>
            <div className="input-group type-field">
              <label>Type</label>
              <select
                value={q.type}
                onChange={(e) =>
                  handleTypeChange(questionIndex, e.target.value)
                }
                required
              >
                <option value="text">Text</option>
                <option value="checkbox">Checkbox</option>
                <option value="radio">Radio</option>
              </select>
            </div>
          </div>

          {(q.type === "checkbox" || q.type === "radio") && (
            <div>
              <div className="container">
                <label>No. of Options:</label>
                <select
                  className="options-count"
                  value={q.optionsCount}
                  onChange={(e) =>
                    handleOptionsCountChange(
                      questionIndex,
                      parseInt(e.target.value)
                    )
                  }
                  required
                >
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 2} value={num + 2}>
                      {num + 2}
                    </option>
                  ))}
                </select>
              </div>

              <div className="option-group">
                {Array.from({ length: q.optionsCount }).map(
                  (_, optionIndex) => (
                    <div key={optionIndex} className="option-input">
                      <label>{`Option ${optionIndex + 1}`}</label>
                      <input
                        type="text"
                        value={q.options[optionIndex] || ""}
                        onChange={(e) =>
                          handleOptionChange(
                            questionIndex,
                            optionIndex,
                            e.target.value
                          )
                        }
                        placeholder="Option"
                        required
                      />
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </div>
      ))}

      <button
        type="button"
        onClick={handleAddQuestion}
        className="add-question-button"
      >
        Add Question
      </button>

      <button
        type="button"
        onClick={handleAddTeamConfig}
        className="add-question-button"
      >
        Team
      </button>

      {teamConfig.isEnabled && (
        <div className="team-config-container">
          <h3>Team Configuration</h3>
          <div className="input-group">
            <label>Team Size</label>
            <input
              type="number"
              value={teamConfig.teamSize}
              onChange={(e) => handleTeamSizeChange(e.target.value)}
              min="1"
              required
            />
          </div>
          {teamConfig.memberDetails.map((detail, index) => (
            <div key={index} className="team-detail-row">
              <div className="group">
                <div className="input-group question-field">
                  <label>{`Detail ${index + 1}`}</label>
                  <input
                    type="text"
                    value={detail.label}
                    onChange={(e) =>
                      handleTeamDetailChange(index, "label", e.target.value)
                    }
                    placeholder={`Detail ${index + 1}`}
                    required
                  />
                </div>
                <div className="input-group type-field">
                  <label>Type</label>
                  <select
                    value={detail.type}
                    onChange={(e) =>
                      handleTeamDetailTypeChange(index, e.target.value)
                    }
                    required
                  >
                    <option value="text">Text</option>
                    <option value="number">Number</option>
                    <option value="email">Email</option>
                    <option value="radio">Radio</option>
                  </select>
                </div>
              </div>
              {detail.type === "radio" && (
                <div>
                  <label>No. of Options:</label>
                  <select
                    value={detail.options.length}
                    onChange={(e) =>
                      handleTeamDetailChange(
                        index,
                        "options",
                        Array(parseInt(e.target.value)).fill("")
                      )
                    }
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 2} value={num + 2}>
                        {num + 2}
                      </option>
                    ))}
                  </select>
                  <div className="option-group">
                    {detail.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="option-input">
                        <label>{`Option ${optionIndex + 1}`}</label>
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleTeamDetailChange(
                              index,
                              "options",
                              detail.options.map((opt, idx) =>
                                idx === optionIndex ? e.target.value : opt
                              )
                            )
                          }
                          placeholder={`Option ${optionIndex + 1}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddTeamDetail}
            className="add-question-button"
          >
            Add Team Detail
          </button>
        </div>
      )}

      <button type="submit" className="submit-button">
        Save
      </button>
    </form>
  );
};

export default RegistrationForm;
