import { Kafka, logCreator, logLevel, Producer, ProducerBatch } from "kafkajs";

const kafka = new Kafka({
  clientId: "mykafka",
  brokers: ["kafka:9092"],
});

const admin = kafka.admin();

const createTopic = async () => {
  await admin.connect();

  const topicName = "test";
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
