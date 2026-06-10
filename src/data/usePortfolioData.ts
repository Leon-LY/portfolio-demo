/**
 * Unified data hook — fetches from server API, falls back to localStorage, then defaults.
 * Both frontend pages and admin panel use this as the single source of truth.
 */
import { useState, useEffect, useCallback } from 'react'
import { personalInfo, services, heroStats, typewriterTexts, workflowSteps, clients, faqItems } from './config'
import { projectGroups as defaultGroups, allProjects as defaultProjects } from './projects'
import { authHeaders } from './auth'
import type { Project } from './projects'

export interface PortfolioData {
  personalInfo: typeof personalInfo
  services: typeof services
  heroStats: typeof heroStats
  typewriterTexts: string[]
  workflowSteps: typeof workflowSteps
  clients: string[]
  faqItems: typeof faqItems
  heroTitle: string
  heroBio: string
  heroCredibility: string
  projectGroups: typeof defaultGroups
  allProjects: Record<string, Project>
  _updatedAt?: string
}

function getDefaults(): PortfolioData {
  return {
    personalInfo: { ...personalInfo },
    services: services.map(s => ({ ...s })),
    heroStats: heroStats.map(s => ({ ...s })),
    typewriterTexts: [...typewriterTexts],
    workflowSteps: workflowSteps.map(s => ({ ...s })),
    clients: [...clients],
    faqItems: faqItems.map(f => ({ ...f })),
    heroTitle: (personalInfo as any).heroTitle || '',
    heroBio: (personalInfo as any).heroBio || '',
    heroCredibility: (personalInfo as any).heroCredibility || '',
    projectGroups: defaultGroups.map(g => ({ ...g, items: [...g.items] })),
    allProjects: JSON.parse(JSON.stringify(defaultProjects)),
  }
}

const STORAGE_KEY = 'portfolio-admin-data'

/** Deep-merge API data over defaults — preserves project fields */
function mergeData(defaults: PortfolioData, apiData: Record<string, any>): PortfolioData {
  const merged = { ...defaults, ...apiData }
  // Deep-merge allProjects at the project level
  if (apiData.allProjects && defaults.allProjects) {
    merged.allProjects = { ...defaults.allProjects }
    for (const [id, apiProject] of Object.entries(apiData.allProjects)) {
      merged.allProjects[id] = {
        ...(defaults.allProjects[id] || {}),
        ...(apiProject as any),
      }
    }
  }
  return merged
}

function loadFromLocal(): PortfolioData | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return mergeData(getDefaults(), JSON.parse(raw))
  } catch {}
  return null
}

/** Fetch from server API */
async function fetchFromAPI(): Promise<PortfolioData | null> {
  try {
    const res = await fetch('/api/portfolio/data')
    if (res.ok) {
      const data = await res.json()
      if (data && Object.keys(data).length > 0) {
        return mergeData(getDefaults(), data)
      }
    }
  } catch {}
  return null
}

// ── In-memory cache ──
let cachedData: PortfolioData | null = null
let fetchPromise: Promise<PortfolioData | null> | null = null

/** Main hook — call once at app level or in each page */
export function usePortfolioData() {
  const [data, setData] = useState<PortfolioData>(cachedData ?? getDefaults())
  const [loading, setLoading] = useState(!cachedData)

  useEffect(() => {
    if (cachedData) {
      setData(cachedData)
      setLoading(false)
      return
    }

    let cancelled = false

    const load = async () => {
      if (!fetchPromise) {
        fetchPromise = fetchFromAPI().then(apiData => {
          if (apiData) return apiData
          // Fallback to localStorage
          const local = loadFromLocal()
          if (local) return local
          return getDefaults()
        })
      }

      const result = await fetchPromise
      if (!cancelled && result) {
        cachedData = result
        setData(result)
        setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  /** Refresh from server (used after admin save) */
  const refresh = useCallback(async () => {
    fetchPromise = null // bust cache
    const apiData = await fetchFromAPI()
    if (apiData) {
      cachedData = apiData
      setData(apiData)
    }
  }, [])

  /** Save to server + localStorage */
  const save = useCallback(async (newData: PortfolioData): Promise<boolean> => {
    const payload = { ...newData, _updatedAt: new Date().toISOString() }
    // Save to localStorage as fallback
    try {
      const json = JSON.stringify(payload)
      if (json.length < 4_000_000) {
        localStorage.setItem(STORAGE_KEY, json)
      }
    } catch {}

    // Save to server
    try {
      const res = await fetch('/api/portfolio/data', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        cachedData = payload
        setData(payload)
        return true
      }
    } catch {}

    // Server failed — still update local state if localStorage worked
    cachedData = payload
    setData(payload)
    return false
  }, [])

  return { data, setData, loading, refresh, save }
}
