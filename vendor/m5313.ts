// @ts-nocheck
import {mt,configProtoStore} from "./m2458.ts";
import {useClock} from "./m2432.ts";
import {useResolvedTheme,SZ} from "./m2274.ts";
import {_t,cu} from "./m582.ts";
import {with1mTag,eL,nL,tL,GZ} from "./m2525.ts";
import {Oy,XS} from "../src/config/2341_XS.ts";
import {useAnimationTimer} from "./m2446.ts";
import {formatDuration,ps} from "./m238.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {rnn,sl} from "./m715.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function q4l({withSeparator:e}){let t=mt((f)=>f.activeGoal?.setAt),n=t!==void 0,[r,o]=XJ.useState(0),s=useClock(),i=XJ.useRef(null);if(t!==void 0&&i.current?.setAt!==t)i.current={setAt:t,clockStart:s.now()-(Date.now()-t)};let a=i.current;XJ.useEffect(()=>{if(t===void 0||i.current===null)return;let f=s.now()-i.current.clockStart,A=f<60000?1000:60000,h=A-f%A;return s.setTimeout(()=>o((g)=>g+1),h)},[t,r,s]);let l=useResolvedTheme(),c=XJ.useMemo(()=>{if(_t.level<3)return null;let f=with1mTag(l.permission);return f?tkm(f,Oy()):null},[l.permission,_t.level]),u=useAnimationTimer(n&&c?$4l:null),d=Math.floor(u/$4l)%YYn;if(!n||a===null)return null;let p=s.now()-a.clockStart,m=p<1000?"":` (${formatDuration(p,{mostSignificantOnly:!0})})`;return XJ.default.createElement(Box,{flexShrink:0},e?XJ.default.createElement(Text,{dimColor:!0}," \xB7 "):null,XJ.default.createElement(Text,{color:c?.[d]??"permission"},rnn," /goal active",m))}
function tkm(e,t){return Array.from({length:YYn},(n,r)=>{let o=0.5-0.5*Math.cos(2*Math.PI*r/YYn),s=Zxm*(t?eL(o):o);return nL(tL(e,ekm,s))})}
var XJ,YYn=20,Qxm=4000,$4l,Zxm=0.18,ekm;
var j4l=b(()=>{cu();sl();XS();ze();configProtoStore();ps();SZ();GZ();XJ=M(Te(),1),$4l=Qxm/YYn,ekm={r:0,g:0,b:0}});
export {q4l,tkm,XJ,YYn,Qxm,$4l,Zxm,ekm,j4l};
