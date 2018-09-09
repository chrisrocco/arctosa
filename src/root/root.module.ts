import {EbayClient, makeEbayClient} from "../ebay/EbayClient"
import {getPublisher} from "../pubsub/publisher"
import {PipelineModule} from "../pipelines/pipeline.module"
import {publish} from "./types/functions"
import {seedMarketRequest} from "./seedMarketRequest"
import {Items, ItemsRes, MarketDef} from "./types/models"
import {getNextRequest} from "./nextRequest"

const PubSub = require(`@google-cloud/pubsub`)

export const RootModule = (config) => {

    const pubsub = new PubSub()
    const eBay: EbayClient = makeEbayClient(config)
    const publishCompletedItems: publish = getPublisher(pubsub)('arctosa.completedItems')

    const pipeline = PipelineModule({
        callEbay: eBay.findCompletedItems,
        publish: publishCompletedItems,
        next: getNextRequest(5),
        parse: (res: ItemsRes): Items => ({ items: res.items, market_id: res.market_id })
    })

    return {
        jobs$: pipeline.jobs$,
        items$: pipeline.items$,
        ctrls: {
            ebay: {
                executeJob: (mkt: MarketDef) => {
                    pipeline.queueRequest(seedMarketRequest(mkt))
                    return { msg: "Job submitted for processing!" }
                }
            }
        }
    }
}
