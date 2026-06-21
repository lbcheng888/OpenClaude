// @ts-nocheck
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function fmt({totalItems:e,maxVisible:t=vYp,selectedIndex:n=0}){let r=e>t,o=kG.useRef(0),s=kG.useMemo(()=>{if(!r)return 0;let _=o.current;if(n<_)return o.current=n,n;if(n>=_+t){let S=n-t+1;return o.current=S,S}let y=Math.max(0,e-t),T=Math.min(_,y);return o.current=T,T},[n,t,r,e]),i=s,a=Math.min(s+t,e),l=kG.useCallback((_)=>{if(!r)return _;return _.slice(i,a)},[r,i,a]),c=kG.useCallback((_)=>i+_,[i]),u=kG.useCallback((_)=>_>=i&&_<a,[i,a]),d=kG.useCallback((_)=>{},[]),p=kG.useCallback(()=>{},[]),m=kG.useCallback(()=>{},[]),f=kG.useCallback((_,y)=>{let T=Math.max(0,Math.min(_,e-1));y(T)},[e]),A=kG.useCallback((_,y)=>!1,[]),h=Math.max(1,Math.ceil(e/t));return{currentPage:Math.floor(s/t),totalPages:h,startIndex:i,endIndex:a,needsPagination:r,pageSize:t,getVisibleItems:l,toActualIndex:c,isOnCurrentPage:u,goToPage:d,nextPage:p,prevPage:m,handleSelectionChange:f,handlePageNavigation:A,scrollPosition:{current:n+1,total:e,canScrollUp:s>0,canScrollDown:s+t<e}}}
var kG,vYp=5;
var sWn=b(()=>{kG=M(Te(),1)});
export {fmt,kG,vYp,sWn};
