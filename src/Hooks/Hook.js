import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";

function useValidate() {
  const [errorValidator, setError] = useState({ Email:'', Name:'' });
  const runValidator = ({ Email, Name }) => {
    return new Promise((resolve, reject) => {
      if (!Name)
        setError((prev) => ({ ...prev, Name: "Name is required." }));
      else setError((prev) => ({ ...prev, Name: "" }));

      if (!Email) setError((prev) => ({ ...prev, Email: "Email required" }));
      else if (!isValidEmail(Email))
        setError((prev) => ({
          ...prev,
          Email: "Please enter a valid Email address.",
        }));
      else setError((prev) => ({ ...prev, Email: "" }));

      if (
        errorValidator.Email === "" &&
        errorValidator.Name === "" &&
        Email !== "" &&
        Name !== ""
      ) {
        resolve({ Email, Name });
      } else {
        reject(errorValidator);
      }
    });
  };

  return [runValidator, errorValidator];
}
const isValidEmail = (Email) => {
  const EmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EmailPattern.test(Email);
};
export default useValidate;
