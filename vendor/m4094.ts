// @ts-nocheck
import {Gn,sc} from "./m2455.ts";
import {Text} from "./m2423.ts";
import {formatFileSize,ps} from "./m238.ts";
import {Box} from "./m2422.ts";
import {truncate} from "./m237.ts";
import {yP} from "../src/telemetry/2780_eventName.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function k$a({url:e,prompt:t},{verbose:n}){if(!e)return null;if(n)return`url: "${e}"${n&&t?`, prompt: "${t}"`:""}`;return e}
function H$a(){return zY.default.createElement(Gn,{height:1},zY.default.createElement(Text,{dimColor:!0},"Fetching\u2026"))}
function I$a({bytes:e,code:t,codeText:n,result:r},o,{verbose:s}){let i=formatFileSize(e);if(s)return zY.default.createElement(Box,{flexDirection:"column"},zY.default.createElement(Gn,{height:1},zY.default.createElement(Text,null,"Received ",zY.default.createElement(Text,{bold:!0},i)," (",t," ",n,")")),zY.default.createElement(Box,{flexDirection:"column"},zY.default.createElement(Text,null,r)));return zY.default.createElement(Gn,{height:1},zY.default.createElement(Text,null,"Received ",zY.default.createElement(Text,{bold:!0},i)," (",t," ",n,")"))}
function cco(e){if(!e?.url)return null;return truncate(e.url,yP)}
var zY;
var D$a=b(()=>{sc();ze();ps();zY=M(Te(),1)});
export {k$a,H$a,I$a,cco,zY,D$a};
