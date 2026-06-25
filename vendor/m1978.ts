// @ts-nocheck
import {Q} from "../runtime.ts";
import {wsi} from "./m1976.ts";
import {Hsi} from "./m1977.ts";
import {UNr} from "./m1975.ts";
var x0t=Q((hfe)=>{var nXu=hfe&&hfe.__createBinding||(Object.create?function(e,t,n,r){if(r===void 0)r=n;var o=Object.getOwnPropertyDescriptor(t,n);if(!o||("get"in o?!t.__esModule:o.writable||o.configurable))o={enumerable:!0,get:function(){return t[n]}};Object.defineProperty(e,r,o)}:function(e,t,n,r){if(r===void 0)r=n;e[r]=t[n]}),rXu=hfe&&hfe.__exportStar||function(e,t){for(var n in e)if(n!=="default"&&!Object.prototype.hasOwnProperty.call(t,n))nXu(t,e,n)};Object.defineProperty(hfe,"__esModule",{value:!0});hfe.createCrypto=iXu;hfe.hasBrowserCrypto=Isi;var oXu=wsi(),sXu=Hsi();rXu(UNr(),hfe);function iXu(){if(Isi())return new oXu.BrowserCrypto;return new sXu.NodeCrypto}function Isi(){return typeof window<"u"&&typeof window.crypto<"u"&&typeof window.crypto.subtle<"u"}});
export {x0t};
