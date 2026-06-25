// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {q0,lZ} from "./m2270.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
var Vxi={};
ft(Vxi,{useVoiceState:()=>useVoiceState,useSetVoiceState:()=>useSetVoiceState,useGetVoiceState:()=>useGetVoiceState,VoiceProvider:()=>VoiceProvider});
function VoiceProvider(e){let t=h6r.c(3),{children:n}=e,[r]=ewe.useState(tTd),o;if(t[0]!==n||t[1]!==r)o=Kxi.jsx(Gxi.Provider,{value:r,children:n}),t[0]=n,t[1]=r,t[2]=o;else o=t[2];return o}
function tTd(){return q0(Zyd)}
function g6r(){let e=ewe.useContext(Gxi);if(!e)throw Error("useVoiceState must be used within a VoiceProvider");return e}
function useVoiceState(e){let t=h6r.c(3),n=g6r(),r;if(t[0]!==e||t[1]!==n)r=()=>e(n.getState()),t[0]=e,t[1]=n,t[2]=r;else r=t[2];let o=r;return ewe.useSyncExternalStore(n.subscribe,o,o)}
function useSetVoiceState(){return g6r().setState}
function useGetVoiceState(){return g6r().getState}
var h6r,ewe,Kxi,Zyd,Gxi;
var The=b(()=>{lZ();h6r=x(tt(),1),ewe=x(et(),1),Kxi=x(oe(),1),Zyd={voiceState:"idle",voiceError:null,voiceInterimTranscript:"",voiceAudioLevels:[],voiceWarmingUp:!1,awaitingVoiceSubmitDoubleTap:!1},Gxi=ewe.createContext(null)});
export {Vxi,VoiceProvider,tTd,g6r,useVoiceState,useSetVoiceState,useGetVoiceState,h6r,ewe,Kxi,Zyd,Gxi,The};
