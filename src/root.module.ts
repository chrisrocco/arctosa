import EventEmitter from 'events'
import {EbayClient, makeEbayClient} from "./ebay/EbayClient"
import {getPublisher} from "./pubsub/publisher"
import {getEbayController} from "./ebay/Ebay.ctrl"

const PubSub = require(`@google-cloud/pubsub`)

export const RootModule = (config) => {

    const events = new EventEmitter()
    const pubsub = new PubSub

    const eBay: EbayClient = makeEbayClient(config)
    const publishCompletedItems = getPublisher(pubsub)('arctosa.completedItems')(events)

    const eBayCtrl = getEbayController(eBay)(events)

    events.on('completedItems', publishCompletedItems)
    events.on('completedItems.published', msgID => console.log('published msg', msgID))

    return {events, ctrls: {eBayCtrl}}
}