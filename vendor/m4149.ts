// @ts-nocheck
import {X} from "../runtime.ts";
import {T9t} from "./m4143.ts";
import {Z$n} from "./m4142.ts";
import {Ruo} from "./m4148.ts";
import {wuo} from "./m4147.ts";
var $4a=X(($qe)=>{var B4a=T9t(),F4a=Z$n(),gp_=Ruo(),U4a=wuo();$qe.createDOMImplementation=function(){return new B4a(null)};$qe.createDocument=function(e,t){if(e||t){var n=new F4a;return n.parse(e||"",!0),n.document()}return new B4a(null).createHTMLDocument("")};$qe.createIncrementalHTMLParser=function(){var e=new F4a;return{write:function(t){if(t.length>0)e.parse(t,!1,function(){return!0})},end:function(t){e.parse(t||"",!0,function(){return!0})},process:function(t){return e.parse("",!1,t)},document:function(){return e.document()}}};$qe.createWindow=function(e,t){var n=$qe.createDocument(e);if(t!==void 0)n._address=t;return new U4a.Window(n)};$qe.impl=U4a});
export {$4a};
