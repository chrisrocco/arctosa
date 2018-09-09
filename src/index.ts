import {RootModule} from "./root/root.module"
import {getConfig} from "./config"
import {MarketDef} from "./root/types/models";
const dotenv = require('dotenv')

dotenv.config()

// TODO - load from filepath or stdin
const mkt: MarketDef = {
    "uuid": "ssd-market-definition",
    "keywords": "SSD for Macbook"
}

const run = async () => {
    const root = RootModule(getConfig(process.env))
    const reply = await root.ctrls.ebay.executeJob(mkt)
}




// Monitor GCloud Pub/Sub Output
const PubSub = require(`@google-cloud/pubsub`)
const pubsub = new PubSub()

let cnt = 0
const sub = pubsub.subscription('rdbs-stream').on('message', msg => {
    console.log('inbound market data: ', JSON.parse(msg.data.toString()).market_id)
    msg.ack()
    cnt++
    if(cnt >= 5) sub.removeAllListeners()
})


run()