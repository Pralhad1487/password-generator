import React, { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

const App = () => {
  const [password, setpassword] = useState("");
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setcharAllowed] = useState(false);
  const [length, setlength] = useState(8);

  let passwordRef = useRef(null);

  const generatePassword = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += "1234567890";
    if (charAllowed) str += "@!#$%^&*/?";
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }
    setpassword(pass);
  }, [length, numAllowed, charAllowed, setpassword]);

  useEffect(()=>{
    generatePassword();
  },[length,numAllowed,charAllowed,generatePassword]);


  const copyPassToClipboard = ()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }

  return (
    <div className=" ">
      <div className="flex justify-center items-center h-screen text-xl font-bold">
        <div className="container p-7 md:w-[40%] w-[80%] bg-gray-700 rounded-md shadow-lg text-center">
          <h1 className="mb-8 text-3xl text-white">Password Generator</h1>
          <div className="inputText flex justify-center items-center">
            <input
              type="text"
              value={password}
              readOnly
              placeholder="Password"
              ref={passwordRef}
              className=" outline-none text-xl font-semibold px-[16px] w-[60%] py-2 rounded-md rounded-r-none"
            />
            <label onClick={copyPassToClipboard} className="bg-red-500 px-4 py-2 rounded-r-md text-white hover:scale-105 hover:text-white hover:bg-red-400">
              Copy
            </label>
          </div>
          <div className="inputs mt-3">
            <input
              type="range"
              min={6}
              max={20}
              defaultChecked
              defaultValue={length}
              onChange={(e) => {
                setlength(e.target.value);
              }}
              name="range"
              id="range"
              className="mr-1"
            />
            <label className="text-gray-300 mr-2">({length})</label>
            <input
              type="checkbox"
              name="numbers"
              id="numbers"
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev);
              }}
            />
            <label
              htmlFor="numbers"
              className="mr-2 font-semibold text-gray-300 ml-1"
            >
              Numbers
            </label>
            <input
              type="checkbox"
              name="characters"
              id="characters"
              defaultChecked={charAllowed}
              onChange={() => {
                setcharAllowed((prev) => !prev);
              }}
            />
            <label
              htmlFor="characters"
              className=" font-semibold text-gray-300 ml-1"
            >
              Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
