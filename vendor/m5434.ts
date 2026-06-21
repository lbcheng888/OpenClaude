// @ts-nocheck
import {Lq,ab} from "../src/config/3178_path.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {b,M} from "../runtime.ts";
import {Xr} from "./m321.ts";
import {Te} from "./m2253.ts";
import {we} from "./m455.ts";
import {E} from "./m319.ts";
function sGl(e,t){let n=PGt.useRef(!1),r=PGt.useRef(null);PGt.useEffect(()=>{let o=Lq(e);if(r.current!==(o??null))n.current=!1,r.current=o||null,t({lineCount:0,lineStart:void 0,text:void 0,filePath:void 0});if(n.current||!o)return;let s=(i)=>{if(i.selection?.start&&i.selection?.end){let{start:a,end:l}=i.selection,c=l.line-a.line+1;if(l.character===0)c--;let u={lineCount:c,lineStart:a.line+1,text:i.text,filePath:i.filePath};t(u)}};o.client.setNotificationHandler(cOm(),(i)=>{if(r.current!==o)return;try{let a=i.params;if(a.selection&&a.selection.start&&a.selection.end)s(a);else if(a.text!==void 0)s({selection:null,text:a.text,filePath:a.filePath})}catch(a){De(a)}}),n.current=!0},[e,t])}
var PGt,cOm;
var iGl=b(()=>{Rn();Xr();ab();PGt=M(Te(),1),cOm=we(()=>E.object({method:E.literal("selection_changed"),params:E.object({selection:E.object({start:E.object({line:E.number(),character:E.number()}),end:E.object({line:E.number(),character:E.number()})}).nullable().optional(),text:E.string().optional(),filePath:E.string().optional()})}))});
export {sGl,PGt,cOm,iGl};
