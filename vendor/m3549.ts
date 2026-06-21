// @ts-nocheck
import {X} from "../runtime.ts";
import {eLn} from "./m3545.ts";
var oeo=X((Oga)=>{var tZd=Oga,nZd=eLn();tZd[".google.protobuf.Any"]={fromObject:function(e,t){if(e&&e["@type"]){var n=e["@type"].substring(e["@type"].lastIndexOf("/")+1),r=this.lookup(n);if(r){var o=e["@type"].charAt(0)==="."?e["@type"].slice(1):e["@type"];if(o.indexOf("/")===-1)o="/"+o;var s=t===void 0?1:t+1;return this.create({type_url:o,value:r.encode(r.fromObject(e,s)).finish()})}}return this.fromObject(e,t)},toObject:function(e,t){var n="type.googleapis.com/",r="",o="";if(t&&t.json&&e.type_url&&e.value){o=e.type_url.substring(e.type_url.lastIndexOf("/")+1),r=e.type_url.substring(0,e.type_url.lastIndexOf("/")+1);var s=this.lookup(o);if(s)e=s.decode(e.value)}if(!(e instanceof this.ctor)&&e instanceof nZd){var i=e.$type.toObject(e,t),a=e.$type.fullName[0]==="."?e.$type.fullName.slice(1):e.$type.fullName;if(r==="")r=n;return o=r+a,i["@type"]=o,i}return this.toObject(e,t)}}});
export {oeo};
