export const getPublisher =
    (pubsub) =>
        (topic) =>
            (message) =>

                pubsub
                    .topic(topic)
                    .publisher()
                    .publish(Buffer.from(JSON.stringify(message)))
