// @ts-nocheck
import {ybl,WGn} from "./m4851.ts";
import {iP,gAe} from "./m2533.ts";
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {rQ,f8,sl} from "./m715.ts";
import {pC,Fie} from "./m2555.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {rt} from "./m2255.ts";
import {Te} from "./m2253.ts";
function bbl(){return MG.useContext(Sbl)}
function Rom({children:e,visibleCount:t,onSelect:n,onFocus:r,isDisabled:o=!1,wrap:s=!1,overflowHint:i="glyph",emptyMessage:a}){let l=MG.useRef(null),c=MG.Children.toArray(e),u=c.length,d=ybl({count:u,visibleCount:t,containerRef:l,isDisabled:o,edge:s?"wrap":"clamp",onAccept:n}),p=MG.useRef(r);if(p.current=r,MG.useEffect(()=>{if(u>0)p.current?.(d.cursor)},[d.cursor,u]),iP(l,!o),u===0)return dR.createElement(Box,{ref:l,flexDirection:"column",tabIndex:0},a&&dR.createElement(Text,{dimColor:!0},a));let m=i==="glyph"&&t===1?"count":i,f=c.slice(d.windowStart,d.windowEnd);return dR.createElement(Box,{ref:l,flexDirection:"column",...d.bind},m==="count"&&d.moreAbove>0&&dR.createElement(Box,{paddingLeft:2},dR.createElement(Text,{dimColor:!0},rQ," ",d.moreAbove," more above")),f.map((A,h)=>{let g=d.windowStart+h,_=d.isCursor(g),y=h===0&&d.moreAbove>0,T=h===f.length-1&&d.moreBelow>0;return dR.createElement(Sbl.Provider,{key:MG.isValidElement(A)?A.key??g:g,value:_},dR.createElement(pC,{isFocused:_,showScrollUp:m==="glyph"&&y,showScrollDown:m==="glyph"&&T,styled:!1},A))}),m==="count"&&d.moreBelow>0&&dR.createElement(Box,{paddingLeft:2},dR.createElement(Text,{dimColor:!0},f8," ",d.moreBelow," more below")))}
function xom(e){let t=Tbl.c(2),{children:n}=e,r;if(t[0]!==n)r=dR.createElement(dR.Fragment,null,n),t[0]=n,t[1]=r;else r=t[1];return r}
var Tbl,dR,MG,Sbl,XCo;
var Ebl=b(()=>{sl();gAe();ze();Fie();WGn();Tbl=M(rt(),1),dR=M(Te(),1),MG=M(Te(),1),Sbl=MG.createContext(!1);XCo=Object.assign(Rom,{Item:xom})});
export {bbl,Rom,xom,Tbl,dR,MG,Sbl,XCo,Ebl};
