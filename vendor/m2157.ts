// @ts-nocheck
import {Q} from "../runtime.ts";
import {xi} from "./m2096.ts";
import {Nxt} from "./m2146.ts";
var Zyi=Q((BSn)=>{Object.defineProperty(BSn,"__esModule",{value:!0});BSn.processDetector=void 0;var tid=xi(),Hfe=Nxt(),nid=require("os");class Qyi{detect(e){let t={[Hfe.ATTR_PROCESS_PID]:process.pid,[Hfe.ATTR_PROCESS_EXECUTABLE_NAME]:process.title,[Hfe.ATTR_PROCESS_EXECUTABLE_PATH]:process.execPath,[Hfe.ATTR_PROCESS_COMMAND_ARGS]:[process.argv[0],...process.execArgv,...process.argv.slice(1)],[Hfe.ATTR_PROCESS_RUNTIME_VERSION]:process.versions.node,[Hfe.ATTR_PROCESS_RUNTIME_NAME]:"nodejs",[Hfe.ATTR_PROCESS_RUNTIME_DESCRIPTION]:"Node.js"};if(process.argv.length>1)t[Hfe.ATTR_PROCESS_COMMAND]=process.argv[1];try{let n=nid.userInfo();t[Hfe.ATTR_PROCESS_OWNER]=n.username}catch(n){tid.diag.debug(`error obtaining process owner: ${n}`)}return{attributes:t}}}BSn.processDetector=new Qyi});
export {Zyi};
