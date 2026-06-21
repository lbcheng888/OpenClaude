// @ts-nocheck
import {X} from "../runtime.ts";
import {Rjt} from "./m4742.ts";
var Mhl=X((IWn)=>{var WQp=Rjt(),GQp={WW:" ",WB:"\u2584",BB:"\u2588",BW:"\u2580"},VQp={BB:" ",BW:"\u2584",WW:"\u2588",WB:"\u2580"};function KQp(e,t,n){if(e&&t)return n.BB;if(e&&!t)return n.BW;if(!e&&t)return n.WB;return n.WW}IWn.render=function(e,t,n){let r=WQp.getOptions(t),o=GQp;if(r.color.dark.hex==="#ffffff"||r.color.light.hex==="#000000")o=VQp;let s=e.modules.size,i=e.modules.data,a="",l=Array(s+r.margin*2+1).join(o.WW);l=Array(r.margin/2+1).join(l+`
`);let c=Array(r.margin+1).join(o.WW);a+=l;for(let u=0;u<s;u+=2){a+=c;for(let d=0;d<s;d++){let p=i[u*s+d],m=i[(u+1)*s+d];a+=KQp(p,m,o)}a+=c+`
`}if(a+=l.slice(0,-1),typeof n==="function")n(null,a);return a};IWn.renderToFile=function(t,n,r,o){if(typeof o>"u")o=r,r=void 0;let s=require("fs"),i=IWn.render(n,r);s.writeFile(t,i,o)}});
export {Mhl};
