// @ts-nocheck
import {Q} from "../runtime.ts";
var $Bn=Q((cct)=>{Object.defineProperty(cct,"__esModule",{value:!0});cct.ExactPredicate=cct.PatternPredicate=void 0;var $Sp=/[\^$\\.+?()[\]{}|]/g;class _ao{_matchAll;_regexp;constructor(e){if(e==="*")this._matchAll=!0,this._regexp=/.*/;else this._matchAll=!1,this._regexp=new RegExp(_ao.escapePattern(e))}match(e){if(this._matchAll)return!0;return this._regexp.test(e)}static escapePattern(e){return`^${e.replace($Sp,"\\$&").replace("*",".*")}$`}static hasWildcard(e){return e.includes("*")}}cct.PatternPredicate=_ao;class vxa{_matchAll;_pattern;constructor(e){this._matchAll=e===void 0,this._pattern=e}match(e){if(this._matchAll)return!0;if(e===this._pattern)return!0;return!1}}cct.ExactPredicate=vxa});
export {$Bn};
