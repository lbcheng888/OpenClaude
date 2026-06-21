// @ts-nocheck
import {isFullscreenWithTTY,b,M} from "../runtime.ts";
import {$1,FIt} from "./m2366.ts";
import {useTimeout,f0t} from "./m2450.ts";
import {useThemeSetting,useTheme,useResolvedTheme,usePreviewTheme,useCustomThemes,ThemeProvider,SZ} from "./m2274.ts";
import {useTerminalViewport,d0t} from "./m2440.ts";
import {useTerminalTitle,YSn} from "./m2449.ts";
import {useTerminalFocus,twe} from "./m2380.ts";
import {useTabStatus,ywi} from "./m2448.ts";
import {useStdin,Uyn} from "./m2258.ts";
import {useSelection,m0t} from "./m2447.ts";
import {useIsScreenReaderEnabled,dwe} from "./m2434.ts";
import {useInterval,useAnimationTimer,D$r} from "./m2446.ts";
import {useHasFocus,I$r} from "./m2445.ts";
import {useFocus,jSn} from "./m2444.ts";
import {j4,hwi} from "./m2443.ts";
import {useClock,yUe} from "./m2432.ts";
import {useApp,H$r} from "./m2442.ts";
import {useAnimationFrame,p0t} from "../src/config/2442_isVisible.ts";
import {supportsTabStatus,lg} from "./m2269.ts";
import {measureElement,JSn} from "./m2451.ts";
import {No,lwe} from "./m2421.ts";
import {Text,cwe} from "./m2423.ts";
import {TerminalFocusEvent,sUr} from "./m2290.ts";
import {Spacer,mwi} from "./m2439.ts";
import {RawAnsi,uwi} from "./m2438.ts";
import {NoSelect,R$r} from "./m2437.ts";
import {Newline,swi} from "./m2436.ts";
import {Link,Tie} from "./m2427.ts";
import {FocusManager,rAe} from "./m2372.ts";
import {EventEmitter,Event,Fyn} from "./m2256.ts";
import {Decorative,nwi} from "./m2435.ts";
import {ClickEvent,X2r} from "./m2396.ts";
import {Button,ewi} from "./m2433.ts";
import {Box,BSn} from "./m2422.ts";
import {BaseText,mUe} from "./m2388.ts";
import {BaseBox,LZ} from "./m2387.ts";
import {Ansi,Xvi} from "./m2431.ts";
import {T$r,wvi,Rvi} from "./m2418.ts";
import {NZ,gUe} from "../src/config/2421_gUe.ts";
import {Te} from "./m2253.ts";
var _F={};
isFullscreenWithTTY(_F,{wrapText:()=>$1,useTimeout:()=>useTimeout,useThemeSetting:()=>useThemeSetting,useTheme:()=>useTheme,useTerminalViewport:()=>useTerminalViewport,useTerminalTitle:()=>useTerminalTitle,useTerminalFocus:()=>useTerminalFocus,useTabStatus:()=>useTabStatus,useStdin:()=>useStdin,useSelection:()=>useSelection,useResolvedTheme:()=>useResolvedTheme,usePreviewTheme:()=>usePreviewTheme,useIsScreenReaderEnabled:()=>useIsScreenReaderEnabled,useInterval:()=>useInterval,useHasFocus:()=>useHasFocus,useFocus:()=>useFocus,useDebouncedCallback:()=>j4,useCustomThemes:()=>useCustomThemes,useClock:()=>useClock,useApp:()=>useApp,useAnimationTimer:()=>useAnimationTimer,useAnimationFrame:()=>useAnimationFrame,supportsTabStatus:()=>supportsTabStatus,render:()=>render,measureElement:()=>measureElement,createRoot:()=>createRoot,color:()=>No,ThemeProvider:()=>ThemeProvider,Text:()=>Text,TerminalFocusEvent:()=>TerminalFocusEvent,Spacer:()=>Spacer,RawAnsi:()=>RawAnsi,NoSelect:()=>NoSelect,Newline:()=>Newline,Link:()=>Link,FocusManager:()=>FocusManager,EventEmitter:()=>EventEmitter,Event:()=>Event,Decorative:()=>Decorative,ClickEvent:()=>ClickEvent,Button:()=>Button,Box:()=>Box,BaseText:()=>BaseText,BaseBox:()=>BaseBox,Ansi:()=>Ansi});
function P$r(e){return Twi.createElement(ThemeProvider,null,e)}
async function render(e,t){if(t!==void 0&&"write"in t)return T$r(P$r(e),t);return T$r(P$r(e),{nativeCursor:NZ(),...t})}
async function createRoot(e){let t=await wvi({nativeCursor:NZ(),...e});return{...t,render:(n)=>t.render(P$r(n))}}
var Twi;
var ze=b(()=>{SZ();Rvi();gUe();lwe();BSn();cwe();SZ();Xvi();LZ();ewi();nwi();Tie();swi();R$r();uwi();mwi();mUe();X2r();Fyn();sUr();rAe();p0t();H$r();yUe();hwi();jSn();I$r();D$r();dwe();m0t();Uyn();ywi();twe();YSn();d0t();f0t();JSn();lg();FIt();Twi=M(Te(),1)});
export {_F,P$r,render,createRoot,Twi,ze};
