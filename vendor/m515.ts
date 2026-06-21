// @ts-nocheck
import {ZSe,ebt} from "./m514.ts";
import {b} from "../runtime.ts";
function J7o(e){let t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(r){return t[r]})}
function X7o(e,t){this._pairs=[],e&&ZSe(e,this,t)}
var Q7o,Z7o;
var eKo=b(()=>{ebt();Q7o=X7o.prototype;Q7o.append=function(t,n){this._pairs.push([t,n])};Q7o.toString=function(t){let n=t?function(r){return t.call(this,r,J7o)}:J7o;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};Z7o=X7o});
export {J7o,X7o,Q7o,Z7o,eKo};
