// @ts-nocheck
import {Q} from "../runtime.ts";
var qSa=Q((Ex_,$Sa)=>{$Sa.exports=RMn;function RMn(){this._listeners={}}RMn.prototype.on=function(t,n,r){return(this._listeners[t]||(this._listeners[t]=[])).push({fn:n,ctx:r||this}),this};RMn.prototype.off=function(t,n){if(t===void 0)this._listeners={};else if(n===void 0)this._listeners[t]=[];else{var r=this._listeners[t];for(var o=0;o<r.length;)if(r[o].fn===n)r.splice(o,1);else++o}return this};RMn.prototype.emit=function(t){var n=this._listeners[t];if(n){var r=[],o=1;for(;o<arguments.length;)r.push(arguments[o++]);for(o=0;o<n.length;)n[o].fn.apply(n[o++].ctx,r)}return this}});
export {qSa};
