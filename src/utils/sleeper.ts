import { setTimeout as nodeTimeout } from 'node:timers/promises'

export const sleep = (ms: number) => nodeTimeout(ms) // This sleeper works in node 15 and above https://nodejs.org/api/timers.html#timerspromisessettimeoutdelay-value-options

export const sleep2 = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
