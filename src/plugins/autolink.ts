import type { Plugin } from "./types.ts";

const url = /(?<!\]\()\bhttps?:\/\/[^\s)]+/g;

export function autolink(): Plugin {
  return {
    name: "autolink",
    transformPaste: (text) => text.replace(url, (match) => `[${match}](${match})`),
  };
}
