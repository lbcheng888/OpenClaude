// @ts-nocheck
import {yA,XI} from "./m459.ts";
import {qb,vB} from "./m682.ts";
import {b} from "../runtime.ts";
async function N7n(){if(!await yA("gh"))return"not_installed";try{let{exitCode:t}=await qb("gh",["auth","token"],{stdout:"ignore",stderr:"ignore",timeout:5000,reject:!1});return t===0?"authenticated":"not_authenticated"}catch{return"not_installed"}}
var Fxo=b(()=>{vB();XI()});
export {N7n,Fxo};
