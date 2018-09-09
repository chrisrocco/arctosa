import axios from 'axios'
import {FindCompletedItemsResponseEntity} from "./models/FindCompletedItemsResponseEntity"
import {findCompletedItems} from "./findCompletedItems"
import {noArrays, normalizeProps} from "./normalizeProps"
import {callEbay} from "../root/types/functions"
import {ItemsReq, ItemsRes} from "../root/types/models"

export interface EbayClient {
    findCompletedItems: callEbay
}

export const makeEbayClient = (config): EbayClient => {

    const connection = axios.create({
        headers: {
            'Authorization': `Bearer ${config.ebay.apiToken}`,
            'X-EBAY-C-ENDUSERCTX': config.ebay.userCtx,
            'X-EBAY-SOA-SECURITY-APPNAME': config.ebay.appName,
            'Content-Type': 'application/json',
            'X-EBAY-SOA-REQUEST-DATA-FORMAT': 'JSON',
            'X-EBAY-SOA-RESPONSE-DATA-FORMAT': 'JSON'
        }
    })

    return {
        findCompletedItems: (request: ItemsReq): Promise<ItemsRes> => {
            return findCompletedItems(connection)(config.ebay.urls.finding)(request.query)
                .then((res: FindCompletedItemsResponseEntity) => ({
                        market_id: request.market_id,
                        timestamp: res.timestamp as any,
                        call_depth: request.call_depth,
                        request_query: request.query,
                        items: normalizeProps(noArrays)(res.searchResult[0].item),
                        paginationOutput: {
                            pageNumber: +res.paginationOutput[0].pageNumber[0],
                            entriesPerPage: +res.paginationOutput[0].entriesPerPage[0],
                            totalPages: +res.paginationOutput[0].totalPages[0],
                            totalEntries: +res.paginationOutput[0].totalEntries[0]
                        }
                    }
                ))
        }
    }
}
