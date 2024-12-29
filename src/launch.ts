import { spawn } from "child_process"


export function launchCommand(exec: string, args: string[]) {
    const command = spawn(exec, args)

    command.stdout.on('data', (data) => {
        console.log(`${data}`)
    })

    command.stderr.on('data', (data) => {
        console.error(`[jeran] error: ${data}`)
    })

    command.on('close', (code) => {
        console.log(`[jeran]: process exited: ${code}`)
    })
}