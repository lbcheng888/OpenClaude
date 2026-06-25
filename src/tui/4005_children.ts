// @ts-nocheck
import {Ci,fd} from "../../vendor/m2469.ts";
import {useClock as As} from "../../vendor/m2442.ts";
import {logEvent as W,kt} from "../../vendor/m132.ts";
import {xr,QT} from "../../vendor/m1461.ts";
import {Le} from "../../vendor/m5.ts";
import {isPolicyAllowed as Xs,Bu} from "../../vendor/m2213.ts";
import {b,x} from "../../runtime.ts";
import {je} from "../../vendor/m2462.ts";
import {tt} from "../../vendor/m2263.ts";
import {et} from "../../vendor/m2261.ts";
import {oe} from "../../vendor/m2275.ts";
// @ts-nocheck
function dxe(messageId) {
  let memo = z9a.c(3),
    ratingsMap = QA.useContext(Y9a),
    result;
  if (memo[0] !== messageId || memo[1] !== ratingsMap) result = messageId ? ratingsMap.get(messageId) : undefined, memo[0] = messageId, memo[1] = ratingsMap, memo[2] = result;else result = memo[2];
  return result;
}
function z9n() {
  return QA.useContext(J9a);
}
function j9n() {
  return QA.useContext(X9a);
}
function e3a() {
  return QA.useContext(Q9a);
}
function t3a() {
  return QA.useContext(Z9a);
}
function upo({
  children: children
}) {
  let [activeMessageId, setActiveMessageId] = QA.useState(null),
    [hoveredMessageId, setHoveredMessageId] = QA.useState(null),
    [ratingsMap, setRatingsMap] = QA.useState(j9a),
    ratingsMapRef = QA.useRef(ratingsMap);
  ratingsMapRef.current = ratingsMap;
  let {
      addNotification: addNotification
    } = Ci(),
    clock = As(),
    hoverTimerRef = QA.useRef(null);
  QA.useEffect(() => () => {
    hoverTimerRef.current?.();
  }, []);
  let setHovered = QA.useCallback(nextHovered => {
      if (hoverTimerRef.current?.(), hoverTimerRef.current = null, nextHovered === null) hoverTimerRef.current = clock.setTimeout(() => setHoveredMessageId(null), 500);else setHoveredMessageId(nextHovered);
    }, [clock]),
    rateMessage = QA.useCallback((messageId, sentiment, surface = "tool_use", extraProps) => {
      let isSameRating = ratingsMapRef.current.get(messageId) === sentiment;
      if (setRatingsMap(prevMap => {
        let nextMap = new Map(prevMap);
        if (isSameRating) nextMap.delete(messageId);else nextMap.set(messageId, sentiment);
        return nextMap;
      }), W("tengu_message_rated", {
        ...extraProps,
        message_uuid: xr(messageId),
        sentiment: Le(sentiment),
        surface: Le(surface),
        cleared: isSameRating
      }), !isSameRating) addNotification({
        key: "message-rated",
        kind: "feedback",
        text: "thanks for improving claude!",
        color: "success",
        priority: "immediate"
      });
    }, [addNotification]),
    feedbackAllowed = Xs("allow_product_feedback");
  return I6e.jsx(mce.Provider, {
    value: feedbackAllowed ? rateMessage : null,
    children: I6e.jsx(Y9a.Provider, {
      value: ratingsMap,
      children: I6e.jsx(X9a.Provider, {
        value: setActiveMessageId,
        children: I6e.jsx(J9a.Provider, {
          value: activeMessageId,
          children: I6e.jsx(Z9a.Provider, {
            value: setHovered,
            children: I6e.jsx(Q9a.Provider, {
              value: hoveredMessageId,
              children: children
            })
          })
        })
      })
    })
  });
}
var z9a, QA, I6e, mce, j9a, Y9a, J9a, X9a, Q9a, Z9a;
var ydt = b(() => {
  fd();
  je();
  kt();
  QT();
  Bu();
  z9a = x(tt(), 1), QA = x(et(), 1), I6e = x(oe(), 1), mce = QA.createContext(null), j9a = new Map(), Y9a = QA.createContext(j9a);
  J9a = QA.createContext(null), X9a = QA.createContext(null);
  Q9a = QA.createContext(null), Z9a = QA.createContext(null);
});

export {dxe,z9n,j9n,e3a,t3a,upo,z9a,QA,I6e,mce,j9a,Y9a,J9a,X9a,Q9a,Z9a,ydt};
