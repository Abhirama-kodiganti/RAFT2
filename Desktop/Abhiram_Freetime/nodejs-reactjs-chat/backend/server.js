const express = require("express");
const cors = require("cors");
const { StreamChat } = require("stream-chat");

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: true }));

// Stream credentials
const apiKey = "p3xkhc5m6yqu";            // <-- Public key
const apiSecret = "ytty283dg4vxasvxj8wyvj8t2ksyavhqrqw3a5ct9ktph6x2upm9v8uekfws4bjv";  // <-- From Stream dashboard (never share)

const serverClient = StreamChat.getInstance(apiKey, apiSecret);

// Route
app.post("/authenticate", async (req, res) => {
  const { username } = req.body;

  try {
    // Create user (id must be unique)
    await serverClient.upsertUser({
      id: username,
      name: username,
    });

    // Ensure the global channel exists and the user is a member
    const channel = serverClient.channel("messaging", "global-chat", {
      name: "Global Chat",
    });

    try {
      await channel.create();
    } catch (channelError) {
      const alreadyExists =
        channelError.code === 400 &&
        typeof channelError.message === "string" &&
        channelError.message.includes("Channel already exists");
      if (!alreadyExists) {
        throw channelError;
      }
    }

    try {
      await channel.addMembers([username]);
    } catch (memberError) {
      const alreadyMember =
        memberError.code === 400 &&
        typeof memberError.message === "string" &&
        memberError.message.includes("already a member");
      if (!alreadyMember) {
        throw memberError;
      }
    }

    // Generate auth token for the user
    const token = serverClient.createToken(username);

    return res.status(200).json({
      username,
      token,
      apiKey,
    });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "User authentication failed" });
  }
});

// Start server
app.listen(3001, () => {
  console.log("Server running on port 3001");
});
