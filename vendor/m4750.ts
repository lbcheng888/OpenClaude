// @ts-nocheck
import {X} from "../runtime.ts";
import {Rjt} from "./m4742.ts";
var zhl=X((PWn)=>{var aEo=Rjt();function nZp(e,t,n){if(e.clearRect(0,0,t.width,t.height),!t.style)t.style={};t.height=n,t.width=n,t.style.height=n+"px",t.style.width=n+"px"}function rZp(){try{return document.createElement("canvas")}catch(e){throw Error("You need to specify a canvas element")}}PWn.render=function(t,n,r){let o=r,s=n;if(typeof o>"u"&&(!n||!n.getContext))o=n,n=void 0;if(!n)s=rZp();o=aEo.getOptions(o);let i=aEo.getImageWidth(t.modules.size,o),a=s.getContext("2d"),l=a.createImageData(i,i);return aEo.qrToImageData(l.data,t,o),nZp(a,s,i),a.putImageData(l,0,0),s};PWn.renderToDataURL=function(t,n,r){let o=r;if(typeof o>"u"&&(!n||!n.getContext))o=n,n=void 0;if(!o)o={};let s=PWn.render(t,n,o),i=o.type||"image/png",a=o.rendererOpts||{};return s.toDataURL(i,a.quality)}});
export {zhl};
