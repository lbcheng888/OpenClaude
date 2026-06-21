// @ts-nocheck
import {bc,KR,Ug} from "./m2264.ts";
import {hFr,qFe,r_i,k4,zfe} from "./m2263.ts";
import {cIt,Yfe} from "./m2265.ts";
import {useStdin,Uyn} from "./m2258.ts";
import {U_i,F_i} from "./m2273.ts";
import {Jgi,kK,Ive} from "./m2262.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function Hed(){return bc("theme","dark").value}
function Ied(e){KR("theme",e)}
function ThemeProvider({children:e,initialState:t,onThemeSave:n=Ied}){let[r,o]=Rv.useState(t??Hed),[s,i]=Rv.useState(null),[a,l]=Rv.useState(null),[c,u]=Rv.useState(()=>hFr()),d=Rv.useSyncExternalStore(qFe.subscribe,qFe.getState),p=Rv.useMemo(()=>[...c,...d],[c,d]),[m,f]=Rv.useState(()=>(t??r)==="auto"?cIt():"dark"),A=s??r,h=()=>u(hFr());Rv.useEffect(()=>r_i(h),[]);let{internal_querier:g}=useStdin();Rv.useEffect(()=>{if(A!=="auto"||!g)return;let R,k=!1;return Promise.resolve().then(() => (U_i(),F_i)).then(({watchSystemTheme:x})=>{if(k)return;R=x(g,f)}),()=>{k=!0,R?.()}},[A,g]);let _=k4(A),y=_?p.find((R)=>R.slug===_):void 0,T=y?y.base:A==="auto"?m:_?"dark":A,S=Rv.useMemo(()=>Jgi(kK(T),a??y?.overrides),[T,a,y]),v=Rv.useMemo(()=>({themeSetting:r,setThemeSetting:(R)=>{if(o(R),i(null),R==="auto")f(cIt());n(R)},setPreviewTheme:(R)=>{if(i(R),R==="auto")f(cIt())},savePreview:()=>{if(s!==null)o(s),i(null),n(s)},cancelPreview:()=>{if(s!==null)i(null)},currentTheme:T,resolvedTheme:S,customThemes:p,activeCustomTheme:y,reloadCustomThemes:h,setPreviewOverrides:l}),[r,s,T,n,S,p,y]);return Rv.default.createElement(KQe.Provider,{value:v},e)}
function useTheme(){let e=aTn.c(3),{currentTheme:t,setThemeSetting:n}=Rv.useContext(KQe),r;if(e[0]!==t||e[1]!==n)r=[t,n],e[0]=t,e[1]=n,e[2]=r;else r=e[2];return r}
function useThemeSetting(){return Rv.useContext(KQe).themeSetting}
function usePreviewTheme(){let e=aTn.c(4),{setPreviewTheme:t,savePreview:n,cancelPreview:r}=Rv.useContext(KQe),o;if(e[0]!==r||e[1]!==n||e[2]!==t)o={setPreviewTheme:t,savePreview:n,cancelPreview:r},e[0]=r,e[1]=n,e[2]=t,e[3]=o;else o=e[3];return o}
function useResolvedTheme(){return Rv.useContext(KQe).resolvedTheme}
function useCustomThemes(){let e=aTn.c(5),{customThemes:t,activeCustomTheme:n,reloadCustomThemes:r,setPreviewOverrides:o}=Rv.useContext(KQe),s;if(e[0]!==n||e[1]!==t||e[2]!==r||e[3]!==o)s={customThemes:t,activeCustomTheme:n,reloadCustomThemes:r,setPreviewOverrides:o},e[0]=n,e[1]=t,e[2]=r,e[3]=o,e[4]=s;else s=e[4];return s}
var aTn,Rv,OFr="dark",KQe;
var SZ=b(()=>{Uyn();zfe();Ug();Yfe();Ive();aTn=M(rt(),1),Rv=M(Te(),1),KQe=Rv.createContext({themeSetting:OFr,setThemeSetting:()=>{},setPreviewTheme:()=>{},savePreview:()=>{},cancelPreview:()=>{},currentTheme:OFr,resolvedTheme:kK(OFr),customThemes:[],activeCustomTheme:void 0,reloadCustomThemes:()=>{},setPreviewOverrides:()=>{}})});
export {Hed,Ied,ThemeProvider,useTheme,useThemeSetting,usePreviewTheme,useResolvedTheme,useCustomThemes,aTn,Rv,OFr,KQe,SZ};
