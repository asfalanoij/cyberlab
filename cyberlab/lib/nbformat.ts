// Parses .ipynb files (nbformat v4) into typed cell structures
// Used by NotebookRenderer to render notebooks without a running kernel

import { Tactic, TACTIC_COLORS } from './mitre'

export interface NotebookMeta {
  mitre_tactic:     Tactic
  mitre_technique:  string
  mitre_name:       string
  difficulty:       'beginner' | 'intermediate' | 'advanced'
  estimated_minutes: number
  tags:             string[]
  article_ready:    boolean
}

export interface CodeCell {
  type:    'code'
  id:      string
  source:  string
  outputs: CellOutput[]
}

export interface MarkdownCell {
  type:   'markdown'
  id:     string
  source: string
}

export type NotebookCell = CodeCell | MarkdownCell

export interface ParsedNotebook {
  meta:     NotebookMeta
  cells:    NotebookCell[]
  language: string
}

export interface CellOutput {
  output_type: 'stream' | 'execute_result' | 'display_data' | 'error'
  text?:       string | string[]
  data?:       Record<string, string | string[]>
  ename?:      string
  evalue?:     string
}

// Parse raw .ipynb JSON into a typed structure
export function parseNotebook(raw: string): ParsedNotebook {
  const nb = JSON.parse(raw)

  const meta: NotebookMeta = nb.metadata?.cyberlab ?? {
    mitre_tactic:      'defense' as Tactic,
    mitre_technique:   '',
    mitre_name:        '',
    difficulty:        'beginner',
    estimated_minutes: 30,
    tags:              [],
    article_ready:     false,
  }

  const language = nb.metadata?.kernelspec?.language ?? 'python'

  const cells: NotebookCell[] = nb.cells.map((cell: any) => {
    const source = Array.isArray(cell.source)
      ? cell.source.join('')
      : cell.source ?? ''

    if (cell.cell_type === 'code') {
      return {
        type:    'code',
        id:      cell.id ?? Math.random().toString(36).slice(2),
        source,
        outputs: cell.outputs ?? [],
      } satisfies CodeCell
    } else {
      return {
        type:   'markdown',
        id:     cell.id ?? Math.random().toString(36).slice(2),
        source,
      } satisfies MarkdownCell
    }
  })

  return { meta, cells, language }
}

// Normalize cell output to a string for display
export function flattenOutput(output: CellOutput): string {
  if (output.text) {
    return Array.isArray(output.text) ? output.text.join('') : output.text
  }
  if (output.data?.['text/plain']) {
    const t = output.data['text/plain']
    return Array.isArray(t) ? t.join('') : t
  }
  if (output.output_type === 'error') {
    return `${output.ename}: ${output.evalue}`
  }
  return ''
}

// Get the image data from a display_data output (for matplotlib plots)
export function getOutputImage(output: CellOutput): string | null {
  const png = output.data?.['image/png']
  if (!png) return null
  const src = Array.isArray(png) ? png.join('') : png
  return `data:image/png;base64,${src}`
}

// Notebook index entry — used for sidebar navigation and dashboard
export interface NotebookIndexEntry {
  slug:     string
  filename: string
  title:    string
  tactic:   Tactic
  color:    string
  technique: string
  difficulty: string
  tags:     string[]
  completed: boolean
}

