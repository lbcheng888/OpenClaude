// @ts-nocheck
import {saveCurrentProjectConfig,Qn} from "../src/session/5194_shouldSkipPluginAutoupdate.ts";
import {b,M} from "../runtime.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function FDo(e,t){let n=t/100*(e.length-1),r=Math.floor(n),o=Math.ceil(n);if(r===o)return e[r];return e[r]+(e[o]-e[r])*(n-r)}
function UDo(){let e=new Map,t=new Map,n=new Map;return{increment(r,o=1){e.set(r,(e.get(r)??0)+o)},set(r,o){e.set(r,o)},observe(r,o){let s=t.get(r);if(!s)s={reservoir:[],count:0,sum:0,min:o,max:o},t.set(r,s);if(s.count++,s.sum+=o,o<s.min)s.min=o;if(o>s.max)s.max=o;if(s.reservoir.length<v9l)s.reservoir.push(o);else{let i=Math.floor(Math.random()*s.count);if(i<v9l)s.reservoir[i]=o}},add(r,o){let s=n.get(r);if(!s)s=new Set,n.set(r,s);s.add(o)},getAll(){let r=Object.fromEntries(e);for(let[o,s]of t){if(s.count===0)continue;r[`${o}_count`]=s.count,r[`${o}_min`]=s.min,r[`${o}_max`]=s.max,r[`${o}_avg`]=s.sum/s.count;let i=[...s.reservoir].sort((a,l)=>a-l);r[`${o}_p50`]=FDo(i,50),r[`${o}_p95`]=FDo(i,95),r[`${o}_p99`]=FDo(i,99)}for(let[o,s]of n)r[o]=s.size;return r}}}
function R9l(e){let t=w9l.c(7),{store:n,children:r}=e,o;if(t[0]===Symbol.for("react.memo_cache_sentinel"))o=UDo(),t[0]=o;else o=t[0];let i=n??o,a,l;if(t[1]!==i)a=()=>{let u=()=>{let d=i.getAll();if(Object.keys(d).length>0)saveCurrentProjectConfig((p)=>({...p,lastSessionMetrics:d}))};return process.on("exit",u),()=>{process.off("exit",u)}},l=[i],t[1]=i,t[2]=a,t[3]=l;else a=t[2],l=t[3];F8e.useEffect(a,l);let c;if(t[4]!==r||t[5]!==i)c=F8e.default.createElement(eRm.Provider,{value:i},r),t[4]=r,t[5]=i,t[6]=c;else c=t[6];return c}
var w9l,F8e,v9l=1024,eRm;
var $Do=b(()=>{Qn();w9l=M(rt(),1),F8e=M(Te(),1);eRm=F8e.createContext(null)});
export {FDo,UDo,R9l,w9l,F8e,v9l,eRm,$Do};
