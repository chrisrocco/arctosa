import {Item, ItemsReq, ItemsRes, MarketDef} from "./types/types";

type next = (res: ItemsRes) => ItemsReq | null

type seed = (mkt: MarketDef) => ItemsReq

type publish = (items: Item[]) => void

type callEbay = (req: ItemsReq) => Promise<ItemsRes>

type parse = (res: ItemsRes) => Item[]

export {
    next,
    seed,
    publish,
    callEbay,
    parse
}