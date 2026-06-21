// @ts-nocheck
import {b,M} from "../runtime.ts";
import {tC} from "./m829.ts";
var YSr=(e)=>{switch(e){case"standard":return{retryMode:"standard",connectionTimeout:3100};case"in-region":return{retryMode:"standard",connectionTimeout:1100};case"cross-region":return{retryMode:"standard",connectionTimeout:3100};case"mobile":return{retryMode:"standard",connectionTimeout:30000};default:return{}}};
var OEs=!1,JSr=(e)=>{if(e&&!OEs&&parseInt(e.substring(1,e.indexOf(".")))<16)OEs=!0};
var LEs;
var MEs=b(()=>{LEs=M(tC(),1)});
export {YSr,OEs,JSr,LEs,MEs};
