const { Kafka } = require("kafkajs");
const { sendNotification } = require("./email");

const kafka = new Kafka({
  clientId: "notification-service",
  brokers: ["kafka:29092"], // For Docker use: "kafka:29092" inside container
});

const consumer = kafka.consumer({ groupId: "queue-group-2" });

async function connectConsumer(onMessage) {
  await consumer.connect();
  console.log("✅ Kafka consumer connected");

  await consumer.subscribe({ topic: "appointments", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const key = message.key?.toString();
      const value = message.value?.toString();
      await sendNotification("omrane2421@gmail.com");
      console.log(`📥 Consumed message: key=${key}, value=${value}`);

      // Forward the parsed JSON value to your handler
      onMessage(JSON.parse(value));
    },
  });
}

module.exports = {
  connectConsumer,
};
