



require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const nodemailer = require("nodemailer");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for frontend communication
// Connect to MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));
// Define Career Form Schema & Model
const CareerSchema = new mongoose.Schema({
  name: String,
  email: String,
  experience: String,
  linkedin: String,
  careerAspiration: String,
  interviewAssistance:String,
  resumePath: String, // Store resume file path
}, { timestamps: true });
const Career = mongoose.model("Career", CareerSchema);
// Define Contact Form Schema & Model
const ContactSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  message: { type: String, required: true },
}, { timestamps: true });
const Contact = mongoose.model("Contact", ContactSchema);
// Multer Storage Configuration for Resume Upload
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});
const upload = multer({ storage });
// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
// Handle Career Form Submission
app.post("/submit-career-form", upload.single("resume"), async (req, res) => {
  try {
    const { name, email, experience, linkedin, careerAspiration, interviewAssistance } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Resume file is required." });
    }
    const resumePath = req.file.path;
    // Save to MongoDB
    const newCareer = await Career.create({
      name, email, experience, linkedin, careerAspiration, interviewAssistance, resumePath
    });
    // Send immediate response before email
    res.status(200).json({ message: "Form submitted successfully!" });
    // Send email asynchronously in the background
    setImmediate(() => {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_TO,
        subject: "New Career Development Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nExperience: ${experience}\nLinkedIn: ${linkedin}\nCareer Aspiration: ${careerAspiration}\nInterview Assistance: ${interviewAssistance}`,
        attachments: resumePath ? [{ filename: path.basename(resumePath), path: resumePath }] : [],
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error Sending Email:", error);
        } else {
          console.log("Email Sent:", info.response);
        }
      });
    });
  } catch (error) {
    console.error("Error Submitting Career Form:", error);
    res.status(500).json({ message: "Server error" });
  }
});
// Handle Contact Form Submission
app.post("/api/contact", async (req, res) => {
  const { fullName, email, phoneNumber, message } = req.body;

  if (!fullName || !email || !phoneNumber || !message) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Respond immediately before database and email operations
    res.status(200).json({ message: "Form submitted successfully!" });

    // Save to MongoDB in the background
    const newContact = new Contact({ fullName, email, phoneNumber, message });
    await newContact.save().catch(err => console.error("Error saving contact:", err));

    // Send Email in the background
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_TO,
      subject: `New Contact Form Submission from ${fullName}`,
      text: `Name: ${fullName}\nEmail: ${email}\nPhone: ${phoneNumber}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) console.error("Error Sending Email:", error);
      else console.log("Email Sent:", info.response);
    });

  } catch (error) {
    console.error("Error Submitting Contact Form:", error);
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



