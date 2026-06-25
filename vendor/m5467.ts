// @ts-nocheck
import {X4,uS} from "../src/config/3192_path.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {b,x} from "../runtime.ts";
import {Qr} from "./m323.ts";
import {et} from "./m2261.ts";
import {ve} from "./m461.ts";
import {C} from "./m321.ts";
function qQl(e,t){let n=szt.useRef(!1),r=szt.useRef(null);szt.useEffect(()=>{let o=X4(e);if(r.current!==(o??null))n.current=!1,r.current=o||null,t({lineCount:0,lineStart:void 0,text:void 0,filePath:void 0});if(n.current||!o)return;let s=(i)=>{if(i.selection?.start&&i.selection?.end){let{start:a,end:l}=i.selection,c=l.line-a.line+1;if(l.character===0)c--;let u={lineCount:c,lineStart:a.line+1,text:i.text,filePath:i.filePath};t(u)}};o.client.setNotificationHandler(y$m(),(i)=>{if(r.current!==o)return;try{let a=i.params;if(a.selection&&a.selection.start&&a.selection.end)s(a);else if(a.text!==void 0)s({selection:null,text:a.text,filePath:a.filePath})}catch(a){Ie(a)}}),n.current=!0},[e,t])}
var szt,y$m;
var WQl=b(()=>{vn();Qr();uS();szt=x(et(),1),y$m=ve(()=>C.object({method:C.literal("selection_changed"),params:C.object({selection:C.object({start:C.object({line:C.number(),character:C.number()}),end:C.object({line:C.number(),character:C.number()})}).nullable().optional(),text:C.string().optional(),filePath:C.string().optional()})}))});
export {qQl,szt,y$m,WQl};
