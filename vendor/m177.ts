// @ts-nocheck
import {b} from "../runtime.ts";
var t7e;
var EXt=b(()=>{t7e=class t7e extends Error{constructor(e){let t=typeof e==="string"?e:e.map((n)=>{if(n.type==="text")return n.text;return`[${n.type}]`}).join(" ");super(t);this.name="ToolError",this.content=e}}});
export {t7e,EXt};
