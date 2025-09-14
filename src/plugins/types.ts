import type { Editor } from "../editor.ts";

export interface Plugin {
  name: string;
  /** Key bindings like "Mod-b". Return true when the key was handled. */
  keymap?: Record<string, (editor: Editor) => boolean>;
  /** Rewrites pasted text before it is inserted. */
  transformPaste?: (text: string) => string;
}
