// @ts-nocheck
import {X} from "../runtime.ts";
var iKs=X((sNA,sKs)=>{function nDr(e){var t=(e/8|0)+(e%8===0?0:1);return t}var HUu={ES256:nDr(256),ES384:nDr(384),ES512:nDr(521)};function IUu(e){var t=HUu[e];if(t)return t;throw Error('Unknown algorithm "'+e+'"')}sKs.exports=IUu});
export {iKs};
