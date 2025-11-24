import React from "react";

function Popup({ attendence,username }) {
  return (
    <div className="absolute bottom-[7%] left-[28%] -translate-x-1 -translate-y-1/2">
      <div className="flex justify-center items-center p-2 font-mono">
        <div className=" rounded-md p-2">
          <h1 className="text-sm text-white">
            {username} your current attendance percentage is {attendence}%:
          </h1>
          <p className="text-sm text-white">
            {attendence >= 75 ? "You're good!" : "Attend more classes!"}
          </p>
          <div className="flex justify-center items-center mt-4 mb-3 p-2"></div>
        </div>
      </div>
    </div>
  );
}

export default Popup;
