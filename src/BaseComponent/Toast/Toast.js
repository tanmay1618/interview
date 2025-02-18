import React, { useState, useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, type = "info", onClose, duration = 3000 }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className={`toast toast-${type}`}>
      <span>{message}</span>
      <button className="close-btn" onClick={onClose}>&times;</button>
    </div>
  );
};

export default Toast;
