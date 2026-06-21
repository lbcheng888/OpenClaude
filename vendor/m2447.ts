// @ts-nocheck
import {Gfe,sIt} from "./m2257.ts";
import {qu,bk} from "./m2291.ts";
import {b,M} from "../runtime.ts";
import {Te} from "./m2253.ts";
function useSelection(){SUe.useContext(Gfe);let e=qu.get(process.stdout);return SUe.useMemo(()=>{if(!e)return{copySelection:()=>"",copySelectionNoClear:()=>"",clearSelection:()=>{},hasSelection:()=>!1,getState:()=>null,subscribe:()=>()=>{},moveFocus:()=>{},setSelectionBgColor:()=>{}};return{copySelection:()=>e.copySelection(),copySelectionNoClear:()=>e.copySelectionNoClear(),clearSelection:()=>e.clearTextSelection(),hasSelection:()=>e.hasTextSelection(),getState:()=>e.selection,subscribe:(t)=>e.subscribeToSelectionChange(t),moveFocus:(t)=>e.moveSelectionFocus(t),setSelectionBgColor:(t)=>e.setSelectionBgColor(t)}},[e])}
function _wi(){SUe.useContext(Gfe);let e=qu.get(process.stdout);return SUe.useSyncExternalStore(e?e.subscribeToSelectionChange:bld,e?e.hasTextSelection:Eld)}
var SUe,bld=()=>()=>{},Eld=()=>!1;
var m0t=b(()=>{sIt();bk();SUe=M(Te(),1)});
export {useSelection,_wi,SUe,bld,Eld,m0t};
