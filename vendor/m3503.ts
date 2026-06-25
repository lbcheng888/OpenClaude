// @ts-nocheck
import {Q} from "../runtime.ts";
var wEa=Q((XMn)=>{Object.defineProperty(XMn,"__esModule",{value:!0});XMn.createRetryingTransport=void 0;var Hsp=5,Isp=1000,xsp=5000,Dsp=1.5,REa=0.2;function Psp(){return Math.random()*(2*REa)-REa}class vEa{_transport;constructor(e){this._transport=e}retry(e,t,n){return new Promise((r,o)=>{setTimeout(()=>{this._transport.send(e,t).then(r,o)},n)})}async send(e,t){let n=Date.now()+t,r=await this._transport.send(e,t),o=Hsp,s=Isp;while(r.status==="retryable"&&o>0){o--;let i=Math.max(Math.min(s,xsp)+Psp(),0);s=s*Dsp;let a=r.retryInMillis??i,l=n-Date.now();if(a>l)return r;r=await this.retry(e,l,a)}return r}shutdown(){return this._transport.shutdown()}}function Osp(e){return new vEa(e.transport)}XMn.createRetryingTransport=Osp});
export {wEa};
