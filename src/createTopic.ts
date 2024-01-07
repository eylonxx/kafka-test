import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "admin-client",
  brokers: [`${process.env.HOST_IP}:${process.env.KAFKA_PORT}`],
});

const admin = kafka.admin();

const createTopic = async () => {
  await admin.connect();

  const topicName = "orders";
  const partitions = 1;
  const replicationFactor = 1;

  await admin.createTopics({
    topics: [
      {
        topic: topicName,
        numPartitions: partitions,
        replicationFactor: replicationFactor,
      },
    ],
  });

  await admin.disconnect();
};

createTopic().catch((error) => console.error(error));
