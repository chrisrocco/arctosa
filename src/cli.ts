import {MarketDef} from "../root/types/models";
import * as fs from "fs";
import {RootModule} from "../root/root.module";
import {getConfig} from "../config";
const program = require('commander')
const dotenv = require('dotenv')


const run = (mkt) => async (env) => {
    dotenv.config({ path: env })
    const root = RootModule(getConfig(process.env))
    console.log(mkt)
    const reply = await root.ctrls.ebay.executeJob(mkt)
    root.jobs$.subscribe((req) => console.log('processing job...'))
    root.items$.subscribe((res) => console.log('publishing items...'))
    console.log(reply)
}



program.version('0.1.0', '-v, --version')
program.option('-m, --market <mkt>', 'File path to market definition')
program.option('-e, --environment <env>', 'File path to environment variables')
program.parse(process.argv)

const market: MarketDef = JSON.parse(fs.readFileSync(program.market).toString())

run(market)(program.environment)