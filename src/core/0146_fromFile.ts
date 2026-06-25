// @ts-nocheck
import {runStartupDialog as eT} from "../../vendor/m142.ts";
import {JSt as Ygt,KJt as CKt} from "./0140_key.ts";
import {b} from "../../runtime.ts";
import {o5o as s2o} from "../../vendor/m144.ts";
// @ts-nocheck
function oyq(profileName) {
  if (!profileName) throw Error("profile name is empty");
  if (profileName === "." || profileName === "..") throw Error(`profile name "${profileName}" is not allowed`);
  if (profileName.includes("/") || profileName.includes("\\")) throw Error(`profile name "${profileName}" must not contain path separators`);
  if (!JK1.test(profileName)) throw Error(`profile name "${profileName}" contains disallowed characters (allowed: letters, digits, '_', '.', '-')`);
}
var ql_ = "1.0",
  JK1,
  AY_ = async profileName => (await We6(profileName))?.config ?? null,
  We6 = async profileName => {
    var authForScope, authForServiceAccount;
    let configDir = await Ze6();
    if (configDir === null) return null;
    let resolvedProfile = profileName ?? (await syq());
    if (resolvedProfile === null) return null;
    oyq(resolvedProfile);
    let fs = await import("fs"),
      configPath = (await import("path")).join(configDir, "configs", `${resolvedProfile}.json`),
      fileContents;
    try {
      fileContents = await fs.promises.readFile(configPath, "utf-8");
    } catch (readError) {
      if (readError?.code !== "ENOENT") throw Error(`failed to read config file ${configPath}: ${readError}`);
      fileContents = null;
    }
    if (fileContents === null) {
      let organizationId = eT("ANTHROPIC_ORGANIZATION_ID"),
        identityTokenFile = eT("ANTHROPIC_IDENTITY_TOKEN_FILE"),
        federationRuleId = eT("ANTHROPIC_FEDERATION_RULE_ID");
      if (federationRuleId && organizationId) return {
        fromFile: false,
        config: {
          organization_id: organizationId,
          workspace_id: eT("ANTHROPIC_WORKSPACE_ID"),
          base_url: eT("ANTHROPIC_BASE_URL"),
          authentication: {
            type: "oidc_federation",
            federation_rule_id: federationRuleId,
            service_account_id: eT("ANTHROPIC_SERVICE_ACCOUNT_ID"),
            identity_token: identityTokenFile ? {
              source: "file",
              path: identityTokenFile
            } : undefined,
            scope: eT("ANTHROPIC_SCOPE")
          }
        }
      };
      return null;
    }
    let config;
    try {
      config = JSON.parse(fileContents);
    } catch (parseError) {
      throw Error(`failed to parse config file ${configPath}: ${parseError}`);
    }
    if (!config.authentication) throw Error(`config file ${configPath} is missing "authentication"`);
    let authType = config.authentication.type;
    if (authType !== "oidc_federation" && authType !== "user_oauth") throw Error(`authentication.type "${authType}" is not a known authentication type`);
    if (config.organization_id ?? (config.organization_id = eT("ANTHROPIC_ORGANIZATION_ID")), config.workspace_id ?? (config.workspace_id = eT("ANTHROPIC_WORKSPACE_ID")), config.base_url ?? (config.base_url = eT("ANTHROPIC_BASE_URL")), (authForScope = config.authentication).scope ?? (authForScope.scope = eT("ANTHROPIC_SCOPE")), config.authentication.type === "oidc_federation") {
      if (!config.authentication.identity_token) {
        let identityTokenFile = eT("ANTHROPIC_IDENTITY_TOKEN_FILE");
        if (identityTokenFile) config.authentication.identity_token = {
          source: "file",
          path: identityTokenFile
        };
      }
      if (!config.authentication.federation_rule_id) config.authentication.federation_rule_id = eT("ANTHROPIC_FEDERATION_RULE_ID") ?? "";
      (authForServiceAccount = config.authentication).service_account_id ?? (authForServiceAccount.service_account_id = eT("ANTHROPIC_SERVICE_ACCOUNT_ID"));
    }
    return {
      config: config,
      fromFile: true
    };
  },
  ayq = async () => {
    let config = await AY_(),
      credentialsPath = await IkH(config);
    if (!credentialsPath) return null;
    let fs = await import("fs"),
      fileContents;
    try {
      fileContents = await fs.promises.readFile(credentialsPath, "utf-8");
    } catch (readError) {
      if (readError?.code !== "ENOENT") throw Error(`failed to read credentials file ${credentialsPath}: ${readError}`);
      return null;
    }
    let credentials;
    try {
      credentials = JSON.parse(fileContents);
    } catch (parseError) {
      throw Error(`failed to parse credentials file ${credentialsPath}: ${parseError}`);
    }
    if (credentials.type && credentials.type !== "oauth_token") throw Error(`credentials file ${credentialsPath} has unsupported type "${credentials.type}" (want "oauth_token")`);
    return credentials;
  },
  IkH = async (config, profileName) => {
    if (config?.authentication.credentials_path) return config.authentication.credentials_path;
    let configDir = await Ze6();
    if (!configDir) return null;
    let resolvedProfile = profileName ?? (await syq());
    if (!resolvedProfile) return null;
    return oyq(resolvedProfile), (await import("path")).join(configDir, "credentials", `${resolvedProfile}.json`);
  },
  Ze6 = async () => {
    if (!DK1()) return null;
    let path = await import("path"),
      configDirEnv = eT("ANTHROPIC_CONFIG_DIR");
    if (configDirEnv) return configDirEnv;
    if (Ygt()["X-Stainless-OS"] === "Windows") {
      let appData = eT("APPDATA");
      if (appData) return path.join(appData, "Anthropic");
      let userProfile = eT("USERPROFILE");
      if (userProfile) return path.join(userProfile, "AppData", "Roaming", "Anthropic");
      return null;
    }
    let xdgConfigHome = eT("XDG_CONFIG_HOME");
    if (xdgConfigHome) return path.join(xdgConfigHome, "anthropic");
    let home = eT("HOME");
    if (home) return path.join(home, ".config", "anthropic");
    return null;
  },
  DK1 = () => {
    let runtime = Ygt()["X-Stainless-Runtime"];
    return runtime === "node" || runtime === "deno";
  },
  syq = async () => {
    let configDir = await Ze6();
    if (!configDir) return null;
    let profileEnv = eT("ANTHROPIC_PROFILE");
    if (profileEnv) return profileEnv;
    let fs = await import("fs"),
      activeConfigPath = (await import("path")).join(configDir, "active_config");
    try {
      return (await fs.promises.readFile(activeConfigPath, "utf-8")).trim() || "default";
    } catch (readError) {
      if (readError?.code !== "ENOENT") throw Error(`failed to read ${activeConfigPath}: ${readError}`);
      return "default";
    }
  };
var wY_ = b(() => {
  CKt();
  s2o();
  JK1 = /^[A-Za-z0-9_.-]+$/;
});
export {oyq as s5o,ql_ as nXt,JK1 as Tvc,AY_ as loadConfig,We6 as clr,ayq as loadCredentials,IkH as getCredentialsPath,Ze6 as ulr,DK1 as Svc,syq as a5o,wY_ as tbt};
