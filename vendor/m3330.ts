// @ts-nocheck
import {b} from "../runtime.ts";
function hca(){return{scrolls:0,pageJumps:0,jumpToBottomClicks:0,reachedScrollbackCap:!1,scrolledUpMs:0,unpinnedSince:null}}
function sDn(e=R9e){e.scrolls++}
function iDn(e=R9e){e.pageJumps++}
function gca(e=R9e){e.jumpToBottomClicks++}
function mNt(e=R9e){e.reachedScrollbackCap=!0}
function sXr(e,t=Date.now(),n=R9e){if(e){if(n.unpinnedSince!==null)n.scrolledUpMs+=Math.max(0,t-n.unpinnedSince),n.unpinnedSince=null}else if(n.unpinnedSince===null)n.unpinnedSince=t}
function _ca(e=Date.now(),t=R9e){let n=t.scrolledUpMs;if(t.unpinnedSince!==null)n+=Math.max(0,e-t.unpinnedSince);let r={scrolls:t.scrolls,scroll_up_seconds:Math.round(n/1000),jump_to_bottom_clicks:t.jumpToBottomClicks,page_jumps:t.pageJumps,reached_scrollback_cap:t.reachedScrollbackCap};return Object.assign(t,hca()),r}
function yca(e=R9e){return e.scrolls>0||e.pageJumps>0||e.jumpToBottomClicks>0||e.reachedScrollbackCap||e.scrolledUpMs>0||e.unpinnedSince!==null}
var R9e;
var fNt=b(()=>{R9e=hca()});
export {hca,sDn,iDn,gca,mNt,sXr,_ca,yca,R9e,fNt};
