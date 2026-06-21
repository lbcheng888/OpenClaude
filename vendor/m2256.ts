// @ts-nocheck
import {b} from "../runtime.ts";
class Event{_didStopImmediatePropagation=!1;didStopImmediatePropagation(){return this._didStopImmediatePropagation}stopImmediatePropagation(){this._didStopImmediatePropagation=!0}}
var ygi,EventEmitter;
var Fyn=b(()=>{ygi=require("events");EventEmitter=class EventEmitter extends ygi.EventEmitter{constructor(){super();this.setMaxListeners(0)}emit(e,...t){if(e==="error")return super.emit(e,...t);let n=this.rawListeners(e);if(n.length===0)return!1;let r=t[0]instanceof Event?t[0]:null;for(let o of n)if(o.apply(this,t),r?.didStopImmediatePropagation())break;return!0}}});
export {Event,ygi,EventEmitter,Fyn};
