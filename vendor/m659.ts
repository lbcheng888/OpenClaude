// @ts-nocheck
import {Q} from "../runtime.ts";
import {Hos} from "./m658.ts";
var xos=Q((sxf,Ios)=>{var fsu=Hos();Ios.exports=(e="")=>{let t=e.match(fsu);if(!t)return null;let[n,r]=t[0].replace(/#! ?/,"").split(" "),o=n.split("/").pop();if(o==="env")return r;return r?`${o} ${r}`:o}});
export {xos};
