import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    amount: "",
    mobile_no: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // useEffect(() => {
  //   window.location.href =
  //     "https://checkout.seerbitapi.com/?mid=SBTESTPUBK_b25IE98MoN3lWUNrw5bEcoaQTnDnJBSS&paymentReference=ref-1748867061166";
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Use proxy or full URL as needed
      const response = await axios.post("/api/payment", form);
      const payLink = response.data.payLink;
      console.log("Redirecting to:", payLink.data);
      console.log("Log the response:", response);
      if (payLink) {
        window.location.href = payLink;
      } else {
        setError("Payment link unavailable");
      }
    } catch (err) {
      console.error("Payment initiation failed", err);
      setError(err.response?.data?.error || "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{ maxWidth: 400, margin: "2rem auto", fontFamily: "sans-serif" }}
    >
      <h2>SeerBit Payment</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Full Name
          <br />
          <input
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Email
          <br />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <label>
          Phone Number
          <br />
          <input
            type="mobile_no"
            name="mobile_no"
            value={form.mobile_no}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Description
          <br />
          <input
            type="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />
        <label>
          Amount (NGN)
          <br />
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            required
          />
        </label>
        <br />
        <br />
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>

      {error && (
        <p style={{ color: "red", marginTop: "1rem" }}>Error: {error}</p>
      )}
    </div>
  );
}

export default App;
