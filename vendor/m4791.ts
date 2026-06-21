// @ts-nocheck
import {aIe,jL} from "./m3944.ts";
import {getModelSourceAnnotation,renderModelSetting,Mo} from "../src/permissions/1453_swapShrinksContextWindow.ts";
import {T5n,S5n} from "./m4595.ts";
import {UDe,dGn} from "./m4790.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function Tyl(){let e=aIe(),t=yyl.useMemo(getModelSourceAnnotation,[e]),n=T5n();if(!t&&!n)return null;let r=t&&n?`${t.slice(0,-1)}, auto-updated)`:n?" (auto-updated)":t;return QEo.createElement(UDe,{command:"/model"},"Using ",renderModelSetting(e),r)}
var QEo,yyl;
var Syl=b(()=>{jL();Mo();S5n();dGn();QEo=M(Te(),1),yyl=M(Te(),1)});
export {Tyl,QEo,yyl,Syl};
