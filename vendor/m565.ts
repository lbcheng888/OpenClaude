// @ts-nocheck
import {rr,oC} from "./m466.ts";
import {Hi,S5} from "./m467.ts";
import {b} from "../runtime.ts";
import {ges,hes} from "./m557.ts";
import {Ces,Ees} from "./m562.ts";
import {Ies,P_r} from "./m564.ts";
function EVc(e,t){e=rr.isArray(e)?e:[e];let{length:n}=e,r,o,s={};for(let i=0;i<n;i++){r=e[i];let a;if(o=r,!bVc(r)){if(o=O_r[(a=String(r)).toLowerCase()],o===void 0)throw new Hi(`Unknown adapter '${a}'`)}if(o&&(rr.isFunction(o)||(o=o.get(t))))break;s[a||"#"+i]=o}if(!o){let i=Object.entries(s).map(([l,c])=>`adapter ${l} `+(c===!1?"is not supported by the environment":"is not available in the build")),a=n?i.length>1?`since :
`+i.map(xes).join(`
`):" "+xes(i[0]):"as no adapter specified";throw new Hi("There is no suitable adapter to dispatch the request "+a,"ERR_NOT_SUPPORT")}return o}
var O_r,xes=(e)=>`- ${e}`,bVc=(e)=>rr.isFunction(e)||e===null||e===!1,trn;
var L_r=b(()=>{oC();ges();Ces();Ies();S5();O_r={http:hes,xhr:Ees,fetch:{get:P_r}};rr.forEach(O_r,(e,t)=>{if(e){try{Object.defineProperty(e,"name",{value:t})}catch(n){}Object.defineProperty(e,"adapterName",{value:t})}});trn={getAdapter:EVc,adapters:O_r}});
export {EVc,O_r,xes,bVc,trn,L_r};
