// @ts-nocheck
import {Q} from "../runtime.ts";
import {Rko} from "./m4780.ts";
var WAl=Q((yzn)=>{var flm=Rko();yzn.render=flm.render;yzn.renderToFile=function(t,n,r,o){if(typeof o>"u")o=r,r=void 0;let s=require("fs"),a='<?xml version="1.0" encoding="utf-8"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">'+yzn.render(n,r);s.writeFile(t,a,o)}});
export {WAl};
