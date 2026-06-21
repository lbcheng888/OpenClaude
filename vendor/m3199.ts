// @ts-nocheck
import {b} from "../runtime.ts";
function Gta(e,t){return Math.floor((e-1)/t)+1}
function Vta(e,t,n){return Gta(e,n)*Gta(t,n)}
function $Hn(e,t,n){let{pxPerToken:r,maxTargetPx:o,maxTargetTokens:s}=n;if(e<=o&&t<=o&&Vta(e,t,r)<=s)return[e,t];if(t>e){let[c,u]=$Hn(t,e,n);return[u,c]}let i=e/t,a=e,l=1;for(;;){if(l+1===a)return[l,Math.max(Math.round(l/i),1)];let c=Math.floor((l+a)/2),u=Math.max(Math.round(c/i),1);if(c<=o&&Vta(c,u,r)<=s)l=c;else a=c}}
var $Kr;
var Kta=b(()=>{$Kr={pxPerToken:28,maxTargetPx:1568,maxTargetTokens:1568}});
export {Gta,Vta,$Hn,$Kr,Kta};
