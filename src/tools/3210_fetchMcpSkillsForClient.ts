// @ts-nocheck
import {ft as isFullscreenWithTTY,b} from "../../runtime.ts";
import {jre as Jre,Qy as YT} from "./0325_ttl.ts";
import {HW as mW,Vst as qe} from "../../vendor/m3165.ts";
import {kj as Xz,fQr as PKr,xla as wta,Dla as Rta} from "../../vendor/m3208.ts";
import {ln as on,Vc as wu,vn as u8} from "../session/0621_length.ts";
import {Pt as isTmuxControlMode,xe as Oe,He as Ie,mn as ln} from "../telemetry/0600_feature_name.ts";
import {qt,tn as oHn} from "../config/0230_encoding.ts";
import {Ce as Se,cn as dn,Ct as Cv} from "../../vendor/m197.ts";
import {bFt as WMt,t3e as z$e,SFt as jMt,vDn as LHn,wDn as MHn,kDn as NHn} from "../../vendor/m3207.ts";
import {O$ as defineTool,Kst as Yrt,W9e as Xt} from "../../vendor/m3167.ts";
import {xf as RA,HA as Rn} from "../../vendor/m2219.ts";
import {ac as collectFlagValueIndexes} from "../mcp/0733_serverName.ts";
import {Sla as zQi} from "../../vendor/m3206.ts";
import {q9e as Wrt,VNt as Pee} from "../../vendor/m3166.ts";
import {ep as Dp} from "../../vendor/m2223.ts";
import {Qr as Xr} from "../../vendor/m323.ts";
import {kee as Grt,Usa as WQi} from "../telemetry/3165_kee.ts";
import {qe as bt,logForDebugging} from "../config/0236_setHasFormattedOutput.ts";
import {IA as Ev} from "../telemetry/2225_names.ts";
import {v5 as F$e,Lv as CR} from "../../vendor/m643.ts";
import {ve as we} from "../../vendor/m461.ts";
import {C as E} from "../../vendor/m321.ts";
import {AWi as P9i} from "../../vendor/m2809.ts";
var LKr = {};
isFullscreenWithTTY(LKr, {
  fetchMcpSkillsForClient: () => fetchMcpSkillsForClient
});

/**
 * Fetches the skill index from a MCP client's skill://index.json resource,
 * returning lists of direct (SKILL.md URL) and archive skills.
 */
async function C3d(mcpClient: any): Promise<{
  direct: any[];
  archives: any[];
}> {
  let result = {
      direct: [],
      archives: []
    },
    rawText: any;
  try {
    // Request the skill index resource from the MCP server
    let indexContent = (await mcpClient.client.request({
      method: "resources/read",
      params: {
        uri: rot
      }
    }, Jre, {
      timeout: mW()
    })).contents?.find((item: any) => "text" in item && typeof item.text === "string");
    if (!indexContent || !("text" in indexContent)) return result;
    if (rawText = String(indexContent.text), rawText.length > Xz) return on(mcpClient.name, `${rot} exceeds ${Xz / 1e6}MB, skipping skill discovery`), isTmuxControlMode("skill_mcp_load", "skill_mcp_index_too_large"), result;
  } catch {
    return result;
  }
  let parsed: any;
  try {
    parsed = qt(rawText);
  } catch (err: any) {
    return on(mcpClient.name, `${rot} is not valid JSON (${Se(err)}) — skipping skill discovery`), isTmuxControlMode("skill_mcp_load", "skill_mcp_index_invalid_json"), result;
  }
  let validated = b3d().safeParse(parsed);
  if (!validated.success) return on(mcpClient.name, `${rot} does not match the discovery schema — skipping skill discovery`), isTmuxControlMode("skill_mcp_load", "skill_mcp_index_schema_invalid"), result;
  let directSkills: any[] = [],
    archiveSkills: any[] = [];
  for (let skill of validated.data.skills) {
    let skillName = kta(skill.frontmatter?.name);
    if (!skillName) continue;
    // Direct URL: skill is served as a plain SKILL.md resource
    if (skill.url) {
      directSkills.push({
        name: skillName,
        url: skill.url,
        digest: skill.digest
      });
      continue;
    }
    // Archive: find the first archive entry with a supported MIME type
    let matchedArchive = skill.archives?.find((archiveEntry: any) => !!archiveEntry.url && PKr(archiveEntry.mimeType ?? void 0, archiveEntry.url) !== null);
    if (matchedArchive?.url) archiveSkills.push({
      name: skillName,
      url: matchedArchive.url,
      description: kta(skill.frontmatter?.description) ?? "",
      mimeType: matchedArchive.mimeType ?? void 0,
      digest: matchedArchive.digest
    });
  }
  let droppedCount = validated.data.skills.length - directSkills.length - archiveSkills.length;
  if (droppedCount > 0) on(mcpClient.name, `${droppedCount} ${rot} entr${droppedCount === 1 ? "y" : "ies"} skipped (malformed or missing required fields)`), isTmuxControlMode("skill_mcp_load", "skill_mcp_index_entries_dropped");
  let directSlice = directSkills.slice(0, xta);
  return {
    direct: directSlice,
    archives: archiveSkills.slice(0, xta - directSlice.length)
  };
}

