// @ts-nocheck
import {X} from "../runtime.ts";
var AVi=X((Lqh,fVi)=>{fVi.exports=t1d;function e1d(e){let t={defaultWidth:0,output:process.stdout,tty:require("tty")};if(!e)return t;return Object.keys(t).forEach(function(n){if(!e[n])e[n]=t[n]}),e}function t1d(e){let t=e1d(e);if(t.output.getWindowSize)return t.output.getWindowSize()[0]||t.defaultWidth;if(t.tty.getWindowSize)return t.tty.getWindowSize()[1]||t.defaultWidth;if(t.output.columns)return t.output.columns;if(process.env.CLI_WIDTH){let n=parseInt(process.env.CLI_WIDTH,10);if(!isNaN(n)&&n!==0)return n}return t.defaultWidth}});
export {AVi};
