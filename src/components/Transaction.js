import React, { useState } from "react";
import axios from "axios";

const Transaction = (props) => {
  const [amount, setAmount] = useState("");

  const handleTransaction = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/transactions", {
        userId: props.userId,
        amount: parseFloat(amount),
      });
      if (response.status === 201) {
        alert("Transaction successful!");
        setAmount("");
      }
    } catch (error) {
      console.error("Error performing transaction:", error);
      alert("Transaction failed. Ensure the amount exceeds 1000 Rs.");
    }
  };

  return (
    <div>
      <h2>Make a Transaction</h2>
      <form onSubmit={handleTransaction}>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          min="1000"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Transaction;
