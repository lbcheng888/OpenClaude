// @ts-nocheck
import {lc,tw,mg} from "./m2209.ts";
import {z9r,UUe,oAi,J3,she} from "./m2272.ts";
import {qUe,aAi,cZ} from "./m2273.ts";
import {useStdin,CEn} from "./m2266.ts";
import {jAi,zAi} from "./m2284.ts";
import {XCi,sz,hve} from "./m2271.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function rdd(){return lc("theme","dark").value}
function odd(e){tw("theme",e)}
function ThemeProvider({children:e,initialState:t,onThemeSave:n=odd}){let[r,o]=WR.useState(t??rdd),[s,i]=WR.useState(null),[a,l]=WR.useState(null),[c,u]=WR.useState(()=>z9r()),d=WR.useSyncExternalStore(UUe.subscribe,UUe.getState),p=WR.useMemo(()=>[...c,...d],[c,d]),[m,f]=WR.useState(()=>(t??r)==="auto"?qUe():"dark"),h=s??r,g=()=>u(z9r());WR.useEffect(()=>oAi(g),[]);let{internal_querier:_}=useStdin();WR.useEffect(()=>{if(h!=="auto")return;return f(qUe()),aAi(()=>f(qUe()))},[h]),WR.useEffect(()=>{if(h!=="auto"||!_)return;let w,H=!1;return Promise.resolve().then(() => (jAi(),zAi)).then(({watchSystemTheme:k})=>{if(H)return;w=k(_,f)}),()=>{H=!0,w?.()}},[h,_]);let T=J3(h),y=T?p.find((w)=>w.slug===T):void 0,S=y?y.base:h==="auto"?m:T?"dark":h,E=WR.useMemo(()=>XCi(sz(S),a??y?.overrides),[S,a,y]),R=WR.useMemo(()=>({themeSetting:r,setThemeSetting:(w)=>{if(o(w),i(null),w==="auto")f(qUe());n(w)},setPreviewTheme:(w)=>{if(i(w),w==="auto")f(qUe())},savePreview:()=>{if(s!==null)o(s),i(null),n(s)},cancelPreview:()=>{if(s!==null)i(null)},currentTheme:S,resolvedTheme:E,customThemes:p,activeCustomTheme:y,reloadCustomThemes:g,setPreviewOverrides:l}),[r,s,S,n,E,p,y]);return YAi.jsx(jet.Provider,{value:R,children:e})}
function useTheme(){let e=zEn.c(3),{currentTheme:t,setThemeSetting:n}=WR.useContext(jet),r;if(e[0]!==t||e[1]!==n)r=[t,n],e[0]=t,e[1]=n,e[2]=r;else r=e[2];return r}
function useThemeSetting(){return WR.useContext(jet).themeSetting}
function usePreviewTheme(){let e=zEn.c(4),{setPreviewTheme:t,savePreview:n,cancelPreview:r}=WR.useContext(jet),o;if(e[0]!==r||e[1]!==n||e[2]!==t)o={setPreviewTheme:t,savePreview:n,cancelPreview:r},e[0]=r,e[1]=n,e[2]=t,e[3]=o;else o=e[3];return o}
function useResolvedTheme(){return WR.useContext(jet).resolvedTheme}
function useCustomThemes(){let e=zEn.c(5),{customThemes:t,activeCustomTheme:n,reloadCustomThemes:r,setPreviewOverrides:o}=WR.useContext(jet),s;if(e[0]!==n||e[1]!==t||e[2]!==r||e[3]!==o)s={customThemes:t,activeCustomTheme:n,reloadCustomThemes:r,setPreviewOverrides:o},e[0]=n,e[1]=t,e[2]=r,e[3]=o,e[4]=s;else s=e[4];return s}
var zEn,WR,YAi,d3r="dark",jet;
var gZ=b(()=>{CEn();she();mg();cZ();hve();zEn=x(tt(),1),WR=x(et(),1),YAi=x(oe(),1),jet=WR.createContext({themeSetting:d3r,setThemeSetting:()=>{},setPreviewTheme:()=>{},savePreview:()=>{},cancelPreview:()=>{},currentTheme:d3r,resolvedTheme:sz(d3r),customThemes:[],activeCustomTheme:void 0,reloadCustomThemes:()=>{},setPreviewOverrides:()=>{}})});
export {rdd,odd,ThemeProvider,useTheme,useThemeSetting,usePreviewTheme,useResolvedTheme,useCustomThemes,zEn,WR,YAi,d3r,jet,gZ};
