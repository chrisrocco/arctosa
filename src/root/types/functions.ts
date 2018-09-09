import {Item, Items, ItemsReq, ItemsRes, MarketDef} from "./models";

type next = (res: ItemsRes) => ItemsReq | null

type seed = (mkt: MarketDef) => ItemsReq

type publish = (items: Items) => void

type callEbay = (req: ItemsReq) => Promise<ItemsRes>

type parse = (res: ItemsRes) => Items

export {
    next,
    seed,
    publish,
    callEbay,
    parse
}