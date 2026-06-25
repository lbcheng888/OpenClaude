// @ts-nocheck
import {or as $8,dn as w6} from "../config/0137_namespace.ts";
import {findGitRoot as y5,ia as mK} from "../../vendor/m698.ts";
import {S5e as gpH,Xq as YU} from "./5220_bigint.ts";
import {the as wzH,oz as at} from "../../vendor/m2254.ts";
import {cn as L6,Ct as G_} from "../../vendor/m197.ts";
import {invalidateWorkflowCache as dI6,rqt as sI_} from "../../vendor/m4196.ts";
import {Mm as Lz,HIo as RMq} from "../tools/5174_toSlashCommands.ts";
import {GA as L2,Rll as nsK} from "./4451_tryGetPDFReference.ts";
import {logEvent as c,kt as E_} from "../../vendor/m132.ts";
import {Le as cH} from "../../vendor/m5.ts";
import {b as L} from "../../runtime.ts";
// @ts-nocheck
function getWorkflowsDir(scope, cwd) {
  if (scope === "user") return fsPathModule.join($8(), "workflows");
  let gitRoot = y5(cwd);
  if (gitRoot === null) return fsPathModule.join(cwd, ".claude", "workflows");
  let projectClaudePath = gpH("workflows", cwd)[0];
  if (projectClaudePath !== undefined) return projectClaudePath;
  return fsPathModule.join(gitRoot, ".claude", "workflows");
}
async function fJ4(workflowDef) {
  let sanitizedName = wzH(workflowDef.name),
    workflowsDir = getWorkflowsDir(workflowDef.scope, workflowDef.cwd),
    filePath = fsPathModule.join(workflowsDir, `${sanitizedName}.js`);
  await fsPromisesModule.mkdir(workflowsDir, {
    recursive: true,
    mode: 448
  });
  try {
    await fsPromisesModule.writeFile(filePath, workflowDef.script, {
      encoding: "utf8",
      mode: 384,
      flag: workflowDef.overwrite ? "w" : "wx"
    });
  } catch (err) {
    if (L6(err) === "EEXIST") throw Error(`Dynamic workflow "${sanitizedName}" already exists at ${filePath}. Use a different name or overwrite.`);
    throw err;
  }
  dI6();
  let [{
    clearCommandMemoizationCaches: clearCommandMemoizationCaches
  }, {
    resetSentSkillNames: resetSentSkillNames
  }] = await Promise.all([Promise.resolve().then(() => (Lz(), RMq)), Promise.resolve().then(() => (L2(), nsK))]);
  return clearCommandMemoizationCaches(), resetSentSkillNames(), c("tengu_workflow_saved", {
    scope: cH(workflowDef.scope),
    overwrite: workflowDef.overwrite,
    script_size_chars: workflowDef.script.length
  }), {
    name: sanitizedName,
    path: filePath,
    scope: workflowDef.scope
  };
}
var fsPromisesModule, fsPathModule;
var jJ4 = L(() => {
  E_();
  w6();
  G_();
  mK();
  YU();
  sI_();
  at();
  fsPromisesModule = require("fs/promises"), fsPathModule = require("path");
});
export {getWorkflowsDir as ufm,fJ4 as b0l,fsPromisesModule as Fjn,fsPathModule as wGt,jJ4 as E0l};
