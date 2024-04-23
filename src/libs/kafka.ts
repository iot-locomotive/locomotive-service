import { Kafka, Partitioners, logLevel } from "kafkajs";
import dotenv from "dotenv";
import { collections } from "@/libs/db";
import Logger from "@/libs/logger";

dotenv.config();

const kafkaConf = {
  kafkaTopic: process.env.KAFKA_TOPIC,
  kafkaClientId: process.env.KAFKA_CLIENT_ID,
  kafkaGroupId: process.env.KAFKA_GROUP_ID,
  kafkaBroker: process.env.KAFKA_BROKER
};

const kafka = new Kafka({
  clientId: kafkaConf.kafkaClientId,
  brokers: [kafkaConf.kafkaBroker || ""],
  logLevel: logLevel.ERROR
});

const produceMessage = async (message: string) => {
  const producer = kafka.producer({ createPartitioner: Partitioners.LegacyPartitioner });
  await producer.connect();
  await producer.send({
    topic: kafkaConf.kafkaTopic || "",
    messages: [{ value: message }]
  });
  await producer.disconnect();
};

const consumeMessage = async () => {
  const consumer = kafka.consumer({ groupId: kafkaConf.kafkaGroupId || "" });

  await consumer.connect();
  await consumer.subscribe({ topic: kafkaConf.kafkaTopic || "", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const val = message.value;

      if (val) {
        const data = JSON.parse(val.toString());
        Logger.debug(val.toString());

        const result = await collections.locomotive?.insertOne(data);
        if (result) {
          Logger.debug("Success Insert Locomotive Data to MongoDB");
        } else {
          Logger.debug("Failed Insert Locomotive Data to MongoDB");
        }
      }
    }
  });
};

export { kafka, produceMessage, consumeMessage };
