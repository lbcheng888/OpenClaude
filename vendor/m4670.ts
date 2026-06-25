// @ts-nocheck
import {b} from "../runtime.ts";
import {Ir} from "./m584.ts";
import {Ne} from "./m583.ts";
import {aSl,iSl} from "../src/tui/4670_call.ts";
var Arm,lSl;
var cSl=b(()=>{Ir();Arm={type:"local-jsx",name:"install-github-app",description:"Set up Claude GitHub Actions for a repository",availability:["claude-ai","console"],isEnabled:()=>!Ne.DISABLE_INSTALL_GITHUB_APP_COMMAND,load:()=>Promise.resolve().then(() => (aSl(),iSl))},lSl=Arm});
export {Arm,lSl,cSl};
