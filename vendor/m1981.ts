// @ts-nocheck
import {X} from "../runtime.ts";
import {LBe} from "./m1979.ts";
var _Or=X((uAn)=>{Object.defineProperty(uAn,"__esModule",{value:!0});uAn.IdTokenClient=void 0;var a8u=LBe();class zZs extends a8u.OAuth2Client{targetAudience;idTokenProvider;constructor(e){super(e);this.targetAudience=e.targetAudience,this.idTokenProvider=e.idTokenProvider}async getRequestMetadataAsync(){if(!this.credentials.id_token||!this.credentials.expiry_date||this.isTokenExpiring()){let t=await this.idTokenProvider.fetchIdToken(this.targetAudience);this.credentials={id_token:t,expiry_date:this.getIdTokenExpiryDate(t)}}return{headers:new Headers({authorization:"Bearer "+this.credentials.id_token})}}getIdTokenExpiryDate(e){let t=e.split(".")[1];if(t)return JSON.parse(Buffer.from(t,"base64").toString("ascii")).exp*1000}}uAn.IdTokenClient=zZs});
export {_Or};
