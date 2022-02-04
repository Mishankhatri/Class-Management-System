import React from "react";

function InnerHeader({ icon, name }) {
  return (
    <div className="header">
      <div className="IconName">
        <div className="icon active-link">{icon}</div>
        <div className="open-menu active-link">{name}</div>
      </div>
      <div className="reference"></div>
    </div>
  );
}

export default InnerHeader;
