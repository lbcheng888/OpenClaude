// @ts-nocheck
import {X} from "../runtime.ts";
import {EC} from "./m3064.ts";
import {x$e} from "./m3095.ts";
var Pxe=X((Ijh,BYi)=>{var aFd=EC().fromPromise,NYi=x$e();function lFd(e){return NYi.access(e).then(()=>!0).catch(()=>!1)}BYi.exports={pathExists:aFd(lFd),pathExistsSync:NYi.existsSync}});
export {Pxe};
