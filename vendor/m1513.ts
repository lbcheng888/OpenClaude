// @ts-nocheck
import {b} from "../runtime.ts";
import {M3s} from "./m1498.ts";
import {j4s} from "./m1512.ts";
var W4s=()=>{};
class iCe{constructor(e){this.method=e.method||"GET",this.hostname=e.hostname||"localhost",this.port=e.port,this.query=e.query||{},this.headers=e.headers||{},this.body=e.body,this.protocol=e.protocol?e.protocol.slice(-1)!==":"?`${e.protocol}:`:e.protocol:"https:",this.path=e.path?e.path.charAt(0)!=="/"?`/${e.path}`:e.path:"/",this.username=e.username,this.password=e.password,this.fragment=e.fragment}static isInstance(e){if(!e)return!1;let t=e;return"method"in t&&"protocol"in t&&"hostname"in t&&"path"in t&&typeof t.query==="object"&&typeof t.headers==="object"}clone(){let e=new iCe({...this,headers:{...this.headers}});if(e.query)e.query=FLu(e.query);return e}}
function FLu(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return{...t,[n]:Array.isArray(r)?[...r]:r}},{})}
var G4s=()=>{};
var $Ye=b(()=>{M3s();j4s();W4s();G4s()});
export {W4s,iCe,FLu,G4s,$Ye};
