import {MarketDefinition} from "./markets/models/MarketDefinition"
import {RootModule} from "./root.module"
import {getConfig} from "./config"

const PubSub = require(`@google-cloud/pubsub`)
const pubsub = new PubSub()

pubsub.subscription('rdbs-stream').on('message', (event) => console.log(event.data.toString()))

// TODO - load from filepath or stdin
const mkt: MarketDefinition = {
    "uuid": "ssd-market-definition",
    "query": {
        "keywords": "SSD for Macbook",
        "itemFilter": [
            {
                "name": "SoldItemsOnly",
                "value": "true"
            }
        ]
    }
}

const run = async () => {
    const root = RootModule(getConfig({}))
    const reply = await root.ctrls.eBayCtrl.fetchMarketData(mkt)
    console.log('reply', reply)
}

run()