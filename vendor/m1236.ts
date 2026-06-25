// @ts-nocheck
import {b,x} from "../runtime.ts";
import {sC} from "./m834.ts";
var Ykr=(e)=>{switch(e){case"standard":return{retryMode:"standard",connectionTimeout:3100};case"in-region":return{retryMode:"standard",connectionTimeout:1100};case"cross-region":return{retryMode:"standard",connectionTimeout:3100};case"mobile":return{retryMode:"standard",connectionTimeout:30000};default:return{}}};
var k1s=!1,Jkr=(e)=>{if(e&&!k1s&&parseInt(e.substring(1,e.indexOf(".")))<16)k1s=!0};
var H1s;
var I1s=b(()=>{H1s=x(sC(),1)});
export {Ykr,k1s,Jkr,H1s,I1s};
