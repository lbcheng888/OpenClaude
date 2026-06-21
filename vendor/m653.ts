// @ts-nocheck
import {X} from "../runtime.ts";
import {DQo} from "./m652.ts";
var OQo=X((Byf,PQo)=>{var Xzc=DQo();PQo.exports=(e="")=>{let t=e.match(Xzc);if(!t)return null;let[n,r]=t[0].replace(/#! ?/,"").split(" "),o=n.split("/").pop();if(o==="env")return r;return r?`${o} ${r}`:o}});
export {OQo};
