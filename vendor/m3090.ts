// @ts-nocheck
import {X} from "../runtime.ts";
import {EC} from "./m3064.ts";
import {sYi} from "./m3086.ts";
import {uYi} from "./m3088.ts";
import {pYi} from "./m3089.ts";
var fYi=X((Sjh,mYi)=>{var jBd=EC().fromPromise,s9=sYi();s9.outputJson=jBd(uYi());s9.outputJsonSync=pYi();s9.outputJSON=s9.outputJson;s9.outputJSONSync=s9.outputJsonSync;s9.writeJSON=s9.writeJson;s9.writeJSONSync=s9.writeJsonSync;s9.readJSON=s9.readJson;s9.readJSONSync=s9.readJsonSync;mYi.exports=s9});
export {fYi};
