// @ts-nocheck
import {useIsScreenReaderEnabled,Jve} from "./m2444.ts";
import {bz,i4} from "./m2426.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function gdt(){let e=useIsScreenReaderEnabled(),t=bz();return M9a.useCallback(()=>{if(!e)return;let n=Date.now();if(n-L9a<v0p)return;L9a=n,t.notifyBell()},[e,t])}
var M9a,L9a=0,v0p=500,N9a=5000;
var W9n=b(()=>{Jve();i4();M9a=x(et(),1)});
export {gdt,M9a,L9a,v0p,N9a,W9n};
