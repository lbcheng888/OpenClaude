// @ts-nocheck
import {X} from "../runtime.ts";
import {KCe} from "./m1996.ts";
import {FOr} from "./m2000.ts";
import {$Or} from "./m2003.ts";
import {eLr} from "./m2006.ts";
var tLr=X((NAn)=>{Object.defineProperty(NAn,"__esModule",{value:!0});NAn.ExternalAccountClient=void 0;var x5u=KCe(),k5u=FOr(),H5u=$Or(),I5u=eLr();class Fei{constructor(){throw Error("ExternalAccountClients should be initialized via: ExternalAccountClient.fromJSON(), directly via explicit constructors, eg. new AwsClient(options), new IdentityPoolClient(options), newPluggableAuthClientOptions, or via new GoogleAuth(options).getClient()")}static fromJSON(e){if(e&&e.type===x5u.EXTERNAL_ACCOUNT_TYPE)if(e.credential_source?.environment_id)return new H5u.AwsClient(e);else if(e.credential_source?.executable)return new I5u.PluggableAuthClient(e);else return new k5u.IdentityPoolClient(e);else return null}}NAn.ExternalAccountClient=Fei});
export {tLr};
