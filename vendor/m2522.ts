// @ts-nocheck
import {Ta,Ct} from "./m197.ts";
import {b} from "../runtime.ts";
function unt(e,t="value"){let n=tAd.exec(e);if(n){let r=(n[0].codePointAt(0)??0).toString(16).toUpperCase().padStart(4,"0");throw new Ta(`Cannot safely quote ${t} in a PowerShell single-quoted string literal: it contains U+${r}, which PowerShell's tokenizer treats as a quote delimiter`,"psSingleQuotedLiteral: rejected a PowerShell quote-variant codepoint (U+2018..U+201F)")}return`'${e.replaceAll("'","''")}'`}
var tAd;
var iOt=b(()=>{Ct();tAd=/[\u2018-\u201F]/});
export {unt,tAd,iOt};
