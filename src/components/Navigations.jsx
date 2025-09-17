/* TODO - add your code to create a functional React component that renders a navigation bar for the different views in your single page application. You may consider conditionally rendering some options - for example 'Login' should be available if someone has not logged in yet. */
import { AuthContext } from "../AuthContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navigations() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/books")
  };

  return (
    <>
      <nav>
        <Link to="/books">View All Books</Link>

        {!token && ( //no token -> only show books, login and register 
            <>
            <Link to="/login">Login</Link>
            <Link to="/register">Make a New Account</Link>
            </>
        )}
        {token && ( //token -> shows links to account and logout
            <>
          <Link to="/account">My account & reservations</Link> 
          <button onClick={handleLogout}>Log out</button>
          </>
        )}
        
        
      </nav>
    </>
  );
}

export default Navigations;
