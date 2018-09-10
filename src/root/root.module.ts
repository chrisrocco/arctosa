import {EbayClient, makeEbayClient} from "../ebay/EbayClient"
import {getPublisher} from "../pubsub/publisher"
import {callEbay, next, parse, publish} from "./types/functions"
import {seedMarketRequest} from "./seedMarketRequest"
import {Items, ItemsReq, ItemsRes, MarketDef} from "./types/models"
import {getNextRequest} from "./nextRequest"
import {Subject} from "rxjs";
import {filter, map, switchMap} from "rxjs/operators";

const push = stream => data => stream.next(data)

const PubSub = require(`@google-cloud/pubsub`)

export const RootModule = (config) => {

    /**
     * Composition Root
     * ==================
     */
    const pubsub = new PubSub()
    const eBay: EbayClient = makeEbayClient(config)
    const publishCompletedItems: publish = getPublisher(pubsub)('arctosa.completedItems')

    /**
     * Pipeline
     * ==================
     */
    // Function Definitions
    const callEbay: callEbay = eBay.findCompletedItems
    const publish: publish = publishCompletedItems
    const next: next = getNextRequest(5)
    const parse: parse = (res: ItemsRes): Items => ({ items: res.items, market_id: res.market_id })

    // Streams
    const jobs$ = new Subject<ItemsReq>()
    const items$ = new Subject<ItemsRes>()
    const output$ = items$.pipe(map(parse))

    // process jobs as they arrive
    jobs$.pipe(switchMap(callEbay)).subscribe(push(items$))

    // publish all responses to the pub/sub network
    output$.subscribe(publish)

    // crawl next pages (pagination)
    items$.pipe(map(next), filter(x => !!x)).subscribe(push(jobs$))


    /**
     * Module Exports
     * =====================
     */
    return {
        jobs$,
        items$,
        output$,
        ctrls: {
            ebay: {
                executeJob: (mkt: MarketDef) => {
                    jobs$.next(seedMarketRequest(mkt))
                    return { msg: "Job submitted for processing!" }
                }
            }
        }
    }
}
