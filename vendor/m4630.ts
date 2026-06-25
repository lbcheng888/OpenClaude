// @ts-nocheck
import {isTmuxControlMode,Po} from "./m638.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {oe} from "./m2275.ts";
function tyl(e){let t=Z_l.homedir(),n=isTmuxControlMode(),r=e.startsWith(t)?"~"+e.slice(t.length):null,o=e.startsWith(n)?"./"+eyl.relative(n,e):null;if(r&&o)return r.length<=o.length?r:o;return r||o||e}
var Snm,Z_l,eyl,nyl;
var ryl=b(()=>{je();Po();Snm=x(tt(),1),Z_l=require("os"),eyl=require("path"),nyl=x(oe(),1)});
export {tyl,Snm,Z_l,eyl,nyl,ryl};
