// producer.ts
import { EachMessagePayload, Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "producer-client",
  brokers: [`${process.env.HOST_IP}:${process.env.KAFKA_PORT}`],
});

const consumer = kafka.consumer({ groupId: "my-group" });

const produceMessage = async () => {
  await consumer.connect();

  await consumer.subscribe({ topics: ["test-2"], fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message, heartbeat }: EachMessagePayload) => {
      console.log({
        key: message.key?.toString(),
        value: message.value?.toString(),
        headers: message.headers,
      });
    },
  });
};

produceMessage().catch((error) => console.error(error));
