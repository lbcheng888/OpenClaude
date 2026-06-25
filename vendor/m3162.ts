// @ts-nocheck
import {Msa,Nsa,Fsa} from "../src/config/3162_hosts.ts";
import {b} from "../runtime.ts";
function kW(e,t){if(t.type==="claudeai-proxy")return{kind:"claudeai-proxy",config:t};if(t.type!=="sse"&&t.type!=="http")return{kind:"unsupported-transport",transport:t.type??"stdio"};if(Msa(t.url))return{kind:"anthropic-hosted",config:t,message:Nsa(e,{scope:t.scope})};return{kind:"oauth",config:t}}
var $9e=b(()=>{Fsa()});
export {kW,$9e};
