import React, { useEffect, useState } from "react";
import axios from "axios";

const Earnings = (props) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}/analytics/${props.userId}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.error("Error fetching earnings:", error));
  }, [props.userId]);

  return (
    <div>
      <h2>Earnings</h2>
      {!data ? (
        <p>No Earnings.</p>
      ) : (
        <div>
          <p>Total Earnings: {data.totalEarnings} Rs</p>
          <p>Referral Count: {data.referralCount}</p>
          <h3>Earnings Breakdown</h3>
          <ul>
            {data.earningsBreakdown.map((earning, index) => (
              <li key={index}>
                Level {earning.level}: Rs {earning.amount}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Earnings;
