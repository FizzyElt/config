import { defineConfig } from "tsdown";

const config = defineConfig({
    dts: true,
    target: "node22",
    entry: ["src/index.ts"],
    fixedExtension: true,
    deps: {
        onlyBundle: false,
    },
    copy: [{ from: "src/configs", to: "dist" }],
});

export default config;
