import { expect, test } from "vitest";
import { getAPIKey } from "src/api/auth";
import { IncomingHttpHeaders } from "http";

test("no header", () => {
  let header: IncomingHttpHeaders = {};

  expect(getAPIKey(header)).toBeNull();
});

test("bad key def", () => {
  let header: IncomingHttpHeaders = { authorization: "NotApiKey" };

  console.log(header.authorization);
  expect(getAPIKey(header)).toBeNull();
});

test("bad key def", () => {
  let header: IncomingHttpHeaders = { authorization: "ApiKey" };

  console.log(header.authorization);
  expect(getAPIKey(header)).toBeNull();
});

test("bad key def", () => {
  let header: IncomingHttpHeaders = { authorization: "ApiKey myKeySux" };

  console.log(header.authorization);
  expect(getAPIKey(header)).toBe("myKeySux");
});
