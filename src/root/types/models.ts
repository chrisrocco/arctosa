export type MarketDef = {
    uuid: string
    query: any
}

export type ItemsReq = {
    market_id: string
    query: {
        keywords: string
        filters: any[]
        pagination: {
            page: number
        }
    }
}

export type ItemsRes = {
    items: Item[]
    pagination: {
        current_page: number
        total_pages: number
    }
}

export type Item = {
    price: string
    title: string
    desc: string
    seller: any
}