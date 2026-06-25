// @ts-nocheck
import {Q} from "../runtime.ts";
import {IPe} from "./m4729.ts";
var eCl=Q((lzn)=>{var fim=IPe().getSymbolSize;lzn.getRowColCoords=function(t){if(t===1)return[];let n=Math.floor(t/7)+2,r=fim(t),o=r===145?26:Math.ceil((r-13)/(2*n-2))*2,s=[r-7];for(let i=1;i<n-1;i++)s[i]=s[i-1]-o;return s.push(6),s.reverse()};lzn.getPositions=function(t){let n=[],r=lzn.getRowColCoords(t),o=r.length;for(let s=0;s<o;s++)for(let i=0;i<o;i++){if(s===0&&i===0||s===0&&i===o-1||s===o-1&&i===0)continue;n.push([r[s],r[i]])}return n}});
export {eCl};
