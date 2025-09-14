import { clipboardToText, type ClipboardData } from "./clipboard.ts";
import type { Plugin } from "./plugins/types.ts";

export interface Selection {
  anchor: number;
  head: number;
}

export class Editor {
  text = "";
  selection: Selection = { anchor: 0, head: 0 };
  readonly plugins: Plugin[];

  constructor(options: { plugins?: Plugin[]; text?: string } = {}) {
    this.plugins = options.plugins ?? [];
    this.text = options.text ?? "";
    this.select(this.text.length);
  }

  get from(): number {
    return Math.min(this.selection.anchor, this.selection.head);
  }

  get to(): number {
    return Math.max(this.selection.anchor, this.selection.head);
  }

  select(anchor: number, head = anchor): void {
    const clamp = (n: number) => Math.max(0, Math.min(n, this.text.length));
    this.selection = { anchor: clamp(anchor), head: clamp(head) };
  }

  insertText(value: string): void {
    const from = this.from;
    this.text = this.text.slice(0, from) + value + this.text.slice(this.to);
    this.select(from + value.length);
  }

  paste(data: ClipboardData): void {
    let value = clipboardToText(data);
    for (const plugin of this.plugins) {
      if (plugin.transformPaste) value = plugin.transformPaste(value);
    }
    this.text = this.text.slice(0, this.from) + value + this.text.slice(this.to);
    this.select(this.text.length);
  }

  wrapSelection(mark: string): void {
    const { from, to } = this;
    const inner = this.text.slice(from, to);
    this.text = this.text.slice(0, from) + mark + inner + mark + this.text.slice(to);
    this.select(from + mark.length, to + mark.length);
  }

  handleKey(key: string): boolean {
    for (const plugin of this.plugins) {
      const command = plugin.keymap?.[key];
      if (command?.(this)) return true;
    }
    return false;
  }
}
