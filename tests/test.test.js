import { test, expect } from "vitest";
import testy from "../src/test";

test("testing works", () => {
  expect(testy("testtt")).toBe("testtt");
});
