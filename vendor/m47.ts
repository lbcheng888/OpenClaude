// @ts-nocheck
import {bbe,OTt} from "./m12.ts";
import {Cbe,gYt} from "./m31.ts";
import {LLe,_Yt} from "./m46.ts";
import {b} from "../runtime.ts";
function jEc(e,t){var n=this.__data__;if(n instanceof bbe){var r=n.__data__;if(!Cbe||r.length<zEc-1)return r.push([e,t]),this.size=++n.size,this;n=this.__data__=new LLe(r)}return n.set(e,t),this.size=n.size,this}
var zEc=200,d4o;
var p4o=b(()=>{OTt();gYt();_Yt();d4o=jEc});
export {jEc,zEc,d4o,p4o};
