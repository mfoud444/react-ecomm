import React from "react";
import errorImage from '@/assets/icons/error.png'
const StateError = ({ message, onTryAgain }) => {
  return (
    <div className="state-error mx-8 bg-red-100 min-h-[50vh] rounded-lg w-full flex flex-col items-center gap-4 p-12">
      <img src={errorImage} alt="Error" className=" w-40 h-40 text-center rounded-lg" />
      <h2 className=" font-bold text-red-700 text-3xl">Something Went Wrong</h2>
      <p>{message || "An unexpected error occurred. Please try again later."}</p>
      <div className="state-actions">
        <button onClick={onTryAgain} className="btn btn-primary rounded-3xl font-bold">
          Try Again
        </button>
      </div>
    </div>
  );
};

export default StateError;
