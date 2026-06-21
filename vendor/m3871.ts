// @ts-nocheck
import {Fen,initKp} from "./m609.ts";
import {Tp,xnt,QH} from "./m2784.ts";
import {b} from "../runtime.ts";
function _Da(e,t){return`<${Fen} from="${Tp(e)}">
${xnt(Fen,t)}
</${Fen}>`}
var LY="main";
var WUt=b(()=>{initKp();QH()});
export {_Da,LY,WUt};
