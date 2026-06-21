// @ts-nocheck
import {Ok as wZ,Mee as Ue,nKr as hQ8,ab as j2} from "./3178_path.ts";
import {Text as V} from "../../vendor/m2423.ts";
import {No as bq} from "../../vendor/m2421.ts";
import {et as aH,Ai as q7} from "../../vendor/m2208.ts";
import {Zse as sqH,Iy as tf} from "../agent/2230_explicitlyRequested.ts";
import {getMemoryFiles as O2,getLargeMemoryFiles as yPH,getMaxMemoryCharacterCount as VPH,zw as hP} from "./2717_stripHtmlComments.ts";
import {Id as v3,mc as G1} from "./0645_maxBytes.ts";
import {formatNumber as w1,ps as H9} from "../../vendor/m238.ts";
import {$D as fN,ats as Irq,mf as bz} from "../../vendor/m702.ts";
import {woe as y8H,l1e as RVH} from "./0739_level.ts";
import {getSettingsForSource as C6,getPolicySettingsOrigin as ZJ_,getManagedFileSettingsPresence as PO8,yr as N8} from "./0740_updateSettingsForSource.ts";
import {K3e as vuH} from "./3762_level.ts";
import {W3e as NuH,SHe as XZH} from "../../vendor/m3758.ts";
import {EHe as WZH,kat as O7_} from "../../vendor/m3763.ts";
import {fs as T9} from "../api/0459_getOauthConfig.ts";
import {getAccountInformation as yEH,shouldUseWIFAuth as FD,Ao as Mq} from "./2031_withOAuthRefreshLock.ts";
import {getWIFStatusLine as n96,Zze as ziH} from "../../vendor/m1288.ts";
import {getAPIProvider as l8,getSecondaryProvider as zM_,THIRD_PARTY_PROVIDER_LABELS as ys,li as V7} from "../api/1282_usesFirstPartyModelIds.ts";
import {st as q_} from "../../vendor/m5.ts";
import {$7t as Qd_,sn as A6} from "./0047_namespace.ts";
import {xMe as nNH,Fmr as W18,P2 as wF,kMe as GdH} from "../../vendor/m608.ts";
import {getGatewayAuth as Tw,lt as w_} from "../session/0131_sent.ts";
import {getProxyUrl as VS,Z_ as Af} from "./1021_shouldBypassProxyWithCidr.ts";
import {j2 as LI,S7 as El} from "./0746_bytes.ts";
import {modelDisplayString as xm,Mo as iq} from "../permissions/1453_swapShrinksContextWindow.ts";
import {b as L,M as u} from "../../runtime.ts";
import {ze as nH} from "../../vendor/m2452.ts";
import {wY as Fr} from "../../vendor/m3762.ts";
import {Ag as TA} from "../../vendor/m2671.ts";
import {Te as WH} from "../../vendor/m2253.ts";
/**
 * Builds label/value pairs for the status display panel.
 * Covers auth info, API provider, IDE plugin, MCP servers,
 * setting sources, and CLAUDE.md / update-permission warnings.
 */

/** Re-orders groups so that non-ant-only items come first, ant-only items last. */
function reorderByAntOnly(groupArrays: any[][]): any[][] {
  let reordered = groupArrays.map((group: any[]) => group.filter((item: any) => !item.antOnly));
  return reordered.push(groupArrays.flatMap((group: any[]) => group.filter((item: any) => item.antOnly))), reordered;
}

/** Returns an empty label list (used as a no-op placeholder). */
function getEmptyLabels(): any[] {
  return [];
}

/**
 * Builds the "IDE" label entry showing the IDE plugin connection status.
 *
 * @param mcpServers - List of active MCP server descriptors.
 * @param ideInfo    - Optional IDE installation/connection info object.
 * @param theme      - Current colour theme used for styled text helpers.
 */
