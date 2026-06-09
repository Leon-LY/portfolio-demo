import { personalInfo, services, heroStats, typewriterTexts, workflowSteps, clients, faqItems } from './config'
import type { Project } from './projects'
import { projectGroups, allProjects } from './projects'

const STORAGE_KEY = 'portfolio-admin-data'

export interface AdminData {
  personalInfo: typeof personalInfo
  services: typeof services
  heroStats: typeof heroStats
  typewriterTexts: string[]
  heroTitle: string
  heroBio: string
  heroCredibility: string
  workflowSteps: typeof workflowSteps
  clients: string[]
  faqItems: typeof faqItems
  projectGroups: typeof projectGroups
  allProjects: Record<string, Project>
}

function getDefaults(): AdminData {
  return {
    personalInfo: { ...personalInfo },
    services: services.map(s => ({ ...s })),
    heroStats: heroStats.map(s => ({ ...s })),
    typewriterTexts: [...typewriterTexts],
    heroTitle: (personalInfo as any).heroTitle || '',
    heroBio: (personalInfo as any).heroBio || '',
    heroCredibility: (personalInfo as any).heroCredibility || '',
    workflowSteps: workflowSteps.map(s => ({ ...s })),
    clients: [...clients],
    faqItems: faqItems.map(f => ({ ...f })),
    projectGroups: projectGroups.map(g => ({ ...g, items: [...g.items] })),
    allProjects: JSON.parse(JSON.stringify(allProjects)),
  }
}

export function loadAdminData(): AdminData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...getDefaults(), ...JSON.parse(raw) }
  } catch { /* ignore */ }
  return getDefaults()
}

export function saveAdminData(data: AdminData) { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) }

export function resetAdminData(): AdminData { localStorage.removeItem(STORAGE_KEY); return getDefaults() }

export function downloadJSON(data: AdminData) {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = 'portfolio-config-backup.json'; a.click()
  URL.revokeObjectURL(url)
}
