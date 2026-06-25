// @ts-nocheck
import {Q} from "../runtime.ts";
var noo=Q((LUt)=>{Object.defineProperty(LUt,"__esModule",{value:!0});LUt.CIPHER_SUITES=void 0;LUt.getDefaultRootsData=rap;var nap=require("fs");LUt.CIPHER_SUITES=process.env.GRPC_SSL_CIPHER_SUITES;var lCa=process.env.GRPC_DEFAULT_SSL_ROOTS_FILE_PATH,too=null;function rap(){if(lCa){if(too===null)too=nap.readFileSync(lCa);return too}return null}});
export {noo};
