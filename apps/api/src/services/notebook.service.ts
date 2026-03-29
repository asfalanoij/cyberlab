import { db, schema } from '../db'
import { eq } from 'drizzle-orm'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

const NOTEBOOKS_DIR = resolve(__dirname, '../../../../notebooks')

export const notebookService = {
  async list() {
    return db.select().from(schema.notebooks).orderBy(schema.notebooks.orderNum)
  },

  async getBySlug(slug: string) {
    const meta = await db.select().from(schema.notebooks).where(eq(schema.notebooks.slug, slug)).get()
    if (!meta) return null

    // Try to read the .ipynb file
    const filename = `${meta.orderNum.toString().padStart(2, '0')}_${slug.replace(/-/g, '_')}.ipynb`
    const filepath = resolve(NOTEBOOKS_DIR, filename)

    let cells = null
    if (existsSync(filepath)) {
      const raw = JSON.parse(readFileSync(filepath, 'utf-8'))
      cells = raw.cells || []
    }

    return { ...meta, cells }
  },

  async seed() {
    const REGISTRY = [
      { slug: '01-recon-network-scanning', title: 'Network Scanning with Scapy', mitreId: 'T1046', tactic: 'recon', difficulty: 'beginner', articleTitle: 'How Attackers Map Your Network Before They Attack', orderNum: 1 },
      { slug: '02-recon-dns-exploration', title: 'DNS Exploration', mitreId: 'T1590.002', tactic: 'recon', difficulty: 'beginner', articleTitle: 'What Your DNS Records Reveal Before You\'re Even Hacked', orderNum: 2 },
      { slug: '03-initial-access-default-creds', title: 'Default Credential Testing', mitreId: 'T1078', tactic: 'initial', difficulty: 'beginner', articleTitle: 'Default passwords are still how most breaches start', orderNum: 3 },
      { slug: '04-initial-access-usb-autorun', title: 'USB Autorun Attack', mitreId: 'T1091', tactic: 'initial', difficulty: 'beginner', articleTitle: 'The USB drop attack still works in 2025', orderNum: 4 },
      { slug: '05-execution-spearphishing', title: 'Spearphishing Links', mitreId: 'T1566', tactic: 'execution', difficulty: 'beginner', articleTitle: 'Building a phishing server in 30 lines of Python', orderNum: 5 },
      { slug: '06-execution-scheduled-tasks', title: 'Scheduled Task Execution', mitreId: 'T1053', tactic: 'execution', difficulty: 'beginner', articleTitle: 'Persistence through your own task scheduler', orderNum: 6 },
      { slug: '07-persistence-registry-autorun', title: 'Registry Autorun Keys', mitreId: 'T1547', tactic: 'persist', difficulty: 'intermediate', articleTitle: 'How malware survives a reboot', orderNum: 7 },
      { slug: '08-persistence-hijack-execution', title: 'Hijack Execution Flow', mitreId: 'T1574', tactic: 'persist', difficulty: 'intermediate', articleTitle: 'PATH hijacking — the attack hiding in plain sight', orderNum: 8 },
      { slug: '09-persistence-logon-scripts', title: 'Logon Script Persistence', mitreId: 'T1037', tactic: 'persist', difficulty: 'intermediate', articleTitle: 'Logon scripts as a persistence mechanism', orderNum: 9 },
      { slug: '10-evasion-impair-defenses', title: 'Impair Defenses', mitreId: 'T1562', tactic: 'evasion', difficulty: 'intermediate', articleTitle: 'How attackers blind your security tools', orderNum: 10 },
      { slug: '11-evasion-alternate-data-streams', title: 'Alternate Data Streams', mitreId: 'T1564', tactic: 'evasion', difficulty: 'intermediate', articleTitle: 'Hiding data inside NTFS Alternate Data Streams', orderNum: 11 },
      { slug: '12-credential-dumping', title: 'Browser Credential Dumping', mitreId: 'T1003', tactic: 'cred', difficulty: 'intermediate', articleTitle: 'Browser credential dumping — what Chrome stores and where', orderNum: 12 },
      { slug: '13-cred-network-sniffing', title: 'Network Credential Sniffing', mitreId: 'T1040', tactic: 'cred', difficulty: 'intermediate', articleTitle: 'Sniffing FTP, SMTP, Telnet credentials with Scapy', orderNum: 13 },
      { slug: '14-discovery-users-files', title: 'User & File Discovery', mitreId: 'T1083', tactic: 'discovery', difficulty: 'beginner', articleTitle: 'Post-exploitation: mapping what the target has', orderNum: 14 },
      { slug: '15-lateral-movement-remote-services', title: 'Remote Services (SSH)', mitreId: 'T1021', tactic: 'lateral', difficulty: 'intermediate', articleTitle: 'Moving laterally with SSH and Python', orderNum: 15 },
      { slug: '16-collection-clipboard-email', title: 'Clipboard & Email Collection', mitreId: 'T1115', tactic: 'collection', difficulty: 'beginner', articleTitle: 'What attackers collect before they exfiltrate', orderNum: 16 },
      { slug: '17-c2-encrypted-channels', title: 'Encrypted C2 Channels', mitreId: 'T1573', tactic: 'c2', difficulty: 'advanced', articleTitle: 'Building a C2 channel that blends in with normal traffic', orderNum: 17 },
      { slug: '18-exfil-dns-tunneling', title: 'DNS Exfiltration', mitreId: 'T1048.003', tactic: 'exfil', difficulty: 'intermediate', articleTitle: 'DNS Exfiltration — hiding data in DNS queries', orderNum: 18 },
      { slug: '19-impact-ransomware-mechanics', title: 'Ransomware File Encryption', mitreId: 'T1486', tactic: 'impact', difficulty: 'intermediate', articleTitle: 'How ransomware encrypts files — the Python mechanics', orderNum: 19 },
      { slug: '20-defense-decoys-honeypots', title: 'Decoys & Honeypots', mitreId: 'defensive', tactic: 'defense', difficulty: 'intermediate', articleTitle: 'Trapping attackers with Python honeypots', orderNum: 20 },
      { slug: '21-defense-pcap-analysis', title: 'PCAP Analysis', mitreId: 'defensive', tactic: 'defense', difficulty: 'intermediate', articleTitle: 'Packet capture and analysis with Scapy + Python', orderNum: 21 },
      { slug: '22-defense-network-monitoring', title: 'Network Monitoring', mitreId: 'defensive', tactic: 'defense', difficulty: 'intermediate', articleTitle: 'Building a behavioral baseline for network anomaly detection', orderNum: 22 },
      { slug: '23-defense-behavioral-analytics', title: 'Behavioral Analytics', mitreId: 'defensive', tactic: 'defense', difficulty: 'intermediate', articleTitle: 'Process-level behavioral analytics with psutil', orderNum: 23 },
      { slug: '24-capstone-attack-chain', title: 'Full Attack Chain Simulation', mitreId: 'all', tactic: 'recon', difficulty: 'advanced', articleTitle: 'A full attack chain simulation from recon to impact', orderNum: 24 },
    ]

    for (const nb of REGISTRY) {
      await db.insert(schema.notebooks).values(nb).onConflictDoNothing()
    }
  }
}
