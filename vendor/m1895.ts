// @ts-nocheck
import {__n,Fni} from "./m1894.ts";
import {La} from "./m1753.ts";
import {NM} from "./m1742.ts";
import {zp} from "./m1743.ts";
import {b} from "../runtime.ts";
import {iT} from "./m1780.ts";
class o8{constructor(e,t,n){this.httpMethod=e,this._baseEndpoint=t,this.headers={},this.bodyParameters={},this.queryParameters={},this.retryPolicy=n||new __n}computeUri(){let e=new Map;if(this.queryParameters)La.addExtraQueryParameters(e,this.queryParameters);let t=NM.mapToQueryString(e);return zp.appendQueryString(this._baseEndpoint,t)}computeParametersBodyString(){let e=new Map;if(this.bodyParameters)La.addExtraQueryParameters(e,this.bodyParameters);return NM.mapToQueryString(e)}}
var TBe=b(()=>{iT();Fni();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {o8,TBe};
