// @ts-nocheck
import {tH,Iee,NXr,uS} from "./3192_path.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {color as wo} from "../../vendor/m2431.ts";
import {Xe,Zs} from "../../vendor/m2216.ts";
import {Qse,ky} from "../agent/2238_explicitlyRequested.ts";
import {getMemoryFiles as qA,getLargeMemoryFiles as Ake,getMaxMemoryCharacterCount as Cke,ZR} from "./2729_stripHtmlComments.ts";
import {dd,Xl} from "./0651_maxBytes.ts";
import {formatNumber as qc,Xo} from "../../vendor/m240.ts";
import {eD,ras,wm} from "../../vendor/m707.ts";
import {Aoe,tNe} from "./0744_level.ts";
import {getSettingsForSource as An,getPolicySettingsOrigin as Qpe,getManagedFileSettingsPresence as fbr,br} from "./0745_updateSettingsForSource.ts";
import {aqe} from "./3778_level.ts";
import {oqe,c0e} from "../../vendor/m3774.ts";
import {d0e,kct} from "../../vendor/m3779.ts";
import {os} from "../api/0465_getOauthConfig.ts";
import {getAccountInformation as VBe,shouldUseWIFAuth as dE,lo} from "./2036_withOAuthRefreshLock.ts";
import {getWIFStatusLine as zdn,JJe} from "../../vendor/m1293.ts";
import {getAPIProvider as Rr,getSecondaryProvider as jwt,THIRD_PARTY_PROVIDER_LABELS as hQ,Ps} from "../api/1287_usesFirstPartyModelIds.ts";
import {nt} from "../../vendor/m127.ts";
import {qJt,dn} from "./0137_namespace.ts";
import {b1e,fyr,t2,E1e} from "../../vendor/m614.ts";
import {z_,lt} from "../session/0132_sent.ts";
import {getProxyUrl as rF,ey} from "./1026_shouldBypassProxyWithCidr.ts";
import {u2,zK} from "./0751_bytes.ts";
import {modelDisplayString as S2,Ro} from "../permissions/1458_swapShrinksContextWindow.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {rY} from "../../vendor/m3778.ts";
import {Uh} from "../../vendor/m2682.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
function reorderByAntOnly(groupArrays) {
  let reordered = groupArrays.map(group => group.filter(item => !item.antOnly));
  return reordered.push(groupArrays.flatMap(group => group.filter(item => item.antOnly))), reordered;
}
function getEmptyLabels() {
  return [];
}
function getIdeLabels(mcpServers, ideInfo = null, theme) {
  let ideServer = mcpServers?.find(server => server.name === "ide");
  if (ideInfo) {
    let displayName = tH(ideInfo.ideType),
      extensionType = Iee(ideInfo.ideType) ? "plugin" : "extension";
    if (ideInfo.error) return [{
      label: "IDE",
      value: FPa.jsxs(v, {
        children: [wo("error", theme)(Xe.cross), " Error installing ", displayName, " ", extensionType, ": ", ideInfo.error, `
`, "Please restart your IDE and try again."]
      })
    }];
    if (ideInfo.installed) if (ideServer && ideServer.type === "connected") {
      if (ideInfo.installedVersion !== ideServer.serverInfo?.version) return [{
        label: "IDE",
        value: `Connected to ${displayName} ${extensionType} version ${ideInfo.installedVersion} (server version: ${ideServer.serverInfo?.version})`
      }];else return [{
        label: "IDE",
        value: `Connected to ${displayName} ${extensionType} version ${ideInfo.installedVersion}`
      }];
    } else return [{
      label: "IDE",
      value: `Installed ${displayName} ${extensionType}`
    }];
  } else if (ideServer) {
    let ideDisplayName = NXr(ideServer) ?? "IDE";
    if (ideServer.type === "connected") return [{
      label: "IDE",
      value: `Connected to ${ideDisplayName} extension`
    }];else return [{
      label: "IDE",
      value: `${wo("error", theme)(Xe.cross)} Not connected to ${ideDisplayName}`
    }];
  }
  return [];
}
function getMcpServerLabels(mcpServers = [], theme) {
  let nonIdeServers = mcpServers.filter(server => server.name !== "ide");
  if (!nonIdeServers.length) return [];
  let counts = {
    connected: 0,
    pending: 0,
    needsAuth: 0,
    disabled: 0,
    failed: 0
  };
  for (let server of nonIdeServers) switch (server.type) {
    case "connected":
      counts.connected++;
      break;
    case "pending":
      counts.pending++;
      break;
    case "needs-auth":
      counts.needsAuth++;
      break;
    case "disabled":
      counts.disabled++;
      break;
    case "failed":
      counts.failed++;
      break;
  }
  let parts = [];
  if (counts.connected) parts.push(wo("success", theme)(`${counts.connected} connected`));
  if (counts.needsAuth) parts.push(wo("warning", theme)(`${counts.needsAuth} need auth`));
  if (counts.pending) parts.push(wo("inactive", theme)(`${counts.pending} pending`));
  if (counts.disabled) parts.push(wo("inactive", theme)(`${counts.disabled} disabled`));
  if (counts.failed) parts.push(wo("error", theme)(`${counts.failed} failed`));
  return [{
    label: "MCP servers",
    value: `${parts.join(", ")} ${wo("inactive", theme)("\xB7 /mcp")}`
  }];
}
async function getClaudemdWarningLabels() {
  if (Qse()) return [];
  let claudemdFiles = await qA(),
    oversizedFiles = Ake(claudemdFiles),
    warnings = [],
    sizeLimit = Cke();
  return oversizedFiles.forEach(file => {
    let truncatedPath = dd(file.path);
    warnings.push(`Large ${truncatedPath} will impact performance (${qc(file.content.length)} chars > ${qc(sizeLimit)})`);
  }), warnings;
}
function getSettingSourceLabels() {
  return [{
    label: "Setting sources",
    value: eD().filter(sourceKey => {
      if (sourceKey === "policySettings" && Aoe()) return true;
      let settingsObj = An(sourceKey);
      return settingsObj !== null && Object.keys(settingsObj).length > 0;
    }).map(sourceKey => {
      if (sourceKey === "policySettings") {
        if (Aoe()) return "Enterprise managed settings (helper)";
        let policySource = Qpe();
        if (policySource === null) return null;
        switch (policySource) {
          case "remote":
            return "Enterprise managed settings (remote)";
          case "plist":
            return "Enterprise managed settings (plist)";
          case "hklm":
            return "Enterprise managed settings (HKLM)";
          case "file":
            {
              let {
                hasBase: hasBase,
                hasDropIns: hasDropIns
              } = fbr();
              if (hasBase && hasDropIns) return "Enterprise managed settings (file + drop-ins)";
              if (hasDropIns) return "Enterprise managed settings (drop-ins)";
              return "Enterprise managed settings (file)";
            }
          case "parent":
            return "Enterprise managed settings (parent process)";
          case "hkcu":
            return "Enterprise managed settings (HKCU)";
        }
      }
      return ras(sourceKey);
    }).filter(label => label !== null)
  }];
}
async function getSystemHealthWarnings() {
  return (await aqe()).map(warning => warning.message);
}
async function getUpdatePermissionWarnings() {
  let updateInfo = await oqe(),
    warnings = [],
    {
      errors: settingsErrors
    } = d0e();
  if (settingsErrors.length > 0) {
    let fileList = os(settingsErrors.map(entry => entry.file)).join(", ");
    warnings.push(`Found invalid entries in: ${fileList}.`);
  }
  if (updateInfo.warnings.forEach(warning => {
    warnings.push(warning.issue);
  }), updateInfo.hasUpdatePermissions === false) warnings.push("No write permissions for auto-updates");
  return warnings;
}
function getAuthLabels() {
  let authInfo = VBe();
  if (!authInfo) return [];
  let labels = [];
  if (authInfo.subscription) labels.push({
    label: "Login method",
    value: `${authInfo.subscription} account`
  });
  if (authInfo.tokenSource) labels.push({
    label: "Auth token",
    value: authInfo.tokenSource
  });
  if (authInfo.apiKeySource) labels.push({
    label: "API key",
    value: authInfo.apiKeySource
  });
  if (dE()) labels.push({
    label: "Profile",
    value: zdn()
  });
  if (authInfo.organization && !process.env.IS_DEMO) labels.push({
    label: "Organization",
    value: authInfo.organization
  });
  if (authInfo.email && !process.env.IS_DEMO) labels.push({
    label: "Email",
    value: authInfo.email
  });
  return labels;
}
function getApiProviderLabels() {
  let provider = Rr(),
    labels = [];
  if (provider !== "firstParty") {
    let secondaryProvider = jwt(),
      providerDisplay = secondaryProvider ? `${hQ[provider]} + ${hQ[secondaryProvider]}` : hQ[provider];
    labels.push({
      label: "API provider",
      value: providerDisplay
    });
  }
  if (provider === "firstParty") {
    let baseUrl = process.env.ANTHROPIC_BASE_URL;
    if (baseUrl) labels.push({
      label: "Anthropic base URL",
      value: baseUrl
    });
  } else if (provider === "bedrock") {
    let bedrockBaseUrl = process.env.ANTHROPIC_BEDROCK_BASE_URL;
    if (bedrockBaseUrl) labels.push({
      label: "Bedrock base URL",
      value: bedrockBaseUrl
    });
    labels.push({
      label: "AWS region",
      value: HPa()
    });
    let serviceTier = process.env.ANTHROPIC_BEDROCK_SERVICE_TIER;
    if (serviceTier) labels.push({
      label: "Bedrock service tier",
      value: serviceTier
    });
    if (nt(process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH)) labels.push({
      value: "AWS auth skipped"
    });
  } else if (provider === "vertex") {
    let vertexBaseUrl = process.env.ANTHROPIC_VERTEX_BASE_URL;
    if (vertexBaseUrl) labels.push({
      label: "Vertex base URL",
      value: vertexBaseUrl
    });
    let vertexProject = process.env.ANTHROPIC_VERTEX_PROJECT_ID;
    if (vertexProject) labels.push({
      label: "GCP project",
      value: vertexProject
    });
    if (labels.push({
      label: "Default region",
      value: qJt()
    }), nt(process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH)) labels.push({
      value: "GCP auth skipped"
    });
  } else if (provider === "foundry") {
    let foundryBaseUrl = process.env.ANTHROPIC_FOUNDRY_BASE_URL;
    if (foundryBaseUrl) labels.push({
      label: "Microsoft Foundry base URL",
      value: foundryBaseUrl
    });
    let foundryResource = process.env.ANTHROPIC_FOUNDRY_RESOURCE;
    if (foundryResource) labels.push({
      label: "Microsoft Foundry resource",
      value: foundryResource
    });
    if (nt(process.env.CLAUDE_CODE_SKIP_FOUNDRY_AUTH)) labels.push({
      value: "Microsoft Foundry auth skipped"
    });
  } else if (provider === "anthropicAws") {
    let anthropicAwsBaseUrl = process.env.ANTHROPIC_AWS_BASE_URL;
    if (anthropicAwsBaseUrl) labels.push({
      label: "Claude Platform on AWS base URL",
      value: anthropicAwsBaseUrl
    });
    let workspaceId = process.env.ANTHROPIC_AWS_WORKSPACE_ID;
    if (workspaceId) labels.push({
      label: "Workspace ID",
      value: workspaceId
    });
    if (labels.push({
      label: "AWS region",
      value: b1e()
    }), nt(process.env.CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH)) labels.push({
      value: "Claude Platform on AWS auth skipped"
    });
  } else if (provider === "gateway") {
    let gatewayConfig = z_();
    if (gatewayConfig) labels.push({
      label: "Gateway URL",
      value: gatewayConfig.url
    });
  }
  if (provider === "mantle" || jwt() === "mantle") {
    let mantleBaseUrl = process.env.ANTHROPIC_BEDROCK_MANTLE_BASE_URL;
    if (mantleBaseUrl) labels.push({
      label: "Amazon Bedrock (Mantle) base URL",
      value: mantleBaseUrl
    });
    if (provider === "mantle") labels.push({
      label: "AWS region",
      value: HPa()
    });
    if (nt(process.env.CLAUDE_CODE_SKIP_MANTLE_AUTH)) labels.push({
      value: "Amazon Bedrock (Mantle) auth skipped"
    });
  }
  let proxyUrl = rF();
  if (proxyUrl) labels.push({
    label: "Proxy",
    value: proxyUrl
  });
  let clientCertConfig = u2();
  if (process.env.NODE_EXTRA_CA_CERTS) labels.push({
    label: "Additional CA cert(s)",
    value: process.env.NODE_EXTRA_CA_CERTS
  });
  if (clientCertConfig) {
    if (clientCertConfig.cert && process.env.CLAUDE_CODE_CLIENT_CERT) labels.push({
      label: "mTLS client cert",
      value: process.env.CLAUDE_CODE_CLIENT_CERT
    });
    if (clientCertConfig.key && process.env.CLAUDE_CODE_CLIENT_KEY) labels.push({
      label: "mTLS client key",
      value: process.env.CLAUDE_CODE_CLIENT_KEY
    });
  }
  return labels;
}
function HPa() {
  let {
    region: region,
    source: regionSource
  } = fyr();
  switch (regionSource) {
    case "env":
      return region;
    case "shared-config":
      return `${region} (from AWS config)`;
    case "default":
      return t2(), `${region} (default \u2014 set AWS_REGION or add a region to your AWS config)`;
  }
}
function formatStatusLabels(labelEntries) {
  return S2(labelEntries);
}
var FPa;
var slo = b(() => {
  Zs();
  lt();
  je();
  JJe();
  lo();
  E1e();
  ZR();
  ky();
  c0e();
  dn();
  Xl();
  Xo();
  uS();
  Ro();
  Ps();
  zK();
  rY();
  ey();
  Uh();
  kct();
  wm();
  tNe();
  br();
  FPa = x(oe(), 1);
});

export {reorderByAntOnly as vUn,getEmptyLabels as IPa,getIdeLabels as xPa,getMcpServerLabels as DPa,getClaudemdWarningLabels as PPa,getSettingSourceLabels as OPa,getSystemHealthWarnings as LPa,getUpdatePermissionWarnings as MPa,getAuthLabels as wUn,getApiProviderLabels as kUn,HPa,formatStatusLabels as NPa,FPa,slo};
