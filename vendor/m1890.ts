// @ts-nocheck
import {Lfn,jJs} from "./m1889.ts";
import {Ja} from "./m1748.ts";
import {E1} from "./m1737.ts";
import {Dm} from "./m1738.ts";
import {b} from "../runtime.ts";
import {AT} from "./m1775.ts";
class W8{constructor(e,t,n){this.httpMethod=e,this._baseEndpoint=t,this.headers={},this.bodyParameters={},this.queryParameters={},this.retryPolicy=n||new Lfn}computeUri(){let e=new Map;if(this.queryParameters)Ja.addExtraQueryParameters(e,this.queryParameters);let t=E1.mapToQueryString(e);return Dm.appendQueryString(this._baseEndpoint,t)}computeParametersBodyString(){let e=new Map;if(this.bodyParameters)Ja.addExtraQueryParameters(e,this.bodyParameters);return E1.mapToQueryString(e)}}
var EBe=b(()=>{AT();jJs();/*! @azure/msal-node v3.8.1 2025-10-29 */});
export {W8,EBe};
