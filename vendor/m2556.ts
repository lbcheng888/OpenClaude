// @ts-nocheck
import {b} from "../runtime.ts";
function nRd(e){let{style:t,...n}=e;return{...tRd[t??"default"],...rRd(n)}}
function rRd(e){let t={};for(let n in e)if(e[n]!==void 0)t[n]=e[n];return t}
function _we(e,t={}){let n=nRd(t),r=(c)=>uRd(c,n),o=(c)=>c.map(r).join(n.chordSep);if(e.length===0)return"";if(e.length===1)return o(e[0]);let s=e.every((c)=>c.length===1)?e.map((c)=>c[0]):void 0;if(!s)return e.map(o).join("/");let i=dRd(s,n),l=s.every((c)=>aRd.has(c.key))&&(!!i||s.every((c)=>mvn(c,n).length===0))?n.arrowSep:"/";if(i){let c=s.map((u)=>r({...u,...lRd}));return mRd(i,n)+c.join(l)}return s.map(r).join(l)}
function q5r(e){let t=[];if(e.ctrl)t.push("ctrl");if(e.shift)t.push("shift");if(e.alt||e.meta)t.push("alt");if(e.super)t.push("super");return t}
function pvn(e,t){let n=iRd[e][t.modCase];return typeof n==="function"?n(t.platform):n}
function cRd(e,t){let n=oRd[e];if(n)return n[sRd[t.keyCase]];return t.charCase==="upper"?e.toUpperCase():e}
function xMi(e){return e.shift&&!e.ctrl&&!e.alt&&!e.meta&&!e.super&&e.key.length===1&&e.key>="a"&&e.key<="z"}
function uRd(e,t){if(t.shiftAsCase&&xMi(e))return e.key.toUpperCase();let n=q5r(e),r=cRd(e.key,t);if(t.caretCtrl&&n.length===1&&n[0]==="ctrl")return`^${r}`;if(t.modCase==="glyph")return n.map((o)=>pvn(o,t)).join("")+r;return[...n.map((o)=>pvn(o,t)),r].join(t.modSep)}
function dRd(e,t){let[n,...r]=e;if(!mvn(n,t).length)return;return r.every((s)=>pRd(n,s,t))?n:void 0}
function mvn(e,t){if(t.shiftAsCase&&xMi(e))return[];return q5r(e)}
function pRd(e,t,n){let r=mvn(e,n),o=mvn(t,n);return r.length===o.length&&r.every((s,i)=>s===o[i])}
function mRd(e,t){let n=q5r(e);if(t.caretCtrl&&n.length===1&&n[0]==="ctrl")return"^";if(t.modCase==="glyph")return n.map((r)=>pvn(r,t)).join("");return n.map((r)=>pvn(r,t)).join(t.modSep)+t.modSep}
var tRd,oRd,sRd,iRd,aRd,lRd;
var fvn=b(()=>{tRd={default:{keyCase:"title",modCase:"lower",caretCtrl:!1,modSep:"+",arrowSep:"/",chordSep:" ",shiftAsCase:!1,charCase:"preserve",platform:"other"},compact:{keyCase:"lower",modCase:"lower",caretCtrl:!0,modSep:"+",arrowSep:"",chordSep:" ",shiftAsCase:!0,charCase:"preserve",platform:"other"},symbol:{keyCase:"glyph",modCase:"glyph",caretCtrl:!1,modSep:"",arrowSep:"",chordSep:" ",shiftAsCase:!0,charCase:"upper",platform:"other"}};oRd={enter:["Enter","enter","\u23CE"],escape:["Esc","esc","\u238B"],tab:["Tab","tab","\u21E5"]," ":["Space","space","\u2423"],backspace:["Backspace","backspace","\u232B"],delete:["Delete","delete","\u2326"],up:["\u2191","\u2191","\u2191"],down:["\u2193","\u2193","\u2193"],left:["\u2190","\u2190","\u2190"],right:["\u2192","\u2192","\u2192"],pageup:["PageUp","pgup","\u21DE"],pagedown:["PageDown","pgdn","\u21DF"],home:["Home","home","\u2196"],end:["End","end","\u2198"]},sRd={title:0,lower:1,glyph:2},iRd={ctrl:{lower:"ctrl",title:"Ctrl",glyph:"\u2303"},shift:{lower:"shift",title:"Shift",glyph:"\u21E7"},alt:{lower:(e)=>e==="macos"?"opt":"alt",title:(e)=>e==="macos"?"Opt":"Alt",glyph:"\u2325"},super:{lower:(e)=>e==="macos"?"cmd":"super",title:(e)=>e==="macos"?"Cmd":"Super",glyph:"\u2318"}},aRd=new Set(["up","down","left","right"]),lRd={ctrl:!1,alt:!1,shift:!1,meta:!1,super:!1}});
export {nRd,rRd,_we,q5r,pvn,cRd,xMi,uRd,dRd,mvn,pRd,mRd,tRd,oRd,sRd,iRd,aRd,lRd,fvn};
