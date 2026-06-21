// @ts-nocheck
import {b} from "../runtime.ts";
import {lt,getIsRemoteMode} from "../src/session/0131_sent.ts";
import {Dd,YM} from "./m687.ts";
import {obl,rbl} from "./m4844.ts";
var _om,zCo;
var sbl=b(()=>{lt();Dd();_om={type:"local-jsx",name:"session",aliases:["remote"],description:"Show cloud session URL and QR code",isEnabled:()=>getIsRemoteMode(),get isHidden(){return!YM("fanout")},requires:{ink:!0},load:()=>Promise.resolve().then(() => (obl(),rbl))},zCo=_om});
export {_om,zCo,sbl};
