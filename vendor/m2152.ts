// @ts-nocheck
import {X} from "../runtime.ts";
import {Xi} from "./m2091.ts";
import {uHt} from "./m2141.ts";
var omi=X((i_n)=>{Object.defineProperty(i_n,"__esModule",{value:!0});i_n.processDetector=void 0;var LYu=Xi(),yfe=uHt(),MYu=require("os");class rmi{detect(e){let t={[yfe.ATTR_PROCESS_PID]:process.pid,[yfe.ATTR_PROCESS_EXECUTABLE_NAME]:process.title,[yfe.ATTR_PROCESS_EXECUTABLE_PATH]:process.execPath,[yfe.ATTR_PROCESS_COMMAND_ARGS]:[process.argv[0],...process.execArgv,...process.argv.slice(1)],[yfe.ATTR_PROCESS_RUNTIME_VERSION]:process.versions.node,[yfe.ATTR_PROCESS_RUNTIME_NAME]:"nodejs",[yfe.ATTR_PROCESS_RUNTIME_DESCRIPTION]:"Node.js"};if(process.argv.length>1)t[yfe.ATTR_PROCESS_COMMAND]=process.argv[1];try{let n=MYu.userInfo();t[yfe.ATTR_PROCESS_OWNER]=n.username}catch(n){LYu.diag.debug(`error obtaining process owner: ${n}`)}return{attributes:t}}}i_n.processDetector=new rmi});
export {omi};
