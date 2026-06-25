// @ts-nocheck
import {Rm,tI} from "./m465.ts";
import {Kb,zN} from "./m688.ts";
import {b} from "../runtime.ts";
async function IJn(){if(!await Rm("gh"))return"not_installed";try{let{exitCode:t}=await Kb("gh",["auth","token"],{stdout:"ignore",stderr:"ignore",timeout:5000,reject:!1});return t===0?"authenticated":"not_authenticated"}catch{return"not_installed"}}
var KDo=b(()=>{zN();tI()});
export {IJn,KDo};
