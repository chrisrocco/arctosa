import {findCompletedItems} from "./findCompletedItems";
import {FindCompletedItemsResponseEntity} from "./models/FindCompletedItemsResponseEntity";

const axios = require('axios')

export interface EbayClient {
    findCompletedItems: (mktQuery) => Promise<FindCompletedItemsResponseEntity>
}

export const makeEbayClient = (config) => {

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
        findCompletedItems: findCompletedItems(connection)(config.ebay.urls.finding)
    }
}