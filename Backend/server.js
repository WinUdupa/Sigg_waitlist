// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const admin = require("firebase-admin");
const path = require("path");

// Initialize Firebase Admin SDK
const serviceAccount = require("./serviceKey.json"); // Make sure this file exists

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
const PORT = 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// POST endpoint to add user to waitlist
app.post("/api/waitlist", async (req, res) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: "Name, email, and phone are required" });
    }

    const docRef = db.collection("waitlist").doc(email);
    await docRef.set({
      name,
      email,
      phone,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`✅ New waitlist entry: ${email}`);
    res.status(200).json({ message: "✅ User added to waitlist" });
  } catch (error) {
    console.error("Error saving to Firestore:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET endpoint to fetch all waitlist entries (for debugging/verification)
app.get("/api/waitlist", async (req, res) => {
  try {
    const snapshot = await db.collection("waitlist").orderBy("timestamp", "desc").get();
    const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching waitlist:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
