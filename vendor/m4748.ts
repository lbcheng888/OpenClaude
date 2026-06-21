// @ts-nocheck
import {X} from "../runtime.ts";
import {Rjt} from "./m4742.ts";
var iEo=X((Vhl)=>{var ZQp=Rjt();function Ghl(e,t){let n=e.a/255,r=t+'="'+e.hex+'"';return n<1?r+" "+t+'-opacity="'+n.toFixed(2).slice(1)+'"':r}function sEo(e,t,n){let r=e+t;if(typeof n<"u")r+=" "+n;return r}function eZp(e,t,n){let r="",o=0,s=!1,i=0;for(let a=0;a<e.length;a++){let l=Math.floor(a%t),c=Math.floor(a/t);if(!l&&!s)s=!0;if(e[a]){if(i++,!(a>0&&l>0&&e[a-1]))r+=s?sEo("M",l+n,0.5+c+n):sEo("m",o,0),o=0,s=!1;if(!(l+1<t&&e[a+1]))r+=sEo("h",i),i=0}else o++}return r}Vhl.render=function(t,n,r){let o=ZQp.getOptions(n),s=t.modules.size,i=t.modules.data,a=s+o.margin*2,l=!o.color.light.a?"":"<path "+Ghl(o.color.light,"fill")+' d="M0 0h'+a+"v"+a+'H0z"/>',c="<path "+Ghl(o.color.dark,"stroke")+' d="'+eZp(i,s,o.margin)+'"/>',u='viewBox="0 0 '+a+" "+a+'"',p='<svg xmlns="http://www.w3.org/2000/svg" '+(!o.width?"":'width="'+o.width+'" height="'+o.width+'" ')+u+' shape-rendering="crispEdges">'+l+c+`</svg>
`;if(typeof r==="function")r(null,p);return p}});
export {iEo};