/** Returns the string value if non-empty, otherwise undefined. */
function kta(value: any): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : void 0;
}

/**
 * Loads a direct (plain SKILL.md) skill, using cache if available,
 * otherwise fetching from the MCP resource.
 */
async function v3d(mcpClient: any, skillEntry: any, skillHandlers: any, onError: any): Promise<any> {
  let cacheResult = await WMt(mcpClient.name, skillEntry);
  if (cacheResult.hit) return on(mcpClient.name, `Skill '${skillEntry.name}' cache hit — no resources/read`), BHn(mcpClient, skillEntry.url, skillEntry.name, cacheResult.skillMd, skillHandlers);
  return w3d(mcpClient, skillEntry.url, skillEntry.name, skillHandlers, onError, {
    cacheEntry: skillEntry
  });
}

/**
 * Fetches SKILL.md content from the given resource URL, verifies digest,
 * caches the result, and builds the skill command.
 */
async function w3d(mcpClient: any, resourceUrl: any, skillName: any, skillHandlers: any, onError: any, cacheOptions: any): Promise<any> {
  try {
    // Read the skill resource content
    let resourceContent = (await mcpClient.client.request({
      method: "resources/read",
      params: {
        uri: resourceUrl
      }
    }, Jre, {
      timeout: mW()
    })).contents?.find((item: any) => "text" in item && typeof item.text === "string");
    if (!resourceContent || !("text" in resourceContent)) return on(mcpClient.name, `Skill resource ${resourceUrl} has no text content`), onError("skill_mcp_no_text_content"), null;
    if (resourceContent.text.length > Xz) return on(mcpClient.name, `Skill resource ${resourceUrl} exceeds ${Xz / 1e6}MB, skipping`), onError("skill_mcp_content_too_large"), null;
    let skillMd = String(resourceContent.text),
      expectedDigest = z$e(cacheOptions?.cacheEntry?.digest ?? void 0),
      actualDigest = jMt(skillMd);
    // Verify digest integrity if index declared one
    if (expectedDigest && expectedDigest !== actualDigest) return wu(mcpClient.name, `SKILL.md digest mismatch for ${resourceUrl}: index declares ${expectedDigest.slice(0, 12)}…, served content hashes to ${actualDigest.slice(0, 12)}…`), onError("skill_mcp_skill_md_digest_mismatch"), null;
    if (cacheOptions?.cacheEntry) await R3d(mcpClient.name, cacheOptions.cacheEntry, skillMd, actualDigest);
    return BHn(mcpClient, resourceUrl, skillName, skillMd, skillHandlers);
  } catch (err: any) {
    return wu(mcpClient.name, `Failed to load MCP skill from ${resourceUrl}: ${Se(err)}`), onError("skill_mcp_fetch_failed"), null;
  }
}

/**
 * Persists SKILL.md to the local cache directory using atomic rename.
 */
