import React, { useState } from "react";
// import axios from "axios";

const DetailsContext = React.createContext();

const DetailsProvider = ({ children }) => {
  const [selectedBook, setSelectedBook] = useState(null);
  return (
    <DetailsContext.Provider value={{ selectedBook, setSelectedBook }}>
      {children}
    </DetailsContext.Provider>
  );
};

export { DetailsContext, DetailsProvider };
