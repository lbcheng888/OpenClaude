// @ts-nocheck
import {X} from "../runtime.ts";
var pAa=X((oOn)=>{Object.defineProperty(oOn,"__esModule",{value:!0});oOn.createRetryingTransport=void 0;var qzd=5,jzd=1000,Wzd=5000,Gzd=1.5,uAa=0.2;function Vzd(){return Math.random()*(2*uAa)-uAa}class dAa{_transport;constructor(e){this._transport=e}retry(e,t,n){return new Promise((r,o)=>{setTimeout(()=>{this._transport.send(e,t).then(r,o)},n)})}async send(e,t){let n=Date.now()+t,r=await this._transport.send(e,t),o=qzd,s=jzd;while(r.status==="retryable"&&o>0){o--;let i=Math.max(Math.min(s,Wzd)+Vzd(),0);s=s*Gzd;let a=r.retryInMillis??i,l=n-Date.now();if(a>l)return r;r=await this.retry(e,l,a)}return r}shutdown(){return this._transport.shutdown()}}function Kzd(e){return new dAa(e.transport)}oOn.createRetryingTransport=Kzd});
export {pAa};
