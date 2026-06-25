// @ts-nocheck
import {Q} from "../runtime.ts";
var VNr=Q((G_n)=>{Object.defineProperty(G_n,"__esModule",{value:!0});G_n.LoginTicket=void 0;class Nsi{envelope;payload;constructor(e,t){this.envelope=e,this.payload=t}getEnvelope(){return this.envelope}getPayload(){return this.payload}getUserId(){let e=this.getPayload();if(e&&e.sub)return e.sub;return null}getAttributes(){return{envelope:this.getEnvelope(),payload:this.getPayload()}}}G_n.LoginTicket=Nsi});
export {VNr};
