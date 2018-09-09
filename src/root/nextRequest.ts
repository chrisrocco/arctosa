import {ItemsReq, ItemsRes} from "./types/models";
import {next} from "./types/functions";

export const getNextRequest = (maxCallDepth): next => (res: ItemsRes): ItemsReq | null => {

    if(res.call_depth >= maxCallDepth) return null
    if(res.paginationOutput.pageNumber === res.paginationOutput.totalPages) return null

    return {
        market_id: res.market_id,
        call_depth: res.call_depth + 1,
        query: {
            ...res.request_query,
            paginationInput: {
                pageNumber: res.request_query.paginationInput.pageNumber + 1,
                entriesPerPage: res.request_query.paginationInput.entriesPerPage
            }
        }
    }
}