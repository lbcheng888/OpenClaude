// @ts-nocheck
import {Q} from "../runtime.ts";
import {ACa} from "./m3542.ts";
import {Cva} from "./m3598.ts";
import {Eq} from "./m3543.ts";
import {B$} from "./m3532.ts";
import {Fva} from "./m3604.ts";
var Bva=Q((_2t)=>{Object.defineProperty(_2t,"__esModule",{value:!0});_2t.SubchannelPool=void 0;_2t.getSubchannelPool=tmp;var jpp=ACa(),Ypp=Cva(),Jpp=Eq(),Xpp=B$(),Qpp=Fva(),Zpp=1e4;class HNn{constructor(){this.pool=Object.create(null),this.cleanupTimer=null}unrefUnusedSubchannels(){let e=!0;for(let t in this.pool){let r=this.pool[t].filter((o)=>!o.subchannel.unrefIfOneRef());if(r.length>0)e=!1;this.pool[t]=r}if(e&&this.cleanupTimer!==null)clearInterval(this.cleanupTimer),this.cleanupTimer=null}ensureCleanupTask(){var e,t;if(this.cleanupTimer===null)this.cleanupTimer=setInterval(()=>{this.unrefUnusedSubchannels()},Zpp),(t=(e=this.cleanupTimer).unref)===null||t===void 0||t.call(e)}getOrCreateSubchannel(e,t,n,r){this.ensureCleanupTask();let o=(0,Xpp.uriToString)(e);if(o in this.pool){let i=this.pool[o];for(let a of i)if((0,Jpp.subchannelAddressEqual)(t,a.subchannelAddress)&&(0,jpp.channelOptionsEqual)(n,a.channelArguments)&&r._equals(a.channelCredentials))return a.subchannel}let s=new Ypp.Subchannel(e,t,n,r,new Qpp.Http2SubchannelConnector(e));if(!(o in this.pool))this.pool[o]=[];return this.pool[o].push({subchannelAddress:t,channelArguments:n,channelCredentials:r,subchannel:s}),s.ref(),s}}_2t.SubchannelPool=HNn;var emp=new HNn;function tmp(e){if(e)return emp;else return new HNn}});
export {Bva};
