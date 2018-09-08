export interface Weather {
    findCompletedItemsResponse?: (FindCompletedItemsResponseEntity)[] | null;
}

export interface FindCompletedItemsResponseEntity {
    ack?: (string)[] | null;
    version?: (string)[] | null;
    timestamp?: (string)[] | null;
    searchResult: (SearchResultEntity)[];
    paginationOutput?: (PaginationOutputEntity)[] | null;
}
export interface SearchResultEntity {
    '@count': string;
    item: (ItemEntity)[];
}
export interface ItemEntity {
    itemId?: (string)[] | null;
    title?: (string)[] | null;
    globalId?: (string)[] | null;
    primaryCategory?: (PrimaryCategoryEntity)[] | null;
    viewItemURL?: (string)[] | null;
    productId?: (ProductIdEntity)[] | null;
    paymentMethod?: (string)[] | null;
    autoPay?: (string)[] | null;
    postalCode?: (string)[] | null;
    location?: (string)[] | null;
    country?: (string)[] | null;
    shippingInfo?: (ShippingInfoEntity)[] | null;
    sellingStatus?: (SellingStatusEntity)[] | null;
    listingInfo?: (ListingInfoEntity)[] | null;
    returnsAccepted?: (string)[] | null;
    condition?: (ConditionEntity)[] | null;
    isMultiVariationListing?: (string)[] | null;
    topRatedListing?: (string)[] | null;
    galleryURL?: (string)[] | null;
    subtitle?: (string)[] | null;
}
export interface PrimaryCategoryEntity {
    categoryId?: (string)[] | null;
    categoryName?: (string)[] | null;
}
export interface ProductIdEntity {
    "@type": string;
    __value__: string;
}
export interface ShippingInfoEntity {
    shippingServiceCost?: (ShippingServiceCostEntityOrCurrentPriceEntityOrConvertedCurrentPriceEntity)[] | null;
    shippingType?: (string)[] | null;
    shipToLocations?: (string)[] | null;
    expeditedShipping?: (string)[] | null;
    oneDayShippingAvailable?: (string)[] | null;
    handlingTime?: (string)[] | null;
}
export interface ShippingServiceCostEntityOrCurrentPriceEntityOrConvertedCurrentPriceEntity {
    '@currencyId': string;
    __value__: string;
}
export interface SellingStatusEntity {
    currentPrice?: (ShippingServiceCostEntityOrCurrentPriceEntityOrConvertedCurrentPriceEntity)[] | null;
    convertedCurrentPrice?: (ShippingServiceCostEntityOrCurrentPriceEntityOrConvertedCurrentPriceEntity)[] | null;
    sellingState?: (string)[] | null;
}
export interface ListingInfoEntity {
    bestOfferEnabled?: (string)[] | null;
    buyItNowAvailable?: (string)[] | null;
    startTime?: (string)[] | null;
    endTime?: (string)[] | null;
    listingType?: (string)[] | null;
    gift?: (string)[] | null;
}
export interface ConditionEntity {
    conditionId?: (string)[] | null;
    conditionDisplayName?: (string)[] | null;
}
export interface PaginationOutputEntity {
    pageNumber?: (string)[] | null;
    entriesPerPage?: (string)[] | null;
    totalPages?: (string)[] | null;
    totalEntries?: (string)[] | null;
}
