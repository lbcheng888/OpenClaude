// @ts-nocheck
import {b,M} from "../runtime.ts";
import {tC} from "./m829.ts";
var Aru=(e)=>{switch(e){case"standard":return{retryMode:"standard",connectionTimeout:3100};case"in-region":return{retryMode:"standard",connectionTimeout:1100};case"cross-region":return{retryMode:"standard",connectionTimeout:3100};case"mobile":return{retryMode:"standard",connectionTimeout:30000};default:return{}}};
var Hls=!1,hru=(e)=>{if(e&&!Hls&&parseInt(e.substring(1,e.indexOf(".")))<16)Hls=!0};
var Ils;
var Dls=b(()=>{Ils=M(tC(),1)});
export {Aru,Hls,hru,Ils,Dls};
