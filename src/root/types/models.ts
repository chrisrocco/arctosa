export type MarketDef = {
    uuid: string
    keywords: string
}

export type FindCompletedItemsQuery = {
    keywords: string,
    categoryId?: string
    outputSelector?: string
    itemFilter?: {
        name: string,
        value: number
    }[],
    sortOrder?: string,
    paginationInput: {
        entriesPerPage: number,
        pageNumber: number
    }
}

export type ItemsReq = {
    market_id: string
    call_depth: number
    query: FindCompletedItemsQuery
}

export type ItemsRes = {
    market_id: string
    call_depth: number
    request_query: FindCompletedItemsQuery
    timestamp: string
    items: Item[]
    paginationOutput: {
        pageNumber: number,
        entriesPerPage: number,
        totalPages: number,
        totalEntries: number
    }
}

export type Items = {
    market_id: string
    items: Item[]
}

export type Item = {
    price: string
    title: string
    desc: string
    seller: any
}