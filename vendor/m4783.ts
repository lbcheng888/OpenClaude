// @ts-nocheck
import {Q} from "../runtime.ts";
import {qwo} from "./m4728.ts";
import {ako} from "./m4751.ts";
import {GAl} from "./m4782.ts";
import {Rko} from "./m4780.ts";
var KAl=Q((KWt)=>{var _lm=qwo(),wko=ako(),VAl=GAl(),ylm=Rko();function kko(e,t,n,r,o){let s=[].slice.call(arguments,1),i=s.length,a=typeof s[i-1]==="function";if(!a&&!_lm())throw Error("Callback required as last argument");if(a){if(i<2)throw Error("Too few arguments provided");if(i===2)o=n,n=t,t=r=void 0;else if(i===3)if(t.getContext&&typeof o>"u")o=r,r=void 0;else o=r,r=n,n=t,t=void 0}else{if(i<1)throw Error("Too few arguments provided");if(i===1)n=t,t=r=void 0;else if(i===2&&!t.getContext)r=n,n=t,t=void 0;return new Promise(function(l,c){try{let u=wko.create(n,r);l(e(u,t,r))}catch(u){c(u)}})}try{let l=wko.create(n,r);o(null,e(l,t,r))}catch(l){o(l)}}KWt.create=wko.create;KWt.toCanvas=kko.bind(null,VAl.render);KWt.toDataURL=kko.bind(null,VAl.renderToDataURL);KWt.toString=kko.bind(null,function(e,t,n){return ylm.render(e,n)})});
export {KAl};
