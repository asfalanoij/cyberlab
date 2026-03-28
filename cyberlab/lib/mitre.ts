// MITRE ATT&CK technique metadata
// Each notebook maps to one or more techniques

export type Tactic =
  | 'recon' | 'initial' | 'execution' | 'persist'
  | 'evasion' | 'cred' | 'discovery' | 'lateral'
  | 'collection' | 'c2' | 'exfil' | 'impact' | 'defense'

export interface TechniqueInfo {
  id:          string
  name:        string
  tactic:      Tactic
  tacticLabel: string
  color:       string
}

export const TACTIC_COLORS: Record<Tactic, string> = {
  recon:      '#6C9BCF',
  initial:    '#CF6C6C',
  execution:  '#CF9B6C',
  persist:    '#9B6CCF',
  evasion:    '#6CCF9B',
  cred:       '#CFB86C',
  discovery:  '#6CBFCF',
  lateral:    '#CF6CA0',
  collection: '#A0CF6C',
  c2:         '#CF8A6C',
  exfil:      '#8ACF6C',
  impact:     '#CF6C6C',
  defense:    '#6C9BCF',
}

export const TACTIC_LABELS: Record<Tactic, string> = {
  recon:      'Reconnaissance',
  initial:    'Initial Access',
  execution:  'Execution',
  persist:    'Persistence',
  evasion:    'Defense Evasion',
  cred:       'Credential Access',
  discovery:  'Discovery',
  lateral:    'Lateral Movement',
  collection: 'Collection',
  c2:         'Command & Control',
  exfil:      'Exfiltration',
  impact:     'Impact',
  defense:    'Detection',
}

// The 14 ATT&CK tactics in kill-chain order (for the heatmap X axis)
export const TACTIC_ORDER: Tactic[] = [
  'recon', 'initial', 'execution', 'persist',
  'evasion', 'cred', 'discovery', 'lateral',
  'collection', 'c2', 'exfil', 'impact', 'defense',
]

export const TECHNIQUES: Record<string, TechniqueInfo> = {
  'T1046': {
    id: 'T1046', name: 'Network Service Discovery',
    tactic: 'recon', tacticLabel: 'Reconnaissance',
    color: TACTIC_COLORS.recon,
  },
  'T1590.002': {
    id: 'T1590.002', name: 'Gather Victim Network Info: DNS',
    tactic: 'recon', tacticLabel: 'Reconnaissance',
    color: TACTIC_COLORS.recon,
  },
  'T1078': {
    id: 'T1078', name: 'Valid Accounts (Default Creds)',
    tactic: 'initial', tacticLabel: 'Initial Access',
    color: TACTIC_COLORS.initial,
  },
  'T1091': {
    id: 'T1091', name: 'Replication Through Removable Media',
    tactic: 'initial', tacticLabel: 'Initial Access',
    color: TACTIC_COLORS.initial,
  },
  'T1566': {
    id: 'T1566', name: 'Phishing',
    tactic: 'initial', tacticLabel: 'Initial Access',
    color: TACTIC_COLORS.initial,
  },
  'T1053': {
    id: 'T1053', name: 'Scheduled Task/Job',
    tactic: 'execution', tacticLabel: 'Execution',
    color: TACTIC_COLORS.execution,
  },
  'T1547': {
    id: 'T1547', name: 'Boot or Logon Autostart: Registry',
    tactic: 'persist', tacticLabel: 'Persistence',
    color: TACTIC_COLORS.persist,
  },
  'T1574': {
    id: 'T1574', name: 'Hijack Execution Flow',
    tactic: 'persist', tacticLabel: 'Persistence',
    color: TACTIC_COLORS.persist,
  },
  'T1037': {
    id: 'T1037', name: 'Boot or Logon Initialization Scripts',
    tactic: 'persist', tacticLabel: 'Persistence',
    color: TACTIC_COLORS.persist,
  },
  'T1562': {
    id: 'T1562', name: 'Impair Defenses',
    tactic: 'evasion', tacticLabel: 'Defense Evasion',
    color: TACTIC_COLORS.evasion,
  },
  'T1564': {
    id: 'T1564', name: 'Hide Artifacts: Alternate Data Streams',
    tactic: 'evasion', tacticLabel: 'Defense Evasion',
    color: TACTIC_COLORS.evasion,
  },
  'T1003': {
    id: 'T1003', name: 'OS Credential Dumping',
    tactic: 'cred', tacticLabel: 'Credential Access',
    color: TACTIC_COLORS.cred,
  },
  'T1040': {
    id: 'T1040', name: 'Network Sniffing',
    tactic: 'cred', tacticLabel: 'Credential Access',
    color: TACTIC_COLORS.cred,
  },
  'T1083': {
    id: 'T1083', name: 'File and Directory Discovery',
    tactic: 'discovery', tacticLabel: 'Discovery',
    color: TACTIC_COLORS.discovery,
  },
  'T1087': {
    id: 'T1087', name: 'Account Discovery',
    tactic: 'discovery', tacticLabel: 'Discovery',
    color: TACTIC_COLORS.discovery,
  },
  'T1021': {
    id: 'T1021', name: 'Remote Services',
    tactic: 'lateral', tacticLabel: 'Lateral Movement',
    color: TACTIC_COLORS.lateral,
  },
  'T1539': {
    id: 'T1539', name: 'Steal Web Session Cookie',
    tactic: 'lateral', tacticLabel: 'Lateral Movement',
    color: TACTIC_COLORS.lateral,
  },
  'T1115': {
    id: 'T1115', name: 'Clipboard Data',
    tactic: 'collection', tacticLabel: 'Collection',
    color: TACTIC_COLORS.collection,
  },
  'T1114': {
    id: 'T1114', name: 'Email Collection',
    tactic: 'collection', tacticLabel: 'Collection',
    color: TACTIC_COLORS.collection,
  },
  'T1573': {
    id: 'T1573', name: 'Encrypted Channel',
    tactic: 'c2', tacticLabel: 'Command & Control',
    color: TACTIC_COLORS.c2,
  },
  'T1572': {
    id: 'T1572', name: 'Protocol Tunneling',
    tactic: 'c2', tacticLabel: 'Command & Control',
    color: TACTIC_COLORS.c2,
  },
  'T1048.003': {
    id: 'T1048.003', name: 'Exfiltration Over Alternative Protocol: DNS',
    tactic: 'exfil', tacticLabel: 'Exfiltration',
    color: TACTIC_COLORS.exfil,
  },
  'T1048': {
    id: 'T1048', name: 'Exfiltration Over Alternative Protocol',
    tactic: 'exfil', tacticLabel: 'Exfiltration',
    color: TACTIC_COLORS.exfil,
  },
  'T1486': {
    id: 'T1486', name: 'Data Encrypted for Impact',
    tactic: 'impact', tacticLabel: 'Impact',
    color: TACTIC_COLORS.impact,
  },
  'T1531': {
    id: 'T1531', name: 'Account Access Removal',
    tactic: 'impact', tacticLabel: 'Impact',
    color: TACTIC_COLORS.impact,
  },
}

export function getTechniqueColor(techniqueId: string): string {
  return TECHNIQUES[techniqueId]?.color ?? '#4A4540'
}

export function getTacticColor(tactic: Tactic): string {
  return TACTIC_COLORS[tactic] ?? '#4A4540'
}
