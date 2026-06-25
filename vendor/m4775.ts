// @ts-nocheck
import {Q} from "../runtime.ts";
import {HAl} from "./m4773.ts";
import {VWt} from "./m4774.ts";
var xAl=Q((Eue)=>{var tlm=require("fs"),nlm=HAl().PNG,Cko=VWt();Eue.render=function(t,n){let r=Cko.getOptions(n),o=r.rendererOpts,s=Cko.getImageWidth(t.modules.size,r);o.width=s,o.height=s;let i=new nlm(o);return Cko.qrToImageData(i.data,t,r),i};Eue.renderToDataURL=function(t,n,r){if(typeof r>"u")r=n,n=void 0;Eue.renderToBuffer(t,n,function(o,s){if(o)r(o);let i="data:image/png;base64,";i+=s.toString("base64"),r(null,i)})};Eue.renderToBuffer=function(t,n,r){if(typeof r>"u")r=n,n=void 0;let o=Eue.render(t,n),s=[];o.on("error",r),o.on("data",function(i){s.push(i)}),o.on("end",function(){r(null,Buffer.concat(s))}),o.pack()};Eue.renderToFile=function(t,n,r,o){if(typeof o>"u")o=r,r=void 0;let s=!1,i=(...l)=>{if(s)return;s=!0,o.apply(null,l)},a=tlm.createWriteStream(t);a.on("error",i),a.on("close",i),Eue.renderToFileStream(a,n,r)};Eue.renderToFileStream=function(t,n,r){Eue.render(n,r).pack().pipe(t)}});
export {xAl};