async function R3d(serverName: any, cacheEntry: any, skillMd: any, actualDigest: any): Promise<void> {
  try {
    let resolvedDigest = z$e(cacheEntry.digest ?? void 0) ?? actualDigest,
      {
        slugDir,
        keyDir,
        alreadyExtracted
      } = await LHn(serverName, cacheEntry, resolvedDigest);
    if (!alreadyExtracted) {
      // Write to a tmp dir then atomically rename to avoid partial reads
      let tmpDir = OKr.join(slugDir, `.tmp-${process.pid}-${Hta.randomBytes(4).toString("hex")}`);
      await oke.mkdir(tmpDir, {
        recursive: !0
      });
      try {
        await oke.writeFile(OKr.join(tmpDir, "SKILL.md"), skillMd), await oke.rename(tmpDir, keyDir);
      } catch (renameErr: any) {
        if (await oke.rm(tmpDir, {
          recursive: !0,
          force: !0
        }).catch(() => {}), dn(renameErr) !== "EEXIST" && dn(renameErr) !== "ENOTEMPTY") throw renameErr;
      }
    }
    await MHn(slugDir, cacheEntry, resolvedDigest);
  } catch (err: any) {
    on(serverName, `Failed to cache SKILL.md for '${cacheEntry.name}': ${Se(err)}`);
  }
}

/**
 * Parses SKILL.md content, validates frontmatter, and constructs the tool
 * command object for use in the session.
 */
function BHn(mcpClient: any, resourceUrl: any, skillName: any, skillMdContent: any, {
  createSkillCommand,
  parseSkillFrontmatterFields
}: any, baseDir?: any): any {
  let toolDef = defineTool(skillMdContent),
    {
      frontmatter,
      content
    } = RA(toolDef, resourceUrl, {
      normalizeKeys: !0
    }),
    parsedFields = parseSkillFrontmatterFields(frontmatter, content, skillName),
    skillSlug = collectFlagValueIndexes(skillName);
  // Hooks and allowedTools are intentionally ignored for MCP-sourced skills
  if (parsedFields.hooks) on(mcpClient.name, `Skill '${skillSlug}' declared hooks in frontmatter — ignored (MCP-sourced skills cannot register hooks)`);
  if (parsedFields.allowedTools.length > 0) on(mcpClient.name, `Skill '${skillSlug}' declared allowed-tools in frontmatter — ignored (MCP-sourced skills cannot bypass permissions)`);
  let qualifiedName = `${collectFlagValueIndexes(mcpClient.name)}:${skillSlug}`,
    resourceRoot = zQi(resourceUrl),
    mcpResourceRoot = !baseDir && resourceRoot ? {
      server: Yrt(mcpClient.name),
      uri: Yrt(resourceRoot),
      directoryRead: Wrt(mcpClient.capabilities)
    } : void 0;
  return on(mcpClient.name, `Loaded MCP skill '${skillSlug}' from ${resourceUrl}`), createSkillCommand({
    ...parsedFields,
    hooks: void 0,
    allowedTools: [],
    executionContext: void 0,
    agent: void 0,
    model: void 0,
    effort: void 0,
    shell: void 0,
    skillName: qualifiedName,
    markdownContent: content,
    source: "mcp",
    baseDir,
    mcpResourceRoot,
    loadedFrom: "mcp",
    paths: void 0
  });
}

/**
 * Handles an archive-based skill: checks cache at connect time,
 * returns a lazy prompt command that downloads and unpacks on first use.
 */
