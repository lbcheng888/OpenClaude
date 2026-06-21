// @ts-nocheck
import {b} from "../runtime.ts";
import {Event} from "./m2256.ts";
var ClickEvent;
var X2r=b(()=>{ClickEvent=class ClickEvent extends Event{col;row;localCol=0;localRow=0;cellIsBlank;hyperlinkUrl;defaultAllowed=!1;allowDefault(){this.defaultAllowed=!0}constructor(e,t,n,r){super();this.col=e,this.row=t,this.cellIsBlank=n,this.hyperlinkUrl=r}}});
export {ClickEvent,X2r};
