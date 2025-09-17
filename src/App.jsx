import bookLogo from "./assets/books.png";
import { Route, Routes, Navigate } from "react-router-dom";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Register from "./components/Register";
import Login from "./components/Login";
import Account from "./components/Account";
import Navigations from "./components/Navigations";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

function App() {
  const { token } = useContext(AuthContext)
  return (
    <>
      <h1>
        <img id="logo-image" src={bookLogo} />
        Library App
      </h1>
      <Navigations />
      <Routes>
        <Route path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<SingleBook />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* protected route! */}
        <Route
          path="/account"
          element={token ? <Account /> : <Navigate to="/login" />}
        />
      </Routes>
    </>
  );
}

export default App;
