// @ts-nocheck
import {b} from "../runtime.ts";
import {qe} from "../src/config/0234_setHasFormattedOutput.ts";
function DXu(e){return e.replace(/[-_]/g,"").toLowerCase()}
var IXu,FYA;
var dAi=b(()=>{qe();IXu=["name","description","model","allowed-tools","argument-hint","arguments","disable-model-invocation","user-invocable","effort","shell","version","when_to_use","paths","hooks","context","agent","created_by","improved_by","mcpServers","lspServers","agents","outputStyles","themes","workflows","channels","monitors","settings","experimental","commands","skills","dependencies","userConfig","metadata","author","homepage","repository","license","keywords","compatibility","tools","disallowedTools","color","permissionMode","maxTurns","initialPrompt","memory","background","isolation","keep-coding-instructions","force-for-plugin","type","originSessionId","hide-from-slash-command-tool"];FYA=new Map(IXu.map((e)=>[DXu(e),e]))});
export {DXu,IXu,FYA,dAi};
