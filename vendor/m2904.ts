// @ts-nocheck
import {Q} from "../runtime.ts";
var d7i=Q((vzg,u7i)=>{function I2d(e){return{name:"Inform 7",aliases:["i7"],case_insensitive:!0,keywords:{keyword:"thing room person man woman animal container supporter backdrop door scenery open closed locked inside gender is are say understand kind of rule"},contains:[{className:"string",begin:'"',end:'"',relevance:0,contains:[{className:"subst",begin:"\\[",end:"\\]"}]},{className:"section",begin:/^(Volume|Book|Part|Chapter|Section|Table)\b/,end:"$"},{begin:/^(Check|Carry out|Report|Instead of|To|Rule|When|Before|After)\b/,end:":",contains:[{begin:"\\(This",end:"\\)"}]},{className:"comment",begin:"\\[",end:"\\]",contains:["self"]}]}}u7i.exports=I2d});
export {d7i};
