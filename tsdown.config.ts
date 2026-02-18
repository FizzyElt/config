import { defineConfig } from "tsdown";

const config = defineConfig({
    dts: true,
    target: "node22",
    entry: ["src/index.ts"],
    fixedExtension: true,
    inlineOnly: false,
    copy: [{ from: "src/configs", to: "dist" }],
});

// oxlint-disable-next-line import/no-default-export
export default config;
