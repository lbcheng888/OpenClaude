// @ts-nocheck
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function Aht({totalItems:e,maxVisible:t=wom,selectedIndex:n=0,firstSelectableIndex:r=0}){let o=e>t,s=VG.useRef(0),i=VG.useMemo(()=>{if(!o)return 0;let y=s.current;if(n<y){let R=n<=r?0:n;return s.current=R,R}if(n>=y+t){let R=n-t+1;return s.current=R,R}let S=Math.max(0,e-t),E=Math.min(y,S);return s.current=E,E},[n,t,o,e,r]),a=i,l=Math.min(i+t,e),c=VG.useCallback((y)=>{if(!o)return y;return y.slice(a,l)},[o,a,l]),u=VG.useCallback((y)=>a+y,[a]),d=VG.useCallback((y)=>y>=a&&y<l,[a,l]),p=VG.useCallback((y)=>{},[]),m=VG.useCallback(()=>{},[]),f=VG.useCallback(()=>{},[]),h=VG.useCallback((y,S)=>{let E=Math.max(0,Math.min(y,e-1));S(E)},[e]),g=VG.useCallback((y,S)=>!1,[]),_=Math.max(1,Math.ceil(e/t));return{currentPage:Math.floor(i/t),totalPages:_,startIndex:a,endIndex:l,needsPagination:o,pageSize:t,getVisibleItems:c,toActualIndex:u,isOnCurrentPage:d,goToPage:p,nextPage:m,prevPage:f,handleSelectionChange:h,handlePageNavigation:g,scrollPosition:{current:n+1,total:e,canScrollUp:i>0,canScrollDown:i+t<e}}}
var VG,wom=5;
var q7n=b(()=>{VG=x(et(),1)});
export {Aht,VG,wom,q7n};
