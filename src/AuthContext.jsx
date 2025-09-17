import React, { useState } from "react";
import axios from "axios";

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [token, setToken] = useState(localStorage.getItem("token") || ""); //when app loads it checks for/snatches token to local storage or defaults to empty string.
  const [apiMessage, setApiMessage] = useState("Success!");
  const register = async (newUser) => {
    try {
      const response = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );
      setToken(response.data.token); //saves returned token to React state
      localStorage.setItem("token", response.data.token); //saves returned token to localStorage
      console.log(response.data);
    } catch (err) {
      alert(err.response.data.message);
    }
  };
  const login = async (newUser) => {
    try {
      const response = await axios.post(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
        newUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token); //persists to local storage so that the token will survive page reloads or tab close. 
      //when app starts back up, the context will grab it with const [token, setToken] = useState(localStorage.getItem("token") || "")
      console.log(response.data);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const getUser = async () => { 
    try {
        if (!token) return; //no token -> do nothing
      const response = await axios(
        "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
        {
          headers: { "Authorization": `Bearer ${token}` },
        }
      );
    //   console.log(response.data);
      setUser(response.data); //stores returned user object in state
      
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  const logout = () => { //clears auths state and removes token from local storage
    setUser(undefined); 
    setToken("")
    localStorage.removeItem("token");

  };
  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        apiMessage,
        setApiMessage,
        register,
        getUser,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };

/*QUESTIONS
line 25 for context provider values: do i include all variables from the usestates?
- only what is relevant to the context. sometimes not all components need access to all variables of the context 

still rocky on useEffect and dependency arrays. ran into an infinity loop of my getUser being called at rapid speed.
I know it's because of the dependency array and how i was calling getUser in my Register component, 
but still don't understand what the issue was...
    *i removed the dependency array in Account page for 
    getAccount and it stopped calling the API aggressively...

*/

/* FLOW OF TOKEN
1. Init: Context reads token from localStorage into state
2. Login/Register: API returns token -> context saves to state + localStorage
3. Requests: Components call getUser() or other API functions -> token in state gets sent in headers
4. Reload: Context re-snatches token from localStorage
5. Logout: Token cleared from both state and localStorage
*/
