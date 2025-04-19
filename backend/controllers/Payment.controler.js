// controllers/paymentController.js
import { Donation } from "../models/payment.model.js";

// Store donation in the database
export const createDonation = async (req, res) => {
  try {
    const { email, name, text, amount } = req.body;

    // Validate input
    if (!email || !name || !amount) {
      return res
        .status(400)
        .json({ error: "Email, name, and amount are required" });
    }

    const newDonation = new Donation({ email, name, text, amount });
    await newDonation.save();

    res
      .status(201)
      .json({
        message: "Donation recorded successfully",
        donation: newDonation,
      });
  } catch (error) {
    console.error("Error in createDonation:", error);
    res
      .status(500)
      .json({ error: "Failed to record donation. Please try again later." });
  }
};

// Fetch past donations
export const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 }).limit(10);
    if (donations.length === 0) {
      return res.status(404).json({ message: "No donations found" });
    }
    res.status(200).json(donations);
  } catch (error) {
    console.error("Error in getDonations:", error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};

export const success = (req, res) => {
  res.status(200).json({ message: "Payment successful" });
};

export const cancel = (req, res) => {
  res.status(200).json({ message: "Payment cancelled" });
};
