// @ts-nocheck
import {gg,t1} from "../src/telemetry/2542_ignore1mTag.ts";
import {getMainLoopModel,Ro} from "../src/permissions/1458_swapShrinksContextWindow.ts";
import {useClock} from "./m2442.ts";
import {Yt,Es} from "./m641.ts";
import {lwe,l5r,lLi,w2e,k2e} from "./m2523.ts";
import {xe,Pt,mn} from "../src/telemetry/0600_feature_name.ts";
import {Ie,vn} from "../src/session/0621_length.ts";
import {useDebouncedCallback} from "./m2453.ts";
import {ktt,vqr} from "./m2402.ts";
import {logForDebugging,qe} from "../src/config/0236_setHasFormattedOutput.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function iMi(){return gg(getMainLoopModel())}
function _Ot({onPaste:e,handleKeyDown:t,onImagePaste:n}){let r=useClock(),[o,s]=h4.useState(!1),i=h4.useRef(!0),a=h4.useRef(!1),l=h4.useRef(!1),c=h4.useRef(t);c.current=t;let u=h4.useMemo(()=>Yt()==="macos",[]),d=h4.useMemo(()=>Yt()==="wsl",[]);h4.useEffect(()=>()=>{i.current=!1},[]);let p=h4.useCallback(()=>{if(!n||!i.current)return;lwe(iMi()).then((y)=>{if(y&&i.current)n(y.base64,y.mediaType,void 0,y.dimensions)}).catch((y)=>{if(i.current)xe("input_image_paste","clipboard_read_failed"),Ie(y)}).finally(()=>{if(i.current)a.current=!1,l.current=!1,s(!1)})},[n]),m=useDebouncedCallback(p,YAd);function f(y){if(e){e(y);return}t(new ktt({kind:"key",name:void 0,sequence:y,raw:y,ctrl:!1,meta:!1,shift:!1,option:!1,super:!1,fn:!1,isPasted:!0}))}function h(){s(!1),r.setTimeout(()=>{if(!i.current)return;if(a.current=!1,l.current)l.current=!1,c.current(new ktt({kind:"key",name:"return",sequence:"\r",raw:"\r",ctrl:!1,meta:!1,shift:!1,option:!1,super:!1,fn:!1,isPasted:!1}))},0)}function g(y){a.current=!0;let S=y.replace(/\[I$/,"").replace(/\[O$/,"");if(S.length===0&&(u||d)&&n){m();return}let E=S.split(/ (?=\/|[A-Za-z]:\\)/).flatMap((w)=>w.split(`
`)).filter((w)=>w.trim()),R=E.filter((w)=>l5r(w));if(n&&R.length>0){let w=/\/TemporaryItems\/.*screencaptureui.*\/Screenshot/i.test(S),H=iMi();Promise.all(R.map((k)=>lLi(k,H))).then((k)=>{if(!i.current)return;let I=k.filter((D)=>D!==null);if(I.length>0){for(let[O,L]of I.entries()){let P=aMi.basename(L.path);n(L.base64,L.mediaType,P,L.dimensions,L.path,O>0)}let D=E.filter((O)=>!l5r(O));if(D.length>0)f(D.join(`
`));a.current=!1,l.current=!1,s(!1)}else if(w&&u)m();else Pt("input_image_drag","read_failed"),f(S),a.current=!1,l.current=!1,s(!1)}).catch((k)=>{if(!i.current)return;xe("input_image_drag","read_threw"),logForDebugging(`Image paste read failed: ${k instanceof Error?k.message:String(k)}`,{level:"error"}),f(S),a.current=!1,l.current=!1,s(!1)});return}f(S),h()}function _(y){y.preventDefault(),s(!0),g(y.text)}function T(y){if(a.current&&y.key==="return"){y.preventDefault(),l.current=!0;return}if((e||n)&&!y.ctrl&&!y.meta&&y.key.length>w2e&&!y.defaultPrevented){y.preventDefault(),s(!0),g(y.key);return}t(y)}return{handleKeyDown:T,handlePaste:_,isPasting:o}}
var aMi,h4,YAd=50;
var M5r=b(()=>{mn();vn();vqr();je();qe();k2e();t1();Ro();Es();aMi=require("path"),h4=x(et(),1)});
export {iMi,_Ot,aMi,h4,YAd,M5r};
