// @ts-nocheck
import {Q} from "../runtime.ts";
import {IRe} from "./m2001.ts";
import {hFr} from "./m2005.ts";
import {_Fr} from "./m2008.ts";
import {IFr} from "./m2011.ts";
var xFr=Q((Tyn)=>{Object.defineProperty(Tyn,"__esModule",{value:!0});Tyn.ExternalAccountClient=void 0;var zQu=IRe(),jQu=hFr(),YQu=_Fr(),JQu=IFr();class Oii{constructor(){throw Error("ExternalAccountClients should be initialized via: ExternalAccountClient.fromJSON(), directly via explicit constructors, eg. new AwsClient(options), new IdentityPoolClient(options), newPluggableAuthClientOptions, or via new GoogleAuth(options).getClient()")}static fromJSON(e){if(e&&e.type===zQu.EXTERNAL_ACCOUNT_TYPE)if(e.credential_source?.environment_id)return new YQu.AwsClient(e);else if(e.credential_source?.executable)return new JQu.PluggableAuthClient(e);else return new jQu.IdentityPoolClient(e);else return null}}Tyn.ExternalAccountClient=Oii});
export {xFr};
