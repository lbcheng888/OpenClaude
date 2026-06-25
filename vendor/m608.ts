// @ts-nocheck
import {Q} from "../runtime.ts";
var _ns=Q((aje)=>{var tru=(e,t,n)=>{if(!(t in e))return;if(e[t]==="true")return!0;if(e[t]==="false")return!1;throw Error(`Cannot load ${n} "${t}". Expected "true" or "false", got ${e[t]}.`)},nru=(e,t,n)=>{if(!(t in e))return;let r=parseInt(e[t],10);if(Number.isNaN(r))throw TypeError(`Cannot load ${n} '${t}'. Expected number, got '${e[t]}'.`);return r};aje.SelectorType=void 0;(function(e){e.ENV="env",e.CONFIG="shared config entry"})(aje.SelectorType||(aje.SelectorType={}));aje.booleanSelector=tru;aje.numberSelector=nru});
export {_ns};
