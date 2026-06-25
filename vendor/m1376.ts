// @ts-nocheck
import {b,x} from "../runtime.ts";
import {sC} from "./m834.ts";
var NIr=(e)=>{switch(e){case"standard":return{retryMode:"standard",connectionTimeout:3100};case"in-region":return{retryMode:"standard",connectionTimeout:1100};case"cross-region":return{retryMode:"standard",connectionTimeout:3100};case"mobile":return{retryMode:"standard",connectionTimeout:30000};default:return{}}};
var Z3s=!1,FIr=(e)=>{if(e&&!Z3s&&parseInt(e.substring(1,e.indexOf(".")))<16)Z3s=!0};
var e4s;
var t4s=b(()=>{e4s=x(sC(),1)});
export {NIr,Z3s,FIr,e4s,t4s};
