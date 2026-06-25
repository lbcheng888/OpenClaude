// @ts-nocheck
import {Q} from "../runtime.ts";
var oMn=Q((Wat)=>{Object.defineProperty(Wat,"__esModule",{value:!0});Wat.ExactPredicate=Wat.PatternPredicate=void 0;var arp=/[\^$\\.+?()[\]{}|]/g;class Kno{_matchAll;_regexp;constructor(e){if(e==="*")this._matchAll=!0,this._regexp=/.*/;else this._matchAll=!1,this._regexp=new RegExp(Kno.escapePattern(e))}match(e){if(this._matchAll)return!0;return this._regexp.test(e)}static escapePattern(e){return`^${e.replace(arp,"\\$&").replace("*",".*")}$`}static hasWildcard(e){return e.includes("*")}}Wat.PatternPredicate=Kno;class xTa{_matchAll;_pattern;constructor(e){this._matchAll=e===void 0,this._pattern=e}match(e){if(this._matchAll)return!0;if(e===this._pattern)return!0;return!1}}Wat.ExactPredicate=xTa});
export {oMn};
