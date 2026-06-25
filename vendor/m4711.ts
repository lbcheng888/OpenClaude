// @ts-nocheck
import {Wbl,z7n} from "./m4710.ts";
import {bD,Ihe} from "./m2544.ts";
import {Box} from "./m2432.ts";
import {Text} from "./m2433.ts";
import {eQ,I5,Pa} from "./m720.ts";
import {bE,Pie} from "./m2566.ts";
import {b,x} from "../runtime.ts";
import {je} from "./m2462.ts";
import {tt} from "./m2263.ts";
import {et} from "./m2261.ts";
import {oe} from "./m2275.ts";
function Kbl(){return KG.useContext(Vbl)}
function Wom({children:e,visibleCount:t,onSelect:n,onFocus:r,isDisabled:o=!1,wrap:s=!1,overflowHint:i="glyph",emptyMessage:a}){let l=KG.useRef(null),c=KG.Children.toArray(e),u=c.length,d=Wbl({count:u,visibleCount:t,containerRef:l,isDisabled:o,edge:s?"wrap":"clamp",onAccept:n}),p=KG.useRef(r);if(p.current=r,KG.useEffect(()=>{if(u>0)p.current?.(d.cursor)},[d.cursor,u]),bD(l,!o),u===0)return C6.jsx(Box,{ref:l,flexDirection:"column",tabIndex:0,children:a&&C6.jsx(Text,{dimColor:!0,children:a})});let m=i==="glyph"&&t===1?"count":i,f=c.slice(d.windowStart,d.windowEnd);return C6.jsxs(Box,{ref:l,flexDirection:"column",...d.bind,children:[m==="count"&&d.moreAbove>0&&C6.jsx(Box,{paddingLeft:2,children:C6.jsxs(Text,{dimColor:!0,children:[eQ," ",d.moreAbove," more above"]})}),f.map((h,g)=>{let _=d.windowStart+g,T=d.isCursor(_),y=g===0&&d.moreAbove>0,S=g===f.length-1&&d.moreBelow>0;return C6.jsx(Vbl.Provider,{value:T,children:C6.jsx(bE,{isFocused:T,showScrollUp:m==="glyph"&&y,showScrollDown:m==="glyph"&&S,styled:!1,children:h})},KG.isValidElement(h)?h.key??_:_)}),m==="count"&&d.moreBelow>0&&C6.jsx(Box,{paddingLeft:2,children:C6.jsxs(Text,{dimColor:!0,children:[I5," ",d.moreBelow," more below"]})})]})}
function Gom(e){let t=Gbl.c(2),{children:n}=e,r;if(t[0]!==n)r=C6.jsx(C6.Fragment,{children:n}),t[0]=n,t[1]=r;else r=t[1];return r}
var Gbl,KG,C6,Vbl,Oht;
var Swo=b(()=>{Pa();Ihe();je();Pie();z7n();Gbl=x(tt(),1),KG=x(et(),1),C6=x(oe(),1),Vbl=KG.createContext(!1);Oht=Object.assign(Wom,{Item:Gom})});
export {Kbl,Wom,Gom,Gbl,KG,C6,Vbl,Oht,Swo};
