import React from "react";
import Error404 from "../../../assets/images/error404-2.png";
import "../css/NoDataFound.css";

function NoDataFound() {
  return (
    <>
      <div className="error404">
        <main>
          <h1>Oops!</h1>
          <p>
            Either the value is not fetched properly or the searched value
            doesn't exist <em>. . . Try searching another keywords.</em>
          </p>
          <button onClick={() => window.location.reload()}>
            Refresh Page!
          </button>
        </main>
        <img src={Error404} alt="404 Image" />
      </div>
    </>
  );
}

export default NoDataFound;
