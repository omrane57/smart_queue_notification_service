const express = require("express");
const { connectConsumer } = require("./utils/consumer");
require("dotenv").config({
  override: process.env.NODE_ENV === "local",
});
const app = express();
const port = process.env.PORT || 4000;

// Your queue handler logic
const handleMessage = async (data) => {
  console.log("🔄 Handling event:", data);

  // Example handler logic
  if (data.event === "appointments") {
    // TODO: Insert or update the Redis queue based on the doctorId
    console.log("📋 Processing appointment for doctor:", data.doctorId);
  }
};

// Start the Kafka consumer
connectConsumer(handleMessage).catch(console.error);

app.listen(port, () => {
  console.log(`Queue Service running on port ${port}`);
});
