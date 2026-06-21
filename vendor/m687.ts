// @ts-nocheck
import {getCaps,getIsRemoteMode,lt} from "../src/session/0131_sent.ts";
import {ges,_es} from "./m686.ts";
import {b} from "../runtime.ts";
function dd(){return getCaps().remote}
function ec(){return getIsRemoteMode()||dd()!==null}
function jb(){let e=dd();return e?.caps?.controlChannel===!0&&!e.viewerOnly}
function YM(e){return dd()?.caps?.[e]===!0}
function SJc(e){return Promise.reject(Error(`sendControlRequest not yet wired for ${e} transport`))}
function Itn(e,t,n,r){if(!t.isRemoteMode)return Jfr;return{kind:e,isRemoteMode:!0,viewerOnly:n,caps:ges[e],sessionId:r,sendMessage:t.sendMessage,cancelRequest:t.cancelRequest,disconnect:t.disconnect,sendControlRequest:t.sendControlRequest??(()=>SJc(e))}}
var Jfr;
var Dd=b(()=>{lt();_es();Jfr={isRemoteMode:!1}});
export {dd,ec,jb,YM,SJc,Itn,Jfr,Dd};
