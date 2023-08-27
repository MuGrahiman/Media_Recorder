import React, { useState } from "react";
import useValidate from "../Hooks/Hook";
function Form({ onSubmit, Header, Sign }) {
  const [runValidator, errorValidator] = useValidate();
  const [Email, setEmail] = useState("");
  const [Name, setUsername] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
     runValidator({ Email, Name })
      .then((res) => {
        console.log("some error", res);
        onSubmit({ Email, Name });
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="lg:w-3/12 h-4/6 border rounded-md shadow-lg p-1">
      <div className="border shadow-inner rounded flex flex-col justify-evenly h-full">
        <header className="font-serif font-semibold text-center text-3xl text-blue-400 drop-shadow mb-5">
          {Header}
        </header>
        <div className="p-1">
          <form onSubmit={handleSubmit}>
            <label className="font-semibold text-blue-400">
              user:
              <input
                className="border p-1 font-normal rounded focus:outline-none focus-visible:ring-2 w-full"
                type="text"
                placeholder="Enter user name"
                value={Name}
                name="Name"
                onChange={(e) => setUsername(e.target.value)}
              />
              {errorValidator.Name && (
                <p className="p-0 m-0 italic te text-xs text-red-600 font-extralight">
                  {errorValidator.Name}
                </p>
              )}
            </label>
            <label className="font-semibold text-blue-400">
              Email:
              <input
                className="border p-1 font-normal rounded focus:outline-none focus-visible:ring-2 w-full"
                type="email"
                name="Email"
                placeholder="Enter the mail id"
                value={Email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errorValidator.Email && (
                <p className="p-0 m-0 italic te text-xs text-red-600 font-extralight">
                  {errorValidator.Email}
                </p>
              )}
            </label>
            <button
              className="mt-8 text-lg text-center font-serif font-semibold w-full h-10 bg-white  sm:px-4 sm:py-2 text-blue-400 sm:text-xl  flex items-center justify-center rounded-md hover:text-white hover:bg-blue-400 duration-500 cursor-pointer"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
        <footer className="text-center">{Sign}</footer>
      </div>
    </div>
  );
}

export default Form;
