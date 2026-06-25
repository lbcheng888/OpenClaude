// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {K8,She,MZ} from "../src/telemetry/2475_bindings.ts";
import {Js,rT} from "./m1294.ts";
import {Kyl,zyl} from "./m4648.ts";
import {cn,Ct} from "./m197.ts";
import {GG,d9} from "./m4632.ts";
import {dl,eC,dn} from "../src/config/0137_namespace.ts";
var Jyl={};
ft(Jyl,{call:()=>crm});
async function crm(){if(!K8())return{type:"text",value:"Keybinding customization is disabled in this environment."};let e=She(),t=!1;await Js().mkdir(Yyl.dirname(e));try{await jyl.writeFile(e,Kyl(),{encoding:"utf-8",flag:"wx"})}catch(o){if(cn(o)==="EEXIST")t=!0;else throw o}let n=await GG(e);if(n.error)return{type:"text",value:`${t?"Opened":"Created"} ${e}. ${n.error}`};let r=dl()?` (Safe mode: custom keybindings are disabled this session \u2014 changes take effect after you ${eC()}.)`:"";return{type:"text",value:t?`Opened ${e} in your editor.${r}`:`Created ${e} with template. Opened in your editor.${r}`}}
var jyl,Yyl;
var Xyl=b(()=>{MZ();zyl();rT();dn();Ct();d9();jyl=require("fs/promises"),Yyl=require("path")});
export {Jyl,crm,jyl,Yyl,Xyl};
