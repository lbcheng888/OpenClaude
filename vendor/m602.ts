// @ts-nocheck
import {X} from "../runtime.ts";
var TJo=X((u7e)=>{var B7c=(e,t,n)=>{if(!(t in e))return;if(e[t]==="true")return!0;if(e[t]==="false")return!1;throw Error(`Cannot load ${n} "${t}". Expected "true" or "false", got ${e[t]}.`)},F7c=(e,t,n)=>{if(!(t in e))return;let r=parseInt(e[t],10);if(Number.isNaN(r))throw TypeError(`Cannot load ${n} '${t}'. Expected number, got '${e[t]}'.`);return r};u7e.SelectorType=void 0;(function(e){e.ENV="env",e.CONFIG="shared config entry"})(u7e.SelectorType||(u7e.SelectorType={}));u7e.booleanSelector=B7c;u7e.numberSelector=F7c});
export {TJo};
