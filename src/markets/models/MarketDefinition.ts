export interface MarketDefinition {
    uuid: string
    query: {
        keywords: string
        itemFilter: {
            name: string
            value: string
        }[]
    }
}