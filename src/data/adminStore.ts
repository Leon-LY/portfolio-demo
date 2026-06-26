/**
 * 后台管理数据层 — 通过服务器 API 读写，跨设备同步
 */

import { personalInfo, services, heroStats, workflowSteps, clients, faqItems } from './config'
import type { Project } from './projects'
import { projectGroups, allProjects } from './projects'

const API_URL = '/api/portfolio/data'

/** Upload an image file to the server — returns the URL */
import { authHeaders } from './auth'

export async function uploadProjectImage(
  projectId: string,
  file: File,
): Promise<{ id: number; url: string; filename: string } | null> {
  const form = new FormData()
  form.append('image', file)
  form.append('project_id', projectId)
  try {
    const res = await fetch('/api/portfolio/images/upload', {
      method: 'POST',
      body: form,
      headers: authHeaders(),
    })
    if (res.ok) return await res.json()
  } catch (e) {
    console.error('Image upload failed:', e)
  }
  return null
}

/** Fetch images for a project from server */
export async function fetchProjectImages(projectId: string): Promise<Array<{ id: number; url: string; sort_order: number }>> {
  try {
    const res = await fetch(`/api/portfolio/images/${projectId}`)
    if (res.ok) return await res.json()
  } catch {}
  return []
}

/** Delete an image from the server */
export async function deleteProjectImage(imageId: number): Promise<boolean> {
  try {
    const res = await fetch(`/api/portfolio/images/${imageId}`, { method: 'DELETE' })
    return res.ok
  } catch { return false }
}

export interface AdminData {
  personalInfo: typeof personalInfo
  services: typeof services
  heroStats: typeof heroStats
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

/** 保存数据到服务器。返回 true 表示保存成功。 */
export async function saveAdminData(data: AdminData): Promise<boolean> {
  data._updatedAt = new Date().toISOString()
  try {
    const res = await fetch(API_URL, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (res.ok) {
      saveToLocal(data)
      return true
    }
  } catch { /* 降级到 localStorage */ }
  return saveToLocal(data)
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

function saveToLocal(data: AdminData): boolean {
  try {
    const json = JSON.stringify(data)
    // Warn if approaching localStorage limit (5MB typical)
    const sizeKB = Math.round(json.length / 1024)
    if (sizeKB > 4000) {
      console.warn(`Admin data is ${sizeKB}KB — approaching localStorage limit. Consider using file paths instead of data URLs for images.`)
    }
    localStorage.setItem(STORAGE_KEY, json)
    return true
  } catch (e) {
    console.error('localStorage save failed — data too large?', e)
    return false
  }
}

function loadFromLocal(): AdminData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return { ...getDefaults(), ...JSON.parse(raw) }
  } catch {}
  return getDefaults()
}

/**
 * 同步读取项目数据（供前台页面使用）
 * 优先读取 localStorage 中 admin 保存的数据，没有则用默认数据
 */
export function loadProjectData(): {
  projectGroups: typeof projectGroups
  allProjects: Record<string, Project>
} {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const saved = JSON.parse(raw)
      if (saved.projectGroups && saved.allProjects) {
        // Merge: saved data overrides defaults, but keep any new projects from code
        const mergedProjects = { ...JSON.parse(JSON.stringify(allProjects)), ...saved.allProjects }
        return { projectGroups: saved.projectGroups, allProjects: mergedProjects }
      }
    }
  } catch {}
  return { projectGroups, allProjects: JSON.parse(JSON.stringify(allProjects)) }
}
