// @ts-nocheck
import {b,x} from "../runtime.ts";
import {sC} from "./m834.ts";
var xmu=(e)=>{switch(e){case"standard":return{retryMode:"standard",connectionTimeout:3100};case"in-region":return{retryMode:"standard",connectionTimeout:1100};case"cross-region":return{retryMode:"standard",connectionTimeout:3100};case"mobile":return{retryMode:"standard",connectionTimeout:30000};default:return{}}};
var Afs=!1,Dmu=(e)=>{if(e&&!Afs&&parseInt(e.substring(1,e.indexOf(".")))<16)Afs=!0};
var Rfs;
var vfs=b(()=>{Rfs=x(sC(),1)});
export {xmu,Afs,Dmu,Rfs,vfs};
