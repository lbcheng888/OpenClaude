// @ts-nocheck
import {b} from "../runtime.ts";
var mTs=()=>{};
var fTs=()=>{};
var ATs=()=>{};
class NCt{method;protocol;hostname;port;path;query;headers;username;password;fragment;body;constructor(e){this.method=e.method||"GET",this.hostname=e.hostname||"localhost",this.port=e.port,this.query=e.query||{},this.headers=e.headers||{},this.body=e.body,this.protocol=e.protocol?e.protocol.slice(-1)!==":"?`${e.protocol}:`:e.protocol:"https:",this.path=e.path?e.path.charAt(0)!=="/"?`/${e.path}`:e.path:"/",this.username=e.username,this.password=e.password,this.fragment=e.fragment}static clone(e){let t=new NCt({...e,headers:{...e.headers}});if(t.query)t.query=aAu(t.query);return t}static isInstance(e){if(!e)return!1;let t=e;return"method"in t&&"protocol"in t&&"hostname"in t&&"path"in t&&typeof t.query==="object"&&typeof t.headers==="object"}clone(){return NCt.clone(this)}}
function aAu(e){return Object.keys(e).reduce((t,n)=>{let r=e[n];return{...t,[n]:Array.isArray(r)?[...r]:r}},{})}
var hTs=()=>{};
var gTs=b(()=>{mTs();fTs();ATs();hTs()});
export {mTs,fTs,ATs,NCt,aAu,hTs,gTs};
