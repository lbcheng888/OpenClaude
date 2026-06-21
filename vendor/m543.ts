// @ts-nocheck
import {b} from "../runtime.ts";
var UKo,N2c=async function*(e){if(e.stream)yield*e.stream();else if(e.arrayBuffer)yield await e.arrayBuffer();else if(e[UKo])yield*e[UKo]();else yield e},fen;
var Jpr=b(()=>{({asyncIterator:UKo}=Symbol),fen=N2c});
export {UKo,N2c,fen,Jpr};
