// @ts-nocheck
import {Yyn,Ive} from "./m2262.ts";
import {k4,e_i,zfe} from "./m2263.ts";
import {b} from "../runtime.ts";
function cIt(){if(Qyn===void 0)Qyn=ced()??"dark";return Qyn}
function o_i(e){Qyn=e}
function H4(e){if(e==="auto")return cIt();if(Yyn(e))return e;let t=k4(e);return t&&e_i(t)||"dark"}
function s_i(e){let t=led(e);if(!t)return;return 0.2126*t.r+0.7152*t.g+0.0722*t.b>0.5?"light":"dark"}
function led(e){let t=/^rgba?:([0-9a-f]{1,4})\/([0-9a-f]{1,4})\/([0-9a-f]{1,4})/i.exec(e);if(t)return{r:qQe(t[1]),g:qQe(t[2]),b:qQe(t[3])};let n=/^#([0-9a-f]+)$/i.exec(e);if(n&&n[1].length%3===0){let r=n[1],o=r.length/3;return{r:qQe(r.slice(0,o)),g:qQe(r.slice(o,2*o)),b:qQe(r.slice(2*o))}}return}
function qQe(e){let t=16**e.length-1;return parseInt(e,16)/t}
function ced(){let e=process.env.COLORFGBG;if(!e)return;let n=e.split(";").at(-1);if(n===void 0||n==="")return;let r=Number(n);if(!Number.isInteger(r)||r<0||r>15)return;return r<=6||r===8?"dark":"light"}
var Qyn;
var Yfe=b(()=>{zfe();Ive()});
export {cIt,o_i,H4,s_i,led,qQe,ced,Qyn,Yfe};
