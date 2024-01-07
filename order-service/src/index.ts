import express, { Express, Request, Response, Application } from "express";
import { Kafka, Partitioners, Producer, ProducerRecord } from "kafkajs";
import "dotenv/config";

const kafka = new Kafka({
  clientId: "producer-order-service",
  brokers: [`${process.env.HOST_IP}:${process.env.KAFKA_PORT}`],
});

const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });

const app: Application = express();
const port = 3000;

const produceMessage = async (message: string) => {
  await producer.connect();

  const topicName = "orders";

  const producerRecord: ProducerRecord = {
    topic: topicName,
    messages: [{ key: "key1", value: message }],
  };

  await producer.send(producerRecord);

  await producer.disconnect();
};

app.get("/", (req: Request, res: Response) => {
  console.log("created order!");
  produceMessage("burger").catch((error) => console.error(error));
  res.status(200).send("");
});

app.listen(port, () => {
  console.log(`listening on 3000`);
});
