// @ts-nocheck
import {b} from "../runtime.ts";
import {qe} from "../src/config/0236_setHasFormattedOutput.ts";
function tld(e){return e.replace(/[-_]/g,"").toLowerCase()}
var eld,glg;
var D$r=b(()=>{qe();eld=["name","description","model","allowed-tools","argument-hint","arguments","disable-model-invocation","user-invocable","effort","shell","version","when_to_use","paths","hooks","context","agent","created_by","improved_by","mcpServers","lspServers","agents","outputStyles","themes","workflows","channels","monitors","settings","experimental","commands","skills","dependencies","userConfig","metadata","displayName","defaultEnabled","fallback","evals","author","homepage","repository","license","keywords","compatibility","tools","disallowedTools","color","permissionMode","maxTurns","initialPrompt","memory","background","isolation","keep-coding-instructions","force-for-plugin","type","originSessionId","hide-from-slash-command-tool"];glg=new Map(eld.map((e)=>[tld(e),e]))});
export {tld,eld,glg,D$r};
