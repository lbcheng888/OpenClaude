// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {C0} from "./m2262.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
var wwi={};
isFullscreenWithTTY(wwi,{useVoiceState:()=>useVoiceState,useSetVoiceState:()=>useSetVoiceState,useGetVoiceState:()=>useGetVoiceState,VoiceProvider:()=>VoiceProvider});
function VoiceProvider(e){let t=N$r.c(3),{children:n}=e,[r]=Eie.useState(Hld),o;if(t[0]!==n||t[1]!==r)o=Eie.default.createElement(vwi.Provider,{value:r},n),t[0]=n,t[1]=r,t[2]=o;else o=t[2];return o}
function Hld(){return C0(xld)}
function B$r(){let e=Eie.useContext(vwi);if(!e)throw Error("useVoiceState must be used within a VoiceProvider");return e}
function useVoiceState(e){let t=N$r.c(3),n=B$r(),r;if(t[0]!==e||t[1]!==n)r=()=>e(n.getState()),t[0]=e,t[1]=n,t[2]=r;else r=t[2];let o=r;return Eie.useSyncExternalStore(n.subscribe,o,o)}
function useSetVoiceState(){return B$r().setState}
function useGetVoiceState(){return B$r().getState}
var N$r,Eie,xld,vwi;
var iAe=b(()=>{N$r=M(rt(),1),Eie=M(Te(),1),xld={voiceState:"idle",voiceError:null,voiceInterimTranscript:"",voiceAudioLevels:[],voiceWarmingUp:!1,awaitingVoiceSubmitDoubleTap:!1},vwi=Eie.createContext(null)});
export {wwi,VoiceProvider,Hld,B$r,useVoiceState,useSetVoiceState,useGetVoiceState,N$r,Eie,xld,vwi,iAe};
