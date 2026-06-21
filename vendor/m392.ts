// @ts-nocheck
import {X} from "../runtime.ts";
import {initLf} from "./m354.ts";
import {Ig} from "./m355.ts";
import {KQt} from "./m390.ts";
var _5o=X((Mur)=>{Object.defineProperty(Mur,"__esModule",{value:!0});var Lur=initLf(),Pxc=Ig(),Oxc=KQt(),Lxc={message:"must be equal to constant",params:({schemaCode:e})=>Lur._`{allowedValue: ${e}}`},Mxc={keyword:"const",$data:!0,error:Lxc,code(e){let{gen:t,data:n,$data:r,schemaCode:o,schema:s}=e;if(r||s&&typeof s=="object")e.fail$data(Lur._`!${(0,Pxc.useFunc)(t,Oxc.default)}(${n}, ${o})`);else e.fail(Lur._`${s} !== ${n}`)}};Mur.default=Mxc});
export {_5o};
