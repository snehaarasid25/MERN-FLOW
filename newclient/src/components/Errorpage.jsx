import React from "react";
import { NavLink } from "react-router-dom";

const Errorpage = () => {
  return (
    <>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h1>404</h1>
          </div>
          <h2>Sorry,Page Not Found!</h2>
          <p>
            The page you are looking for might have been removed or changed its name .Please check later on.

          </p>
          <NavLink to="/">Back to Homepage</NavLink>
        </div>
      </div>
    </>
  );
};

export default Errorpage;
