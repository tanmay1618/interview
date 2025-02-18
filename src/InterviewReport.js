import React from "react";
import report from './reports/report1.json';

const InterviewReport = () => {
  return (
    <div style={styles.container}>
      <h2>Interview Report</h2>
      <p><strong>Candidate Name:</strong> {report.candidate_name}</p>
      <p><strong>Date:</strong> {report.date}</p>
      <p><strong>Interviewer:</strong> {report.interviewer}</p>

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
        <h3>2. Questionnaire</h3>
        {report.questionnaire.questions.map((q, index) => (
          <div key={index} style={styles.question}>
            <p><strong>Q:</strong> {q.question}</p>
            <p><strong>A:</strong> {q.response}</p>
          </div>
        ))}
        <p><strong>Evaluation:</strong> {report.questionnaire.evaluation}</p>
      </section>

      <section style={styles.section}>
        <h3>3. Database Design Problem</h3>
        <p><strong>Problem Statement:</strong> {report.database_design_problem.problem_statement}</p>
        <p><strong>Schema Design:</strong> {report.database_design_problem.candidate_approach.schema_design}</p>
        <p><strong>Normalization/Denormalization:</strong> {report.database_design_problem.candidate_approach.normalization_denormalization}</p>
        <p><strong>Scalability Considerations:</strong> {report.database_design_problem.candidate_approach.scalability_considerations}</p>
        <p><strong>Evaluation:</strong> {report.database_design_problem.evaluation}</p>
      </section>

      <section style={styles.section}>
        <h3>4. Coding Question</h3>
        <p><strong>Problem Statement:</strong> {report.coding_question.problem_statement}</p>
        <p><strong>Understanding:</strong> {report.coding_question.candidate_approach.understanding}</p>
        <p><strong>Logic & Pseudocode:</strong> {report.coding_question.candidate_approach.logic_pseudocode}</p>
        <p><strong>Code Implementation:</strong> {report.coding_question.candidate_approach.code_implementation}</p>
        <p><strong>Edge Cases Considered:</strong> {report.coding_question.candidate_approach.edge_cases_considered}</p>
        <p><strong>Hints Provided:</strong> {report.coding_question.hints_provided}</p>
        <p><strong>Evaluation:</strong> {report.coding_question.evaluation}</p>
      </section>


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

export default InterviewReport;
