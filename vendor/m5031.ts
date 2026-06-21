// @ts-nocheck
import {Gee,eca,tge,rle} from "../src/core/3320_environment_id.ts";
import {Se,bt} from "./m195.ts";
import {getSettings_DEPRECATED,getSettingsForSource,yr} from "../src/config/0740_updateSettingsForSource.ts";
import {Tw,mf} from "./m702.ts";
import {b} from "../runtime.ts";
async function uHl(){let[e,t]=await Promise.allSettled([Gee(),eca()]),n=e.status==="rejected"?Se(e.reason):null,r=e.status==="fulfilled"?e.value:[],o=t.status==="fulfilled"?t.value:[],s=[...r,...o],a=getSettings_DEPRECATED()?.remote?.defaultEnvironmentId;if(s.length===0)return{availableTargets:[],selectedTarget:null,selectedTargetSource:null,environmentsError:n};let l=r.find((u)=>u.kind!=="bridge")??o[0]??s[0],c=null;if(a){let u=s.find((d)=>tge(d)===a);if(u){l=u;for(let d=Tw.length-1;d>=0;d--){let p=Tw[d];if(!p||p==="flagSettings")continue;if(getSettingsForSource(p)?.remote?.defaultEnvironmentId===a){c=p;break}}}}return{availableTargets:s,selectedTarget:l,selectedTargetSource:c,environmentsError:n}}
var dHl=b(()=>{bt();mf();yr();rle();rle()});
export {uHl,dHl};
