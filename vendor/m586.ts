// @ts-nocheck
import {vre,DWe} from "./m108.ts";
import {xYo,kYo} from "./m585.ts";
import {b} from "../runtime.ts";
function TVc(e){return e=vre(e),e&&e.replace(mVc,xYo).replace(yVc,"")}
var mVc,fVc="\\u0300-\\u036f",AVc="\\ufe20-\\ufe2f",hVc="\\u20d0-\\u20ff",gVc,_Vc,yVc,HYo;
var IYo=b(()=>{kYo();DWe();mVc=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,gVc=fVc+AVc+hVc,_Vc="["+gVc+"]",yVc=RegExp(_Vc,"g");HYo=TVc});
export {TVc,mVc,fVc,AVc,hVc,gVc,_Vc,yVc,HYo,IYo};
