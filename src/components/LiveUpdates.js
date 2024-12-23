import React, { useEffect, useState } from "react";
import { socket } from "../services/socket";

const LiveUpdates = (props) => {
  const [updates, setUpdates] = useState(
    JSON.parse(localStorage.getItem(`updates`)) || []
  );

  useEffect(() => {
    // Listen for updates from the backend via socket.io
    socket.on(`update-earnings-${props.userId}`, (data) => {
      const newUpdates = [...updates, data];
      localStorage.setItem(`updates`, JSON.stringify(newUpdates));
      setUpdates(newUpdates);
    });

    // Clean up the socket listener
    return () => socket.off(`update-earnings-${props.userId}`);
  }, [props.userId, updates]);

  return (
    <div>
      <h2>Live Updates</h2>
      {updates.length === 0 ? (
        <p>No updates yet.</p>
      ) : (
        <ul>
          {updates.map((update, index) => (
            <li key={index}>
              User {update.userId} Earned {update.amount} Rs from Level{" "}
              {update.level}.
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LiveUpdates;
