// @ts-nocheck
import {Q} from "../runtime.ts";
import {VWt} from "./m4774.ts";
var GAl=Q((Tzn)=>{var vko=VWt();function hlm(e,t,n){if(e.clearRect(0,0,t.width,t.height),!t.style)t.style={};t.height=n,t.width=n,t.style.height=n+"px",t.style.width=n+"px"}function glm(){try{return document.createElement("canvas")}catch(e){throw Error("You need to specify a canvas element")}}Tzn.render=function(t,n,r){let o=r,s=n;if(typeof o>"u"&&(!n||!n.getContext))o=n,n=void 0;if(!n)s=glm();o=vko.getOptions(o);let i=vko.getImageWidth(t.modules.size,o),a=s.getContext("2d"),l=a.createImageData(i,i);return vko.qrToImageData(l.data,t,o),hlm(a,s,i),a.putImageData(l,0,0),s};Tzn.renderToDataURL=function(t,n,r){let o=r;if(typeof o>"u"&&(!n||!n.getContext))o=n,n=void 0;if(!o)o={};let s=Tzn.render(t,n,o),i=o.type||"image/png",a=o.rendererOpts||{};return s.toDataURL(i,a.quality)}});
export {GAl};
