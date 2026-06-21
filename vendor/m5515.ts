// @ts-nocheck
import {lE,xu,tA} from "../src/config/2201_tA.ts";
import {_debugModuleInit,GO} from "../src/telemetry/2241_GO.ts";
import {qBr,$Br,Cyn} from "./m2242.ts";
import {XHt,QHt,OBr,LBr,HQe} from "../src/config/2240_user.ts";
import {ap,BE} from "./m5006.ts";
import {b} from "../runtime.ts";
function mNm(){let e=lE(),t=_debugModuleInit();if(e)return t?qBr:$Br;return t?XHt:QHt}
function jKl(){ap({name:OBr,description:"Full reference for the memory type taxonomy \u2014 what each type captures, when to save it, how to structure the body, with examples.",whenToUse:"Use before writing a memory file to choose the right `type:` frontmatter value and body structure.",userInvocable:!1,isEnabled:()=>xu()&&LBr(),async getPromptForCommand(){return[{type:"text",text:mNm().join(`
`)}]}})}
var WKl=b(()=>{HQe();tA();GO();Cyn();BE()});
export {mNm,jKl,WKl};
