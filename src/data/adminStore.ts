/**
 * 后台管理数据层 — 通过服务器 API 读写，跨设备同步
 */

import { personalInfo, services, heroStats, typewriterTexts, workflowSteps, clients, faqItems } from './config'
import type { Project } from './projects'
import { projectGroups, allProjects } from './projects'

const API_URL = '/api/admin-data'

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
  _updatedAt?: string
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

/** 从服务器加载数据 */
export async function loadAdminData(): Promise<AdminData> {
  try {
    const res = await fetch(API_URL)
    if (res.ok) {
      const data = await res.json()
      // 合并默认值，确保新字段有值
      return { ...getDefaults(), ...data }
    }
  } catch { /* 服务器不可用时降级到 localStorage */ }
  return loadFromLocal()
}

/** 保存数据到服务器 */
export async function saveAdminData(data: AdminData) {
  data._updatedAt = new Date().toISOString()
  try {
    const res = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      // 同时存 localStorage 作为离线备份
      saveToLocal(data)
      return
    }
  } catch { /* 降级到 localStorage */ }
  saveToLocal(data)
}

/** 重置为默认 */
export function resetAdminData(): AdminData {
  return getDefaults()
}

/** 导出备份 */
export function downloadJSON(data: AdminData) {
  const json = JSON.stringify(data, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url; a.download = `portfolio-backup-${new Date().toISOString().slice(0,10)}.json`; a.click()
  URL.revokeObjectURL(url)
}

// ── localStorage 降级 ──
const STORAGE_KEY = 'portfolio-admin-data'

function saveToLocal(data: AdminData) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)) } catch {}
}

function loadFromLocal(): AdminData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...getDefaults(), ...JSON.parse(raw) }
  } catch {}
  return getDefaults()
}
