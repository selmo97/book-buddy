/* TODO - add your code to create a functional React component that renders a login form */

import { AuthContext } from "../AuthContext";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login, token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); //prevents refresh and losing state/context. w/o login(user) might never get called!!
    const user = { email, password }; //builds user object
    await login(user); //calls API with axios
    navigate("/account"); //after login, navigate to /account
  };

  return (
    <main>
      <h2>Log In</h2>
      {/* TODO: form -> POST /api/users/login; save token */}
      <form onSubmit={handleSubmit}> 
        <input //controlled form. inputs are tied to state (email,psswrd)
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Log in</button>
      </form>
      <button onClick={()=>navigate("/register")}>Register a new account!</button>
    </main>
  );
}

export default Login;
