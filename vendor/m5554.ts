// @ts-nocheck
import {useClock} from "./m2432.ts";
import {useTimeout} from "./m2450.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function fht({hideThanksAfterMs:e,otherSurveyActive:t=!1,autoDismissAfterMs:n,onOpen:r,onSelect:o,onAutoDismiss:s,shouldShowTranscriptPrompt:i,onTranscriptPromptShown:a,onTranscriptSelect:l}){let c=useClock(),[u,d]=yD.useState("closed"),[p,m]=yD.useState(null),[f,A]=yD.useState(null),h=yD.useRef(PMo.randomUUID()),g=yD.useRef(null),_=yD.useRef(null);yD.useEffect(()=>()=>{_.current?.()},[]);let y=yD.useCallback(()=>{d("thanks"),c.setTimeout(()=>{d("closed"),m(null)},e)},[c,e]),T=yD.useCallback(()=>{d("submitted"),c.setTimeout(()=>d("closed"),e)},[c,e]),S=yD.useCallback(()=>{if(u!=="closed")return;d("open"),h.current=PMo.randomUUID(),r(h.current)},[u,r]);yD.useEffect(()=>{if(t&&u==="open")d("closed")},[t,u]);let v=yD.useRef(s);v.current=s,useTimeout(()=>{d("closed"),m(null),v.current?.(h.current)},u==="open"&&n?n:null,[u,n]);let R=yD.useCallback((I)=>{if(_.current=null,o(h.current,I),I==="dismissed")d("closed"),m(null);else if(i?.(I))d("transcript_prompt"),a?.(h.current,I);else y()},[y,o,i,a]),k=yD.useCallback((I)=>{if(m(I),g.current=I,I==="dismissed"){R(I);return}d("pending"),_.current=c.setTimeout(()=>R(I),JUm)},[c,R]),x=yD.useCallback(()=>{_.current?.(),_.current=null,m(null),g.current=null,d("open")},[]),H=yD.useCallback((I)=>{switch(I){case"yes":d("submitting"),(async()=>{try{let P=await l?.(h.current,I,g.current),{success:L,bundlePath:D}=typeof P==="object"?P:{success:P??!1,bundlePath:void 0};if(L)A(D??null),T();else y()}catch{y()}})();break;case"no":case"dont_ask_again":l?.(h.current,I,g.current),y();break}},[y,T,l]);return{state:u,lastResponse:p,appearanceId:h.current,transcriptBundlePath:f,open:S,handleSelect:k,handleUndo:x,handleTranscriptSelect:H}}
var PMo,yD,JUm=3000;
var uQn=b(()=>{ze();PMo=require("crypto"),yD=M(Te(),1)});
export {fht,PMo,yD,JUm,uQn};
