import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const stylesheet = readFileSync(new URL("./keepsakes.css", import.meta.url), "utf8");

describe("printable keepsake styles", () => {
  it("hides site chrome and preserves the field-note frame in print mode", () => {
    expect(stylesheet).toContain("@media print");
    expect(stylesheet).toContain(".site-header,.site-footer,.keepsake-preview-actions{display:none!important}");
    expect(stylesheet).toContain(".keepsake-preview .printable-keepsake-frame{width:100%!important");
    expect(stylesheet).toContain("min-height:100vh!important");
  });

  it("keeps preview imagery and character copy visible in the printable field note", () => {
    expect(stylesheet).toContain(".printable-keepsake-frame img{display:block");
    expect(stylesheet).toContain(".printable-keepsake-frame h1");
    expect(stylesheet).toContain(".printable-keepsake-frame blockquote");
  });
});
