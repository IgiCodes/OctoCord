import { allowedEnvKeys } from "@/config";

const additionalEnvKeys = [
    "WS_NO_BUFFER_UTIL" // Used by 'ws' package, dependency of '@discordeno/gateway'
] as const

console.log([...allowedEnvKeys, ...additionalEnvKeys].join(","));
