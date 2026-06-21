// @ts-nocheck
import {initCg,j1} from "../src/telemetry/2531_ignore1mTag.ts";
import {getMainLoopModel,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {useClock} from "./m2432.ts";
import {zt,qs} from "./m635.ts";
import {Ewe,H9r,qki,kUe,HUe} from "./m2512.ts";
import {Oe,isTmuxControlMode,ln} from "../src/telemetry/0594_feature_name.ts";
import {De,Rn} from "../src/session/0615_length.ts";
import {j4} from "./m2443.ts";
import {RZe,z2r} from "./m2392.ts";
import {logForDebugging,qe} from "../src/config/0234_setHasFormattedOutput.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function FHi(){return initCg(getMainLoopModel())}
function U0t({onPaste:e,handleKeyDown:t,onImagePaste:n}){let r=useClock(),[o,s]=z4.useState(!1),i=z4.useRef(!0),a=z4.useRef(!1),l=z4.useRef(!1),c=z4.useRef(t);c.current=t;let u=z4.useMemo(()=>zt()==="macos",[]),d=z4.useMemo(()=>zt()==="wsl",[]);z4.useEffect(()=>()=>{i.current=!1},[]);let p=z4.useCallback(()=>{if(!n||!i.current)return;Ewe(FHi()).then((y)=>{if(y&&i.current)n(y.base64,y.mediaType,void 0,y.dimensions)}).catch((y)=>{if(i.current)Oe("input_image_paste","clipboard_read_failed"),De(y)}).finally(()=>{if(i.current)a.current=!1,l.current=!1,s(!1)})},[n]),m=j4(p,Efd);function f(y){if(e){e(y);return}t(new RZe({kind:"key",name:void 0,sequence:y,raw:y,ctrl:!1,meta:!1,shift:!1,option:!1,super:!1,fn:!1,isPasted:!0}))}function A(){s(!1),r.setTimeout(()=>{if(!i.current)return;if(a.current=!1,l.current)l.current=!1,c.current(new RZe({kind:"key",name:"return",sequence:"\r",raw:"\r",ctrl:!1,meta:!1,shift:!1,option:!1,super:!1,fn:!1,isPasted:!1}))},0)}function h(y){a.current=!0;let T=y.replace(/\[I$/,"").replace(/\[O$/,"");if(T.length===0&&(u||d)&&n){m();return}let S=T.split(/ (?=\/|[A-Za-z]:\\)/).flatMap((R)=>R.split(`
`)).filter((R)=>R.trim()),v=S.filter((R)=>H9r(R));if(n&&v.length>0){let R=/\/TemporaryItems\/.*screencaptureui.*\/Screenshot/i.test(T),k=FHi();Promise.all(v.map((x)=>qki(x,k))).then((x)=>{if(!i.current)return;let H=x.filter((I)=>I!==null);if(H.length>0){for(let[P,L]of H.entries()){let D=UHi.basename(L.path);n(L.base64,L.mediaType,D,L.dimensions,L.path,P>0)}let I=S.filter((P)=>!H9r(P));if(I.length>0)f(I.join(`
`));a.current=!1,l.current=!1,s(!1)}else if(R&&u)m();else isTmuxControlMode("input_image_drag","read_failed"),f(T),a.current=!1,l.current=!1,s(!1)}).catch((x)=>{if(!i.current)return;Oe("input_image_drag","read_threw"),logForDebugging(`Image paste read failed: ${x instanceof Error?x.message:String(x)}`,{level:"error"}),f(T),a.current=!1,l.current=!1,s(!1)});return}f(T),A()}function g(y){y.preventDefault(),s(!0),h(y.text)}function _(y){if(a.current&&y.key==="return"){y.preventDefault(),l.current=!0;return}if((e||n)&&!y.ctrl&&!y.meta&&y.key.length>kUe&&!y.defaultPrevented){y.preventDefault(),s(!0),h(y.key);return}t(y)}return{handleKeyDown:_,handlePaste:g,isPasting:o}}
var UHi,z4,Efd=50;
var s3r=b(()=>{ln();Rn();z2r();ze();qe();HUe();j1();Mo();qs();UHi=require("path"),z4=M(Te(),1)});
export {FHi,U0t,UHi,z4,Efd,s3r};
