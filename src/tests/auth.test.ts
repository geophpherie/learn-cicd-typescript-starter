import { expect, test } from "vitest";
import { getAPIKey } from "src/api/auth";
import { IncomingHttpHeaders } from "http";

test("no header", () => {
  const header: IncomingHttpHeaders = {};

  expect(getAPIKey(header)).toBeNull();
});

test("bad key def", () => {
  const header: IncomingHttpHeaders = { authorization: "NotApiKey" };

  console.log(header.authorization);
  expect(getAPIKey(header)).toBeNull();
});

test("bad key def", () => {
  const header: IncomingHttpHeaders = { authorization: "ApiKey" };

  console.log(header.authorization);
  expect(getAPIKey(header)).toBeNull();
});

test("bad key def", () => {
  const header: IncomingHttpHeaders = { authorization: "ApiKey myKeySux" };

  console.log(header.authorization);
  expect(getAPIKey(header)).toBe("myKeySux");
});

