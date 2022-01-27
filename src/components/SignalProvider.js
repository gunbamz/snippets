import React, { createContext, useState } from "react";

export const SignalContext = createContext(null);
export const SignalProvider = () => {
  // const Gsig = JSON.parse(localStorage.getItem("Gratio"));
  // const Osig = JSON.parse(localStorage.getItem("OpenInt"));
  const [global, setGlobal] = useState(null);
  const [open, setOpen] = useState(null);
  const [account, setAccount] = useState(null);
  const [position, setPosition] = useState(null);
  return (
    <SignalContext.Provider
      value={{
        global,
        setGlobal,
        open,
        setOpen,
        account, 
        setAccount,
        position, 
        setPosition
      }}
    >
    </SignalContext.Provider>
  );
};