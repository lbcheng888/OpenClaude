// @ts-nocheck
import {isFullscreenWithTTY,b} from "../runtime.ts";
import {D5,aAe,FZ} from "../src/telemetry/2465_bindings.ts";
import {ci,pT} from "./m1289.ts";
import {ddl,pdl} from "./m4621.ts";
import {dn,bt} from "./m195.ts";
import {RG,q9} from "./m4604.ts";
import {Bl,KE,sn} from "../src/config/0047_namespace.ts";
var Adl={};
isFullscreenWithTTY(Adl,{call:()=>azp});
async function azp(){if(!D5())return{type:"text",value:"Keybinding customization is disabled in this environment."};let e=aAe(),t=!1;await ci().mkdir(fdl.dirname(e));try{await mdl.writeFile(e,ddl(),{encoding:"utf-8",flag:"wx"})}catch(o){if(dn(o)==="EEXIST")t=!0;else throw o}let n=await RG(e);if(n.error)return{type:"text",value:`${t?"Opened":"Created"} ${e}. ${n.error}`};let r=Bl()?` (Safe mode: custom keybindings are disabled this session \u2014 changes take effect after you ${KE()}.)`:"";return{type:"text",value:t?`Opened ${e} in your editor.${r}`:`Created ${e} with template. Opened in your editor.${r}`}}
var mdl,fdl;
var hdl=b(()=>{FZ();pdl();pT();sn();bt();q9();mdl=require("fs/promises"),fdl=require("path")});
export {Adl,azp,mdl,fdl,hdl};
