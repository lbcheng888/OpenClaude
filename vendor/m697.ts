// @ts-nocheck
import {zes,p8,bAr,Yes} from "./m696.ts";
import {Xbt,qtn} from "./m695.ts";
import {b} from "../runtime.ts";
function EAr(e,t,n){let r,o,s,i,a;if(t){i=t.offset,a=i+t.length,s=i;while(s>0&&!Qbt(e,s-1))s--;let S=a;while(S<e.length&&!Qbt(e,S))S++;o=e.substring(s,S),r=ZJc(o,n)}else o=e,r=0,s=0,i=0,a=e.length;let l=eXc(n,e),c=zes.includes(l),u=0,d=0,p;if(n.insertSpaces)p=p8[n.tabSize||4]??W7e(p8[1],n.tabSize||4);else p="\t";let m=p==="\t"?"\t":" ",f=Xbt(o,!1),A=!1;function h(){if(u>1)return W7e(l,u)+W7e(p,r+d);let S=p.length*(r+d);if(!c||S>bAr[m][l].length)return l+W7e(p,r+d);if(S<=0)return l;return bAr[m][l][S]}function g(){let S=f.scan();u=0;while(S===15||S===14){if(S===14&&n.keepLines)u+=1;else if(S===14)u=1;S=f.scan()}return A=S===16||f.getTokenError()!==0,S}let _=[];function y(S,v,R){if(!A&&(!t||v<a&&R>i)&&e.substring(v,R)!==S)_.push({offset:v,length:R-v,content:S})}let T=g();if(n.keepLines&&u>0)y(W7e(l,u),0,0);if(T!==17){let S=f.getTokenOffset()+s,v=p.length*r<20&&n.insertSpaces?p8[p.length*r]:W7e(p,r);y(v,s,S)}while(T!==17){let S=f.getTokenOffset()+f.getTokenLength()+s,v=g(),R="",k=!1;while(u===0&&(v===12||v===13)){let H=f.getTokenOffset()+s;y(p8[1],S,H),S=f.getTokenOffset()+f.getTokenLength()+s,k=v===12,R=k?h():"",v=g()}if(v===2){if(T!==1)d--;if(n.keepLines&&u>0||!n.keepLines&&T!==1)R=h();else if(n.keepLines)R=p8[1]}else if(v===4){if(T!==3)d--;if(n.keepLines&&u>0||!n.keepLines&&T!==3)R=h();else if(n.keepLines)R=p8[1]}else{switch(T){case 3:case 1:if(d++,n.keepLines&&u>0||!n.keepLines)R=h();else R=p8[1];break;case 5:if(n.keepLines&&u>0||!n.keepLines)R=h();else R=p8[1];break;case 12:R=h();break;case 13:if(u>0)R=h();else if(!k)R=p8[1];break;case 6:if(n.keepLines&&u>0)R=h();else if(!k)R=p8[1];break;case 10:if(n.keepLines&&u>0)R=h();else if(v===6&&!k)R="";break;case 7:case 8:case 9:case 11:case 2:case 4:if(n.keepLines&&u>0)R=h();else if((v===12||v===13)&&!k)R=p8[1];else if(v!==5&&v!==17)A=!0;break;case 16:A=!0;break}if(u>0&&(v===12||v===13))R=h()}if(v===17)if(n.keepLines&&u>0)R=h();else R=n.insertFinalNewline?l:"";let x=f.getTokenOffset()+s;y(R,S,x),T=v}return _}
function W7e(e,t){let n="";for(let r=0;r<t;r++)n+=e;return n}
function ZJc(e,t){let n=0,r=0,o=t.tabSize||4;while(n<e.length){let s=e.charAt(n);if(s===p8[1])r++;else if(s==="\t")r+=o;else break;n++}return Math.floor(r/o)}
function eXc(e,t){for(let n=0;n<t.length;n++){let r=t.charAt(n);if(r==="\r"){if(n+1<t.length&&t.charAt(n+1)===`
`)return`\r
`;return"\r"}else if(r===`
`)return`
`}return e&&e.eol||`
`}
function Qbt(e,t){return`\r
`.indexOf(e.charAt(t))!==-1}
var CAr=b(()=>{qtn();Yes()});
export {EAr,W7e,ZJc,eXc,Qbt,CAr};
