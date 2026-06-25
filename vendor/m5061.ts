// @ts-nocheck
import {Bee,uga,f_e,nle} from "../src/core/3336_environment_id.ts";
import {Ce,Ct} from "./m197.ts";
import {getSettings_DEPRECATED,getSettingsForSource,br} from "../src/config/0745_updateSettingsForSource.ts";
import {fA,wm} from "./m707.ts";
import {b} from "../runtime.ts";
async function x1l(){let[e,t]=await Promise.allSettled([Bee(),uga()]),n=e.status==="rejected"?Ce(e.reason):null,r=e.status==="fulfilled"?e.value:[],o=t.status==="fulfilled"?t.value:[],s=[...r,...o],a=getSettings_DEPRECATED()?.remote?.defaultEnvironmentId;if(s.length===0)return{availableTargets:[],selectedTarget:null,selectedTargetSource:null,environmentsError:n};let l=r.find((u)=>u.kind!=="bridge")??o[0]??s[0],c=null;if(a){let u=s.find((d)=>f_e(d)===a);if(u){l=u;for(let d=fA.length-1;d>=0;d--){let p=fA[d];if(!p||p==="flagSettings")continue;if(getSettingsForSource(p)?.remote?.defaultEnvironmentId===a){c=p;break}}}}return{availableTargets:s,selectedTarget:l,selectedTargetSource:c,environmentsError:n}}
var D1l=b(()=>{Ct();wm();br();nle();nle()});
export {x1l,D1l};
