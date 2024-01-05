// producer.ts
import { Kafka, Partitioners, Producer, ProducerRecord } from "kafkajs";

const kafka = new Kafka({
  clientId: "producer-client",
  brokers: [`${process.env.HOST_IP}:${process.env.KAFKA_PORT}`],
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

const produceMessage = async () => {
  await producer.connect();

  const topicName = "test-2";
  const message = "Hello, Kafka!";

  const producerRecord: ProducerRecord = {
    topic: topicName,
    messages: [{ value: message }],
  };

  await producer.send(producerRecord);

  await producer.disconnect();
};

produceMessage().catch((error) => console.error(error));
