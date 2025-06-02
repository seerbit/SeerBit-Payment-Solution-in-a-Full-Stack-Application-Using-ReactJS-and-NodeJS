const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { Client, Config, StandardCheckout } = require("seerbit-nodejs");
const { PUBLIC_KEY, SECRET_KEY, BEARER_TOKEN } = require("./config");

// Load environment variables
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// Create SeerBit client
const sdkConfig = new Config({
  publicKey: PUBLIC_KEY,
  secretKey: SECRET_KEY,
  bearerToken: BEARER_TOKEN,
});

const seerbit = new Client(sdkConfig);

// Payment endpoint
app.post("/api/payment", async (req, res) => {
  try {
    const checkout = new StandardCheckout(seerbit);
    const { email, amount, fullName, mobile_no, description } = req.body;
    // Create payment
    const payload = {
      amount,
      currency: "NGN",
      country: "NG",
      email,
      fullName,
      mobile_no,
      description,
      paymentReference: `ref-${Date.now()}`,
      callbackUrl: "http://localhost:3000/payment-success",
    };

    const response = await checkout.Initialize(payload);
    console.log("SeerBit SDK response:", response);
    const payLink = response.data.payments.redirectLink;
    console.log("Payment Link Only Returned:", payLink);
    return res.status(201).json({ payLink });
  } catch (error) {
    console.error("SeerBit SDK error:", error);
    return res.status(error.status || 500).json({ error: error.message });
  }
});

// Start server
const PORT = process.env.PORT || 9000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
