// @ts-nocheck
import {Q} from "../runtime.ts";
import {AK} from "./m365.ts";
import {apiKeyHelperCache} from "./m357.ts";
import {Km} from "./m356.ts";
var ajo=Q((thr)=>{Object.defineProperty(thr,"__esModule",{value:!0});var E1c=AK(),C1c=apiKeyHelperCache(),Cze=Km(),A1c={message:({schemaCode:e})=>Cze.str`must match pattern "${e}"`,params:({schemaCode:e})=>Cze._`{pattern: ${e}}`},R1c={keyword:"pattern",type:"string",schemaType:"string",$data:!0,error:A1c,code(e){let{gen:t,data:n,$data:r,schema:o,schemaCode:s,it:i}=e,a=i.opts.unicodeRegExp?"u":"";if(r){let{regExp:l}=i.opts.code,c=l.code==="new RegExp"?Cze._`new RegExp`:(0,C1c.useFunc)(t,l),u=t.let("valid");t.try(()=>t.assign(u,Cze._`${c}(${s}, ${a}).test(${n})`),()=>t.assign(u,!1)),e.fail$data(Cze._`!${u}`)}else{let l=(0,E1c.usePattern)(e,o);e.fail$data(Cze._`!${l}.test(${n})`)}}};thr.default=R1c});
export {ajo};
