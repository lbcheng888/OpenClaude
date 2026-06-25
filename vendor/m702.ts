// @ts-nocheck
import {Gis,k5,XTr,Vis} from "./m701.ts";
import {ARt,Eon} from "./m700.ts";
import {b} from "../runtime.ts";
function QTr(e,t,n){let r,o,s,i,a;if(t){i=t.offset,a=i+t.length,s=i;while(s>0&&!RRt(e,s-1))s--;let E=a;while(E<e.length&&!RRt(e,E))E++;o=e.substring(s,E),r=hau(o,n)}else o=e,r=0,s=0,i=0,a=e.length;let l=gau(n,e),c=Gis.includes(l),u=0,d=0,p;if(n.insertSpaces)p=k5[n.tabSize||4]??qje(k5[1],n.tabSize||4);else p="\t";let m=p==="\t"?"\t":" ",f=ARt(o,!1),h=!1;function g(){if(u>1)return qje(l,u)+qje(p,r+d);let E=p.length*(r+d);if(!c||E>XTr[m][l].length)return l+qje(p,r+d);if(E<=0)return l;return XTr[m][l][E]}function _(){let E=f.scan();u=0;while(E===15||E===14){if(E===14&&n.keepLines)u+=1;else if(E===14)u=1;E=f.scan()}return h=E===16||f.getTokenError()!==0,E}let T=[];function y(E,R,w){if(!h&&(!t||R<a&&w>i)&&e.substring(R,w)!==E)T.push({offset:R,length:w-R,content:E})}let S=_();if(n.keepLines&&u>0)y(qje(l,u),0,0);if(S!==17){let E=f.getTokenOffset()+s,R=p.length*r<20&&n.insertSpaces?k5[p.length*r]:qje(p,r);y(R,s,E)}while(S!==17){let E=f.getTokenOffset()+f.getTokenLength()+s,R=_(),w="",H=!1;while(u===0&&(R===12||R===13)){let I=f.getTokenOffset()+s;y(k5[1],E,I),E=f.getTokenOffset()+f.getTokenLength()+s,H=R===12,w=H?g():"",R=_()}if(R===2){if(S!==1)d--;if(n.keepLines&&u>0||!n.keepLines&&S!==1)w=g();else if(n.keepLines)w=k5[1]}else if(R===4){if(S!==3)d--;if(n.keepLines&&u>0||!n.keepLines&&S!==3)w=g();else if(n.keepLines)w=k5[1]}else{switch(S){case 3:case 1:if(d++,n.keepLines&&u>0||!n.keepLines)w=g();else w=k5[1];break;case 5:if(n.keepLines&&u>0||!n.keepLines)w=g();else w=k5[1];break;case 12:w=g();break;case 13:if(u>0)w=g();else if(!H)w=k5[1];break;case 6:if(n.keepLines&&u>0)w=g();else if(!H)w=k5[1];break;case 10:if(n.keepLines&&u>0)w=g();else if(R===6&&!H)w="";break;case 7:case 8:case 9:case 11:case 2:case 4:if(n.keepLines&&u>0)w=g();else if((R===12||R===13)&&!H)w=k5[1];else if(R!==5&&R!==17)h=!0;break;case 16:h=!0;break}if(u>0&&(R===12||R===13))w=g()}if(R===17)if(n.keepLines&&u>0)w=g();else w=n.insertFinalNewline?l:"";let k=f.getTokenOffset()+s;y(w,E,k),S=R}return T}
function qje(e,t){let n="";for(let r=0;r<t;r++)n+=e;return n}
function hau(e,t){let n=0,r=0,o=t.tabSize||4;while(n<e.length){let s=e.charAt(n);if(s===k5[1])r++;else if(s==="\t")r+=o;else break;n++}return Math.floor(r/o)}
function gau(e,t){for(let n=0;n<t.length;n++){let r=t.charAt(n);if(r==="\r"){if(n+1<t.length&&t.charAt(n+1)===`
`)return`\r
`;return"\r"}else if(r===`
`)return`
`}return e&&e.eol||`
`}
function RRt(e,t){return`\r
`.indexOf(e.charAt(t))!==-1}
var ZTr=b(()=>{Eon();Vis()});
export {QTr,qje,hau,gau,RRt,ZTr};
