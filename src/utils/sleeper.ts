import { setTimeout as nodeTimeout } from 'node:timers/promises'

export const sleep = (ms: number) => nodeTimeout(ms) // This sleeper works in node 16 and above

export const sleep2 = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
