// @ts-nocheck
import {AHr} from "./m1645.ts";
import {qpn} from "./m1691.ts";
import {b} from "../runtime.ts";
import {tJe} from "./m1646.ts";
function JHr(){let e=AHr();return{async sendRequest(t){let{abortSignal:n,cleanup:r}=t.abortSignal?qpn(t.abortSignal):{};try{return t.abortSignal=n,await e.sendRequest(t)}finally{r===null||r===void 0||r()}}}}
var TGs=b(()=>{tJe()});
export {JHr,TGs};
