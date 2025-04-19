// routes/paymentRoute.js
import express from "express";
const router = express.Router();
import {
  createDonation,
  getDonations,
  success,
  cancel,
} from "../controllers/Payment.controler.js";

router.post("/donate", createDonation); // Handle donation
router.get("/donations", getDonations); // Fetch past donations

router.post("/complete-order", success);
router.post("/cancel-order", cancel);


export default router;
