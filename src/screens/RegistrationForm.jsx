import React, { useState } from "react";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [questions, setQuestions] = useState([
    { question: "", type: "Text", optionsCount: 0, options: [] },
  ]);

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", type: "Text", optionsCount: 0, options: [] },
    ]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", questions);
  };

  return (
    <form className="form-builder-container" onSubmit={handleSubmit}>
      <h2>Create Registration Form</h2>

      {questions.map((q, questionIndex) => (
        <div key={questionIndex} className="question-container" data-question-number={`Question ${questionIndex + 1}`}>
          <div className="group">
            <div className="input-group question-field">
              <label>Enter your Question</label>
              <input
                style={{ fontSize: 16 }}
                type="text"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(questionIndex, e.target.value)
                }
                required
              />
            </div>
            <div className="input-group type-field">
              <label>Type</label>
              <select
                value={q.type}
                style={{ fontSize: 16 }}
                onChange={(e) =>
                  handleTypeChange(questionIndex, e.target.value)
                }
                required
              >
                <option value="Text">Text</option>
                <option value="Checkbox">Checkbox</option>
                <option value="Radio">Radio</option>
              </select>
            </div>
          </div>

          {(q.type === "Checkbox" || q.type === "Radio") && (
            <div>
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
              {Array.from({ length: q.optionsCount }).map((_, optionIndex) => (
                <div key={optionIndex} className="option-input">
                  <label>{`Option ${optionIndex + 1}`}</label>
                  <input
                    style={{ border: "1px solid #fff", fontSize: 15 }}
                    type="text"
                    value={q.options[optionIndex] || ""}
                    onChange={(e) =>
                      handleOptionChange(
                        questionIndex,
                        optionIndex,
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
              ))}
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

      <button type="submit" className="submit-button">
        Submit Form
      </button>
    </form>
  );
};

export default RegistrationForm;