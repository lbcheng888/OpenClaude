// @ts-nocheck
import {X} from "../runtime.ts";
var dPn=X((Vst)=>{Object.defineProperty(Vst,"__esModule",{value:!0});Vst.ExactPredicate=Vst.PatternPredicate=void 0;var T7d=/[\^$\\.+?()[\]{}|]/g;class uQr{_matchAll;_regexp;constructor(e){if(e==="*")this._matchAll=!0,this._regexp=/.*/;else this._matchAll=!1,this._regexp=new RegExp(uQr.escapePattern(e))}match(e){if(this._matchAll)return!0;return this._regexp.test(e)}static escapePattern(e){return`^${e.replace(T7d,"\\$&").replace("*",".*")}$`}static hasWildcard(e){return e.includes("*")}}Vst.PatternPredicate=uQr;class hpa{_matchAll;_pattern;constructor(e){this._matchAll=e===void 0,this._pattern=e}match(e){if(this._matchAll)return!0;if(e===this._pattern)return!0;return!1}}Vst.ExactPredicate=hpa});
export {dPn};
