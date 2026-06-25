// @ts-nocheck
import {DEn,hve} from "./m2271.ts";
import {J3,tAi,she} from "./m2272.ts";
import {b} from "../runtime.ts";
import {ig} from "./m130.ts";
import {Ni} from "./m127.ts";
function qUe(){return LEn??cAi()??"dark"}
function iAi(){return LEn??cAi()}
function MEn(e){if(LEn===e)return;LEn=e,sAi.emit()}
function X3(e){if(e==="auto")return qUe();if(DEn(e))return e;let t=J3(e);return t&&tAi(t)||"dark"}
function lAi(e){let t=Dud(e);if(!t)return;return 0.2126*t.r+0.7152*t.g+0.0722*t.b>0.5?"light":"dark"}
function Dud(e){let t=/^rgba?:([0-9a-f]{1,4})\/([0-9a-f]{1,4})\/([0-9a-f]{1,4})/i.exec(e);if(t)return{r:qet(t[1]),g:qet(t[2]),b:qet(t[3])};let n=/^#([0-9a-f]+)$/i.exec(e);if(n&&n[1].length%3===0){let r=n[1],o=r.length/3;return{r:qet(r.slice(0,o)),g:qet(r.slice(o,2*o)),b:qet(r.slice(2*o))}}return}
function qet(e){let t=16**e.length-1;return parseInt(e,16)/t}
function cAi(){let e=process.env.COLORFGBG;if(!e)return;let n=e.split(";").at(-1);if(n===void 0||n==="")return;let r=Number(n);if(!Number.isInteger(r)||r<0||r>15)return;return r<=6||r===8?"dark":"light"}
var LEn,sAi,aAi;
var cZ=b(()=>{she();ig();hve();sAi=Ni();aAi=sAi.subscribe});
export {qUe,iAi,MEn,X3,lAi,Dud,qet,cAi,LEn,sAi,aAi,cZ};
