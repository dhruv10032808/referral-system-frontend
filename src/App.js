import React, { useEffect, useState } from "react";
import ReferralTree from "./components/ReferralTree";
import Earnings from "./components/Earnings";
import LiveUpdates from "./components/LiveUpdates";
import Transaction from "./components/Transaction";
import Login from "./components/Login";

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleLogin = (id) => {
    localStorage.setItem("userId", id);
    setUserId(id);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("updates");
    setUserId(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Multi-Level Referral System</h1>
      {!userId ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <button onClick={handleLogout}>Logout</button>
          <LiveUpdates userId={userId} />
          <Transaction userId={userId} />
          <ReferralTree userId={userId} />
          <Earnings userId={userId} />
        </>
      )}
    </div>
  );
}

export default App;
