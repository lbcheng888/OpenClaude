// @ts-nocheck
import {b} from "../runtime.ts";
var sGe;
var jzt=b(()=>{sGe=class sGe extends Error{constructor(e){let t=typeof e==="string"?e:e.map((n)=>{if(n.type==="text")return n.text;return`[${n.type}]`}).join(" ");super(t);this.name="ToolError",this.content=e}}});
export {sGe,jzt};
