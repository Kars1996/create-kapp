#!/usr/bin/env node

import fs from "fs";
import path from "path";
import extract from "extract-zip";
import fse from "fs-extra";
import UI from "../utils/UI";
import { cyan } from "kolorist";

export async function download(
    folder: string,
    repo: string,
    branch: string = "master",
    isOnline: boolean = true
) {
    // ? Credit to nitlix
    console.log(`${cyan("o")}   Installing...`);
    const url = `https://github.com/kars1996/${repo}/archive/refs/heads/${branch}.zip`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to download repo: ${response.statusText}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const zipPath = path.join(folder, "repo.zip");
    const outputPath = path.resolve(folder);

    if (!fs.existsSync(outputPath)) {
        fs.mkdirSync(outputPath, { recursive: true });
    }

    fs.writeFileSync(zipPath, new Uint8Array(buffer));
    await extract(zipPath, { dir: outputPath });
    fs.unlinkSync(zipPath);

    const sourceFolder = path.join(outputPath, `${repo}-${branch}`);
    const files = await fse.readdir(sourceFolder);

    for (const file of files) {
        const sourceFilePath = path.join(sourceFolder, file);
        const destinationFilePath = path.join(outputPath, file);
        await fse.move(sourceFilePath, destinationFilePath, {
            overwrite: true,
        });
    }

    await fse.remove(sourceFolder);

    UI.bleh();
}
