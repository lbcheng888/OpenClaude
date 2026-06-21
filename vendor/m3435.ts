// @ts-nocheck
import {X} from "../runtime.ts";
var xQr=X((RPn)=>{Object.defineProperty(RPn,"__esModule",{value:!0});RPn.createBoundedQueueExportPromiseHandler=void 0;class Ama{_concurrencyLimit;_sendingPromises=[];constructor(e){this._concurrencyLimit=e}pushPromise(e){if(this.hasReachedLimit())throw Error("Concurrency Limit reached");this._sendingPromises.push(e);let t=()=>{let n=this._sendingPromises.indexOf(e);this._sendingPromises.splice(n,1)};e.then(t,t)}hasReachedLimit(){return this._sendingPromises.length>=this._concurrencyLimit}async awaitAll(){await Promise.all(this._sendingPromises)}}function nKd(e){return new Ama(e.concurrencyLimit)}RPn.createBoundedQueueExportPromiseHandler=nKd});
export {xQr};
