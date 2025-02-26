import React, { useRef } from "react";
import generatePDF from "react-to-pdf";

const InterviewReportFrontend = ({report}) => {
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
      </section>

      <section style={styles.section}>
        <h3>1. Introduction</h3>
        <p><strong>Background:</strong> {report.introduction.candidate_background}</p>
        <p><strong>Current Role & Responsibilities:</strong> {report.introduction.current_role_responsibilities}</p>
      </section>

      <section style={styles.section}>
        <h3>2. Angular Questions</h3>
        {report.react_questions.questions.map((q, index) => (
          <div key={index} style={styles.question}>
            <p><strong>Q:</strong> {q.question}</p>
            <p><strong>A:</strong> {q.response}</p>
          </div>
        ))}
        <p><strong>Evaluation:</strong> {report.react_questions.evaluation}</p>
        <p><strong>Score:</strong> {report.react_questions.score}</p>
      </section>

      <section style={styles.section}>
        <h3>2. JS Questions</h3>
        {report.js_questions.questions.map((q, index) => (
          <div key={index} style={styles.question}>
            <p><strong>Q:</strong> {q.question}</p>
            <p><strong>A:</strong> {q.response}</p>
          </div>
        ))}
        <p><strong>Evaluation:</strong> {report.js_questions.evaluation}</p>
        <p><strong>Score:</strong> {report.js_questions.score}</p>
      </section>


      <section style={styles.section}>
        <h3>3. Coding Question</h3>
        <p><strong>Problem Statement:</strong> {report.coding_question.problem_statement}</p>
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
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)"
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

export default InterviewReportFrontend;
