// @ts-nocheck
import {Q} from "../runtime.ts";
var tZs=Q((w8h,eZs)=>{function DMr(e){var t=(e/8|0)+(e%8===0?0:1);return t}var YWu={ES256:DMr(256),ES384:DMr(384),ES512:DMr(521)};function JWu(e){var t=YWu[e];if(t)return t;throw Error('Unknown algorithm "'+e+'"')}eZs.exports=JWu});
export {tZs};
