// @ts-nocheck
import {tn,Hc} from "./m235.ts";
import {U1,Yve} from "./m2365.ts";
import {uf,dr} from "./m231.ts";
import {Zfe,E5} from "../src/config/2288_level.ts";
import {_t,cu} from "./m582.ts";
import {b,M} from "../runtime.ts";
import {QCi} from "./m2406.ts";
function ZCi(e,t,n,r=0,o){let s=tn(t),i=e.length;if(s>=i-2){let u=U1(t,0,i);if(tn(u)>i)u=U1(t,0,i-1);let d=o.repeat(Math.max(0,i-tn(u)));return["",u,d]}let a;if(n==="center")a=Math.floor((i-s)/2);else if(n==="start")a=r+1;else a=i-s-r-1;a=Math.max(1,Math.min(a,i-s-1));let l=e.substring(0,1)+uf(o,a-1),c=uf(o,i-a-s-1)+e.substring(i-1);return[l,t,c]}
function kZe(e,t,n){let r=Zfe(e,t);if(n)r=_t.dim(r);return r}
var evi,Sad,bad=(e,t,n,r)=>{if(n.style.borderStyle){let o=Math.floor(n.yogaNode.getComputedWidth()),s=Math.floor(n.yogaNode.getComputedHeight()),i=typeof n.style.borderStyle==="string"?Sad[n.style.borderStyle]??evi.default[n.style.borderStyle]:n.style.borderStyle,a=n.style.borderTopColor??n.style.borderColor,l=n.style.borderBottomColor??n.style.borderColor,c=n.style.borderLeftColor??n.style.borderColor,u=n.style.borderRightColor??n.style.borderColor,d=n.style.borderTopDimColor??n.style.borderDimColor,p=n.style.borderBottomDimColor??n.style.borderDimColor,m=n.style.borderLeftDimColor??n.style.borderDimColor,f=n.style.borderRightDimColor??n.style.borderDimColor,A=n.style.borderTop!==!1,h=n.style.borderBottom!==!1,g=n.style.borderLeft!==!1,_=n.style.borderRight!==!1,y=Math.max(0,o-(g?1:0)-(_?1:0)),T=A?(g?i.topLeft:"")+i.top.repeat(y)+(_?i.topRight:""):"",S=Array.isArray(n.style.borderText)?n.style.borderText:n.style.borderText?[n.style.borderText]:[],v=S.find((N)=>N.position==="top"),R=S.find((N)=>N.position==="bottom"),k;if(A&&v){let[N,O,$]=ZCi(T,v.content,v.align,v.offset,i.top);k=kZe(N,a,d)+O+kZe($,a,d)}else if(A)k=kZe(T,a,d);let x=s;if(A)x-=1;if(h)x-=1;x=Math.max(0,x);let H=(Zfe(i.left,c)+`
`).repeat(x);if(m)H=_t.dim(H);let I=(Zfe(i.right,u)+`
`).repeat(x);if(f)I=_t.dim(I);let P=h?(g?i.bottomLeft:"")+i.bottom.repeat(y)+(_?i.bottomRight:""):"",L;if(h&&R){let[N,O,$]=ZCi(P,R.content,R.align,R.offset,i.bottom);L=kZe(N,l,p)+O+kZe($,l,p)}else if(h)L=kZe(P,l,p);let D=A?1:0;if(k)r.write(e,t,k);if(g)r.write(e,t+D,H);if(_)r.write(e+o-1,t+D,I);if(L)r.write(e,t+s-1,L)}},tvi;
var nvi=b(()=>{cu();Yve();dr();E5();Hc();evi=M(QCi(),1),Sad={dashed:{top:"\u254C",left:"\u254E",right:"\u254E",bottom:"\u254C",topLeft:" ",topRight:" ",bottomLeft:" ",bottomRight:" "},quote:{top:" ",left:"\u258E",right:" ",bottom:" ",topLeft:" ",topRight:" ",bottomLeft:" ",bottomRight:" "}};tvi=bad});
export {ZCi,kZe,evi,Sad,bad,tvi,nvi};
