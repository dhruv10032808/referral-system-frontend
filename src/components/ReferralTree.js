import React, { useEffect, useState } from "react";
import axios from "axios";

const ReferralTree = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/users/${props.userId}`)
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => console.error("Error fetching referral tree:", error));
  }, [props.userId]);

  return (
    <div>
      <h2>Referrals</h2>
      {!user ? (
        <p>No Referrals</p>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Referrals: {user.referrals.length}</p>
          <ul>
            {user.referrals.map((referral) => (
              <li key={referral._id}>{referral.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ReferralTree;
