// @ts-nocheck
import {X} from "../runtime.ts";
import {DZs} from "./m1971.ts";
import {OZs} from "./m1972.ts";
import {uOr} from "./m1970.ts";
var okt=X((ife)=>{var Nju=ife&&ife.__createBinding||(Object.create?function(e,t,n,r){if(r===void 0)r=n;var o=Object.getOwnPropertyDescriptor(t,n);if(!o||("get"in o?!t.__esModule:o.writable||o.configurable))o={enumerable:!0,get:function(){return t[n]}};Object.defineProperty(e,r,o)}:function(e,t,n,r){if(r===void 0)r=n;e[r]=t[n]}),Bju=ife&&ife.__exportStar||function(e,t){for(var n in e)if(n!=="default"&&!Object.prototype.hasOwnProperty.call(t,n))Nju(t,e,n)};Object.defineProperty(ife,"__esModule",{value:!0});ife.createCrypto=$ju;ife.hasBrowserCrypto=LZs;var Fju=DZs(),Uju=OZs();Bju(uOr(),ife);function $ju(){if(LZs())return new Fju.BrowserCrypto;return new Uju.NodeCrypto}function LZs(){return typeof window<"u"&&typeof window.crypto<"u"&&typeof window.crypto.subtle<"u"}});
export {okt};
