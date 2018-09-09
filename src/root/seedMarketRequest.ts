import {ItemsReq, MarketDef} from "./types/models";

export const seedMarketRequest = (mkt: MarketDef): ItemsReq => ({
    market_id: mkt.uuid,
    call_depth: 0,
    query: {
        keywords: mkt.keywords,
        paginationInput: {
            pageNumber: 1,
            entriesPerPage: 10
        }
    }
})