// Hard-coded notebook registry — matches the 24 .ipynb files
export const NOTEBOOK_REGISTRY: Omit<NotebookIndexEntry, 'completed'>[] = [
  { slug: '01-recon-network-scanning',   filename: '01_recon_network_scanning.ipynb',   title: 'Network Service Discovery',           tactic: 'recon',      color: TACTIC_COLORS.recon,      technique: 'T1046',      difficulty: 'beginner',      tags: ['scapy', 'tcp', 'port-scanning'] },
  { slug: '02-recon-dns-exploration',    filename: '02_recon_dns_exploration.ipynb',    title: 'DNS Reconnaissance',                  tactic: 'recon',      color: TACTIC_COLORS.recon,      technique: 'T1590.002',  difficulty: 'beginner',      tags: ['dns', 'subdomain', 'osint'] },
  { slug: '03-initial-default-creds',    filename: '03_initial_access_default_creds.ipynb',  title: 'Default Credential Testing',     tactic: 'initial',    color: TACTIC_COLORS.initial,    technique: 'T1078',      difficulty: 'beginner',      tags: ['credentials', 'brute-force'] },
  { slug: '04-initial-usb-autorun',      filename: '04_initial_access_usb_autorun.ipynb',    title: 'USB Autorun Attack',             tactic: 'initial',    color: TACTIC_COLORS.initial,    technique: 'T1091',      difficulty: 'beginner',      tags: ['usb', 'autorun', 'windows'] },
  { slug: '05-execution-spearphishing',  filename: '05_execution_spearphishing.ipynb',  title: 'Spearphishing Link Server',           tactic: 'execution',  color: TACTIC_COLORS.execution,  technique: 'T1566',      difficulty: 'beginner',      tags: ['phishing', 'http', 'social-engineering'] },
  { slug: '06-execution-scheduled',      filename: '06_execution_scheduled_tasks.ipynb',title: 'Scheduled Task Execution',            tactic: 'execution',  color: TACTIC_COLORS.execution,  technique: 'T1053',      difficulty: 'beginner',      tags: ['cron', 'windows', 'persistence'] },
  { slug: '07-persist-registry',         filename: '07_persistence_registry_autorun.ipynb',  title: 'Registry Autorun Persistence',  tactic: 'persist',    color: TACTIC_COLORS.persist,    technique: 'T1547',      difficulty: 'intermediate',  tags: ['registry', 'windows', 'autorun'] },
  { slug: '08-persist-hijack',           filename: '08_persistence_hijack_execution.ipynb',  title: 'Execution Flow Hijacking',      tactic: 'persist',    color: TACTIC_COLORS.persist,    technique: 'T1574',      difficulty: 'intermediate',  tags: ['dll', 'path-hijack', 'windows'] },
  { slug: '09-persist-logon-scripts',    filename: '09_persistence_logon_scripts.ipynb',title: 'Logon Script Persistence',            tactic: 'persist',    color: TACTIC_COLORS.persist,    technique: 'T1037',      difficulty: 'intermediate',  tags: ['logon', 'scripts', 'windows'] },
  { slug: '10-evasion-impair-defenses',  filename: '10_evasion_impair_defenses.ipynb',  title: 'Impair Defenses',                     tactic: 'evasion',    color: TACTIC_COLORS.evasion,    technique: 'T1562',      difficulty: 'intermediate',  tags: ['av', 'firewall', 'evasion'] },
  { slug: '11-evasion-ads',              filename: '11_evasion_alternate_data_streams.ipynb', title: 'Alternate Data Streams',       tactic: 'evasion',    color: TACTIC_COLORS.evasion,    technique: 'T1564',      difficulty: 'intermediate',  tags: ['ntfs', 'ads', 'windows', 'hiding'] },
  { slug: '12-cred-browser-dump',        filename: '12_credential_dumping.ipynb',        title: 'Browser Credential Dumping',          tactic: 'cred',       color: TACTIC_COLORS.cred,       technique: 'T1003',      difficulty: 'intermediate',  tags: ['chrome', 'browser', 'sqlite'] },
  { slug: '13-cred-network-sniffing',    filename: '13_credential_network_sniffing.ipynb', title: 'Network Credential Sniffing',       tactic: 'cred',       color: TACTIC_COLORS.cred,       technique: 'T1040',      difficulty: 'intermediate',  tags: ['scapy', 'pcap', 'ftp', 'smtp'] },
  { slug: '14-discovery-users-files',    filename: '14_discovery_users_files.ipynb',     title: 'User & File Discovery',               tactic: 'discovery',  color: TACTIC_COLORS.discovery,  technique: 'T1083',      difficulty: 'beginner',      tags: ['discovery', 'enumeration'] },
  { slug: '15-lateral-remote-services',  filename: '15_lateral_movement_remote_services.ipynb', title: 'Remote Services (SSH)',      tactic: 'lateral',    color: TACTIC_COLORS.lateral,    technique: 'T1021',      difficulty: 'intermediate',  tags: ['ssh', 'paramiko', 'lateral'] },
  { slug: '16-collection-clipboard',     filename: '16_collection_clipboard_email.ipynb', title: 'Clipboard & Email Collection',       tactic: 'collection', color: TACTIC_COLORS.collection, technique: 'T1115',      difficulty: 'beginner',      tags: ['clipboard', 'email', 'collection'] },
  { slug: '17-c2-encrypted-channels',    filename: '17_c2_encrypted_channels.ipynb',     title: 'Encrypted C2 Channel',                tactic: 'c2',         color: TACTIC_COLORS.c2,         technique: 'T1573',      difficulty: 'advanced',      tags: ['c2', 'encryption', 'asyncssh'] },
  { slug: '18-exfil-dns-tunneling',      filename: '18_exfil_dns_tunneling.ipynb',       title: 'DNS Exfiltration',                    tactic: 'exfil',      color: TACTIC_COLORS.exfil,      technique: 'T1048.003',  difficulty: 'intermediate',  tags: ['dns', 'exfiltration', 'scapy', 'base64'] },
  { slug: '19-impact-ransomware',        filename: '19_impact_ransomware_mechanics.ipynb', title: 'Ransomware File Encryption',        tactic: 'impact',     color: TACTIC_COLORS.impact,     technique: 'T1486',      difficulty: 'intermediate',  tags: ['crypto', 'ransomware', 'files'] },
  { slug: '20-defense-decoys',           filename: '20_defense_decoys_honeypots.ipynb',   title: 'Decoys & Honeypots',                  tactic: 'defense',    color: TACTIC_COLORS.defense,    technique: 'defensive',  difficulty: 'intermediate',  tags: ['honeypot', 'decoy', 'blue-team'] },
  { slug: '21-defense-pcap',             filename: '21_defense_pcap_analysis.ipynb',      title: 'PCAP Collection & Analysis',          tactic: 'defense',    color: TACTIC_COLORS.defense,    technique: 'defensive',  difficulty: 'intermediate',  tags: ['pcap', 'scapy', 'analysis'] },
  { slug: '22-defense-network-monitor',  filename: '22_defense_network_monitoring.ipynb', title: 'Network Flow Monitoring',             tactic: 'defense',    color: TACTIC_COLORS.defense,    technique: 'defensive',  difficulty: 'intermediate',  tags: ['network', 'monitoring', 'scapy'] },
  { slug: '23-defense-behavioral',       filename: '23_defense_behavioral_analytics.ipynb', title: 'Process Behavioral Analytics',      tactic: 'defense',    color: TACTIC_COLORS.defense,    technique: 'defensive',  difficulty: 'intermediate',  tags: ['psutil', 'behavioral', 'ueba'] },
  { slug: '24-capstone',                 filename: '24_capstone_attack_chain.ipynb',       title: 'Full Attack Chain Simulation',        tactic: 'recon',      color: '#8A8580',                technique: 'all',        difficulty: 'advanced',      tags: ['capstone', 'full-chain', 'red-team'] },
]
