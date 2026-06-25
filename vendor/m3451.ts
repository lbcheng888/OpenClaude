// @ts-nocheck
import {Q} from "../runtime.ts";
var uro=Q((SMn)=>{Object.defineProperty(SMn,"__esModule",{value:!0});SMn.createBoundedQueueExportPromiseHandler=void 0;class ISa{_concurrencyLimit;_sendingPromises=[];constructor(e){this._concurrencyLimit=e}pushPromise(e){if(this.hasReachedLimit())throw Error("Concurrency Limit reached");this._sendingPromises.push(e);let t=()=>{let n=this._sendingPromises.indexOf(e);this._sendingPromises.splice(n,1)};e.then(t,t)}hasReachedLimit(){return this._sendingPromises.length>=this._concurrencyLimit}async awaitAll(){await Promise.all(this._sendingPromises)}}function Wrp(e){return new ISa(e.concurrencyLimit)}SMn.createBoundedQueueExportPromiseHandler=Wrp});
export {uro};