async function x3d(mcpClient: any, archiveEntry: any, skillHandlers: any, onError: any): Promise<any> {
  let serverSlug = collectFlagValueIndexes(mcpClient.name),
    archiveSlug = collectFlagValueIndexes(archiveEntry.name),
    qualifiedName = `${serverSlug}:${archiveSlug}`,
    cacheResult = await WMt(mcpClient.name, archiveEntry);
  if (cacheResult.hit) return on(mcpClient.name, `Archive skill '${archiveEntry.name}' cache hit at connect — no download`), BHn(mcpClient, archiveEntry.url, archiveEntry.name, cacheResult.skillMd, skillHandlers, cacheResult.dir);
  let inflightPromise: any = null;
  return {
    type: "prompt",
    name: qualifiedName,
    description: archiveEntry.description,
    isMcp: !0,
    isHidden: !1,
    userInvocable: !0,
    loadedFrom: "mcp",
    source: "mcp",
    contentLength: 0,
    progressMessage: `Downloading skill archive from ${serverSlug}`,
    allowedTools: [],
    userFacingName: () => archiveSlug,
    async getPromptForCommand(cmdArgs: any, cmdCtx: any) {
      let connectedClient = await skillHandlers.ensureConnectedClient(mcpClient);
      inflightPromise ??= wta(connectedClient, archiveEntry);
      let unpackResult: any;
      try {
        unpackResult = await inflightPromise;
      } catch (unpackErr: any) {
        inflightPromise = null, unpackResult = {
          errorCode: "skill_mcp_archive_unpack_failed",
          message: Se(unpackErr)
        };
      }
      if ("errorCode" in unpackResult) return inflightPromise = null, wu(mcpClient.name, unpackResult.message), Oe("skill_mcp_load", unpackResult.errorCode, {
        mcp_server_sha12: Dp(mcpClient.name)
      }), onError(unpackResult.errorCode), [{
        type: "text",
        text: `Error: failed to load archive skill '${archiveEntry.name}' from MCP server '${mcpClient.name}': ${unpackResult.message}`
      }];
      let builtSkill = BHn(mcpClient, archiveEntry.url, archiveEntry.name, unpackResult.skillMd, skillHandlers, unpackResult.baseDir);
      if (builtSkill.type !== "prompt") return [{
        type: "text",
        text: `Error: archive skill '${archiveEntry.name}' did not build as a prompt command`
      }];
      return Ie("skill_mcp_load"), builtSkill.getPromptForCommand(cmdArgs, cmdCtx);
    }
  };
}
var Hta,
  oke,
  OKr,
  rot = "skill://index.json",
  xta = 100,
  S3d = 20,
  b3d,
  fetchMcpSkillsForClient;
var MKr = b(() => {
  YT();
  Xr();
  ln();
  Pee();
  Grt();
  qe();
  bt();
  Cv();
  Ev();
  Rn();
  u8();
  F$e();
  Xt();
  oHn();
  Rta();
  NHn();
  Hta = require("crypto"), oke = require("fs/promises"), OKr = require("path"), b3d = we(() => E.object({
    skills: E.array(E.looseObject({
      frontmatter: E.record(E.string(), E.unknown()).nullish(),
      url: E.string().nullish(),
      digest: E.string().nullish(),
      archives: E.array(E.looseObject({
        url: E.string().nullish(),
        mimeType: E.string().nullish(),
        digest: E.string().nullish()
      }).catch({})).nullish()
    }).catch({}))
  })), fetchMcpSkillsForClient = CR(async (mcpClient: any) => {
    if (!WQi(mcpClient.capabilities)) return [];
    let {
      direct: directSkills,
      archives: archiveSkills
    } = await C3d(mcpClient);
    if (directSkills.length === 0 && archiveSkills.length === 0) return [];
    on(mcpClient.name, `Found ${directSkills.length} direct skill(s) and ${archiveSkills.length} archive skill(s) in ${rot}`);
    let skillHandlers = P9i(),
      firstError: any = null,
      recordError = (errorCode: any) => {
        firstError = errorCode;
      },
      [directResults, archiveResults] = await Promise.all([Promise.all(directSkills.map((skillEntry: any) => v3d(mcpClient, skillEntry, skillHandlers, recordError))), Promise.all(archiveSkills.map((archiveEntry: any) => x3d(mcpClient, archiveEntry, skillHandlers, recordError)))]),
      loadedSkills = [...directResults.filter((skill: any) => skill !== null), ...archiveResults.filter((skill: any) => skill !== null)];
    if (firstError) Oe("skill_mcp_load", firstError, {
      mcp_server_sha12: Dp(mcpClient.name)
    });else if (loadedSkills.length > 0) Ie("skill_mcp_load");
    if (loadedSkills.length > 0) logForDebugging(`[mcp-skills] Loaded ${loadedSkills.length} skills from MCP server '${mcpClient.name}'`);
    return loadedSkills;
  }, (mcpClient: any) => mcpClient.name, S3d);
});
export {LKr as gQr,C3d as lzd,kta as Ola,v3d as czd,w3d as uzd,R3d as dzd,BHn as HDn,x3d as pzd,Hta as Lla,oke as zHe,OKr as hQr,rot as rit,xta as Pla,S3d as szd,b3d as izd,fetchMcpSkillsForClient,MKr as _Qr};
