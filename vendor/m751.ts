// @ts-nocheck
import {X} from "../runtime.ts";
var r0=X((gKe)=>{var tgr={warningEmitted:!1},NZc=(e)=>{if(e&&!tgr.warningEmitted&&parseInt(e.substring(1,e.indexOf(".")))<18)tgr.warningEmitted=!0,process.emitWarning(`NodeDeprecationWarning: The AWS SDK for JavaScript (v3) will
no longer support Node.js 16.x on January 6, 2025.

To continue receiving updates to AWS services, bug fixes, and security
updates please upgrade to a supported Node.js LTS version.

More information can be found at: https://a.co/74kJMmI`)};function BZc(e,t,n){if(!e.$source)e.$source={};return e.$source[t]=n,e}function FZc(e,t,n){if(!e.__aws_sdk_context)e.__aws_sdk_context={features:{}};else if(!e.__aws_sdk_context.features)e.__aws_sdk_context.features={};e.__aws_sdk_context.features[t]=n}function UZc(e,t,n){if(!e.$source)e.$source={};return e.$source[t]=n,e}gKe.emitWarningIfUnsupportedVersion=NZc;gKe.setCredentialFeature=BZc;gKe.setFeature=FZc;gKe.setTokenFeature=UZc;gKe.state=tgr});
export {r0};
