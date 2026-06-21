// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {CFt} from "./m3687.ts";
var uCa=X((x1n)=>{Object.defineProperty(x1n,"__esModule",{value:!0});x1n.processDetector=void 0;var Zlp=Xi(),Ege=CFt(),ecp=require("os");class cCa{detect(e){let t={[Ege.ATTR_PROCESS_PID]:process.pid,[Ege.ATTR_PROCESS_EXECUTABLE_NAME]:process.title,[Ege.ATTR_PROCESS_EXECUTABLE_PATH]:process.execPath,[Ege.ATTR_PROCESS_COMMAND_ARGS]:[process.argv[0],...process.execArgv,...process.argv.slice(1)],[Ege.ATTR_PROCESS_RUNTIME_VERSION]:process.versions.node,[Ege.ATTR_PROCESS_RUNTIME_NAME]:"nodejs",[Ege.ATTR_PROCESS_RUNTIME_DESCRIPTION]:"Node.js"};if(process.argv.length>1)t[Ege.ATTR_PROCESS_COMMAND]=process.argv[1];try{let n=ecp.userInfo();t[Ege.ATTR_PROCESS_OWNER]=n.username}catch(n){Zlp.diag.debug(`error obtaining process owner: ${n}`)}return{attributes:t}}}x1n.processDetector=new cCa});
export {uCa};
