import { test } from "node:test";
import assert from "node:assert/strict";
import { Editor } from "../src/editor.ts";
import { autolink, bold } from "../src/plugins/index.ts";

test("inserts text at the cursor", () => {
  const editor = new Editor({ text: "Hello world" });
  editor.select(5);
  editor.insertText(",");
  assert.equal(editor.text, "Hello, world");
  assert.deepEqual(editor.selection, { anchor: 6, head: 6 });
});

test("replaces the selection", () => {
  const editor = new Editor({ text: "Hello world" });
  editor.select(6, 11);
  editor.insertText("quillkit");
  assert.equal(editor.text, "Hello quillkit");
});

test("Mod-b wraps the selection in bold marks", () => {
  const editor = new Editor({ text: "make this bold", plugins: [bold()] });
  editor.select(10, 14);
  assert.equal(editor.handleKey("Mod-b"), true);
  assert.equal(editor.text, "make this **bold**");
});

test("pastes HTML as text and links URLs", () => {
  const editor = new Editor({ plugins: [autolink()] });
  editor.paste({ html: "<p>See https://quillkit.dev</p>" });
  assert.equal(editor.text, "See [https://quillkit.dev](https://quillkit.dev)");
});
