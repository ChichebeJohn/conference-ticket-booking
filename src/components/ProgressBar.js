"use client";
import React from "react";

export default function ProgressBar({ currentStep, totalSteps }) {
  // Calculate the fill percentage (assuming currentStep is 1-indexed)
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div style={styles.container}>
      <div style={{ ...styles.filler, width: `${progress}%` }}></div>
    </div>
  );
}

const styles = {
  container: {
    width: "100%",
    backgroundColor: "#0E464F",
    height: "3px",
    borderRadius: "5px",
    overflow: "hidden",
    marginBottom: "20px",
  },
  filler: {
    height: "100%",
    backgroundColor: "#24A0B5",
    transition: "width 0.3s ease",
  },
};
