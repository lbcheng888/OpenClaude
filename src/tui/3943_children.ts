// @ts-nocheck
import {Ui,Ld} from "../../vendor/m2459.ts";
import {useClock} from "../../vendor/m2432.ts";
import {logEvent,Ct} from "../../vendor/m131.ts";
import {Br,WS} from "../../vendor/m1456.ts";
import {fromEnum} from "../../vendor/m5.ts";
import {isPolicyAllowed,rd} from "../../vendor/m2205.ts";
import {b,M} from "../../runtime.ts";
import {ze} from "../../vendor/m2452.ts";
import {rt} from "../../vendor/m2255.ts";
import {Te} from "../../vendor/m2253.ts";
function iIe(e){let t=wMa.c(3),n=py.useContext(xMa),r;if(t[0]!==e||t[1]!==n)r=e?n.get(e):void 0,t[0]=e,t[1]=n,t[2]=r;else r=t[2];return r}
function _Un(){return py.useContext(kMa)}
function yUn(){return py.useContext(HMa)}
function PMa(){return py.useContext(IMa)}
function OMa(){return py.useContext(DMa)}
function Dio({children:e}){let[t,n]=py.useState(null),[r,o]=py.useState(null),[s,i]=py.useState(RMa),a=py.useRef(s);a.current=s;let{addNotification:l}=Ui(),c=useClock(),u=py.useRef(null);py.useEffect(()=>()=>{u.current?.()},[]);let d=py.useCallback((f)=>{if(u.current?.(),u.current=null,f===null)u.current=c.setTimeout(()=>o(null),500);else o(f)},[c]),p=py.useCallback((f,A,h="tool_use",g)=>{let _=a.current.get(f)===A;if(i((y)=>{let T=new Map(y);if(_)T.delete(f);else T.set(f,A);return T}),logEvent("tengu_message_rated",{...g,message_uuid:Br(f),sentiment:fromEnum(A),surface:fromEnum(h),cleared:_}),!_)l({key:"message-rated",kind:"feedback",text:"thanks for improving claude!",color:"success",priority:"immediate"})},[l]),m=isPolicyAllowed("allow_product_feedback");return py.default.createElement(hce.Provider,{value:m?p:null},py.default.createElement(xMa.Provider,{value:s},py.default.createElement(HMa.Provider,{value:n},py.default.createElement(kMa.Provider,{value:t},py.default.createElement(DMa.Provider,{value:d},py.default.createElement(IMa.Provider,{value:r},e))))))}
var wMa,py,hce,RMa,xMa,kMa,HMa,IMa,DMa;
var act=b(()=>{Ld();ze();Ct();WS();rd();wMa=M(rt(),1),py=M(Te(),1),hce=py.createContext(null),RMa=new Map,xMa=py.createContext(RMa);kMa=py.createContext(null),HMa=py.createContext(null);IMa=py.createContext(null),DMa=py.createContext(null)});
export {iIe,_Un,yUn,PMa,OMa,Dio,wMa,py,hce,RMa,xMa,kMa,HMa,IMa,DMa,act};
