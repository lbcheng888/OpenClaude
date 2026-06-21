// @ts-nocheck
import {er,ZE} from "./m460.ts";
import {Ji,o8} from "./m461.ts";
import {b} from "../runtime.ts";
import {yzo,_zo} from "./m551.ts";
import {wzo,vzo} from "./m556.ts";
import {Pzo,omr} from "./m558.ts";
function A$c(e,t){e=er.isArray(e)?e:[e];let{length:n}=e,r,o,s={};for(let i=0;i<n;i++){r=e[i];let a;if(o=r,!f$c(r)){if(o=smr[(a=String(r)).toLowerCase()],o===void 0)throw new Ji(`Unknown adapter '${a}'`)}if(o&&(er.isFunction(o)||(o=o.get(t))))break;s[a||"#"+i]=o}if(!o){let i=Object.entries(s).map(([l,c])=>`adapter ${l} `+(c===!1?"is not supported by the environment":"is not available in the build")),a=n?i.length>1?`since :
`+i.map(Ozo).join(`
`):" "+Ozo(i[0]):"as no adapter specified";throw new Ji("There is no suitable adapter to dispatch the request "+a,"ERR_NOT_SUPPORT")}return o}
var smr,Ozo=(e)=>`- ${e}`,f$c=(e)=>er.isFunction(e)||e===null||e===!1,Ten;
var imr=b(()=>{ZE();yzo();wzo();Pzo();o8();smr={http:_zo,xhr:vzo,fetch:{get:omr}};er.forEach(smr,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(n){}Object.defineProperty(e,"adapterName",{value:t})}});Ten={getAdapter:A$c,adapters:smr}});
export {A$c,smr,Ozo,f$c,Ten,imr};
