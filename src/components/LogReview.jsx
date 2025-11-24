import React from 'react'

const LogReview = ({ isMoved }) => {
  return (
    <>
      <div
        className={`  h-[95vh] overflow-scroll scroll-smooth  py-10 w-[15vw] absolute top-15 ${
          isMoved ? "right-0" : "right-[-20%]"
        } ease-in-out duration-700`}
      >
        <div className="p-2 border-b ">
          <h1 >Stusent Name: Ankit</h1>
          <h2>Total Sessions: 100</h2>
          <h2>Attended Sessions: 50</h2>
          <h2>Attendence Percentage: 50%</h2>
        </div>
      </div>
    </>
  );
}

export default LogReview
