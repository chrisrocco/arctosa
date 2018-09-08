import {FindCompletedItemsResponseEntity, ItemEntity} from "./models/FindCompletedItemsResponseEntity"

declare let Object: any

export const findCompletedItems =
    (axiosInstance) =>
        (findingApiUrl: string) =>
            (query): Promise<FindCompletedItemsResponseEntity> =>

                axiosInstance.request({

                    url: findingApiUrl,

                    method: 'POST',

                    params: {
                        'OPERATION-NAME': 'findCompletedItems'
                    },

                    data: {
                        "findCompletedItemsRequest": {
                            ...query,
                            "sortOrder": "PricePlusShippingLowest",
                            "paginationInput": {
                                "entriesPerPage": "10",
                                "pageNumber": "1"
                            }
                        }
                    }

                }).then((res) => res.data.findCompletedItemsResponse[0])

export const normalizeItems =
    (items: ItemEntity[]): any[] =>
        items.map(recursiveMapProps((D) =>
            Array.isArray(D) ? D[0] : D))

const recursiveMapProps = mapper => (obj) => {
    if (typeof obj !== 'object') return obj
    for (let key of Object.keys(obj))
        obj[key] = recursiveMapProps(mapper)(mapper(obj[key]))
    return obj
}