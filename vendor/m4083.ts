// @ts-nocheck
import {Box} from "./m2422.ts";
import {Text} from "./m2423.ts";
import {wB,eC} from "./m717.ts";
import {fc,sl} from "./m715.ts";
import {b,M} from "../runtime.ts";
import {ze} from "./m2452.ts";
import {Te} from "./m2253.ts";
function X2a(){return null}
function Q2a(e,t,n){return PP.createElement(Box,{flexDirection:"column",marginTop:1},PP.createElement(Box,{flexDirection:"row"},PP.createElement(Text,{color:wB("plan")},fc),PP.createElement(Text,null," Entered plan mode")),PP.createElement(Box,{paddingLeft:2},PP.createElement(Text,{dimColor:!0},"Claude is now exploring and designing an implementation approach.")))}
function Z2a(){return PP.createElement(Box,{flexDirection:"row",marginTop:1},PP.createElement(Text,{color:wB("default")},fc),PP.createElement(Text,null," User declined to enter plan mode"))}
var PP;
var e$a=b(()=>{sl();eC();ze();PP=M(Te(),1)});
export {X2a,Q2a,Z2a,PP,e$a};
