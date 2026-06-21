// @ts-nocheck
import {b} from "../runtime.ts";
function Hfd(e){let{style:t,...n}=e;return{...kfd[t??"default"],...Ifd(n)}}
function Ifd(e){let t={};for(let n in e)if(e[n]!==void 0)t[n]=e[n];return t}
function Dwe(e,t={}){let n=Hfd(t),r=(c)=>Bfd(c,n),o=(c)=>c.map(r).join(n.chordSep);if(e.length===0)return"";if(e.length===1)return o(e[0]);let s=e.every((c)=>c.length===1)?e.map((c)=>c[0]):void 0;if(!s)return e.map(o).join("/");let i=Ffd(s,n),l=s.every((c)=>Lfd.has(c.key))&&(!!i||s.every((c)=>vEn(c,n).length===0))?n.arrowSep:"/";if(i){let c=s.map((u)=>r({...u,...Mfd}));return $fd(i,n)+c.join(l)}return s.map(r).join(l)}
function d3r(e){let t=[];if(e.ctrl)t.push("ctrl");if(e.shift)t.push("shift");if(e.alt||e.meta)t.push("alt");if(e.super)t.push("super");return t}
function CEn(e,t){let n=Ofd[e][t.modCase];return typeof n==="function"?n(t.platform):n}
function Nfd(e,t){let n=Dfd[e];if(n)return n[Pfd[t.keyCase]];return t.charCase==="upper"?e.toUpperCase():e}
function aIi(e){return e.shift&&!e.ctrl&&!e.alt&&!e.meta&&!e.super&&e.key.length===1&&e.key>="a"&&e.key<="z"}
function Bfd(e,t){if(t.shiftAsCase&&aIi(e))return e.key.toUpperCase();let n=d3r(e),r=Nfd(e.key,t);if(t.caretCtrl&&n.length===1&&n[0]==="ctrl")return`^${r}`;if(t.modCase==="glyph")return n.map((o)=>CEn(o,t)).join("")+r;return[...n.map((o)=>CEn(o,t)),r].join(t.modSep)}
function Ffd(e,t){let[n,...r]=e;if(!vEn(n,t).length)return;return r.every((s)=>Ufd(n,s,t))?n:void 0}
function vEn(e,t){if(t.shiftAsCase&&aIi(e))return[];return d3r(e)}
function Ufd(e,t,n){let r=vEn(e,n),o=vEn(t,n);return r.length===o.length&&r.every((s,i)=>s===o[i])}
function $fd(e,t){let n=d3r(e);if(t.caretCtrl&&n.length===1&&n[0]==="ctrl")return"^";if(t.modCase==="glyph")return n.map((r)=>CEn(r,t)).join("");return n.map((r)=>CEn(r,t)).join(t.modSep)+t.modSep}
var kfd,Dfd,Pfd,Ofd,Lfd,Mfd;
var wEn=b(()=>{kfd={default:{keyCase:"title",modCase:"lower",caretCtrl:!1,modSep:"+",arrowSep:"/",chordSep:" ",shiftAsCase:!1,charCase:"preserve",platform:"other"},compact:{keyCase:"lower",modCase:"lower",caretCtrl:!0,modSep:"+",arrowSep:"",chordSep:" ",shiftAsCase:!0,charCase:"preserve",platform:"other"},symbol:{keyCase:"glyph",modCase:"glyph",caretCtrl:!1,modSep:"",arrowSep:"",chordSep:" ",shiftAsCase:!0,charCase:"upper",platform:"other"}};Dfd={enter:["Enter","enter","\u23CE"],escape:["Esc","esc","\u238B"],tab:["Tab","tab","\u21E5"]," ":["Space","space","\u2423"],backspace:["Backspace","backspace","\u232B"],delete:["Delete","delete","\u2326"],up:["\u2191","\u2191","\u2191"],down:["\u2193","\u2193","\u2193"],left:["\u2190","\u2190","\u2190"],right:["\u2192","\u2192","\u2192"],pageup:["PageUp","pgup","\u21DE"],pagedown:["PageDown","pgdn","\u21DF"],home:["Home","home","\u2196"],end:["End","end","\u2198"]},Pfd={title:0,lower:1,glyph:2},Ofd={ctrl:{lower:"ctrl",title:"Ctrl",glyph:"\u2303"},shift:{lower:"shift",title:"Shift",glyph:"\u21E7"},alt:{lower:(e)=>e==="macos"?"opt":"alt",title:(e)=>e==="macos"?"Opt":"Alt",glyph:"\u2325"},super:{lower:(e)=>e==="macos"?"cmd":"super",title:(e)=>e==="macos"?"Cmd":"Super",glyph:"\u2318"}},Lfd=new Set(["up","down","left","right"]),Mfd={ctrl:!1,alt:!1,shift:!1,meta:!1,super:!1}});
export {Hfd,Ifd,Dwe,d3r,CEn,Nfd,aIi,Bfd,Ffd,vEn,Ufd,$fd,kfd,Dfd,Pfd,Ofd,Lfd,Mfd,wEn};
