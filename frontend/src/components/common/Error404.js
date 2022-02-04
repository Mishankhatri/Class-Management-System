import React from "react";
import Error404Image from "./../../assets/images/error404-2.png";
import "./css/NoDataFound.css";

function Error404() {
  return (
    <>
      <div className="error404 custom404">
        <main>
          <h1>404!</h1>
          <p>
            You have found a page that does not exist right now. If you
            think,something is broken, report a problem.
            <em>. . . Go back and try again.</em>
          </p>
          <button onClick={() => window.history.back()}>Go Back!</button>
        </main>
        <img src={Error404Image} alt="404 Image" />
      </div>
    </>
  );
}

export default Error404;
