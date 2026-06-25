// @ts-nocheck
import {saveCurrentProjectConfig,tr} from "../src/session/5228_shouldSkipPluginAutoupdate.ts";
import {b,x} from "../runtime.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function dNo(e,t){let n=t/100*(e.length-1),r=Math.floor(n),o=Math.ceil(n);if(r===o)return e[r];return e[r]+(e[o]-e[r])*(n-r)}
function pNo(){let e=new Map,t=new Map,n=new Map;return{increment(r,o=1){e.set(r,(e.get(r)??0)+o)},set(r,o){e.set(r,o)},observe(r,o){let s=t.get(r);if(!s)s={reservoir:[],count:0,sum:0,min:o,max:o},t.set(r,s);if(s.count++,s.sum+=o,o<s.min)s.min=o;if(o>s.max)s.max=o;if(s.reservoir.length<HVl)s.reservoir.push(o);else{let i=Math.floor(Math.random()*s.count);if(i<HVl)s.reservoir[i]=o}},add(r,o){let s=n.get(r);if(!s)s=new Set,n.set(r,s);s.add(o)},getAll(){let r=Object.fromEntries(e);for(let[o,s]of t){if(s.count===0)continue;r[`${o}_count`]=s.count,r[`${o}_min`]=s.min,r[`${o}_max`]=s.max,r[`${o}_avg`]=s.sum/s.count;let i=[...s.reservoir].sort((a,l)=>a-l);r[`${o}_p50`]=dNo(i,50),r[`${o}_p95`]=dNo(i,95),r[`${o}_p99`]=dNo(i,99)}for(let[o,s]of n)r[o]=s.size;return r}}}
function xVl(e){let t=IVl.c(7),{store:n,children:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=pNo(),t[0]=o;else o=t[0];let i=n??o,a,l;if(t[1]!==i)a=()=>{let u=()=>{let d=i.getAll();if(Object.keys(d).length>0)saveCurrentProjectConfig((p)=>({...p,lastSessionMetrics:d}))};return process.on("exit",u),()=>{process.off("exit",u)}},l=[i],t[1]=i,t[2]=a,t[3]=l;else a=t[2],l=t[3];i7t.useEffect(a,l);let c;if(t[4]!==r||t[5]!==i)c=DVl.jsx(HLm.Provider,{value:i,children:r}),t[4]=r,t[5]=i,t[6]=c;else c=t[6];return c}
var IVl,i7t,DVl,HVl=1024,HLm;
var mNo=b(()=>{tr();IVl=x(tt(),1),i7t=x(et(),1),DVl=x(oe(),1);HLm=i7t.createContext(null)});
export {dNo,pNo,xVl,IVl,i7t,DVl,HVl,HLm,mNo};
