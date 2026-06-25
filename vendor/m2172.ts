// @ts-nocheck
import {VSn,lTi} from "./m2167.ts";
import {jZe,$xt,pTi,_2r,mTi} from "./m2171.ts";
import {GSn,h2r} from "./m2165.ts";
import {b} from "../runtime.ts";
class zSn{constructor(){this._proxyLoggerProvider=new VSn}static getInstance(){if(!this._instance)this._instance=new zSn;return this._instance}setGlobalLoggerProvider(e){if(jZe[$xt])return this.getLoggerProvider();return jZe[$xt]=pTi(_2r,e,GSn),this._proxyLoggerProvider._setDelegate(e),e}getLoggerProvider(){var e,t;return(t=(e=jZe[$xt])===null||e===void 0?void 0:e.call(jZe,_2r))!==null&&t!==void 0?t:this._proxyLoggerProvider}getLogger(e,t,n){return this.getLoggerProvider().getLogger(e,t,n)}disable(){delete jZe[$xt],this._proxyLoggerProvider=new VSn}}
var fTi=b(()=>{mTi();h2r();lTi()});
export {zSn,fTi};
