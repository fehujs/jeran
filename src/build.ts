import { build } from "esbuild"
import { existsSync, mkdirSync, readdirSync, rmSync } from "fs"


export async function buildAdditionalFiles(dirPath: string, outDirPath: string, tsConfigPath: string = "./tsconfig.json") {
    mkdirSync(outDirPath, { recursive: true })

    await build({
        entryPoints: readdirSync(dirPath)
            .filter(c => c.split('.')[c.split('.').length-1] === "ts")
            .map(c => dirPath + c),
        bundle: true,
        outdir: outDirPath,
        platform: "node",
        target: "esnext",
        format: "esm",
        tsconfig: tsConfigPath,
        preserveSymlinks: true,
        packages: 'external',
    }).catch(() => process.exit(1))
}

export async function buildFiles(fileName: string, buildAdditional?: (file: string) => Promise<void>) {
    const file = "./bin/" + (
        readdirSync("./bin").filter(f => f.split(/ts|js/)[0].split('.')[0] === fileName)[0]
            ?? "server.ts"
    )
    
    if (existsSync('build'))
        rmSync('build', { recursive: true })
    
    await build({
        entryPoints: [ file ?? "./bin/server.ts" ],
        bundle: true,
        outfile: "./build/main.js",
        platform: "node",
        target: "esnext",
        format: "esm",
        sourcemap: true,
        tsconfig: "./tsconfig.json",
        preserveSymlinks: true,
        packages: "external",
    }).catch(() => process.exit(1))

    if (buildAdditional)
        await buildAdditional(file)
}
