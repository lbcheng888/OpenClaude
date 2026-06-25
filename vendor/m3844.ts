// @ts-nocheck
import {Ni} from "./m127.ts";
import {Zha,gB,cq,F$,nga,HE,oH} from "../src/agent/3332_id.ts";
import {_t,bo,uo} from "./m2468.ts";
import {getIsRemoteMode,lt} from "../src/session/0132_sent.ts";
import {isTeamLead,Op} from "../src/agent/1464_waitForTeammatesToBecomeIdle.ts";
import {b,x} from "../runtime.ts";
import {ig} from "./m130.ts";
import {et} from "./m2261.ts";
class r1a{#e=void 0;#t=!1;#n=null;#s=null;#i=null;#a=null;#o=null;#c=null;#u=Ni();#l=0;#r=!1;getSnapshot=()=>this.#t?void 0:this.#e;subscribe=(e)=>{let t=this.#u.subscribe(e);if(this.#l++,!this.#r)this.#r=!0,this.#c=Zha(this.#f),this.#d();let n=!1;return()=>{if(n)return;if(n=!0,t(),this.#l--,this.#l===0)this.#T()}};#p(){this.#u.emit()}#g(e){if(e===this.#s&&this.#n!==null)return;this.#n?.close(),this.#n=null,this.#s=e;try{this.#n=n1a.watch(e,this.#f),this.#n.unref()}catch{}}#f=()=>{if(this.#a)clearTimeout(this.#a);this.#a=setTimeout(()=>void this.#d(),QAp),this.#a.unref()};refetch=()=>this.#d();#d=async()=>{let e=gB();this.#g(cq(e));let t=(await F$(e)).filter((o)=>!o.metadata?._internal);if(!this.#r)return;let n=t.some((o)=>o.status!=="completed"),r=!sRp(this.#e,t);if(r)this.#e=t;if(n||t.length===0)this.#t=t.length===0,this.#h();else if(this.#i===null&&!this.#t)this.#i=setTimeout(this.#_.bind(this,e),XAp),this.#i.unref();if(r)this.#p();if(this.#o)clearTimeout(this.#o),this.#o=null;if(n)this.#o=setTimeout(this.#f,ZAp),this.#o.unref()};#_(e){this.#i=null;let t=gB();if(t!==e)return;F$(t).then(async(n)=>{if(n.length>0&&n.every((o)=>o.status==="completed"))await nga(t),this.#e=[],this.#t=!0;this.#p()})}#h(){if(this.#i)clearTimeout(this.#i),this.#i=null}#T(){if(this.#n?.close(),this.#n=null,this.#s=null,this.#c?.(),this.#c=null,this.#h(),this.#a)clearTimeout(this.#a);if(this.#o)clearTimeout(this.#o);this.#a=null,this.#o=null,this.#r=!1}}
function tRp(){return eRp??=new r1a}
function j$t(){let e=_t((r)=>r.teamContext),n=HE()&&!getIsRemoteMode()&&(!e||isTeamLead(e))?tRp():null;return E2n.useSyncExternalStore(n?n.subscribe:rRp,n?n.getSnapshot:oRp)}
function o1a(){let e=j$t(),t=bo(),n=e===void 0;return E2n.useEffect(()=>{if(!n)return;t((r)=>{if(r.expandedView!=="tasks")return r;return{...r,expandedView:"none"}})},[n,t]),e}
function sRp(e,t){if(e===void 0||e.length!==t.length)return!1;for(let n=0;n<t.length;n++){let r=e[n],o=t[n];if(r.id!==o.id||r.status!==o.status||r.subject!==o.subject||r.activeForm!==o.activeForm||r.owner!==o.owner||r.description!==o.description||!t1a(r.blockedBy,o.blockedBy)||!t1a(r.blocks,o.blocks))return!1}return!0}
function t1a(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}
var n1a,E2n,XAp=5000,QAp=50,ZAp=5000,eRp=null,nRp=()=>{},rRp=()=>nRp,oRp=()=>{return};
var C2n=b(()=>{lt();uo();ig();oH();Op();n1a=require("fs"),E2n=x(et(),1)});
export {r1a,tRp,j$t,o1a,sRp,t1a,n1a,E2n,XAp,QAp,ZAp,eRp,nRp,rRp,oRp,C2n};
