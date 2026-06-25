// @ts-nocheck
import {b} from "../runtime.ts";
function vga(){return{scrolls:0,pageJumps:0,jumpToBottomClicks:0,reachedScrollbackCap:!1,scrolledUpMs:0,unpinnedSince:null}}
function JOn(e=F3e){e.scrolls++}
function XOn(e=F3e){e.pageJumps++}
function wga(e=F3e){e.jumpToBottomClicks++}
function WBt(e=F3e){e.reachedScrollbackCap=!0}
function $to(e,t=Date.now(),n=F3e){if(e){if(n.unpinnedSince!==null)n.scrolledUpMs+=Math.max(0,t-n.unpinnedSince),n.unpinnedSince=null}else if(n.unpinnedSince===null)n.unpinnedSince=t}
function kga(e=Date.now(),t=F3e){let n=t.scrolledUpMs;if(t.unpinnedSince!==null)n+=Math.max(0,e-t.unpinnedSince);let r={scrolls:t.scrolls,scroll_up_seconds:Math.round(n/1000),jump_to_bottom_clicks:t.jumpToBottomClicks,page_jumps:t.pageJumps,reached_scrollback_cap:t.reachedScrollbackCap};return Object.assign(t,vga()),r}
function Hga(e=F3e){return e.scrolls>0||e.pageJumps>0||e.jumpToBottomClicks>0||e.reachedScrollbackCap||e.scrolledUpMs>0||e.unpinnedSince!==null}
var F3e;
var GBt=b(()=>{F3e=vga()});
export {vga,JOn,XOn,wga,WBt,$to,kga,Hga,F3e,GBt};
