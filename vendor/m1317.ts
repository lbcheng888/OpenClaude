// @ts-nocheck
import {b,x} from "../runtime.ts";
import {sC} from "./m834.ts";
var uIr=(e)=>{switch(e){case"standard":return{retryMode:"standard",connectionTimeout:3100};case"in-region":return{retryMode:"standard",connectionTimeout:1100};case"cross-region":return{retryMode:"standard",connectionTimeout:3100};case"mobile":return{retryMode:"standard",connectionTimeout:30000};default:return{}}};
var u2s=!1,dIr=(e)=>{if(e&&!u2s&&parseInt(e.substring(1,e.indexOf(".")))<16)u2s=!0};
var d2s;
var p2s=b(()=>{d2s=x(sC(),1)});
export {uIr,u2s,dIr,d2s,p2s};
