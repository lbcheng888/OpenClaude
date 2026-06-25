// @ts-nocheck
import {wfs,kfs,Hfs} from "./m841.ts";
import {b} from "../runtime.ts";
var Ifs=(e)=>({setRetryStrategy(t){e.retryStrategy=t},retryStrategy(){return e.retryStrategy}}),xfs=(e)=>{let t={};return t.retryStrategy=e.retryStrategy(),t};
var Dfs=(e)=>Object.assign(wfs(e),Ifs(e)),Pmu,Omu=(e)=>Object.assign(kfs(e),xfs(e));
var Pfs=b(()=>{Hfs();Pmu=Dfs});
export {Ifs,xfs,Dfs,Pmu,Omu,Pfs};
