// @ts-nocheck
import {b} from "../runtime.ts";
import {lt,getIsRemoteMode} from "../src/session/0132_sent.ts";
import {Wu,sM} from "./m438.ts";
import {dIl,uIl} from "./m4876.ts";
var Dmm,mIo;
var pIl=b(()=>{lt();Wu();Dmm={type:"local-jsx",name:"session",aliases:["remote"],description:"Show cloud session URL and QR code",isEnabled:()=>getIsRemoteMode(),get isHidden(){return!sM("fanout")},requires:{ink:!0},load:()=>Promise.resolve().then(() => (dIl(),uIl))},mIo=Dmm});
export {Dmm,mIo,pIl};
