// @ts-nocheck
import {X} from "../runtime.ts";
var AOr=X((lAn)=>{Object.defineProperty(lAn,"__esModule",{value:!0});lAn.LoginTicket=void 0;class qZs{envelope;payload;constructor(e,t){this.envelope=e,this.payload=t}getEnvelope(){return this.envelope}getPayload(){return this.payload}getUserId(){let e=this.getPayload();if(e&&e.sub)return e.sub;return null}getAttributes(){return{envelope:this.getEnvelope(),payload:this.getPayload()}}}lAn.LoginTicket=qZs});
export {AOr};
