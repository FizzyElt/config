import { defineConfig } from "tsdown";

export default defineConfig({
    dts: true,
    target: "node22",
    entry: ["src/index.ts"],
    fixedExtension: true,
    inlineOnly: false,
    copy: [{ from: "src/configs", to: "dist" }],
});
