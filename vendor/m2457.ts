// @ts-nocheck
import {nhe,PDt} from "./m2265.ts";
import {du,iw} from "./m2302.ts";
import {b,x} from "../runtime.ts";
import {et} from "./m2261.ts";
function useSelection(){y2e.useContext(nhe);let e=du.get(process.stdout);return y2e.useMemo(()=>{if(!e)return{copySelection:()=>"",copySelectionNoClear:()=>"",getSelectedText:()=>"",clearSelection:()=>{},hasSelection:()=>!1,getState:()=>null,subscribe:()=>()=>{},moveFocus:()=>{},setSelectionBgColor:()=>{}};return{copySelection:()=>e.copySelection(),copySelectionNoClear:()=>e.copySelectionNoClear(),getSelectedText:()=>e.getSelectedText(),clearSelection:()=>e.clearTextSelection(),hasSelection:()=>e.hasTextSelection(),getState:()=>e.selection,subscribe:(t)=>e.subscribeToSelectionChange(t),moveFocus:(t)=>e.moveSelectionFocus(t),setSelectionBgColor:(t)=>e.setSelectionBgColor(t)}},[e])}
function Mxi(){y2e.useContext(nhe);let e=du.get(process.stdout);return y2e.useSyncExternalStore(e?e.subscribeToSelectionChange:zyd,e?e.hasTextSelection:jyd)}
var y2e,zyd=()=>()=>{},jyd=()=>!1;
var $tt=b(()=>{PDt();iw();y2e=x(et(),1)});
export {useSelection,Mxi,y2e,zyd,jyd,$tt};
