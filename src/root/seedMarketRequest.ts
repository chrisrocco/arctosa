import {ItemsReq, MarketDef} from "./types/models"

export const seedMarketRequest = (config) => (mkt: MarketDef): ItemsReq => ({
    market_id: mkt.uuid,
    call_depth: 1,
    query: {
        keywords: mkt.keywords,
        outputSelector: 'SellerInfo',
        paginationInput: {
            pageNumber: 1,
            entriesPerPage: config.custom.itemsPerPage
        }
    }
})