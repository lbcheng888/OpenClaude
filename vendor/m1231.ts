// @ts-nocheck
import {b,M} from "../runtime.ts";
import {tC} from "./m829.ts";
var TCr=(e)=>{switch(e){case"standard":return{retryMode:"standard",connectionTimeout:3100};case"in-region":return{retryMode:"standard",connectionTimeout:1100};case"cross-region":return{retryMode:"standard",connectionTimeout:3100};case"mobile":return{retryMode:"standard",connectionTimeout:30000};default:return{}}};
var O0s=!1,SCr=(e)=>{if(e&&!O0s&&parseInt(e.substring(1,e.indexOf(".")))<16)O0s=!0};
var L0s;
var M0s=b(()=>{L0s=M(tC(),1)});
export {TCr,O0s,SCr,L0s,M0s};
