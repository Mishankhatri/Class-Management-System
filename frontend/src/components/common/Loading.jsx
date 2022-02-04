import React from "react";
import "./css/Loading.css";

function Loading() {
  return (
    <div className="body">
      <div className="loader">
        <span className="loader-inner"></span>
      </div>
      <div className="loading-title">Loading...</div>
    </div>
  );
}

export default Loading;
