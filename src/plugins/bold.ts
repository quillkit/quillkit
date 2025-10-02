import type { Plugin } from "./types.ts";

export function bold(): Plugin {
  return {
    name: "bold",
    keymap: {
      "Mod-b": (editor) => {
        editor.wrapSelection("**");
        return true;
      },
    },
  };
}
