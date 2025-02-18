import React, { useRef } from "react";
import generatePDF from "react-to-pdf";



const InterviewReport = ({report}) => {

  const ref = useRef();

  const handlePrint=()=>{ 
    generatePDF(ref, {
    filename: report.basic_details.candidate_name + ".pdf",
    })
  };

  return (
    <div>
      <button onClick={handlePrint}>Download PDF</button>
    <div ref={ref}  style={styles.container}>
      
      <h2>Interview Report</h2>
      <p><strong>Candidate Name:</strong> {report.basic_details.candidate_name}</p>
      <p><strong>Date:</strong> {report.basic_details.date}</p>

      <section style={styles.overallSection}>
        <h3>Overall Feedback & Recommendation</h3>
        <p><strong>Final Recommendation:</strong> {report.overall_feedback.final_recommendation}</p>
        <p><strong>Strengths:</strong> {report.overall_feedback.strengths}</p>
        <p><strong>Areas of Improvement:</strong> {report.overall_feedback.areas_of_improvement}</p>
        <p><strong>Score:</strong> {report.overall_feedback.score}</p>
      </section>

      <section style={styles.section}>
        <h3>1. Introduction</h3>
        <p><strong>Background:</strong> {report.introduction.candidate_background}</p>
        <p><strong>Current Role & Responsibilities:</strong> {report.introduction.current_role_responsibilities}</p>
      </section>

      <section style={styles.section}>
        <h3>2. Questionnaire</h3>
        {report.questionnaire.questions.map((q, index) => (
          <div key={index} style={styles.question}>
            <p><strong>Q:</strong> {q.question}</p>
            <p><strong>A:</strong> {q.response}</p>
          </div>
        ))}
        <p><strong>Evaluation:</strong> {report.questionnaire.evaluation}</p>
        <p><strong>Score:</strong> {report.questionnaire.score}</p>
      </section>

      <section style={styles.section}>
        <h3>3. Database Design Problem</h3>
        <p><strong>Problem Statement:</strong> {report.database_design_problem.problem_statement}</p>
        <p><strong>Feedback:</strong> {report.database_design_problem.candidate_approach.schema_design}</p>
        <p><strong>Evaluation:</strong> {report.database_design_problem.evaluation}</p>
        <p><strong>Score:</strong> {report.database_design_problem.score}</p>
      </section>

      <section style={styles.section}>
        <h3>4. Coding Question</h3>
        <p><strong>Problem Statement:</strong> {report.coding_question.problem_statement}</p>
        <p><strong>Feedback:</strong> {report.coding_question.candidate_approach.schema_design}</p>
        <p><strong>Evaluation:</strong> {report.coding_question.evaluation}</p>
        <p><strong>Score:</strong> {report.coding_question.score}</p>
      </section>


    </div>
    </div>
  );
};

// Simple inline styles
const styles = {
  container: {
    fontFamily: "Arial, sans-serif",
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    textAlign: 'left',
  },
  section: {
    marginBottom: "20px",
    padding: "10px",
    borderBottom: "1px solid #ccc"
  },
  overallSection: {
    marginBottom: "20px",
    padding: "10px",
    borderTop: "1px solid #ccc",
    borderBottom: "1px solid #ccc"
  },
  question: {
    backgroundColor: "#f9f9f9",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px"
  }
};

export default InterviewReport;
