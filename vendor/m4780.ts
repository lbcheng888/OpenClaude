// @ts-nocheck
import {Q} from "../runtime.ts";
import {VWt} from "./m4774.ts";
var Rko=Q((qAl)=>{var plm=VWt();function $Al(e,t){let n=e.a/255,r=t+'="'+e.hex+'"';return n<1?r+" "+t+'-opacity="'+n.toFixed(2).slice(1)+'"':r}function Ako(e,t,n){let r=e+t;if(typeof n<"u")r+=" "+n;return r}function mlm(e,t,n){let r="",o=0,s=!1,i=0;for(let a=0;a<e.length;a++){let l=Math.floor(a%t),c=Math.floor(a/t);if(!l&&!s)s=!0;if(e[a]){if(i++,!(a>0&&l>0&&e[a-1]))r+=s?Ako("M",l+n,0.5+c+n):Ako("m",o,0),o=0,s=!1;if(!(l+1<t&&e[a+1]))r+=Ako("h",i),i=0}else o++}return r}qAl.render=function(t,n,r){let o=plm.getOptions(n),s=t.modules.size,i=t.modules.data,a=s+o.margin*2,l=!o.color.light.a?"":"<path "+$Al(o.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>',c="<path "+$Al(o.color.dark,"stroke")+' d="'+mlm(i,s,o.margin)+'"/>',u='viewBox="0 0 '+a+" "+a+'"',p='<svg xmlns="http://www.w3.org/2000/svg" '+(!o.width?"":'width="'+o.width+'" height="'+o.width+'" ')+u+' shape-rendering="crispEdges">'+l+c+`</svg>
`;if(typeof r==="function")r(null,p);return p}});
export {Rko};
