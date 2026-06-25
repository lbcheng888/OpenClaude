// @ts-nocheck
import {mE,Kc,Jm} from "../src/config/2207_Jm.ts";
import {hI,cO} from "../src/telemetry/2249_cO.ts";
import {T9r,y9r,aEn} from "./m2250.ts";
import {wDt,kDt,d9r,p9r,xet} from "../src/config/2248_user.ts";
import {Td,Cb} from "./m5036.ts";
import {b} from "../runtime.ts";
function Hqm(){let e=mE(),t=hI();if(e)return t?T9r:y9r;return t?wDt:kDt}
function wnc(){Td({name:d9r,description:"Full reference for the memory type taxonomy \u2014 what each type captures, when to save it, how to structure the body, with examples.",whenToUse:"Use before writing a memory file to choose the right `type:` frontmatter value and body structure.",userInvocable:!1,isEnabled:()=>Kc()&&p9r(),async getPromptForCommand(){return[{type:"text",text:Hqm().join(`
`)}]}})}
var knc=b(()=>{xet();Jm();cO();aEn();Cb()});
export {Hqm,wnc,knc};
