// @ts-nocheck
import {VI,dr} from "./m231.ts";
import {b} from "../runtime.ts";
function OGn(e,t){let n=e.trim(),r=n.split(/\s+/,1)[0]??"",o=new Set,s=n;for(let i of t){let a=s.replace(new RegExp(`(?:^|\\s)--${VI(i)}(?=\\s|$)`,"g"),"");if(a!==s)o.add(i),s=a.trim()}return{rawFirstToken:r,flags:o,rest:s}}
var MCo=b(()=>{dr()});
export {OGn,MCo};
