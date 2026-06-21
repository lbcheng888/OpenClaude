// @ts-nocheck
import {dYe as Vze,uYe as Gze} from "../../vendor/m1442.ts";
import {TNe as Q1e} from "../../vendor/m1544.ts";
import {iCe as WEe,$Ye as EYe} from "../../vendor/m1513.ts";
import {b,M as L} from "../../runtime.ts";
import {Vdn as odn} from "../../vendor/m1545.ts";
import {Mdn as zun} from "../../vendor/m1497.ts";
import {SKe as nKe} from "../../vendor/m809.ts";
// @ts-nocheck
var crypto,
  httpHandler,
  assert,
  loadProfileCredentials = profile => Promise.resolve().then(() => (Vze(), Gze)).then(({
    fromNodeProviderChain: fromNodeProviderChain
  }) => fromNodeProviderChain({
    ...(profile != null ? {
      profile: profile
    } : {}),
    clientConfig: {
      requestHandler: new httpHandler.FetchHttpHandler({
        requestInit: init => ({
          ...init
        })
      })
    }
  })).catch(error => {
    throw Error(`Failed to import '@aws-sdk/credential-providers'. You can provide a custom \`providerChainResolver\` in the client options if your runtime does not have access to '@aws-sdk/credential-providers': \`new AnthropicAws({ providerChainResolver })\` Original error: ${error.message}`);
  }),
  signAwsRequest = async (request, options) => {
    assert.default(request.method, "Expected request method property to be set");
    let credentials;
    if (options.awsAccessKey && options.awsSecretAccessKey) credentials = {
      accessKeyId: options.awsAccessKey,
      secretAccessKey: options.awsSecretAccessKey,
      ...(options.awsSessionToken != null && {
        sessionToken: options.awsSessionToken
      })
    };else if (options.providerChainResolver) credentials = await (await options.providerChainResolver())();else credentials = await (await loadProfileCredentials(options.awsProfile))();
    let signer = new Q1e({
        service: options.serviceName,
        region: options.regionName,
        credentials: credentials,
        sha256: crypto.Sha256
      }),
      parsedUrl = new URL(options.url),
      headers = !request.headers ? {} : Symbol.iterator in request.headers ? Object.fromEntries(Array.from(request.headers).map(entry => [...entry])) : {
        ...request.headers
      };
    delete headers.connection, headers.host = parsedUrl.hostname;
    let query = {};
    parsedUrl.searchParams.forEach((value, key) => {
      query[key] = value;
    });
    let httpRequest = new WEe({
      method: request.method.toUpperCase(),
      protocol: parsedUrl.protocol,
      path: parsedUrl.pathname,
      query: query,
      headers: headers,
      body: request.body
    });
    return (await signer.sign(httpRequest)).headers;
  };
var initModule = b(() => {
  EYe();
  odn();
  crypto = L(zun(), 1), httpHandler = L(nKe(), 1), assert = L(require("assert"));
});

export {crypto as kQs,httpHandler as HQs,assert as IQs,loadProfileCredentials as P6u,signAwsRequest as DQs,initModule as PQs};
