import React, { useState } from "react";
import axios from "axios";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [referrerEmail, setReferrerEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/users`,
        {
          name,
          email,
          referrerEmail,
        }
      );

      if (response.data && response.data.userId) {
        onLogin(response.data.userId);
      }
    } catch (error) {
      console.error("Error during login/registration:", error);
      alert("An error occurred");
    }
  };

  return (
    <div>
      <h2>Login or Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Referrer Email:</label>
          <input
            type="email"
            value={referrerEmail}
            onChange={(e) => setReferrerEmail(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;
