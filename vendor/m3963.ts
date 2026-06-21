// @ts-nocheck
import {yce,hct} from "./m3961.ts";
import {f1a,nao} from "./m3962.ts";
import {PA,Lv} from "../src/config/2699_WORKFLOW_TOOL_NAME.ts";
import {b} from "../runtime.ts";
function oao(){rao.clear()}
function sao(e,t,n){if(!n||!yce())return;let r=rao.get(e);if(!r)r={raw:"",flushedAt:0},rao.set(e,r);if(r.raw.length<Nbp)r.raw+=t;let o=Date.now();if(o-r.flushedAt<Mbp)return;r.flushedAt=o;let s=f1a(r.raw).slice(0,_1a);n((i)=>{let a=i.findIndex((l)=>l.index===e);if(a===-1||i[a].contentBlock.name!==PA)return i;return i.with(a,{...i[a],contentBlock:{...i[a].contentBlock,input:{code:s}}})})}
var Mbp=100,_1a=8192,Nbp,rao;
var iao=b(()=>{Lv();nao();hct();Nbp=_1a*2,rao=new Map});
export {oao,sao,Mbp,_1a,Nbp,rao,iao};
