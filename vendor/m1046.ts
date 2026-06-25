// @ts-nocheck
import {b,x} from "../runtime.ts";
import {sC} from "./m834.ts";
var Avr=(e)=>{switch(e){case"standard":return{retryMode:"standard",connectionTimeout:3100};case"in-region":return{retryMode:"standard",connectionTimeout:1100};case"cross-region":return{retryMode:"standard",connectionTimeout:3100};case"mobile":return{retryMode:"standard",connectionTimeout:30000};default:return{}}};
var kHs=!1,Rvr=(e)=>{if(e&&!kHs&&parseInt(e.substring(1,e.indexOf(".")))<16)kHs=!0};
var HHs;
var IHs=b(()=>{HHs=x(sC(),1)});
export {Avr,kHs,Rvr,HHs,IHs};
