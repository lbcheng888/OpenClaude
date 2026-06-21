// @ts-nocheck
import {ca} from "./m5.ts";
import {jla,KF,Kq,p9,Vla,TE,Nk} from "../src/agent/3316_id.ts";
import {mt,bo,configProtoStore} from "./m2458.ts";
import {getIsRemoteMode,lt} from "../src/session/0131_sent.ts";
import {isTeamLead,Am} from "../src/agent/1459_waitForTeammatesToBecomeIdle.ts";
import {b,M} from "../runtime.ts";
import {kg} from "./m129.ts";
import {Te} from "./m2253.ts";
class PHa{#e=void 0;#t=!1;#n=null;#i=null;#s=null;#l=null;#o=null;#c=null;#u=ca();#a=0;#r=!1;getSnapshot=()=>this.#t?void 0:this.#e;subscribe=(e)=>{let t=this.#u.subscribe(e);if(this.#a++,!this.#r)this.#r=!0,this.#c=jla(this.#f),this.#d();let n=!1;return()=>{if(n)return;if(n=!0,t(),this.#a--,this.#a===0)this.#y()}};#p(){this.#u.emit()}#h(e){if(e===this.#i&&this.#n!==null)return;this.#n?.close(),this.#n=null,this.#i=e;try{this.#n=DHa.watch(e,this.#f),this.#n.unref()}catch{}}#f=()=>{if(this.#l)clearTimeout(this.#l);this.#l=setTimeout(()=>void this.#d(),cfp),this.#l.unref()};refetch=()=>this.#d();#d=async()=>{let e=KF();this.#h(Kq(e));let t=(await p9(e)).filter((o)=>!o.metadata?._internal);if(!this.#r)return;let n=t.some((o)=>o.status!=="completed"),r=!hfp(this.#e,t);if(r)this.#e=t;if(n||t.length===0)this.#t=t.length===0,this.#A();else if(this.#s===null&&!this.#t)this.#s=setTimeout(this.#g.bind(this,e),lfp),this.#s.unref();if(r)this.#p();if(this.#o)clearTimeout(this.#o),this.#o=null;if(n)this.#o=setTimeout(this.#f,ufp),this.#o.unref()};#g(e){this.#s=null;let t=KF();if(t!==e)return;p9(t).then(async(n)=>{if(n.length>0&&n.every((o)=>o.status==="completed"))await Vla(t),this.#e=[],this.#t=!0;this.#p()})}#A(){if(this.#s)clearTimeout(this.#s),this.#s=null}#y(){if(this.#n?.close(),this.#n=null,this.#i=null,this.#c?.(),this.#c=null,this.#A(),this.#l)clearTimeout(this.#l);if(this.#o)clearTimeout(this.#o);this.#l=null,this.#o=null,this.#r=!1}}
function pfp(){return dfp??=new PHa}
function yUt(){let e=mt((r)=>r.teamContext),n=TE()&&!getIsRemoteMode()&&(!e||isTeamLead(e))?pfp():null;return xBn.useSyncExternalStore(n?n.subscribe:ffp,n?n.getSnapshot:Afp)}
function OHa(){let e=yUt(),t=bo(),n=e===void 0;return xBn.useEffect(()=>{if(!n)return;t((r)=>{if(r.expandedView!=="tasks")return r;return{...r,expandedView:"none"}})},[n,t]),e}
function hfp(e,t){if(e===void 0||e.length!==t.length)return!1;for(let n=0;n<t.length;n++){let r=e[n],o=t[n];if(r.id!==o.id||r.status!==o.status||r.subject!==o.subject||r.activeForm!==o.activeForm||r.owner!==o.owner||r.description!==o.description||!IHa(r.blockedBy,o.blockedBy)||!IHa(r.blocks,o.blocks))return!1}return!0}
function IHa(e,t){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}
var DHa,xBn,lfp=5000,cfp=50,ufp=5000,dfp=null,mfp=()=>{},ffp=()=>mfp,Afp=()=>{return};
var kBn=b(()=>{lt();configProtoStore();kg();Nk();Am();DHa=require("fs"),xBn=M(Te(),1)});
export {PHa,pfp,yUt,OHa,hfp,IHa,DHa,xBn,lfp,cfp,ufp,dfp,mfp,ffp,Afp,kBn};
