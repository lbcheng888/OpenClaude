// @ts-nocheck
import {_g,zR} from "../../vendor/m2562.ts";
import {_r,ui} from "../../vendor/m2463.ts";
import {He,mn} from "../telemetry/0600_feature_name.ts";
import {FLi,zRn,J2} from "../session/2532_id.ts";
import {formatRelativeTimeAgo as gK,Xo} from "../../vendor/m240.ts";
import {sn,mc} from "../../vendor/m237.ts";
import {yI,gwe} from "./2556_current.ts";
import {Or,ss} from "../../vendor/m2553.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {Le} from "../../vendor/m5.ts";
import {Jjn,GIo} from "../../vendor/m4918.ts";
import {Text as v} from "../../vendor/m2433.ts";
import {at,Wo} from "../../vendor/m2557.ts";
import {truncateToWidth as xs} from "../../vendor/m239.ts";
import {DN,ppe} from "../../vendor/m238.ts";
import {Box as $} from "../../vendor/m2432.ts";
import {FO,uj} from "../../vendor/m2812.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
/**
 * Semantic restoration for tui/5374_initialQuery.ts.
 * Cross-module bundled symbols and export names are intentionally preserved.
 */
type UnknownRecord = Record<string, any>;
type UnknownFn = (...args: any[]) => any;

// FIXME: unverified name
/** Internal restored helper: history-search prompt picker UI. Behavior preserved. */
function fjl({
  initialQuery: initialQuery,
  onSelect: onSelect,
  onCancel: onCancel
}: any): any {
  _g("history-search");
  let {
      columns: columns
    } = _r(),
    [scope, setScope] = Vne.useState("everywhere"),
    [results, setResults] = Vne.useState(null),
    [query, setQuery] = Vne.useState(initialQuery ?? ""),
    cacheRef = Vne.useRef({});
  Vne.useEffect((): any => {
    He("history_search_open");
  }, []), Vne.useEffect((): any => {
    let cached = cacheRef.current[scope];
    if (cached) {
      setResults(cached);
      return;
    }
    setResults(null);
    let cancelled = !1;
    return (async (): Promise<any> => {
      let iterator = FLi(scope),
        accumulated = [];
      for await (let entry of iterator) {
        if (cancelled) {
          iterator.return(void 0);
          return;
        }
        let display = entry.display,
          newlineIndex = display.indexOf(`
`),
          relativeAge = gK(new Date(entry.timestamp));
        accumulated.push({
          entry: entry,
          display: display,
          lower: display.toLowerCase(),
          firstLine: newlineIndex === -1 ? display : display.slice(0, newlineIndex),
          age: relativeAge + " ".repeat(Math.max(0, mjl - sn(relativeAge)))
        });
      }
      if (!cancelled) cacheRef.current[scope] = accumulated, setResults(accumulated);
    })(), (): any => {
      cancelled = !0;
    };
  }, [scope]);
  let cycleScopeChord = yI("historySearch:cycleScope", "HistorySearch", "ctrl+s");
  Or("historySearch:cycleScope", (): any => {
    let currentIndex = zRn.indexOf(scope),
      nextScope = zRn[(currentIndex + 1) % zRn.length];
    setScope(nextScope), W("tengu_history_picker_scope", {
      from: Le(scope),
      to: Le(nextScope)
    });
  }, {
    context: "HistorySearch"
  });
  let filtered = Vne.useMemo((): any => {
      if (!results) return [];
      let needle = query.trim().toLowerCase();
      if (!needle) return results;
      let exactMatches = [],
        subsequenceMatches = [];
      for (let item of results) if (item.lower.includes(needle)) exactMatches.push(item);else if (fFm(item.lower, needle)) subsequenceMatches.push(item);
      return exactMatches.concat(subsequenceMatches);
    }, [results, query]),
    isWide = columns >= 100,
    listWidth = isWide ? Math.floor((columns - 6) * 0.5) : columns - 6,
    firstLineWidth = Math.max(20, listWidth - mjl - 1),
    previewWidth = isWide ? Math.max(20, columns - listWidth - 12) : Math.max(20, columns - 10);
  return WJ.jsx(Jjn, {
    title: WJ.jsxs(v, {
      children: ["Search prompts ", WJ.jsxs(v, {
        color: "suggestion",
        children: ["\xB7 ", scope]
      })]
    }),
    placeholder: "Filter history…",
    initialQuery: initialQuery,
    items: filtered,
    getKey: (item: any): any => String(item.entry.timestamp),
    onQueryChange: setQuery,
    onSelect: (item: any): any => {
      W("tengu_history_picker_select", {
        result_count: filtered.length,
        query_length: query.length
      }), item.entry.resolve().then(onSelect);
    },
    onCancel: onCancel,
    resetKey: scope,
    extraHints: WJ.jsx(at, {
      chord: cycleScopeChord,
      action: "scope"
    }),
    emptyMessage: (hasQuery: any): any => results === null ? "Loading…" : hasQuery ? "No matching prompts" : "No history yet",
    selectAction: "use",
    direction: "up",
    previewPosition: isWide ? "right" : "bottom",
    renderItem: (item: any, isSelected: any): any => WJ.jsxs(v, {
      children: [WJ.jsx(v, {
        dimColor: !0,
        children: item.age
      }), WJ.jsxs(v, {
        color: isSelected ? "suggestion" : void 0,
        children: [" ", xs(item.firstLine, firstLineWidth)]
      })]
    }),
    renderPreview: (item: any): any => {
      let lines = DN(item.display, previewWidth, {
          hard: !0
        }).split(`
`).filter((line: any): any => line.trim() !== ""),
        overflow = lines.length > xer,
        visibleLines = lines.slice(0, overflow ? xer - 1 : xer),
        hiddenCount = lines.length - visibleLines.length;
      return WJ.jsxs($, {
        flexDirection: "column",
        borderStyle: "round",
        borderDimColor: !0,
        paddingX: 1,
        height: xer + 2,
        children: [visibleLines.map((line: any, lineIndex: any): any => WJ.jsx(v, {
          dimColor: !0,
          children: line
        }, lineIndex)), WJ.jsx(FO, {
          count: hiddenCount
        })]
      });
    }
  });
}
/** Internal restored helper: checks whether `needle` is a subsequence of `haystack`. */
function fFm(haystack: any, needle: any): any {
  let matched = 0;
  for (let i = 0; i < haystack.length && matched < needle.length; i++) if (haystack[i] === needle[matched]) matched++;
  return matched === needle.length;
}
var Vne,
  WJ,
  xer = 6,
  mjl = 8;
var hjl = b((): any => {
  zR();
  J2();
  ui();
  mc();
  ppe();
  je();
  gwe();
  ss();
  mn();
  kt();
  Xo();
  GIo();
  Wo();
  uj();
  Vne = x(et(), 1), WJ = x(oe(), 1);
});

export {fjl,fFm,Vne,WJ,xer,mjl,hjl};
