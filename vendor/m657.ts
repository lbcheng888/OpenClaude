// @ts-nocheck
import {X} from "../runtime.ts";
import {UQo} from "./m655.ts";
import {jQo} from "./m656.ts";
var _fr=X((qyf,P7e)=>{var WQo=require("child_process"),hfr=UQo(),gfr=jQo();function GQo(e,t,n){let r=hfr(e,t,n),o=WQo.spawn(r.command,r.args,r.options);return gfr.hookChildProcess(o,r),o}function uYc(e,t,n){let r=hfr(e,t,n),o=WQo.spawnSync(r.command,r.args,r.options);return o.error=o.error||gfr.verifyENOENTSync(o.status,r),o}P7e.exports=GQo;P7e.exports.spawn=GQo;P7e.exports.sync=uYc;P7e.exports._parse=hfr;P7e.exports._enoent=gfr});
export {_fr};
