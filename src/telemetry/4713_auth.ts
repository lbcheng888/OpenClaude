// @ts-nocheck
import {b,x as L} from "../../runtime.ts";
import {Wi as na,Hn as bn} from "../../vendor/m100.ts";
import {qe as je,logForDebugging as v} from "../config/0236_setHasFormattedOutput.ts";
import {jn as Yn,getFeatureValue_CACHED_MAY_BE_STALE as ut} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {lT as dT,Vs as ei} from "../../vendor/m2195.ts";
import {et as Te} from "../../vendor/m2261.ts";
// @ts-nocheck
function isValidSkillHealth(value) {
  return typeof value === "string" && VALID_HEALTH_VALUES.has(value);
}
function useSkillHealthMap() {
  let [skillHealthMap, setSkillHealthMap] = EU6.useState(null);
  return EU6.useEffect(() => {
    let cancelled = false;
    return fetchSkillHealthMap().then(result => {
      if (!cancelled && result) setSkillHealthMap(result);
    }), () => {
      cancelled = true;
    };
  }, []), skillHealthMap;
}
var EU6, VALID_HEALTH_VALUES, fetchSkillHealthMap;
var VALID_HEALTH_VALUES_2 = b(() => {
  na();
  je();
  Yn();
  dT();
  EU6 = L(Te(), 1), VALID_HEALTH_VALUES = new Set(["good", "warn", "poor"]);
  fetchSkillHealthMap = bn(async () => {
    if (!ut("tengu_skills_dashboard_enabled", false)) return null;
    try {
      let e = await ei.get("/api/claude_code/skills", {
        auth: "async",
        timeout: 5000,
        validateStatus: () => true
      });
      if (!e.ok) return v(`Skill health fetch skipped: ${e.reason}`), null;
      if (e.status >= 400) return v(`Skill health fetch skipped: status ${e.status}`), null;
      let t = e.data?.skills;
      if (!Array.isArray(t)) return null;
      let n = new Map();
      for (let r of t) if (r.skill_name && isValidSkillHealth(r.health)) n.set(r.skill_name, r.health);
      return n;
    } catch (e) {
      return v(`Skill health fetch skipped: ${e}`), null;
    }
  });
});
export {isValidSkillHealth as Kom,useSkillHealthMap as zbl,EU6 as j7n,VALID_HEALTH_VALUES as Vom,fetchSkillHealthMap as zom,VALID_HEALTH_VALUES_2 as jbl};
