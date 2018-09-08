import {MarketDefinition} from "../markets/models/MarketDefinition";
import {EbayClient} from "./EbayClient";
import {normalizeItems} from "./findCompletedItems";
import {CompletedItems} from "./models/CompletedItems";

const COMPLETED_ITEMS = 'completedItems'

export const getEbayController =
    (eBayClient: EbayClient) =>
        (events) => {

            return {
                fetchMarketData: async (mkt: MarketDefinition) => {

                    eBayClient
                        .findCompletedItems(mkt.query)
                        .then(R => R.searchResult[0].item)
                        .then(normalizeItems)
                        .then(items => ({ market_id: mkt.uuid, items }))
                        .then((items: CompletedItems) => events.emit(COMPLETED_ITEMS, items))
                        .catch(err => console.error('Something went wrong!', err))

                    return { msg: "eBay data scrape job started!" }
                }
            }
        }