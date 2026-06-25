// @ts-nocheck
import {b} from "../../runtime.ts";
/** Resolve a tool's user-facing display name, falling back to its internal name. */
function mu(tool: { userFacingName?: () => string; name: string }): string {
  return tool.userFacingName?.() ?? tool.name;
}

/** Whether a tool is enabled; defaults to true when no isEnabled hook is present. */
function YD(tool: { isEnabled?: () => boolean }): boolean {
  return tool.isEnabled?.() ?? !0;
}

/**
 * Evaluate a tool's `immediate` flag, which may be a static boolean or a
 * predicate computed from the supplied input.
 */
function Rxe(tool: { immediate?: boolean | ((input: unknown) => boolean) }, input: unknown): boolean {
  let immediate = tool?.immediate;
  return typeof immediate === "function" ? immediate(input) : immediate === !0;
}

/** Drain an async generator and return its final (return) value. */
async function q6a<TReturn>(generator: AsyncGenerator<unknown, TReturn>): Promise<TReturn> {
  let result: IteratorResult<unknown, TReturn>;
  do result = await generator.next(); while (!result.done);
  return result.value;
}

/**
 * Merge multiple async generators, yielding their values as they resolve,
 * with a cap on the number of generators consumed concurrently.
 */
async function* X3n<T>(
  generators: Iterable<AsyncGenerator<T>>,
  concurrency = 1 / 0,
): AsyncGenerator<T> {
  let race = (gen: AsyncGenerator<T>) => {
      let pending = gen.next().then(({
        done,
        value,
      }) => ({
        done,
        value,
        generator: gen,
        promise: pending,
      }));
      return pending;
    },
    queue = [...generators],
    active = new Set<Promise<{ done: boolean | undefined; value: T; generator: AsyncGenerator<T>; promise: unknown }>>();
  while (active.size < concurrency && queue.length > 0) {
    let next = queue.shift()!;
    active.add(race(next));
  }
  while (active.size > 0) {
    let {
      done,
      value,
      generator,
      promise,
    } = await Promise.race(active);
    if (active.delete(promise as any), !done) {
      if (active.add(race(generator)), value !== void 0) yield value;
    } else if (queue.length > 0) {
      let next = queue.shift()!;
      active.add(race(next));
    }
  }
}

/** Collect every value yielded by an async iterable into an array. */
async function Q3n<T>(iterable: AsyncIterable<T>): Promise<T[]> {
  let collected: T[] = [];
  for await (let item of iterable) collected.push(item);
  return collected;
}

/** Adapt a synchronous iterable into an async generator. */
async function* Mmo<T>(iterable: Iterable<T>): AsyncGenerator<T> {
  for (let item of iterable) yield item;
}

var PTy: symbol;
var z6e = b(() => {
  PTy = Symbol("NO_VALUE");
});

export {mu as getCommandName,YD as isCommandEnabled,Rxe,q6a,X3n,Q3n,Mmo,PTy,z6e};
