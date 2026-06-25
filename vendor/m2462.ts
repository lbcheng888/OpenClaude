// @ts-nocheck
import {ft,b,x} from "../runtime.ts";
import {e1,hPt} from "./m2376.ts";
import {useTimeout,WPt} from "./m2460.ts";
import {useThemeSetting,useTheme,useResolvedTheme,usePreviewTheme,useCustomThemes,ThemeProvider,gZ} from "./m2285.ts";
import {useTerminalViewport,$Pt} from "./m2450.ts";
import {useTerminalTitle,MAn} from "./m2459.ts";
import {useTerminalFocus,Uve} from "./m2390.ts";
import {useTabStatus,Nxi} from "./m2458.ts";
import {useStdin,CEn} from "./m2266.ts";
import {useSelection,$tt} from "./m2457.ts";
import {useIsScreenReaderEnabled,Jve} from "./m2444.ts";
import {useInterval,useAnimationTimer,c6r} from "./m2456.ts";
import {useHasFocus,l6r} from "./m2455.ts";
import {useFocus,IAn} from "./m2454.ts";
import {useDebouncedCallback,Oxi} from "./m2453.ts";
import {useClock,g2e} from "./m2442.ts";
import {useApp,a6r} from "./m2452.ts";
import {useAnimationFrame,qPt} from "../src/config/2452_isVisible.ts";
import {supportsTabStatus,hg} from "./m2280.ts";
import {measureElement,NAn} from "./m2461.ts";
import {color,Kve} from "./m2431.ts";
import {Text,zve} from "./m2433.ts";
import {TerminalFocusEvent,M3r} from "./m2301.ts";
import {Spacer,xxi} from "./m2449.ts";
import {RawAnsi,kxi} from "./m2448.ts";
import {NoSelect,o6r} from "./m2447.ts";
import {Newline,Cxi} from "./m2446.ts";
import {Link,yie} from "./m2437.ts";
import {FocusManager,mhe} from "./m2382.ts";
import {EventEmitter,Event,EEn} from "./m2264.ts";
import {Decorative,Sxi} from "./m2445.ts";
import {ClickEvent,kqr} from "./m2406.ts";
import {Button,yxi} from "./m2443.ts";
import {Box,RAn} from "./m2432.ts";
import {BaseText,u2e} from "./m2398.ts";
import {BaseBox,xZ} from "./m2397.ts";
import {Ansi,fxi} from "./m2441.ts";
import {Xqr,B0i,U0i} from "./m2428.ts";
import {PZ,f2e} from "../src/config/2431_f2e.ts";
import {et} from "./m2261.ts";
var d4={};
ft(d4,{wrapText:()=>e1,useTimeout:()=>useTimeout,useThemeSetting:()=>useThemeSetting,useTheme:()=>useTheme,useTerminalViewport:()=>useTerminalViewport,useTerminalTitle:()=>useTerminalTitle,useTerminalFocus:()=>useTerminalFocus,useTabStatus:()=>useTabStatus,useStdin:()=>useStdin,useSelection:()=>useSelection,useResolvedTheme:()=>useResolvedTheme,usePreviewTheme:()=>usePreviewTheme,useIsScreenReaderEnabled:()=>useIsScreenReaderEnabled,useInterval:()=>useInterval,useHasFocus:()=>useHasFocus,useFocus:()=>useFocus,useDebouncedCallback:()=>useDebouncedCallback,useCustomThemes:()=>useCustomThemes,useClock:()=>useClock,useApp:()=>useApp,useAnimationTimer:()=>useAnimationTimer,useAnimationFrame:()=>useAnimationFrame,supportsTabStatus:()=>supportsTabStatus,render:()=>render,measureElement:()=>measureElement,createRoot:()=>createRoot,color:()=>color,ThemeProvider:()=>ThemeProvider,Text:()=>Text,TerminalFocusEvent:()=>TerminalFocusEvent,Spacer:()=>Spacer,RawAnsi:()=>RawAnsi,NoSelect:()=>NoSelect,Newline:()=>Newline,Link:()=>Link,FocusManager:()=>FocusManager,EventEmitter:()=>EventEmitter,Event:()=>Event,Decorative:()=>Decorative,ClickEvent:()=>ClickEvent,Button:()=>Button,Box:()=>Box,BaseText:()=>BaseText,BaseBox:()=>BaseBox,Ansi:()=>Ansi});
function u6r(e){return Fxi.createElement(ThemeProvider,null,e)}
async function render(e,t){if(t!==void 0&&"write"in t)return Xqr(u6r(e),t);return Xqr(u6r(e),{nativeCursor:PZ(),...t})}
async function createRoot(e){let t=await B0i({nativeCursor:PZ(),...e});return{...t,render:(n)=>t.render(u6r(n))}}
var Fxi;
var je=b(()=>{gZ();U0i();f2e();Kve();RAn();zve();gZ();fxi();xZ();yxi();Sxi();yie();Cxi();o6r();kxi();xxi();u2e();kqr();EEn();M3r();mhe();qPt();a6r();g2e();Oxi();IAn();l6r();c6r();Jve();$tt();CEn();Nxi();Uve();MAn();$Pt();WPt();NAn();hg();hPt();Fxi=x(et(),1)});
export {d4,u6r,render,createRoot,Fxi,je};
