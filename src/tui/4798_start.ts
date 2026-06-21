// @ts-nocheck
import {Text} from "../../vendor/m2423.ts";
import {WY,yIe,l_e,Oct,Lct} from "../telemetry/4037_level.ts";
import {SNt,cY,rge} from "../../vendor/m3334.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Qe} from "../../vendor/m5.ts";
import {Box} from "../../vendor/m2422.ts";
import {H_,Zge} from "../../vendor/m3951.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {Tst,Fke} from "../../vendor/m3332.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function fGn(e){let t=[],n=/(^|[\s\u3002\u3001\uFF1F\uFF01])(\/[a-zA-Z][a-zA-Z0-9.:\-_]*)/g,r=null;while((r=n.exec(e))!==null){let o=r[1]??"",s=(r[2]??"").replace(/\.+$/,""),i=r.index+o.length;t.push({start:i,end:i+s.length})}return t}
function ptm(e){let t=AGn.c(9),{text:n,style:r}=e,o;if(t[0]!==n){o=[];let l=0;for(let{start:c,end:u}of fGn(n)){if(c>l)o.push(n.slice(l,c));let d=n.slice(c,u).replace(/[:\-_]+$/,"");o.push(NT.createElement(Text,{key:c,bold:!0,color:"permission"},d)),l=c+d.length}if(l<n.length){let c;if(t[2]!==l||t[3]!==n)c=n.slice(l),t[2]=l,t[3]=n,t[4]=c;else c=t[4];o.push(c)}t[0]=n,t[1]=o}else o=t[1];let s=r==="bold",i=r==="dim",a;if(t[5]!==o||t[6]!==s||t[7]!==i)a=NT.createElement(Text,{bold:s,dimColor:i},o),t[5]=o,t[6]=s,t[7]=i,t[8]=a;else a=t[8];return a}
function hGn(){if(!WY()?.command)return!1;if(yIe())return l_e()!==null;return Oct()}
function mtm(e){if($De!==null)return $De;if(!hGn())return null;let t=WY();if(!t)return null;let n={variant:yIe()?"credit":"upsell",campaign:t,cached:l_e()};if(e)$De=n;return n}
function ftm(){$De=null}
function qyl(){let e=AGn.c(4),t=SNt(),n;if(e[0]!==t)n=mtm(t),e[0]=t,e[1]=n;else n=e[1];let r=n;if(r===null)return null;let o;if(e[2]!==r.variant)o=NT.createElement(Atm,{variant:r.variant}),e[2]=r.variant,e[3]=o;else o=e[3];return o}
function Atm(e){let t=AGn.c(23),{variant:n}=e,[r]=$yl.useState(gtm),o=$De!==null?$De.campaign:r.campaign,s=$De!==null?$De.cached:r.cached,i=Boolean(o?.command)&&(n==="upsell"||s!==null),a;if(t[0]!==o||t[1]!==n)a=()=>{if(!o)return;logEvent("tengu_fotw_nudge_shown",{feature:o.feature,campaign:Qe("feature_of_the_week"),audience:Qe(n==="credit"?"claimant":"viewer")})},t[0]=o,t[1]=n,t[2]=a;else a=t[2];let l;if(t[3]!==i)l={enabled:i},t[3]=i,t[4]=l;else l=t[4];if(cY("fotw-nudge",a,l),!o?.command)return null;let c=o.hideCommandChip!==!0,u;if(t[5]!==o.announcementLines||t[6]!==o.command||t[7]!==o.commandBlurb||t[8]!==o.titleLabel||t[9]!==c)u=o.announcementLines?.length?NT.createElement(Box,{flexDirection:"column"},o.announcementLines.map(htm)):NT.createElement(Text,null,NT.createElement(Text,{bold:!0},o.titleLabel??"Feature of the week:"),c?NT.createElement(NT.Fragment,null," ",NT.createElement(Text,{bold:!0,color:"permission"},"/",o.command)):null,o.commandBlurb?`${c?" \u2014 ":" "}${o.commandBlurb}`:""),t[5]=o.announcementLines,t[6]=o.command,t[7]=o.commandBlurb,t[8]=o.titleLabel,t[9]=c,t[10]=u;else u=t[10];let d=u;if(n==="upsell"){let _;if(t[11]!==d)_=NT.createElement(Box,{flexDirection:"column"},d),t[11]=d,t[12]=_;else _=t[12];return _}if(s===null)return null;let p;if(t[13]!==s.amountMinorUnits||t[14]!==s.currency)p=H_(s.amountMinorUnits,s.currency,"fit"),t[13]=s.amountMinorUnits,t[14]=s.currency,t[15]=p;else p=t[15];let m=p,f=o.redeemBy?` \xB7 Redeem by ${o.redeemBy}`:"",A;if(t[16]!==m||t[17]!==f)A=NT.createElement(Text,null,"Get ",m," in usage credits when you run it",f),t[16]=m,t[17]=f,t[18]=A;else A=t[18];let h;if(t[19]===Symbol.for("react.memo_cache_sentinel"))h=NT.createElement(Text,{dimColor:!0},"Terms apply: ",dtm),t[19]=h;else h=t[19];let g;if(t[20]!==d||t[21]!==A)g=NT.createElement(Box,{flexDirection:"column"},d,A,h),t[20]=d,t[21]=A,t[22]=g;else g=t[22];return g}
function htm(e,t){return NT.createElement(ptm,{key:t,text:e.text,style:e.style})}
function gtm(){return{campaign:WY(),cached:l_e()}}
var AGn,NT,$yl,dtm="https://www.anthropic.com/legal/promotion-terms",$De=null;
var jyl=b(()=>{ze();Ct();Lct();Zge();Tst();rge();AGn=M(rt(),1),NT=M(Te(),1),$yl=M(Te(),1);Fke(ftm)});
export {fGn,ptm,hGn,mtm,ftm,qyl,Atm,htm,gtm,AGn,NT,$yl,dtm,$De,jyl};
