// @ts-nocheck
import {sCe,jRt,bk} from "../src/agent/0731_level.ts";
import {b} from "../runtime.ts";
function EI(e){return e===KZ||e===tb}
function qnt(e){return e.scope==="project"&&e.source.endsWith(`@${tb}`)}
function ts(e){if(e.includes("@")){let t=e.split("@");return{name:t[0]||"",marketplace:t[1]}}return{name:e}}
function gNi(e,t){return t?`${e}@${t}`:e}
function kwe(e,t){return e===t||e.toLowerCase()===t.toLowerCase()}
function zZ(e,t){return e.find((n)=>n===t)??e.find((n)=>kwe(n,t))}
function CD(e){return e!==void 0&&sCe.has(e.toLowerCase())}
function v8r(e){return CD(e)||e!==void 0&&jRt.has(e.toLowerCase())}
function _Ni(e,t){return t===KZ&&Dvd.has(e)}
function AD(e){if(e==="managed")throw Error("Cannot install plugins to managed scope");return Pvd[e]}
function Fvn(e){return R8r[e]}
var KZ="inline",tb="skills-dir",R8r,Dvd,Pvd;
var oh=b(()=>{bk();R8r={policySettings:"managed",userSettings:"user",projectSettings:"project",localSettings:"local",flagSettings:"flag"};Dvd=new Set(["anthropic-skills","core","cowork-plugin-management","data","design","engineering","enterprise-search","figma","finance","human-resources","internal-apps","legal","marketing","operations","product-management","productivity","sales","small-business","ai-governance-legal","cocounsel-legal","commercial-legal","corporate-legal","employment-legal","ip-legal","law-student","legal-builder-hub","legal-clinic","litigation-legal","privacy-legal","product-legal","regulatory-legal"]);Pvd={user:"userSettings",project:"projectSettings",local:"localSettings"}});
export {EI,qnt,ts,gNi,kwe,zZ,CD,v8r,_Ni,AD,Fvn,KZ,tb,R8r,Dvd,Pvd,oh};
