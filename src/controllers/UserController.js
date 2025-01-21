const UserProblem = require("../models/UserModel");
const twilio = require("twilio");
require('dotenv').config();
const fs = require("fs");
const path = require("path");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhoneNumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const UserController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await UserProblem.findAll();
      res.status(200).json({ users });
    } catch (error) {
      console.error("Error fetching users:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  loginUser: async (req, res) => {
    const { mobile } = req.body;

    if (!mobile || mobile.length !== 10) {
      return res.status(400).json({ error: "Invalid mobile number" });
    }

    try {
      let user = await UserProblem.findOne({ where: { mobile } });
      const otp = generateOtp();

      if (!user) {
        user = await UserProblem.create({ mobile, otp });
      } else {
        user.otp = otp;
        await user.save();
      }

      const message = await client.messages.create({
        body: `Your OTP is ${otp}`,
        from: twilioPhoneNumber,
        to: `+91${mobile}`,
      });

      console.log(`OTP sent to ${mobile}: ${message.sid}`);
      res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
      console.error("Error during login:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  verifyOtp: async (req, res) => {
    const { mobile, otp } = req.body;

    if (!mobile || !otp) {
      return res.status(400).json({ error: "Mobile and OTP are required" });
    }

    try {
      const user = await UserProblem.findOne({ where: { mobile, otp } });

      if (!user) {
        return res.status(400).json({ error: "Invalid OTP" });
      }

      user.otp = null;
      await user.save();

      res.status(200).json({
        message: "Login successful",
        user: { id: user.id, mobile: user.mobile },
      });
    } catch (error) {
      console.error("Error during OTP verification:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  registerProblem: async (req, res) => {
    const {
      mobile,
      description,
      location,
      name,
      father_or_husband_name,
      house_number,
      street,
      landmark,
    } = req.body;

    if (!mobile || mobile.length !== 10 || !description) {
      return res
        .status(400)
        .json({ error: "Mobile number and problem description are required" });
    }

    try {
      let photo_path = null;
      if (req.file) {
        photo_path = `uploads/${req.file.filename}`;
      }

      const user = await UserProblem.findOne({ where: { mobile } });

      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      user.description = description;
      user.location = location;
      user.name = name;
      user.father_or_husband_name = father_or_husband_name;
      user.house_number = house_number;
      user.street = street;
      user.landmark = landmark;
      user.photo_path = photo_path;

      await user.save();

      res.status(200).json({ message: "Problem registered successfully", user });
    } catch (error) {
      console.error("Error registering problem:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = UserController;
