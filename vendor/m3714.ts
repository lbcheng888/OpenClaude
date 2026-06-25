// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {e$t} from "./m3703.ts";
var R0a=Q((bBn)=>{Object.defineProperty(bBn,"__esModule",{value:!0});bBn.processDetector=void 0;var UTp=xi(),N_e=e$t(),$Tp=require("os");class A0a{detect(e){let t={[N_e.ATTR_PROCESS_PID]:process.pid,[N_e.ATTR_PROCESS_EXECUTABLE_NAME]:process.title,[N_e.ATTR_PROCESS_EXECUTABLE_PATH]:process.execPath,[N_e.ATTR_PROCESS_COMMAND_ARGS]:[process.argv[0],...process.execArgv,...process.argv.slice(1)],[N_e.ATTR_PROCESS_RUNTIME_VERSION]:process.versions.node,[N_e.ATTR_PROCESS_RUNTIME_NAME]:"nodejs",[N_e.ATTR_PROCESS_RUNTIME_DESCRIPTION]:"Node.js"};if(process.argv.length>1)t[N_e.ATTR_PROCESS_COMMAND]=process.argv[1];try{let n=$Tp.userInfo();t[N_e.ATTR_PROCESS_OWNER]=n.username}catch(n){UTp.diag.debug(`error obtaining process owner: ${n}`)}return{attributes:t}}}bBn.processDetector=new A0a});
export {R0a};
