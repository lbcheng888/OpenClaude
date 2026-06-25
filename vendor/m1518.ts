// @ts-nocheck
import {b} from "../runtime.ts";
import {xWs} from "./m1503.ts";
import {FGs} from "./m1517.ts";
var BGs=()=>{};
class WAe{constructor(e){this.method=e.method||"GET",this.hostname=e.hostname||"localhost",this.port=e.port,this.query=e.query||{},this.headers=e.headers||{},this.body=e.body,this.protocol=e.protocol?e.protocol.slice(-1)!==":"?`${e.protocol}:`:e.protocol:"https:",this.path=e.path?e.path.charAt(0)!=="/"?`/${e.path}`:e.path:"/",this.username=e.username,this.password=e.password,this.fragment=e.fragment}static isInstance(e){if(!e)return!1;let t=e;return"method"in t&&"protocol"in t&&"hostname"in t&&"path"in t&&typeof t.query==="object"&&typeof t.headers==="object"}clone(){let e=new WAe({...this,headers:{...this.headers}});if(e.query)e.query=o4u(e.query);return e}}
function o4u(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return{...t,[n]:Array.isArray(r)?[...r]:r}},{})}
var UGs=()=>{};
var BXe=b(()=>{xWs();FGs();BGs();UGs()});
export {BGs,WAe,o4u,UGs,BXe};
