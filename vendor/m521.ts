// @ts-nocheck
import {LEe,vAt} from "./m520.ts";
import {b} from "../runtime.ts";
function zQo(e){let t={"!":"%21","'":"%27","(":"%28",")":"%29","~":"%7E","%20":"+"};return encodeURIComponent(e).replace(/[!'()~]|%20/g,function(r){return t[r]})}
function jQo(e,t){this._pairs=[],e&&LEe(e,this,t)}
var YQo,JQo;
var XQo=b(()=>{vAt();YQo=jQo.prototype;YQo.append=function(t,n){this._pairs.push([t,n])};YQo.toString=function(t){let n=t?function(r){return t.call(this,r,zQo)}:zQo;return this._pairs.map(function(o){return n(o[0])+"="+n(o[1])},"").join("&")};JQo=jQo});
export {zQo,jQo,YQo,JQo,XQo};
