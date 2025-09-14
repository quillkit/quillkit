# quillkit

A small, framework-free rich-text editor core with a plugin system.

```ts
import { Editor } from "quillkit";
import { bold, autolink } from "quillkit/plugins";

const editor = new Editor({ plugins: [bold(), autolink()] });
editor.insertText("Hello, world");
```

- No dependencies
- Plain-text document model with Markdown-style marks
- Plugins for keymaps and paste handling

See [quillkit/docs](https://github.com/quillkit/docs) for guides. Contributions welcome, see
[CONTRIBUTING.md](CONTRIBUTING.md).

## License

MIT
