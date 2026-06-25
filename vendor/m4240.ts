// @ts-nocheck
import {sn,mc} from "./m237.ts";
import {truncateToWidthNoEllipsis} from "./m239.ts";
import {Yn,Pl} from "./m2465.ts";
import {Text} from "./m2433.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {Xo} from "./m240.ts";
import {oe} from "./m2275.ts";
function gja(){return""}
function SUp(e){let t=e.split(`
`),n=e;if(t.length>fja)n=t.slice(0,fja).join(`
`);if(sn(n)>hja)n=truncateToWidthNoEllipsis(n,hja);return n.trim()}
function _ja(e,t,{verbose:n}){let r=e.command??"",o=n?r:SUp(r);return M6n.jsx(Yn,{children:M6n.jsxs(Text,{children:[o,o!==r?"\u2026 \xB7 stopped":" \xB7 stopped"]})})}
var M6n,fja=2,hja=160;
var yja=b(()=>{Pl();mc();je();Xo();M6n=x(oe(),1)});
export {gja,SUp,_ja,M6n,fja,hja,yja};
