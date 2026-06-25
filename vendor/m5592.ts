// @ts-nocheck
import {useClock} from "./m2442.ts";
import {useTimeout} from "./m2460.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {et} from "./m2261.ts";
function Lyt({hideThanksAfterMs:e,otherSurveyActive:t=!1,autoDismissAfterMs:n,onOpen:r,onSelect:o,onAutoDismiss:s,shouldShowTranscriptPrompt:i,onTranscriptPromptShown:a,onTranscriptSelect:l}){let c=useClock(),[u,d]=Ix.useState("closed"),[p,m]=Ix.useState(null),[f,h]=Ix.useState(null),g=Ix.useRef(n2o.randomUUID()),_=Ix.useRef(null),T=Ix.useRef(null);Ix.useEffect(()=>()=>{T.current?.()},[]);let y=Ix.useCallback(()=>{d("thanks"),c.setTimeout(()=>{d("closed"),m(null)},e)},[c,e]),S=Ix.useCallback(()=>{d("submitted"),c.setTimeout(()=>d("closed"),e)},[c,e]),E=Ix.useCallback(()=>{if(u!=="closed")return;d("open"),g.current=n2o.randomUUID(),r(g.current)},[u,r]);Ix.useEffect(()=>{if(t&&u==="open")d("closed")},[t,u]);let R=Ix.useRef(s);R.current=s,useTimeout(()=>{d("closed"),m(null),R.current?.(g.current)},u==="open"&&n?n:null,[u,n]);let w=Ix.useCallback((D)=>{if(T.current=null,o(g.current,D),D==="dismissed")d("closed"),m(null);else if(i?.(D))d("transcript_prompt"),a?.(g.current,D);else y()},[y,o,i,a]),H=Ix.useCallback((D)=>{if(m(D),_.current=D,D==="dismissed"){w(D);return}d("pending"),T.current=c.setTimeout(()=>w(D),kWm)},[c,w]),k=Ix.useCallback(()=>{T.current?.(),T.current=null,m(null),_.current=null,d("open")},[]),I=Ix.useCallback((D)=>{switch(D){case"yes":d("submitting"),(async()=>{try{let O=await l?.(g.current,D,_.current),{success:L,bundlePath:P}=typeof O==="object"?O:{success:O??!1,bundlePath:void 0};if(L)h(P??null),S();else y()}catch{y()}})();break;case"no":case"dont_ask_again":l?.(g.current,D,_.current),y();break}},[y,S,l]);return{state:u,lastResponse:p,appearanceId:g.current,transcriptBundlePath:f,open:E,handleSelect:H,handleUndo:k,handleTranscriptSelect:I}}
var n2o,Ix,kWm=3000;
var mnr=b(()=>{je();n2o=require("crypto"),Ix=x(et(),1)});
export {Lyt,n2o,Ix,kWm,mnr};
