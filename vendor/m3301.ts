// @ts-nocheck
import {Az,p4} from "./m2471.ts";
import {g4,wnt} from "../src/config/2576_wnt.ts";
import {wu,$k} from "../src/tui/2575_current.ts";
import {QS,Q2} from "./m2552.ts";
import {Ne} from "./m583.ts";
import {b,x} from "../runtime.ts";
import {Ir} from "./m584.ts";
import {et} from "./m2261.ts";
function ZXd(e){for(let t of e){if(t.context!=="Task")continue;let n=Az(t.chord);if(t.action==="task:background"){if(!efa.has(n))return!0}else if(t.action===null&&efa.has(n))return!0}return!1}
function oOn({handler:e,isActive:t}){let n=g4(),r=wu("task:background","Task",mBt),o=QS(),s=o?.bindings,i=Vit.useMemo(()=>s?ZXd(s):!1,[s]),a=Vit.useRef(e);a.current=e;let l=!(n&&!i);Vit.useEffect(()=>{if(!o||!t)return;return o.registerHandler({action:"task:background",context:"Task",handler:()=>a.current(),singleKey:l})},[o,t,l]);let c=i?r:tfa,u=r===""?"":Ne.terminal==="tmux"?c.split(" ").map((d)=>d===mBt?`${mBt} ${mBt}`:d).join(" "):c;return{cohesionFixes:n,gateOnShortcut:u,resolvedShortcut:r}}
var Vit,mBt="ctrl+b",tfa="ctrl+x ctrl+b",efa;
var Ieo=b(()=>{Q2();$k();Ir();wnt();Vit=x(et(),1),efa=new Set([mBt,tfa].map((e)=>Az(p4(e))))});
export {ZXd,oOn,Vit,mBt,tfa,efa,Ieo};
