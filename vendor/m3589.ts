// @ts-nocheck
import {X} from "../runtime.ts";
import {cha} from "./m3526.ts";
import {lya} from "./m3582.ts";
import {i6} from "./m3527.ts";
import {f9} from "./m3516.ts";
import {Eya} from "./m3588.ts";
var Cya=X(($Bt)=>{Object.defineProperty($Bt,"__esModule",{value:!0});$Bt.SubchannelPool=void 0;$Bt.getSubchannelPool=mnp;var inp=cha(),anp=lya(),lnp=i6(),cnp=f9(),unp=Eya(),dnp=1e4;class MLn{constructor(){this.pool=Object.create(null),this.cleanupTimer=null}unrefUnusedSubchannels(){let e=!0;for(let t in this.pool){let r=this.pool[t].filter((o)=>!o.subchannel.unrefIfOneRef());if(r.length>0)e=!1;this.pool[t]=r}if(e&&this.cleanupTimer!==null)clearInterval(this.cleanupTimer),this.cleanupTimer=null}ensureCleanupTask(){var e,t;if(this.cleanupTimer===null)this.cleanupTimer=setInterval(()=>{this.unrefUnusedSubchannels()},dnp),(t=(e=this.cleanupTimer).unref)===null||t===void 0||t.call(e)}getOrCreateSubchannel(e,t,n,r){this.ensureCleanupTask();let o=(0,cnp.uriToString)(e);if(o in this.pool){let i=this.pool[o];for(let a of i)if((0,lnp.subchannelAddressEqual)(t,a.subchannelAddress)&&(0,inp.channelOptionsEqual)(n,a.channelArguments)&&r._equals(a.channelCredentials))return a.subchannel}let s=new anp.Subchannel(e,t,n,r,new unp.Http2SubchannelConnector(e));if(!(o in this.pool))this.pool[o]=[];return this.pool[o].push({subchannelAddress:t,channelArguments:n,channelCredentials:r,subchannel:s}),s.ref(),s}}$Bt.SubchannelPool=MLn;var pnp=new MLn;function mnp(e){if(e)return pnp;else return new MLn}});
export {Cya};
