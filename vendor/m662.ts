// @ts-nocheck
import {Q} from "../runtime.ts";
var Uos=Q((lxf,Bos)=>{function Asu(e,t){return Object.assign(Error(`${t} ${e.command} ENOENT`),{code:"ENOENT",errno:"ENOENT",syscall:`${t} ${e.command}`,path:e.command,spawnargs:e.args})}function Rsu(e,t){return}function Fos(e,t){return null}function vsu(e,t){return null}Bos.exports={hookChildProcess:Rsu,verifyENOENT:Fos,verifyENOENTSync:vsu,notFoundError:Asu}});
export {Uos};
