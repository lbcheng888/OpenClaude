// @ts-nocheck
import {Q} from "../runtime.ts";
var awi=Q((Xfg,iwi)=>{class swi{constructor(){this.max=1000,this.map=new Map}get(e){let t=this.map.get(e);if(t===void 0)return;else return this.map.delete(e),this.map.set(e,t),t}delete(e){return this.map.delete(e)}set(e,t){if(!this.delete(e)&&t!==void 0){if(this.map.size>=this.max){let r=this.map.keys().next().value;this.delete(r)}this.map.set(e,t)}return this}}iwi.exports=swi});
export {awi};
