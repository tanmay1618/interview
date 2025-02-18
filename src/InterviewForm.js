import React, { useState, useEffect } from "react";
import InterviewReport from "./InterviewReport";
import  "./InterviewForm.css";
import { useParams } from "react-router-dom";
import { getList, insertData, updateData } from "./apis/api";
import { useToast } from './BaseComponent/Toast/ToastContext';
import Navbar from "./Navbar";

const InterviewForm = () => {
  const { showToast } = useToast();
  const { id } = useParams();
  const [blogInsert, setBlogInsert] = useState(false);

  const getData=async()=>{
    const response = await getList("interview_feedback",{"id":id})
    //console.log("blog",response);
    if (response.length > 0){
      if (response[0]["data"] !== null){
        setFormData(response[0]["data"]);
        setBlogInsert(true);
      }
    }
  }

  useEffect(()=>{
    getData();
  },[id])

  const [formData, setFormData] = useState({
    basic_details:{
        candidate_name: "",
        date: "",
        interviewer: "",
    },
    introduction: {
      candidate_background: "",
      current_role_responsibilities: "",
    },
    questionnaire: {
      questions: [{ question: "", response: "" }],
      evaluation: "",
      score : 0,
    },
    database_design_problem: {
      problem_statement: "",
      candidate_approach: {
        schema_design: "",
        normalization_denormalization: "",
        scalability_considerations: "",
      },
      evaluation: "",
      
    },
    coding_question: {
      problem_statement: "",
      candidate_approach: {
        understanding: "",
        logic_pseudocode: "",
        code_implementation: "",
        edge_cases_considered: "",
      },
      hints_provided: "",
      evaluation: "",
      score : 0,
    },
    overall_feedback: {
      strengths: "",
      areas_of_improvement: "",
      final_recommendation: "",
      score : 0,
    },
  });

  // Handle input changes
  const handleChange = (e, section, subSection, index = null) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev };

      if (index !== null) {
        updated[section][subSection][index][name] = value;
      } else if (subSection) {
        updated[section][subSection][name] = value;
      } else {
        console.log("section",section)
        updated[section][name] = value;
      }
      //console.log("updated",updated);
      return updated;
    });
  };

  // Add a new question field
  const addQuestion = () => {
    setFormData((prev) => ({
      ...prev,
      questionnaire: {
        ...prev.questionnaire,
        questions: [...prev.questionnaire.questions, { question: "", response: "" }],
      },
    }));
  };

  const saveForm=(editor_content,header,blog)=>{
    if(blogInsert === false){
      insertData("interview_feedback",{"data":JSON.stringify(formData),"id":id})
      setBlogInsert(true);
      showToast("Form saved!", "success")
    }else{
      updateData("interview_feedback",id,{"data":JSON.stringify(formData),"id":id})
      showToast("Form updated!", "success")
    }
  }

  return (
    <div className="main-container">
    <Navbar/>
    <div className="interview-feedback">
    <div className="form-container">

    <button onClick={saveForm}>Submit</button>
    <div style={styles.container}>
      <h2>Interview Form</h2>
      <label>
        Candidate Name:
        <input type="text" name="candidate_name" value={formData.basic_details.candidate_name} onChange={(e) => handleChange(e, "basic_details")} />
      </label>
      <label>
        Date:
        <input type="date" name="date" value={formData.basic_details.date} onChange={(e) => handleChange(e, "basic_details")} />
      </label>
      <label>
        Interviewer:
        <input type="text" name="interviewer" value={formData.basic_details.interviewer} onChange={(e) => handleChange(e, "basic_details")} />
      </label>
      <hr style={{ border: "2px solid black", margin: "20px 0" }} />

      <h3>Overall Feedback</h3>
      <label>Strengths:
        <textarea name="strengths" value={formData.overall_feedback.strengths} onChange={(e) => handleChange(e, "overall_feedback")} />
      </label>

      <label>Areas of Improvement:
        <textarea name="areas_of_improvement" value={formData.overall_feedback.areas_of_improvement} onChange={(e) => handleChange(e, "overall_feedback")} />
      </label>

      <label>
        Score (Out of 10):
        <input type="number" max="10" min="0" name="score" value={formData.overall_feedback.score} onChange={(e) => handleChange(e, "overall_feedback")} />
      </label>


      <label>Final Recommendation:
        <select name="final_recommendation" value={formData.overall_feedback.final_recommendation} onChange={(e) => handleChange(e, "overall_feedback")}>
          <option value="">Select</option>
          <option value="Strongly Recommend">Strongly Recommend</option>
          <option value="Recommend">Recommend</option>
          <option value="Borderline">Borderline</option>
          <option value="Not Recommend">Not Recommend</option>
        </select>
      </label>

      <hr style={{ border: "2px solid black", margin: "20px 0" }} />

      <h3>Introduction</h3>
      <label>
        Background:
        <textarea name="candidate_background" value={formData.introduction.candidate_background} onChange={(e) => handleChange(e, "introduction")} />
      </label>
      <label>
        Current Role:
        <textarea name="current_role_responsibilities" value={formData.introduction.current_role_responsibilities} onChange={(e) => handleChange(e, "introduction")} />
      </label>



      <hr style={{ border: "2px solid black", margin: "20px 0" }} />

      <h3>Questionnaire</h3>
      {formData.questionnaire.questions.map((q, index) => (
        <div key={index}>
          <label>Question:
            <input type="text" name="question" value={q.question} onChange={(e) => handleChange(e, "questionnaire", "questions", index)} />
          </label>
          <label>Response:
            <textarea name="response" value={q.response} onChange={(e) => handleChange(e, "questionnaire", "questions", index)} />
          </label>
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <label>
        Evaluation:
        <select name="evaluation" value={formData.questionnaire.evaluation} onChange={(e) => handleChange(e, "questionnaire")}>
          <option value="">Select</option>
          <option value="Strong">Strong</option>
          <option value="Moderate">Moderate</option>
          <option value="Needs Improvement">Needs Improvement</option>
        </select>
      </label>

      <label>
        Score (Out of 10):
        <input type="number" max="10" min="0" name="score" value={formData.questionnaire.score} onChange={(e) => handleChange(e, "questionnaire")} />
      </label>

      <h3>Database Design Problem</h3>
      <label>Problem Statement:
        <textarea name="problem_statement" value={formData.database_design_problem.problem_statement} onChange={(e) => handleChange(e, "database_design_problem")} />
      </label>
      <label>Feedback:
        <textarea name="schema_design" value={formData.database_design_problem.candidate_approach.schema_design} onChange={(e) => handleChange(e, "database_design_problem", "candidate_approach")} />
      </label>

      <label>
        Score (Out of 10):
        <input type="number" max="10" min="0" name="score" value={formData.database_design_problem.score} onChange={(e) => handleChange(e, "database_design_problem")} />
      </label>

      <hr style={{ border: "2px solid black", margin: "20px 0" }} />

      <h3>Coding Problem</h3>
      <label>Problem Statement:
        <textarea name="problem_statement" value={formData.coding_question.problem_statement} onChange={(e) => handleChange(e, "coding_question")} />
      </label>
      <label>Feedback:
        <textarea name="schema_design" value={formData.coding_question.candidate_approach.schema_design} onChange={(e) => handleChange(e, "coding_question", "candidate_approach")} />
      </label>

      <label>
        Score (Out of 10):
        <input type="number" max="10" min="0" name="score" value={formData.coding_question.score} onChange={(e) => handleChange(e, "coding_question")} />
      </label>

      <hr style={{ border: "2px solid black", margin: "20px 0" }} />
      
      </div>
      </div>
      <div className="interview-report">
      <h3>Generated Report</h3>
      <InterviewReport report={formData} />
      </div>
      </div>
      </div>
  );
};

// Simple Styles
const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
  }
};

export default InterviewForm;
