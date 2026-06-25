// @ts-nocheck
import {sn,mc} from "./m237.ts";
import {ZM,Ove} from "./m2375.ts";
import {getFastModeModelDisplayName,lr} from "./m233.ts";
import {che,N8} from "../src/config/2299_level.ts";
import {bt,Gc} from "./m588.ts";
import {b,x} from "../runtime.ts";
import {d0i} from "./m2416.ts";
function p0i(e,t,n,r=0,o){let s=sn(t),i=e.length;if(s>=i-2){let u=ZM(t,0,i);if(sn(u)>i)u=ZM(t,0,i-1);let d=o.repeat(Math.max(0,i-sn(u)));return["",u,d]}let a;if(n==="center")a=Math.floor((i-s)/2);else if(n==="start")a=r+1;else a=i-s-r-1;a=Math.max(1,Math.min(a,i-s-1));let l=e.substring(0,1)+getFastModeModelDisplayName(o,a-1),c=getFastModeModelDisplayName(o,i-a-s-1)+e.substring(i-1);return[l,t,c]}
function Itt(e,t,n){let r=che(e,t);if(n)r=bt.dim(r);return r}
var m0i,K_d,z_d=(e,t,n,r)=>{if(n.style.borderStyle){let o=Math.floor(n.yogaNode.getComputedWidth()),s=Math.floor(n.yogaNode.getComputedHeight()),i=typeof n.style.borderStyle==="string"?K_d[n.style.borderStyle]??m0i.default[n.style.borderStyle]:n.style.borderStyle,a=n.style.borderTopColor??n.style.borderColor,l=n.style.borderBottomColor??n.style.borderColor,c=n.style.borderLeftColor??n.style.borderColor,u=n.style.borderRightColor??n.style.borderColor,d=n.style.borderTopDimColor??n.style.borderDimColor,p=n.style.borderBottomDimColor??n.style.borderDimColor,m=n.style.borderLeftDimColor??n.style.borderDimColor,f=n.style.borderRightDimColor??n.style.borderDimColor,h=n.style.borderTop!==!1,g=n.style.borderBottom!==!1,_=n.style.borderLeft!==!1,T=n.style.borderRight!==!1,y=Math.max(0,o-(_?1:0)-(T?1:0)),S=h?(_?i.topLeft:"")+i.top.repeat(y)+(T?i.topRight:""):"",E=Array.isArray(n.style.borderText)?n.style.borderText:n.style.borderText?[n.style.borderText]:[],R=E.find((M)=>M.position==="top"),w=E.find((M)=>M.position==="bottom"),H;if(h&&R){let[M,B,N]=p0i(S,R.content,R.align,R.offset,i.top);H=Itt(M,a,d)+B+Itt(N,a,d)}else if(h)H=Itt(S,a,d);let k=s;if(h)k-=1;if(g)k-=1;k=Math.max(0,k);let I=(che(i.left,c)+`
`).repeat(k);if(m)I=bt.dim(I);let D=(che(i.right,u)+`
`).repeat(k);if(f)D=bt.dim(D);let O=g?(_?i.bottomLeft:"")+i.bottom.repeat(y)+(T?i.bottomRight:""):"",L;if(g&&w){let[M,B,N]=p0i(O,w.content,w.align,w.offset,i.bottom);L=Itt(M,l,p)+B+Itt(N,l,p)}else if(g)L=Itt(O,l,p);let P=h?1:0;if(H)r.write(e,t,H);if(_)r.write(e,t+P,I);if(T)r.write(e+o-1,t+P,D);if(L)r.write(e,t+s-1,L)}},f0i;
var h0i=b(()=>{Gc();Ove();lr();N8();mc();m0i=x(d0i(),1),K_d={dashed:{top:"\u254C",left:"\u254E",right:"\u254E",bottom:"\u254C",topLeft:" ",topRight:" ",bottomLeft:" ",bottomRight:" "},quote:{top:" ",left:"\u258E",right:" ",bottom:" ",topLeft:" ",topRight:" ",bottomLeft:" ",bottomRight:" "}};f0i=z_d});
export {p0i,Itt,m0i,K_d,z_d,f0i,h0i};
