import {Items} from "../../root/types/models";

const fs = require('fs')

export const JSONWriter = (outputDir) => {

    if(!fs.existsSync(outputDir))
        fs.mkdirSync(outputDir)

    return {
        write: (res: Items) => {
            let id = new Date().toISOString()
            fs.writeFileSync(`${outputDir}/${id}-${res.market_id}.json`, JSON.stringify(res, null, 2))
        }
    }
}