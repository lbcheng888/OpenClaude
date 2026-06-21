// @ts-nocheck
import {X} from "../runtime.ts";
import {initZV} from "./m363.ts";
import {Ig} from "./m355.ts";
import {initLf} from "./m354.ts";
var p5o=X((xur)=>{Object.defineProperty(xur,"__esModule",{value:!0});var _xc=initZV(),yxc=Ig(),vVe=initLf(),Txc={message:({schemaCode:e})=>vVe.str`must match pattern "${e}"`,params:({schemaCode:e})=>vVe._`{pattern: ${e}}`},Sxc={keyword:"pattern",type:"string",schemaType:"string",$data:!0,error:Txc,code(e){let{gen:t,data:n,$data:r,schema:o,schemaCode:s,it:i}=e,a=i.opts.unicodeRegExp?"u":"";if(r){let{regExp:l}=i.opts.code,c=l.code==="new RegExp"?vVe._`new RegExp`:(0,yxc.useFunc)(t,l),u=t.let("valid");t.try(()=>t.assign(u,vVe._`${c}(${s}, ${a}).test(${n})`),()=>t.assign(u,!1)),e.fail$data(vVe._`!${u}`)}else{let l=(0,_xc.usePattern)(e,o);e.fail$data(vVe._`!${l}.test(${n})`)}}};xur.default=Sxc});
export {p5o};
