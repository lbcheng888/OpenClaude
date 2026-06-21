// @ts-nocheck
import {$Te,agt} from "./m30.ts";
import {b} from "../runtime.ts";
function Rpc(e){var t=this.__data__,n=$Te(t,e);if(n<0)return!1;var r=t.length-1;if(n==r)t.pop();else wpc.call(t,n,1);return--this.size,!0}
var vpc,wpc,JBo;
var XBo=b(()=>{agt();vpc=Array.prototype,wpc=vpc.splice;JBo=Rpc});
export {Rpc,vpc,wpc,JBo,XBo};
