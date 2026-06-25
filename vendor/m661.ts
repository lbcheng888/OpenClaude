// @ts-nocheck
import {Q} from "../runtime.ts";
import {vos} from "./m656.ts";
import {wos} from "./m657.ts";
import {Pos} from "./m660.ts";
var Nos=Q((axf,Mos)=>{var _su=require("path"),Oos=vos(),Los=wos(),ysu=Pos(),Tsu=/\.(?:com|exe)$/i,Ssu=/node_modules[\\/].bin[\\/][^\\/]+\.cmd$/i;function bsu(e){e.file=Oos(e);let t=e.file&&ysu(e.file);if(t)return e.args.unshift(e.file),e.command=t,Oos(e);return e.file}function Esu(e){return e}function Csu(e,t,n){if(t&&!Array.isArray(t))n=t,t=null;t=t?t.slice(0):[],n=Object.assign({},n);let r={command:e,args:t,options:n,file:void 0,original:{command:e,args:t}};return n.shell?r:Esu(r)}Mos.exports=Csu});
export {Nos};
