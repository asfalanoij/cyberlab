import { Tactic } from './types'

export const TACTIC_COLORS: Record<Tactic, string> = {
  recon: '#6C9BCF', initial: '#CF6C6C', execution: '#CF9B6C', persist: '#9B6CCF',
  evasion: '#6CCF9B', cred: '#CFB86C', discovery: '#6CBFCF', lateral: '#CF6CA0',
  collection: '#A0CF6C', c2: '#CF8A6C', exfil: '#8ACF6C', impact: '#CF6C6C', defense: '#6C9BCF',
}

export const TACTIC_LABELS: Record<Tactic, string> = {
  recon: 'Reconnaissance', initial: 'Initial Access', execution: 'Execution',
  persist: 'Persistence', evasion: 'Defense Evasion', cred: 'Credential Access',
  discovery: 'Discovery', lateral: 'Lateral Movement', collection: 'Collection',
  c2: 'Command & Control', exfil: 'Exfiltration', impact: 'Impact', defense: 'Defense',
}

export const TACTIC_ORDER: Tactic[] = [
  'recon','initial','execution','persist','evasion','cred',
  'discovery','lateral','collection','c2','exfil','impact','defense'
]
