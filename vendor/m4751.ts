// @ts-nocheck
import {X} from "../runtime.ts";
import {Ebo} from "./m4696.ts";
import {qbo} from "./m4719.ts";
import {zhl} from "./m4750.ts";
import {iEo} from "./m4748.ts";
var Jhl=X((xjt)=>{var oZp=Ebo(),lEo=qbo(),Yhl=zhl(),sZp=iEo();function cEo(e,t,n,r,o){let s=[].slice.call(arguments,1),i=s.length,a=typeof s[i-1]==="function";if(!a&&!oZp())throw Error("Callback required as last argument");if(a){if(i<2)throw Error("Too few arguments provided");if(i===2)o=n,n=t,t=r=void 0;else if(i===3)if(t.getContext&&typeof o>"u")o=r,r=void 0;else o=r,r=n,n=t,t=void 0}else{if(i<1)throw Error("Too few arguments provided");if(i===1)n=t,t=r=void 0;else if(i===2&&!t.getContext)r=n,n=t,t=void 0;return new Promise(function(l,c){try{let u=lEo.create(n,r);l(e(u,t,r))}catch(u){c(u)}})}try{let l=lEo.create(n,r);o(null,e(l,t,r))}catch(l){o(l)}}xjt.create=lEo.create;xjt.toCanvas=cEo.bind(null,Yhl.render);xjt.toDataURL=cEo.bind(null,Yhl.renderToDataURL);xjt.toString=cEo.bind(null,function(e,t,n){return sZp.render(e,n)})});
export {Jhl};
