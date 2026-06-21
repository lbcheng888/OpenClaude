// @ts-nocheck
import {b} from "../runtime.ts";
function qT(e){return e}
function Rm(e){return e}
function r2o(e){return IAc.test(e)?e:null}
var t2o="[\\w-]{1,63}",n2o,IAc;
var zE=b(()=>{n2o=new RegExp(`^${t2o}$`),IAc=new RegExp(`^a(?:${t2o}-)?[0-9a-f]{16}$`)});
export {qT,Rm,r2o,t2o,n2o,IAc,zE};
