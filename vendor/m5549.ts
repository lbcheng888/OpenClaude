// @ts-nocheck
import {b} from "../runtime.ts";
import {Cb} from "./m5036.ts";
function Anc(e){let t=0,n="";while(t<e){let r=10+Math.floor(Math.random()*11),o=0;for(let s=0;s<r&&t<e;s++){let i=Cnc[Math.floor(Math.random()*Cnc.length)];if(n+=i,t++,o++,s===r-1||t>=e)n+=". ";else n+=" "}if(o>0&&Math.random()<0.2&&t<e)n+=`

`}return n.trim()}
function Rnc(){return}
var Cnc;
var vnc=b(()=>{Cb();Cnc=["the","a","an","I","you","he","she","it","we","they","me","him","her","us","them","my","your","his","its","our","this","that","what","who","is","are","was","were","be","been","have","has","had","do","does","did","will","would","can","could","may","might","must","shall","should","make","made","get","got","go","went","come","came","see","saw","know","take","think","look","want","use","find","give","tell","work","call","try","ask","need","feel","seem","leave","put","time","year","day","way","man","thing","life","hand","part","place","case","point","fact","good","new","first","last","long","great","little","own","other","old","right","big","high","small","large","next","early","young","few","public","bad","same","able","in","on","at","to","for","of","with","from","by","about","like","through","over","before","between","under","since","without","and","or","but","if","than","because","as","until","while","so","though","both","each","when","where","why","how","not","now","just","more","also","here","there","then","only","very","well","back","still","even","much","too","such","never","again","most","once","off","away","down","out","up","test","code","data","file","line","text","word","number","system","program","set","run","value","name","type","state","end","start"]});
export {Anc,Rnc,Cnc,vnc};
