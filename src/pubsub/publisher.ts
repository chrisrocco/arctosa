import {CompletedItems} from "../ebay/models/CompletedItems";

export const getPublisher =
    (pubsub) =>
        (topic) =>
            (events) =>
                (items: CompletedItems) =>

                    pubsub
                        .topic(topic)
                        .publisher()
                        .publish(Buffer.from(JSON.stringify(items)))
                        .then(msgID => events.emit('completedItems.published', msgID))