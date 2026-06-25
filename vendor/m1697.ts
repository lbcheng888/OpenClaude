// @ts-nocheck
import {VPr} from "./m1650.ts";
import {Ahn} from "./m1696.ts";
import {b} from "../runtime.ts";
import {ZXe} from "./m1651.ts";
function vOr(){let e=VPr();return{async sendRequest(t){let{abortSignal:n,cleanup:r}=t.abortSignal?Ahn(t.abortSignal):{};try{return t.abortSignal=n,await e.sendRequest(t)}finally{r===null||r===void 0||r()}}}}
var hJs=b(()=>{ZXe()});
export {vOr,hJs};
