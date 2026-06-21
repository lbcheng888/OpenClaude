// @ts-nocheck
import {b} from "../runtime.ts";
import {Lr} from "./m578.ts";
import {je} from "./m577.ts";
import {Tpl,ypl} from "../src/tui/4642_call.ts";
var bzp,Spl;
var bpl=b(()=>{Lr();bzp={type:"local-jsx",name:"install-github-app",description:"Set up Claude GitHub Actions for a repository",availability:["claude-ai","console"],isEnabled:()=>!je.DISABLE_INSTALL_GITHUB_APP_COMMAND,load:()=>Promise.resolve().then(() => (Tpl(),ypl))},Spl=bzp});
export {bzp,Spl,bpl};
