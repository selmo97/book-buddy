/* TODO - add your code to create a functional React component that renders a registration form */
import { useState, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //helper function for API call when Register bttn is clicked
  async function handleRegister(e) {
    e.preventDefault(); //prevents automatic refresh
    try {
      await register({
        firstname,
        lastname,
        email,
        password,
      });
      //navigate to newly created account page maybe?
    } catch (err) {
      console.log("Error registering new User:", err);
    }
  }

  return (
    <>
      <form>
        <input
          onChange={(e) => setFirstName(e.target.value)}
          type="text"
          placeholder="First Name"
        />
        <input
          onChange={(e) => setLastName(e.target.value)}
          type="text"
          placeholder="Last Name"
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          type="text"
          placeholder="Email"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
        />
        <button onClick={(e) => handleRegister(e)}>Register</button>
      </form>
      <button onClick={() => navigate("/login")}>
        Already have an account? Login Silly Goose!
      </button>
    </>
  );
}
//📖controlled vs. uncontrolled.
export default Register;
