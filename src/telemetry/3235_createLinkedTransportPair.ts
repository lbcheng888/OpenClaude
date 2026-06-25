// @ts-nocheck
import {ft as pt,b} from "../../runtime.ts";
import {fUe as zBe,n$r as U1r} from "./2202_n$r.ts";
import {getFeatureValue_CACHED_MAY_BE_STALE,jn as Yn} from "../api/2204_stopPeriodicGrowthBookRefresh.ts";
import {logForDebugging,qe as je} from "../config/0236_setHasFormattedOutput.ts";
import {shouldSampleEvent,logEventTo1P,logEventTo1PAwaitable,GM as S1} from "../session/2203_shutdown1PEventLogging.ts";
import {trackDatadogEvent,Q7 as JQ} from "../permissions/5229_trackDatadogEvent.ts";
import {stripProtoFields,attachAnalyticsSink,kt as Ct} from "../../vendor/m132.ts";
// @ts-nocheck
// 创建内存双向链接传输对，并集成分析事件上报（1P + Datadog）

declare const pt: any;
declare const b: any;
declare const zBe: any;
declare const U1r: any;
declare const getFeatureValue_CACHED_MAY_BE_STALE: any;
declare const Yn: any;
declare const logForDebugging: any;
declare const je: any;
declare const shouldSampleEvent: any;
declare const logEventTo1P: any;
declare const logEventTo1PAwaitable: any;
declare const S1: any;
declare const trackDatadogEvent: any;
declare const JQ: any;
declare const stripProtoFields: any;
declare const attachAnalyticsSink: any;
declare const Ct: any;
var moduleExports = {};
pt(moduleExports, {
  createLinkedTransportPair: () => createLinkedTransportPair
});

/** 内存传输实现：两端通过 peer 引用互发消息，关闭时同步通知对端 */
class InMemoryTransport {
  peer: InMemoryTransport | undefined;
  closed = !1;
  onclose: (() => void) | undefined;
  onerror: ((err: Error) => void) | undefined;
  onmessage: ((msg: any) => void) | undefined;
  _setPeer(peer: InMemoryTransport) {
    this.peer = peer;
  }
  async start() {}
  async send(msg: any) {
    if (this.closed) throw Error("Transport is closed");
    queueMicrotask(() => {
      this.peer?.onmessage?.(msg);
    });
  }
  async close() {
    if (this.closed) return;
    if (this.closed = !0, this.onclose?.(), this.peer && !this.peer.closed) this.peer.closed = !0, this.peer.onclose?.();
  }
}

/** 创建一对互联的内存传输，分别代表 MCP 客户端/服务端两端 */
function createLinkedTransportPair(): [InMemoryTransport, InMemoryTransport] {
  let clientTransport = new InMemoryTransport(),
    serverTransport = new InMemoryTransport();
  return clientTransport._setPeer(serverTransport), serverTransport._setPeer(clientTransport), [clientTransport, serverTransport];
}
var analyticsModuleExports = {};
pt(analyticsModuleExports, {
  shouldTrackDatadog: () => shouldTrackDatadog,
  initializeAnalyticsSink: () => initializeAnalyticsSink
});

/** 判断是否应将事件上报到 Datadog（受特性开关控制） */
function shouldTrackDatadog(): boolean {
  if (zBe("datadog")) return !1;
  try {
    return getFeatureValue_CACHED_MAY_BE_STALE(FEATURE_FLAG_LOG_DATADOG, !1);
  } catch {
    return !1;
  }
}

/** 防重入保护：同步上报事件到 1P（首选）和 Datadog */
function logEventSync(eventName: string, eventProps: Record<string, any>) {
  if (isCollectingMetadata) {
    logForDebugging(`logEvent reentered while collecting metadata — dropped ${eventName}. A getEventMetadata dependency (model/betas/auth) called logEvent synchronously; defer it (queueMicrotask) or move it out of the metadata path.`, {
      level: "error"
    });
    return;
  }
  isCollectingMetadata = !0;
  try {
    let sampleRate = shouldSampleEvent(eventName);
    if (sampleRate === 0) return;
    let propsWithSampleRate = sampleRate !== null ? {
      ...eventProps,
      sample_rate: sampleRate
    } : eventProps;
    if (shouldTrackDatadog()) trackDatadogEvent(eventName, stripProtoFields(propsWithSampleRate));
    logEventTo1P(eventName, propsWithSampleRate);
  } finally {
    isCollectingMetadata = !1;
  }
}

/** 异步上报事件到 1P 和 Datadog，等待全部完成 */
async function logEventAsync(eventName: string, eventProps: Record<string, any>) {
  let sampleRate = shouldSampleEvent(eventName);
  if (sampleRate === 0) return;
  let propsWithSampleRate = sampleRate !== null ? {
    ...eventProps,
    sample_rate: sampleRate
  } : eventProps;
  let promises: Promise<any>[] = [];
  if (shouldTrackDatadog()) promises.push(trackDatadogEvent(eventName, stripProtoFields(propsWithSampleRate)));
  promises.push(logEventTo1PAwaitable(eventName, propsWithSampleRate)), await Promise.all(promises);
}

/** 将 logEventSync/logEventAsync 注册为全局分析接收器 */
function initializeAnalyticsSink() {
  attachAnalyticsSink({
    logEvent: logEventSync,
    logEventAsync: logEventAsync
  });
}
var FEATURE_FLAG_LOG_DATADOG = "tengu_log_datadog_events",
  isCollectingMetadata = !1;
var initAnalytics = b(() => {
  je();
  JQ();
  S1();
  Yn();
  Ct();
  U1r();
});
export {moduleExports as tZr,InMemoryTransport as eZr,createLinkedTransportPair,analyticsModuleExports as mit,shouldTrackDatadog,logEventSync as Xjd,logEventAsync as Qjd,initializeAnalyticsSink,FEATURE_FLAG_LOG_DATADOG as Jjd,isCollectingMetadata as nZr,initAnalytics as Jge};
