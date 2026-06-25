// @ts-nocheck
import {Q} from "../runtime.ts";
import {Nos} from "./m661.ts";
import {Uos} from "./m662.ts";
var zyr=Q((cxf,Ije)=>{var $os=require("child_process"),Vyr=Nos(),Kyr=Uos();function qos(e,t,n){let r=Vyr(e,t,n),o=$os.spawn(r.command,r.args,r.options);return Kyr.hookChildProcess(o,r),o}function wsu(e,t,n){let r=Vyr(e,t,n),o=$os.spawnSync(r.command,r.args,r.options);return o.error=o.error||Kyr.verifyENOENTSync(o.status,r),o}Ije.exports=qos;Ije.exports.spawn=qos;Ije.exports.sync=wsu;Ije.exports._parse=Vyr;Ije.exports._enoent=Kyr});
export {zyr};
