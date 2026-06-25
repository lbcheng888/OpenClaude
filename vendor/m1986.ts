// @ts-nocheck
import {Q} from "../runtime.ts";
import {xBe} from "./m1984.ts";
var jNr=Q((K_n)=>{Object.defineProperty(K_n,"__esModule",{value:!0});K_n.IdTokenClient=void 0;var vXu=xBe();class Wsi extends vXu.OAuth2Client{targetAudience;idTokenProvider;constructor(e){super(e);this.targetAudience=e.targetAudience,this.idTokenProvider=e.idTokenProvider}async getRequestMetadataAsync(){if(!this.credentials.id_token||!this.credentials.expiry_date||this.isTokenExpiring()){let t=await this.idTokenProvider.fetchIdToken(this.targetAudience);this.credentials={id_token:t,expiry_date:this.getIdTokenExpiryDate(t)}}return{headers:new Headers({authorization:"Bearer "+this.credentials.id_token})}}getIdTokenExpiryDate(e){let t=e.split(".")[1];if(t)return JSON.parse(Buffer.from(t,"base64").toString("ascii")).exp*1000}}K_n.IdTokenClient=Wsi});
export {jNr};
