import { test } from "node:test";
import assert from "node:assert/strict";
import { htmlToText } from "../src/clipboard.ts";

test("turns block elements into line breaks", () => {
  assert.equal(htmlToText("<p>One</p><p>Two</p>"), "One\nTwo");
});

test("decodes common entities", () => {
  assert.equal(htmlToText("Fish &amp; chips &lt;3"), "Fish & chips <3");
});
