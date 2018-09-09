import {FindCompletedItemsResponseEntity} from "./models/FindCompletedItemsResponseEntity";

export const findCompletedItems = axios => findingURL => (query): Promise<FindCompletedItemsResponseEntity> => {
    return axios.request({
        url: findingURL,
        method: 'POST',
        params: {
            'OPERATION-NAME': 'findCompletedItems'
        },
        data: {
            "findCompletedItemsRequest": query
        }
    }).then(R => R.data.findCompletedItemsResponse[0])
}