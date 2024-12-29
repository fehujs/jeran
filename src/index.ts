import { buildAdditionalFiles, buildFiles } from "./build"
import { launchCommand } from "./launch"

async function run() {
    const controllersDir = "./src/app/controllers/"
    const migrationsDir = "./src/db/migrations/"
    const seedersDir = "./src/db/seeders/"
    
    const fileName = process.argv[2]
    
    await buildFiles(fileName, async file => {
        if (!file || file === "./bin/server.ts") {
            await buildAdditionalFiles(controllersDir, "./build/controllers")
        } else if (file === "./bin/migrate.ts") {
            await buildAdditionalFiles(migrationsDir, "./build/migrations")
        } else if (file === "./bin/seeders.ts") {
            await buildAdditionalFiles(seedersDir, "./build/seeders")
        }
    })
    
    launchCommand("node", [ "build/main.js", process.argv.slice(2).join(",") ])    
}

export {
    buildAdditionalFiles,
    buildFiles,
    launchCommand,
    run,
}
