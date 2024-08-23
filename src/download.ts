import fs from "fs";
import path from "path";
import extract from "extract-zip";
import fse from "fs-extra";
import UI from "./UI";
import { bold } from "kolorist";

export async function download(folder: string, repo: string) {
    const url = `https://github.com/kars1996/${repo}/archive/refs/heads/master.zip`;
    const response = await fetch(url);
    console.log("o  Installing...");
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

    fs.writeFileSync(zipPath, buffer);
    await extract(zipPath, { dir: outputPath });
    fs.unlinkSync(zipPath);

    const sourceFolder = path.join(outputPath, `${repo}-master`);
    const files = await fse.readdir(sourceFolder);

    for (const file of files) {
        const sourceFilePath = path.join(sourceFolder, file);
        const destinationFilePath = path.join(outputPath, file);
        await fse.move(sourceFilePath, destinationFilePath, {
            overwrite: true,
        });
    }

    await fse.remove(sourceFolder);
    // await fse.remove(path.join(outputPath, ".git"));

    UI.bleh();
    console.log(`o  ${bold(`${repo}  Sucessfully Initialised!`)}`);
}