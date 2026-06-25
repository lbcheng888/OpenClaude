// @ts-nocheck
import {_t,uo} from "./m2468.ts";
import {useClock} from "./m2442.ts";
import {useResolvedTheme,gZ} from "./m2285.ts";
import {bt,Gc} from "./m588.ts";
import {KF,_O,TO,yO,$Z} from "./m2536.ts";
import {xy,nS} from "../src/config/2351_nS.ts";
import {useAnimationTimer} from "./m2456.ts";
import {formatDuration,Xo} from "./m240.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {Fon,Pa} from "./m720.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function J7l({withSeparator:e}){let t=_t((f)=>f.activeGoal?.setAt),n=t!==void 0,[r,o]=$Oe.useState(0),s=useClock(),i=$Oe.useRef(null);if(t!==void 0&&i.current?.setAt!==t)i.current={setAt:t,clockStart:s.now()-(Date.now()-t)};let a=i.current;$Oe.useEffect(()=>{if(t===void 0||i.current===null)return;let f=s.now()-i.current.clockStart,h=f<60000?1000:60000,g=h-f%h;return s.setTimeout(()=>o((_)=>_+1),g)},[t,r,s]);let l=useResolvedTheme(),c=$Oe.useMemo(()=>{if(bt.level<3)return null;let f=KF(l.permission);return f?I1m(f,xy()):null},[l.permission,bt.level]),u=useAnimationTimer(n&&c?Y7l:null),d=Math.floor(u/Y7l)%ser;if(!n||a===null)return null;let p=s.now()-a.clockStart,m=p<1000?"":` (${formatDuration(p,{mostSignificantOnly:!0})})`;return x7t.jsxs(Box,{flexShrink:0,children:[e?x7t.jsx(Text,{dimColor:!0,children:" \xB7 "}):null,x7t.jsxs(Text,{color:c?.[d]??"permission",children:[Fon," /goal active",m]})]})}
function I1m(e,t){return Array.from({length:ser},(n,r)=>{let o=0.5-0.5*Math.cos(2*Math.PI*r/ser),s=k1m*(t?_O(o):o);return TO(yO(e,H1m,s))})}
var $Oe,x7t,ser=20,w1m=4000,Y7l,k1m=0.18,H1m;
var X7l=b(()=>{Gc();Pa();nS();je();uo();Xo();gZ();$Z();$Oe=x(et(),1),x7t=x(oe(),1),Y7l=w1m/ser,H1m={r:0,g:0,b:0}});
export {J7l,I1m,$Oe,x7t,ser,w1m,Y7l,k1m,H1m,X7l};
