#!/usr/bin/env node

import { Command } from "commander";
import * as fs from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command("@fizzyelt/config");

function copyConfig(from: string, to: string): Promise<void> {
    return fs.copyFile(path.join(__dirname, "configs", from), path.join(process.cwd(), to));
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
    .action(async () => {
        await copyOxcTsConfig();
        console.log("✅ Copied oxc TypeScript configs: oxlint.config.ts, oxfmt.config.ts");
    });

async function main(): Promise<void> {
    await program.parseAsync(process.argv);
}

main().catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
});
