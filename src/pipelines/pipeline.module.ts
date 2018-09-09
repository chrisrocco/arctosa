import {Subject} from "rxjs"
import {callEbay, next, parse, publish} from "../root/types/functions"
import {filter, map, switchMap} from "rxjs/operators"
import {ItemsReq, ItemsRes} from "../root/types/models";

const push = stream => data => stream.next(data)

interface deps {
    callEbay: callEbay,
    parse: parse,
    publish: publish
    next: next
}

export const PipelineModule = ({ callEbay, parse, publish, next }: deps) => {

    const jobs$ = new Subject<ItemsReq>()
    const items$ = new Subject<ItemsRes>()

    // process jobs as they arrive
    jobs$.pipe(switchMap(callEbay)).subscribe(push(items$))

    // publish all responses to the pub/sub network
    items$.pipe(map(parse)).subscribe(publish)

    // crawl next pages (pagination)
    items$.pipe(map(next), filter(x => !!x)).subscribe(push(jobs$))

    return {
        queueRequest: (req: ItemsReq) => jobs$.next(req),
        jobs$,
        items$
    }
}
