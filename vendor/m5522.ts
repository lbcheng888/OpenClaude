// @ts-nocheck
import {ap,BE} from "./m5006.ts";
import {B2t} from "./m3923.ts";
import {uzl,dzl,czl} from "./m5521.ts";
import {b} from "../runtime.ts";
import {Ev,RA} from "./m2211.ts";
function mzl(){ap({name:B2t,description:CNm,userInvocable:!0,files:uzl,async getPromptForCommand(e){let t=[ENm.trimStart()];if(e)t.push(`## User Request

${e}`);return[{type:"text",text:t.join(`

`)}]}})}
var pzl,ENm,CNm;
var fzl=b(()=>{Ev();BE();dzl();({frontmatter:pzl,content:ENm}=RA(czl)),CNm=typeof pzl.description==="string"?pzl.description:"Verify a code change does what it should by running the app."});
export {mzl,pzl,ENm,CNm,fzl};
