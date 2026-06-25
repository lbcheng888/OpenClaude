// @ts-nocheck
import {Q} from "../runtime.ts";
import {M4t} from "./m4156.ts";
import {X4n} from "./m4155.ts";
import {hho} from "./m4161.ts";
import {fho} from "./m4160.ts";
var JGa=Q((l5e)=>{var zGa=M4t(),jGa=X4n(),zAy=hho(),YGa=fho();l5e.createDOMImplementation=function(){return new zGa(null)};l5e.createDocument=function(e,t){if(e||t){var n=new jGa;return n.parse(e||"",!0),n.document()}return new zGa(null).createHTMLDocument("")};l5e.createIncrementalHTMLParser=function(){var e=new jGa;return{write:function(t){if(t.length>0)e.parse(t,!1,function(){return!0})},end:function(t){e.parse(t||"",!0,function(){return!0})},process:function(t){return e.parse("",!1,t)},document:function(){return e.document()}}};l5e.createWindow=function(e,t){var n=l5e.createDocument(e);if(t!==void 0)n._address=t;return new YGa.Window(n)};l5e.impl=YGa});
export {JGa};
