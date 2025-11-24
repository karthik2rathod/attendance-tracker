import React, { useState } from "react";
import Popup from "./Popup";
import LogReview from "./LogReview";

const Input = () => {
  const [total, setTotal] = useState("");
  const handleChange = (e) => {
    setTotal(e.target.value);
  };

  const [attended, setAttended] = useState("");
  const handleChange2 = (e) => {
    setAttended(e.target.value);
  };

    const [username, setUsername] = useState("");
    const handleChange1 = (e) => {
      setUsername(e.target.value);
    };

  const [showPopup, setShowPopup] = useState(false);
  const [attendancePercentage, setAttendancePercentage] = useState(null);

  const [isMoved, setIsMoved] = useState(false)

  const submitHandler = (e) => {
    e.preventDefault();

    const total_session = document.getElementById("total_session").value.trim();
    const attented_session = document
      .getElementById("attented_session")
      .value.trim();

    if (total_session === "" && attented_session === "") {
      alert("All fields must be filled!");
    } else if (total_session === "") {
      alert("Total session is required!");
    } else if (attented_session === "") {
      alert("Attended session is required!");
    }

    if (total && attended) {
      const percentage = ((Number(attended) / Number(total)) * 100).toFixed(2);
      setAttendancePercentage(percentage);
      setShowPopup(true);
    }

    setAttended("");
    
  };

  return (
    <>
      <div className="bg-linear-to-bl from-purple-500 to-purple-300 h-screen w-full flex justify-center items-center ">
        <div className="flex justify-center items-center bg-purple-600 rounded-3xl h-[60vh] w-[50vw] font-mono ml-64 mr-56">
          <form
            className="flex flex-col justify-center items-start h-full w-full p-8"
            onSubmit={submitHandler}
          >
            {" "}
            <div className="mb-4 w-full ">
              {" "}
              <h1 className="text-2xl mr-4 tracking-tighter">Student Name:</h1>
              <input
                onChange={handleChange1}
                value={username}
                id="username"
                name="username"
                type="text"
                className="border-purple-900 bg-purple-400 mb-5 rounded-md h-10 w-full p-2 outline-0"
                placeholder="Enter the total number of sessions"
              />
              <h1 className="text-2xl mr-4 tracking-tighter">
                Total Sessions:
              </h1>
              <input
                onChange={handleChange}
                value={total}
                id="total_session"
                name="total"
                type="text"
                className="border-purple-900 bg-purple-400 rounded-md h-10 w-full p-2 outline-0"
                placeholder="Enter the total number of sessions"
              />
            </div>
            <div className="mb-4 w-full ">
              {" "}
              <h1 className="text-2xl mr-4">Attended sessions:</h1>
              <input
                onChange={handleChange2}
                value={attended}
                id="attented_session"
                name="attended"
                type="text"
                className="border-purple-900 bg-purple-400 rounded-md h-10 w-full p-2 outline-0"
                placeholder="Sessions attended"
              />
            </div>
            <button
              type="submit"
              className="text-white bg-purple-950 rounded-2xl w-60 h-12 self-center hover:bg-purple-500 hover:text-black hover:border-purple-950 border-2 border-solid border-purple-400"
            >
              Submit
            </button>
          </form>
        </div>
        <div
          className={` hover:cursor-cell hover:bg-transparent p-1 rounded-lg absolute top-5 ${
            isMoved ? "right-50 " : "right-0"
          }   ease-in-out duration-500 `}
          onClick={() => {
            setIsMoved(!isMoved);
          }}
        >
          <h3>
            Review Log <i class="ri-news-fill"></i>
          </h3>
        </div>
      </div>

      {showPopup && (
        <Popup attendence={attendancePercentage} username={username} />
      )}
      <LogReview isMoved={ isMoved} />
    </>
  );
};

export default Input;
