import React from "react";
import NotFound from '@/assets/icons/notfound.png'
const StateNotFound = ({ message, onBack }) => {
  return (
    <div className="state-not-found mx-8 bg-blue-100 min-h-[50vh] rounded-lg w-full flex flex-col items-center gap-4 p-12">
      <img  src={NotFound} alt="Not Found" className=" w-40 h-40 text-center rounded-lg" />
      <h2 className=" font-bold text-red-700 text-3xl"> Not Found!!</h2>
      <p>{message || "We couldn't find what you were looking for."}</p>
      <div className="state-actions">
        <button onClick={onBack}  className="btn btn-secondary px-28 rounded-3xl font-bold" >
          Back
        </button>
      </div>
    </div>
  );
};

export default StateNotFound;
