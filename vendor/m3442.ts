// @ts-nocheck
import {X} from "../runtime.ts";
var Rma=X((B_g,wma)=>{wma.exports=DPn;function DPn(){this._listeners={}}DPn.prototype.on=function(t,n,r){return(this._listeners[t]||(this._listeners[t]=[])).push({fn:n,ctx:r||this}),this};DPn.prototype.off=function(t,n){if(t===void 0)this._listeners={};else if(n===void 0)this._listeners[t]=[];else{var r=this._listeners[t];for(var o=0;o<r.length;)if(r[o].fn===n)r.splice(o,1);else++o}return this};DPn.prototype.emit=function(t){var n=this._listeners[t];if(n){var r=[],o=1;for(;o<arguments.length;)r.push(arguments[o++]);for(o=0;o<n.length;)n[o].fn.apply(n[o++].ctx,r)}return this}});
export {Rma};
