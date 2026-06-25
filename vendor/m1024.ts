// @ts-nocheck
import {ft,b} from "../runtime.ts";
import {defaultProvider,credentialsWillNeedRefresh,credentialsTreatedAsExpired,jws} from "./m1023.ts";
var Yws={};
ft(Yws,{defaultProvider:()=>defaultProvider,credentialsWillNeedRefresh:()=>credentialsWillNeedRefresh,credentialsTreatedAsExpired:()=>credentialsTreatedAsExpired});
var CNe=b(()=>{jws()});
export {Yws,CNe};
