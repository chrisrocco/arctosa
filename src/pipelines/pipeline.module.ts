import {ItemsReq, ItemsRes, MarketDef} from "./types"
import {Subject} from "rxjs"
import {callEbay, next, parse, publish, seed} from "./functions"
import {filter, map, switchMap} from "rxjs/operators"

export const PipelineModule = ({callEbay, parse, next, seed, publish}) => {

    const jobs$ = new Subject<ItemsReq>()
    const items$ = new Subject<ItemsRes>()

    // process jobs as they arrive
    jobs$.pipe(switchMap(callEbay)).subscribe((res: ItemsRes) => items$.next(res))

    // publish all responses to the pub/sub network
    items$.pipe(map(parse)).subscribe(publish)

    // crawl next pages (pagination)
    items$.pipe(map(next), filter(x => !!x)).subscribe(req => jobs$.next(req))

    return {
        executeJob: (market: MarketDef) => jobs$.next(seed(market))
    }
}
