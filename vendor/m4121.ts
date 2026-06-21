// @ts-nocheck
import {X} from "../runtime.ts";
import {Vco} from "./m4120.ts";
import {Xk} from "./m4102.ts";
import {D$n} from "./m4116.ts";
import {Bco} from "./m4117.ts";
var d9t=X((jd_,Y9a)=>{Y9a.exports=L$n;var z9a=Vco(),K9a=Xk(),Jxp=D$n(),Xxp=Bco();function L$n(){z9a.call(this)}L$n.prototype=Object.create(z9a.prototype,{substringData:{value:function(t,n){if(arguments.length<2)throw TypeError("Not enough arguments");if(t=t>>>0,n=n>>>0,t>this.data.length||t<0||n<0)K9a.IndexSizeError();return this.data.substring(t,t+n)}},appendData:{value:function(t){if(arguments.length<1)throw TypeError("Not enough arguments");this.data+=String(t)}},insertData:{value:function(t,n){return this.replaceData(t,0,n)}},deleteData:{value:function(t,n){return this.replaceData(t,n,"")}},replaceData:{value:function(t,n,r){var o=this.data,s=o.length;if(t=t>>>0,n=n>>>0,r=String(r),t>s||t<0)K9a.IndexSizeError();if(t+n>s)n=s-t;var i=o.substring(0,t),a=o.substring(t+n);this.data=i+r+a}},isEqual:{value:function(t){return this._data===t._data}},length:{get:function(){return this.data.length}}});Object.defineProperties(L$n.prototype,Jxp);Object.defineProperties(L$n.prototype,Xxp)});
export {d9t};
