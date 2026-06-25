// @ts-nocheck
import {getCaps,getIsRemoteMode,lt} from "../src/session/0132_sent.ts";
import {RYo,vYo} from "./m437.ts";
import {b} from "../runtime.ts";
function Nu(){return getCaps().remote}
function pl(){return getIsRemoteMode()||Nu()!==null}
function Ub(){let e=Nu();return e?.caps?.controlChannel===!0&&!e.viewerOnly}
function sM(e){return Nu()?.caps?.[e]===!0}
function tBc(e){return Promise.reject(Error(`sendControlRequest not yet wired for ${e} transport`))}
function jtn(e,t,n,r){if(!t.isRemoteMode)return Qhr;return{kind:e,isRemoteMode:!0,viewerOnly:n,caps:RYo[e],sessionId:r,sendMessage:t.sendMessage,cancelRequest:t.cancelRequest,disconnect:t.disconnect,sendControlRequest:t.sendControlRequest??(()=>tBc(e))}}
var Qhr;
var Wu=b(()=>{lt();vYo();Qhr={isRemoteMode:!1}});
export {Nu,pl,Ub,sM,tBc,jtn,Qhr,Wu};
