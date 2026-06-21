// @ts-nocheck
import {b} from "../runtime.ts";
function JHi(e){let t=vfd[e.name],n={upArrow:t==="upArrow",downArrow:t==="downArrow",leftArrow:t==="leftArrow",rightArrow:t==="rightArrow",pageDown:t==="pageDown",pageUp:t==="pageUp",wheelUp:!1,wheelDown:!1,home:t==="home",end:t==="end",return:t==="return",escape:t==="escape",tab:t==="tab",backspace:t==="backspace",delete:t==="delete",ctrl:e.ctrl,shift:e.shift,super:e.superKey,meta:e.meta};return{input:e.name==="enter"?`
`:[...e.key].length===1?e.key:"",key:n}}
function XHi(e,t){let n="";if(t.escape)n="escape";else if(t.return)n="return";else if(t.tab)n="tab";else if(t.backspace)n="backspace";else if(t.delete)n="delete";else if(t.upArrow)n="up";else if(t.downArrow)n="down";else if(t.leftArrow)n="left";else if(t.rightArrow)n="right";else if(t.pageUp)n="pageup";else if(t.pageDown)n="pagedown";else if(t.wheelUp)n="wheelup";else if(t.wheelDown)n="wheeldown";else if(t.home)n="home";else if(t.end)n="end";else if(e===`
`)n="enter";return{name:n,key:e,ctrl:t.ctrl,shift:t.shift,meta:t.meta,superKey:t.super}}
var vfd;
var l3r=b(()=>{vfd={up:"upArrow",down:"downArrow",left:"leftArrow",right:"rightArrow",pagedown:"pageDown",pageup:"pageUp",home:"home",end:"end",return:"return",escape:"escape",tab:"tab",backspace:"backspace",delete:"delete"}});
export {JHi,XHi,vfd,l3r};
