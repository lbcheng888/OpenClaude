// @ts-nocheck
import {b,M} from "../runtime.ts";
import {tC} from "./m829.ts";
var kTr=(e)=>{switch(e){case"standard":return{retryMode:"standard",connectionTimeout:3100};case"in-region":return{retryMode:"standard",connectionTimeout:1100};case"cross-region":return{retryMode:"standard",connectionTimeout:3100};case"mobile":return{retryMode:"standard",connectionTimeout:30000};default:return{}}};
var Zhs=!1,HTr=(e)=>{if(e&&!Zhs&&parseInt(e.substring(1,e.indexOf(".")))<16)Zhs=!0};
var egs;
var tgs=b(()=>{egs=M(tC(),1)});
export {kTr,Zhs,HTr,egs,tgs};
