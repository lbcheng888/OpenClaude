// @ts-nocheck
import {b} from "../runtime.ts";
function Jla(e,t){return Math.floor((e-1)/t)+1}
function Xla(e,t,n){return Jla(e,n)*Jla(t,n)}
function DDn(e,t,n){let{pxPerToken:r,maxTargetPx:o,maxTargetTokens:s}=n;if(e<=o&&t<=o&&Xla(e,t,r)<=s)return[e,t];if(t>e){let[c,u]=DDn(t,e,n);return[u,c]}let i=e/t,a=e,l=1;for(;;){if(l+1===a)return[l,Math.max(Math.round(l/i),1)];let c=Math.floor((l+a)/2),u=Math.max(Math.round(c/i),1);if(c<=o&&Xla(c,u,r)<=s)l=c;else a=c}}
var CQr;
var Qla=b(()=>{CQr={pxPerToken:28,maxTargetPx:1568,maxTargetTokens:1568}});
export {Jla,Xla,DDn,CQr,Qla};
