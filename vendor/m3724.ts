// @ts-nocheck
import {X} from "../runtime.ts";
var z1n=X((pat)=>{Object.defineProperty(pat,"__esModule",{value:!0});pat.ExactPredicate=pat.PatternPredicate=void 0;var eup=/[\^$\\.+?()[\]{}|]/g;class Lno{_matchAll;_regexp;constructor(e){if(e==="*")this._matchAll=!0,this._regexp=/.*/;else this._matchAll=!1,this._regexp=new RegExp(Lno.escapePattern(e))}match(e){if(this._matchAll)return!0;return this._regexp.test(e)}static escapePattern(e){return`^${e.replace(eup,"\\$&").replace("*",".*")}$`}static hasWildcard(e){return e.includes("*")}}pat.PatternPredicate=Lno;class dva{_matchAll;_pattern;constructor(e){this._matchAll=e===void 0,this._pattern=e}match(e){if(this._matchAll)return!0;if(e===this._pattern)return!0;return!1}}pat.ExactPredicate=dva});
export {z1n};
