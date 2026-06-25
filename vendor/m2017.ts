// @ts-nocheck
import {Q} from "../runtime.ts";
import {u8} from "./m1982.ts";
var Yii=Q((byn)=>{Object.defineProperty(byn,"__esModule",{value:!0});byn.PassThroughClient=void 0;var fZu=u8();class jii extends fZu.AuthClient{async request(e){return this.transporter.request(e)}async getAccessToken(){return{}}async getRequestHeaders(){return new Headers}}byn.PassThroughClient=jii});
export {Yii};
