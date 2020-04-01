import React from "react";
import ReactLoading from "react-loading";

export const formatInput = e => {
  // Prevent characters that are not numbers ("e", ".", "+" & "-") ✨
  let checkIfNum;
  if (
    e.key !== undefined &&
    e.keyCode !== 8 &&
    e.keyCode !== 37 &&
    e.keyCode !== 39 &&
    e.keyCode !== 46
  ) {
    checkIfNum = e.key.match(/\D/);
  }
  return checkIfNum && e.preventDefault();
};

export const formatText = e => {
  let checkIfNum;
  if (
    e.key !== undefined &&
    e.keyCode !== 8 &&
    e.keyCode !== 37 &&
    e.keyCode !== 39 &&
    e.keyCode !== 46
  ) {
    checkIfNum = e.key.match(/^[A-Za-z]+$/);
  }
  return checkIfNum && e.preventDefault();
};

export const load = loading => {
  if (loading === "false") {
    return (
      <div className="d-flex flex-column align-items-center w-100">
        <ReactLoading type="bars" color="#000" height="10%" width="20%" />
        <h1 className="display-3">Loading...</h1>
      </div>
    );
  }
  return;
};