function getIdeLabels(mcpServers: any[] | undefined, ideInfo: any | null = null, theme: any): any[] {
  let ideServer = mcpServers?.find((server: any) => server.name === "ide");
  if (ideInfo) {
    let displayName = wZ(ideInfo.ideType),
      extensionType = Ue(ideInfo.ideType) ? "plugin" : "extension";
    if (ideInfo.error) return [{
      label: "IDE",
      value: te8.createElement(V, null, bq("error", theme)(aH.cross), " Error installing ", displayName, " ", extensionType, ": ", ideInfo.error, `\n`, "Please restart your IDE and try again.")
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
    let ideDisplayName = hQ8(ideServer) ?? "IDE";
    if (ideServer.type === "connected") return [{
      label: "IDE",
      value: `Connected to ${ideDisplayName} extension`
    }];else return [{
      label: "IDE",
      value: `${bq("error", theme)(aH.cross)} Not connected to ${ideDisplayName}`
    }];
  }
  return [];
}

/**
 * Builds the "MCP servers" label entry summarising connection states
 * for all non-IDE MCP servers.
 *
 * @param mcpServers - List of active MCP server descriptors.
 * @param theme      - Current colour theme used for styled text helpers.
 */
function getMcpServerLabels(mcpServers: any[] = [], theme: any): any[] {
  let nonIdeServers = mcpServers.filter((server: any) => server.name !== "ide");
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
  let parts: string[] = [];
  if (counts.connected) parts.push(bq("success", theme)(`${counts.connected} connected`));
  if (counts.needsAuth) parts.push(bq("warning", theme)(`${counts.needsAuth} need auth`));
  if (counts.pending) parts.push(bq("inactive", theme)(`${counts.pending} pending`));
  if (counts.disabled) parts.push(bq("inactive", theme)(`${counts.disabled} disabled`));
  if (counts.failed) parts.push(bq("error", theme)(`${counts.failed} failed`));
  return [{
    label: "MCP servers",
    value: `${parts.join(", ")} ${bq("inactive", theme)("\xB7 /mcp")}`
  }];
}

/**
 * Asynchronously builds warning strings for oversized CLAUDE.md files
 * that will impact performance.
 */
async function getClaudemdWarningLabels(): Promise<string[]> {
  if (sqH()) return [];
  let claudemdFiles = await O2(),
    oversizedFiles = yPH(claudemdFiles),
    warnings: string[] = [],
    sizeLimit = VPH();
  return oversizedFiles.forEach((file: any) => {
    let truncatedPath = v3(file.path);
    warnings.push(`Large ${truncatedPath} will impact performance (${w1(file.content.length)} chars > ${w1(sizeLimit)})`);
  }), warnings;
}

/** Builds the "Setting sources" label entry listing active configuration sources. */
function getSettingSourceLabels(): any[] {
  return [{
    label: "Setting sources",
    value: fN().filter((sourceKey: string) => {
      if (sourceKey === "policySettings" && y8H()) return !0;
      let settingsObj = C6(sourceKey);
      return settingsObj !== null && Object.keys(settingsObj).length > 0;
    }).map((sourceKey: string) => {
      if (sourceKey === "policySettings") {
        if (y8H()) return "Enterprise managed settings (helper)";
        let policySource = ZJ_();
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
                hasBase,
                hasDropIns
              } = PO8();
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
      return Irq(sourceKey);
    }).filter((label: string | null) => label !== null)
  }];
}

/** Asynchronously fetches system health warning messages. */
async function getSystemHealthWarnings(): Promise<string[]> {
  return (await vuH()).map((warning: any) => warning.message);
}

/** Asynchronously builds warning strings for invalid settings entries and missing update permissions. */
async function getUpdatePermissionWarnings(): Promise<string[]> {
  let updateInfo = await NuH(),
    warnings: string[] = [],
    {
      errors: settingsErrors
    } = WZH();
  if (settingsErrors.length > 0) {
    let fileList = T9(settingsErrors.map((e: any) => e.file)).join(", ");
    warnings.push(`Found invalid entries in: ${fileList}.`);
  }
  if (updateInfo.warnings.forEach((warning: any) => {
    warnings.push(warning.issue);
  }), updateInfo.hasUpdatePermissions === !1) warnings.push("No write permissions for auto-updates");
  return warnings;
}

/** Builds label entries for the current authentication state (login method, token source, email, org, etc.). */
function getAuthLabels(): any[] {
  let authInfo = yEH();
  if (!authInfo) return [];
  let labels: any[] = [];
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
  if (FD()) labels.push({
    label: "Profile",
    value: n96()
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

/** Builds label entries for the API provider configuration (provider, base URL, region, proxy, certs, etc.). */
function getApiProviderLabels(): any[] {
  let provider = l8(),
    labels: any[] = [];
  if (provider !== "firstParty") {
    let secondaryProvider = zM_(),
      providerDisplay = secondaryProvider ? `${ys[provider]} + ${ys[secondaryProvider]}` : ys[provider];
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
      value: getAwsRegionDisplay()
    });
    let serviceTier = process.env.ANTHROPIC_BEDROCK_SERVICE_TIER;
    if (serviceTier) labels.push({
      label: "Bedrock service tier",
      value: serviceTier
    });
    if (q_(process.env.CLAUDE_CODE_SKIP_BEDROCK_AUTH)) labels.push({
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
      value: Qd_()
    }), q_(process.env.CLAUDE_CODE_SKIP_VERTEX_AUTH)) labels.push({
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
    if (q_(process.env.CLAUDE_CODE_SKIP_FOUNDRY_AUTH)) labels.push({
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
      value: nNH()
    }), q_(process.env.CLAUDE_CODE_SKIP_ANTHROPIC_AWS_AUTH)) labels.push({
      value: "Claude Platform on AWS auth skipped"
    });
  } else if (provider === "gateway") {
    let gatewayConfig = Tw();
    if (gatewayConfig) labels.push({
      label: "Gateway URL",
      value: gatewayConfig.url
    });
  }
  if (provider === "mantle" || zM_() === "mantle") {
    let mantleBaseUrl = process.env.ANTHROPIC_BEDROCK_MANTLE_BASE_URL;
    if (mantleBaseUrl) labels.push({
      label: "Amazon Bedrock (Mantle) base URL",
      value: mantleBaseUrl
    });
    if (provider === "mantle") labels.push({
      label: "AWS region",
      value: getAwsRegionDisplay()
    });
    if (q_(process.env.CLAUDE_CODE_SKIP_MANTLE_AUTH)) labels.push({
      value: "Amazon Bedrock (Mantle) auth skipped"
    });
  }
  let proxyUrl = VS();
  if (proxyUrl) labels.push({
    label: "Proxy",
    value: proxyUrl
  });
  let clientCertConfig = LI();
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

/** Returns a human-readable AWS region string, noting the configuration source. */
function getAwsRegionDisplay(): string {
  let {
    region,
    source: regionSource
  } = W18();
  switch (regionSource) {
    case "env":
      return region;
    case "shared-config":
      return `${region} (from AWS config)`;
    case "default":
      return wF(), `${region} (default — set AWS_REGION or add a region to your AWS config)`;
  }
}

/** Formats an array of label entries into display strings. */
function formatStatusLabels(labelEntries: any): any {
  return xm(labelEntries);
}

var te8: any; // React namespace
var initLabels = L(() => {
  q7();
  w_();
  nH();
  ziH();
  Mq();
  GdH();
  hP();
  tf();
  XZH();
  A6();
  G1();
  H9();
  j2();
  iq();
  V7();
  El();
  Fr();
  Af();
  TA();
  O7_();
  bz();
  RVH();
  N8();
  te8 = u(WH(), 1);
});

export {reorderByAntOnly as LNn,getEmptyLabels as pRa,getIdeLabels as mRa,getMcpServerLabels as fRa,getClaudemdWarningLabels as ARa,getSettingSourceLabels as hRa,getSystemHealthWarnings as gRa,getUpdatePermissionWarnings as _Ra,getAuthLabels as MNn,getApiProviderLabels as NNn,getAwsRegionDisplay as dRa,formatStatusLabels as yRa,te8 as Sro,initLabels as bro};
