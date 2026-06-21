// @ts-nocheck
import {X} from "../runtime.ts";
import {DDe} from "./m4697.ts";
var oAl=X((bWn)=>{var tXp=DDe().getSymbolSize;bWn.getRowColCoords=function(t){if(t===1)return[];let n=Math.floor(t/7)+2,r=tXp(t),o=r===145?26:Math.ceil((r-13)/(2*n-2))*2,s=[r-7];for(let i=1;i<n-1;i++)s[i]=s[i-1]-o;return s.push(6),s.reverse()};bWn.getPositions=function(t){let n=[],r=bWn.getRowColCoords(t),o=r.length;for(let s=0;s<o;s++)for(let i=0;i<o;i++){if(s===0&&i===0||s===0&&i===o-1||s===o-1&&i===0)continue;n.push([r[s],r[i]])}return n}});
export {oAl};
