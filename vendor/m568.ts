// @ts-nocheck
import {b} from "../runtime.ts";
function Vzo(e){let t,n=e.startsWith("//")?`https:${e}`:e;try{t=new URL(n).hostname}catch{t=e.match(/^[^/:]+/)?.[0]??e}return t.endsWith(".")?t.slice(0,-1):t}
function Een(e){return I$c.test(Vzo(e))}
function EMe(e){return D$c.test(Vzo(e))}
var I$c,D$c;
var ZVe=b(()=>{I$c=/(^|\.)(anthropic\.com|claude\.ai|claude\.com)$/i,D$c=/(^|\.)downloads\.claude\.ai$/i});
export {Vzo,Een,EMe,I$c,D$c,ZVe};
