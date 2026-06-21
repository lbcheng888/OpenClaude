// @ts-nocheck
import {setTerminalFocusForState,lt} from "../src/session/0131_sent.ts";
import {b} from "../runtime.ts";
function TFr(e){yFr=e?"focused":"blurred",setTerminalFocusForState(e);for(let t of _Fr)t();if(!e){for(let t of i_i)t();i_i.clear()}}
function jQe(){return yFr!=="blurred"}
function IK(){return yFr}
function WFe(e){return _Fr.add(e),()=>{_Fr.delete(e)}}
var yFr="unknown",i_i,_Fr;
var GFe=b(()=>{lt();i_i=new Set,_Fr=new Set});
export {TFr,jQe,IK,WFe,yFr,i_i,_Fr,GFe};
