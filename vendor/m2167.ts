// @ts-nocheck
import {p_n,mmi} from "./m2162.ts";
import {YXe,fHt,gmi,W1r,_mi} from "./m2166.ts";
import {d_n,q1r} from "./m2160.ts";
import {b} from "../runtime.ts";
class f_n{constructor(){this._proxyLoggerProvider=new p_n}static getInstance(){if(!this._instance)this._instance=new f_n;return this._instance}setGlobalLoggerProvider(e){if(YXe[fHt])return this.getLoggerProvider();return YXe[fHt]=gmi(W1r,e,d_n),this._proxyLoggerProvider._setDelegate(e),e}getLoggerProvider(){var e,t;return(t=(e=YXe[fHt])===null||e===void 0?void 0:e.call(YXe,W1r))!==null&&t!==void 0?t:this._proxyLoggerProvider}getLogger(e,t,n){return this.getLoggerProvider().getLogger(e,t,n)}disable(){delete YXe[fHt],this._proxyLoggerProvider=new p_n}}
var ymi=b(()=>{_mi();q1r();mmi()});
export {f_n,ymi};
