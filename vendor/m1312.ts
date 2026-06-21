// @ts-nocheck
import {b,M} from "../runtime.ts";
import {tC} from "./m829.ts";
var Lvr=(e)=>{switch(e){case"standard":return{retryMode:"standard",connectionTimeout:3100};case"in-region":return{retryMode:"standard",connectionTimeout:1100};case"cross-region":return{retryMode:"standard",connectionTimeout:3100};case"mobile":return{retryMode:"standard",connectionTimeout:30000};default:return{}}};
var AMs=!1,Mvr=(e)=>{if(e&&!AMs&&parseInt(e.substring(1,e.indexOf(".")))<16)AMs=!0};
var hMs;
var gMs=b(()=>{hMs=M(tC(),1)});
export {Lvr,AMs,Mvr,hMs,gMs};
