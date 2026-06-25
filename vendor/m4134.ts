// @ts-nocheck
import {Q} from "../runtime.ts";
import {Ofo} from "./m4133.ts";
import {agentMcpClients} from "./m4115.ts";
import {I4n} from "./m4129.ts";
import {vfo} from "./m4130.ts";
var w4t=Q((TAy,oWa)=>{oWa.exports=P4n;var rWa=Ofo(),nWa=agentMcpClients(),mMp=I4n(),fMp=vfo();function P4n(){rWa.call(this)}P4n.prototype=Object.create(rWa.prototype,{substringData:{value:function(t,n){if(arguments.length<2)throw TypeError("Not enough arguments");if(t=t>>>0,n=n>>>0,t>this.data.length||t<0||n<0)nWa.IndexSizeError();return this.data.substring(t,t+n)}},appendData:{value:function(t){if(arguments.length<1)throw TypeError("Not enough arguments");this.data+=String(t)}},insertData:{value:function(t,n){return this.replaceData(t,0,n)}},deleteData:{value:function(t,n){return this.replaceData(t,n,"")}},replaceData:{value:function(t,n,r){var o=this.data,s=o.length;if(t=t>>>0,n=n>>>0,r=String(r),t>s||t<0)nWa.IndexSizeError();if(t+n>s)n=s-t;var i=o.substring(0,t),a=o.substring(t+n);this.data=i+r+a}},isEqual:{value:function(t){return this._data===t._data}},length:{get:function(){return this.data.length}}});Object.defineProperties(P4n.prototype,mMp);Object.defineProperties(P4n.prototype,fMp)});
export {w4t};
