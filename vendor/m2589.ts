// @ts-nocheck
import {Ebe,SEt,ik} from "../src/agent/0726_level.ts";
import {b} from "../runtime.ts";
function GH(e){return e===YZ||e===hC}
function Net(e){return e.scope==="project"&&e.source.endsWith(`@${hC}`)}
function gs(e){if(e.includes("@")){let t=e.split("@");return{name:t[0]||"",marketplace:t[1]}}return{name:e}}
function B0i(e,t){return t?`${e}@${t}`:e}
function Gwe(e,t){return e===t||e.toLowerCase()===t.toLowerCase()}
function JZ(e,t){return e.find((n)=>n===t)??e.find((n)=>Gwe(n,t))}
function lP(e){return e!==void 0&&Ebe.has(e.toLowerCase())}
function Y3r(e){return lP(e)||e!==void 0&&SEt.has(e.toLowerCase())}
function F0i(e,t){return t===YZ&&ihd.has(e)}
function cP(e){if(e==="managed")throw Error("Cannot install plugins to managed scope");return ahd[e]}
function zEn(e){return z3r[e]}
var YZ="inline",hC="skills-dir",z3r,ihd,ahd;
var sh=b(()=>{ik();z3r={policySettings:"managed",userSettings:"user",projectSettings:"project",localSettings:"local",flagSettings:"flag"};ihd=new Set(["anthropic-skills","core","cowork-plugin-management","data","design","engineering","enterprise-search","figma","finance","human-resources","internal-apps","legal","marketing","operations","product-management","productivity","sales","small-business","ai-governance-legal","cocounsel-legal","commercial-legal","corporate-legal","employment-legal","ip-legal","law-student","legal-builder-hub","legal-clinic","litigation-legal","privacy-legal","product-legal","regulatory-legal"]);ahd={user:"userSettings",project:"projectSettings",local:"localSettings"}});
export {GH,Net,gs,B0i,Gwe,JZ,lP,Y3r,F0i,cP,zEn,YZ,hC,z3r,ihd,ahd,sh};
