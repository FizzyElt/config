import { Command } from "commander";
import * as fs from "node:fs/promises";
import * as path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const program = new Command();

program.option("--ocaml", "ocamlformat config");
program.option("--oxfmt", "oxc oxfmt config");
program.option("--oxlint", "oxc oxlint config");
program.option("--oxc", "oxc config");

function main(): Promise<void> {
    program.parse(process.argv);

    const options = program.opts();
    if (options.ocaml) {
        return fs.copyFile(
            path.join(__dirname, "configs/.ocamlformat"),
            path.join(process.cwd(), ".ocamlformat"),
        );
    }

    if (options.oxlint) {
        return fs.copyFile(
            path.join(__dirname, "configs/.oxlintrc.json"),
            path.join(process.cwd(), ".oxlintrc.json"),
        );
    }

    if (options.oxfmt) {
        return fs.copyFile(
            path.join(__dirname, "configs/.oxfmtrc.json"),
            path.join(process.cwd(), ".oxfmtrc.json"),
        );
    }

    if (options.oxlint) {
        return fs.copyFile(
            path.join(__dirname, "configs/.oxlintrc.json"),
            path.join(process.cwd(), ".oxlintrc.json"),
        );
    }

    if (options.oxc) {
        return Promise.all([
            fs.copyFile(
                path.join(__dirname, "configs/.oxlintrc.json"),
                path.join(process.cwd(), ".oxlintrc.json"),
            ),
            fs.copyFile(
                path.join(__dirname, "configs/.oxfmtrc.json"),
                path.join(process.cwd(), ".oxfmtrc.json"),
            ),
        ]).then(() => {});
    }

    throw new Error("No any option");
}

main();
