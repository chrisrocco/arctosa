export const getConfig = env => ({

    custom: {
        maxRecursionDepth: env.maxRecursionDepth || 10,
        itemsPerPage: env.itemsPerPage || 100
    },

    ebay: {
        appName: env.EBAY_APP_NAME,
        userCtx: env.EBAY_USER_CTX,
        apiToken: env.EBAY_API_TKN,
        urls: {
            finding: 'https://svcs.ebay.com/services/search/FindingService/v1'
        }
    },

    pubsub: {
        topics: {
            completedItems: 'arctosa.completedItems'
        }
    }

})