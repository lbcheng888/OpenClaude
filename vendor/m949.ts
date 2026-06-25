// @ts-nocheck
import {b,x} from "../runtime.ts";
import {sC} from "./m834.ts";
var oRr=(e)=>{switch(e){case"standard":return{retryMode:"standard",connectionTimeout:3100};case"in-region":return{retryMode:"standard",connectionTimeout:1100};case"cross-region":return{retryMode:"standard",connectionTimeout:3100};case"mobile":return{retryMode:"standard",connectionTimeout:30000};default:return{}}};
var zEs=!1,sRr=(e)=>{if(e&&!zEs&&parseInt(e.substring(1,e.indexOf(".")))<16)zEs=!0};
var jEs;
var YEs=b(()=>{jEs=x(sC(),1)});
export {oRr,zEs,sRr,jEs,YEs};
