#!/usr/bin/env node

import { Command } from "commander";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command("@fizzyelt/config");

function copyConfig(from: string, to: string): Promise<void> {
    return fs.copyFile(path.join(__dirname, "configs", from), path.join(process.cwd(), to));
}

function copyOxcJsonConfig(): Promise<void> {
    return copyConfig(".oxlintrc.json", ".oxlintrc.json").then(() =>
        copyConfig(".oxfmtrc.json", ".oxfmtrc.json"),
    );
}

function copyOxcTsConfig(): Promise<void> {
    return copyConfig("oxlint.config.ts", "oxlint.config.ts").then(() =>
        copyConfig("oxfmt.config.ts", "oxfmt.config.ts"),
    );
}

program
    .command("ocaml")
    .description("copy ocamlformat config")
    .action(async () => {
        await copyConfig(".ocamlformat", ".ocamlformat");
        console.log("✅ Copied .ocamlformat");
    });

program
    .command("oxc")
    .description("copy oxc config")
    .option("-t, --typescript", "copy TypeScript config")
    .action(async (options: { typescript?: boolean }) => {
        if (options.typescript) {
            await copyOxcTsConfig();
            console.log("✅ Copied oxc TypeScript configs: oxlint.config.ts, oxfmt.config.ts");
            return;
        }

        await copyOxcJsonConfig();
        console.log("✅ Copied oxc JSON configs: .oxlintrc.json, .oxfmtrc.json");
    });

async function main(): Promise<void> {
    await program.parseAsync(process.argv);
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
});
