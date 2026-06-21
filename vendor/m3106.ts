// @ts-nocheck
import {X} from "../runtime.ts";
import {mT} from "./m1464.ts";
import {EC} from "./m3064.ts";
import {cJi} from "./m3105.ts";
var QLt=X((Bjh,dJi)=>{var fkn=mT(),XFd=EC().fromCallback,uJi=cJi();function QFd(e,t){if(fkn.rm)return fkn.rm(e,{recursive:!0,force:!0},t);uJi(e,t)}function ZFd(e){if(fkn.rmSync)return fkn.rmSync(e,{recursive:!0,force:!0});uJi.sync(e)}dJi.exports={remove:XFd(QFd),removeSync:ZFd}});
export {QLt};
