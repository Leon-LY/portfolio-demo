import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, RotateCcw, Download, Plus, Trash2, Edit3, Eye, Upload, X, ChevronLeft, ChevronRight, LogOut, Lock, Key } from 'lucide-react'
import { usePortfolioData, type PortfolioData } from '../data/usePortfolioData'
import { uploadProjectImage } from '../data/adminStore'
import { personalInfo, services, heroStats, workflowSteps, clients, faqItems } from '../data/config'
import { projectGroups as defaultGroups, allProjects as defaultProjects } from '../data/projects'
import { isAuthenticated, loginAPI, logout, authHeaders } from '../data/auth'

/* ══════════════════════════════════════════
   Login Form
   ══════════════════════════════════════════ */
function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try { await loginAPI(email, password); onLogin() }
    catch (err: any) { setError(err.message || '登录失败') }
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#020617] px-4">
      <div className="w-full max-w-sm card-premium rounded-2xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent/10 mb-4">
            <Lock size={20} className="text-accent" />
          </div>
          <h1 className="text-xl font-bold text-white">后台<span className="text-accent">管理</span></h1>
          <p className="text-xs text-text-tertiary mt-1">请输入管理员账号登录</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder="手机号或邮箱" required
            className="w-full px-4 py-2.5 bg-surface-0 border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-all" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="密码" required
            className="w-full px-4 py-2.5 bg-surface-0 border border-white/[0.06] rounded-xl text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:border-accent/40 focus:ring-1 focus:ring-accent/10 transition-all" />
          {error && <p className="text-xs text-red-400">{error}</p>}
          <button type="submit" disabled={loading}
            className="w-full py-2.5 bg-gradient-to-r from-accent to-accent-deep text-surface-0 text-sm font-bold rounded-xl hover:shadow-[0_4px_20px_rgba(0,229,255,0.3)] disabled:opacity-50 transition-all duration-300">
            {loading ? '登录中...' : '登录'}
          </button>
        </form>
        <p className="text-[11px] text-text-tertiary text-center mt-6">首次使用？请通过服务器创建管理员账号。</p>
      </div>
    </div>
  )
}

/* ══════════════════════════════════════════
   Image Uploader
   ══════════════════════════════════════════ */
function ImageUploader({ images, onChange, projectId }: { images: string[]; onChange: (imgs: string[]) => void; projectId: string }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; if (!files) return
    setUploading(true)
    const newUrls: string[] = []
    for (let i = 0; i < files.length; i++) {
      const result = await uploadProjectImage(projectId, files[i])
      if (result) newUrls.push(result.url)
    }
    onChange([...images, ...newUrls])
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }
  const moveImage = (idx: number, d: -1 | 1) => {
    const n = idx + d; if (n < 0 || n >= images.length) return
    const r = [...images]; [r[idx], r[n]] = [r[n], r[idx]]; onChange(r)
  }
  return (
    <div>
      <span className="text-[10px] text-text-tertiary mb-2 block">项目图片 — 上传到服务器数据库</span>
      <div className="flex flex-wrap gap-2 mb-3">
        {images.map((img, i) => (
          <div key={i} className="relative w-20 h-14 rounded-lg overflow-hidden border border-white/[0.06] group">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button onClick={() => moveImage(i, -1)} disabled={i === 0}
              className="absolute top-0.5 left-0.5 w-5 h-5 rounded bg-black/60 flex items-center justify-center text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-default opacity-0 group-hover:opacity-100 transition-all"><ChevronLeft size={10} /></button>
            <button onClick={() => moveImage(i, 1)} disabled={i === images.length - 1}
              className="absolute top-0.5 right-0.5 w-5 h-5 rounded bg-black/60 flex items-center justify-center text-white/60 hover:text-white disabled:opacity-30 disabled:cursor-default opacity-0 group-hover:opacity-100 transition-all"><ChevronRight size={10} /></button>
            <button onClick={() => onChange(images.filter((_, j) => j !== i))}
              className="absolute bottom-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white/60 hover:text-white hover:bg-red-500/80 opacity-0 group-hover:opacity-100 transition-all"><X size={10} /></button>
          </div>
        ))}
        <button onClick={() => fileRef.current?.click()} disabled={uploading}
          className={`w-20 h-14 rounded-lg border border-dashed flex items-center justify-center transition-all ${
            uploading ? 'border-accent/30 text-accent' : 'border-white/[0.06] text-text-tertiary hover:text-white hover:border-accent/20'
          }`}>{uploading ? <span className="text-[9px]">上传中</span> : <Upload size={14} />}</button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
    </div>
  )
}

type Tab = 'personal' | 'hero' | 'services' | 'projects' | 'workflow' | 'clients' | 'faq' | 'contact'

const INPUT_CLASS = "w-full px-3 py-2 bg-surface-0 border border-white/[0.06] rounded-lg text-sm text-white placeholder:text-text-tertiary focus:outline-none focus:border-accent/30 focus:ring-1 focus:ring-accent/10 transition-all"
const SECTION_TITLE = "text-xl font-bold text-white mb-6 flex items-center gap-3"
const TITLE_DECOR = "w-1 h-5 bg-gradient-to-b from-accent to-accent-deep rounded-full"

export default function Admin() {
  const [authed, setAuthed] = useState(isAuthenticated())
  const { data, setData, loading, save: saveToServer } = usePortfolioData()
  const [tab, setTab] = useState<Tab>('personal')
  const [editingProject, setEditingProject] = useState<string | null>(null)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle')
  const [showChangePwd, setShowChangePwd] = useState(false)
  const [pwdCurrent, setPwdCurrent] = useState('')
  const [pwdNew, setPwdNew] = useState('')
  const [pwdError, setPwdError] = useState('')
  const [pwdOk, setPwdOk] = useState(false)

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault(); setPwdError(''); setPwdOk(false)
    try {
      const res = await fetch('/api/portfolio/change-password', {
        method: 'PUT', headers: { 'Content-Type': 'application/json', ...authHeaders() },
        body: JSON.stringify({ currentPassword: pwdCurrent, newPassword: pwdNew }),
      })
      const d = await res.json(); if (!res.ok) throw new Error(d.error || 'Failed')
      setPwdOk(true); setPwdCurrent(''); setPwdNew('')
      setTimeout(() => { setShowChangePwd(false); setPwdOk(false) }, 1500)
    } catch (err: any) { setPwdError(err.message) }
  }

  if (!authed) return <LoginForm onLogin={() => setAuthed(true)} />

  const update = (partial: Partial<PortfolioData>) => { setData({ ...data, ...partial }) }

  const save = async () => {
    setSaveStatus('saving')
    const projects = { ...data.allProjects }
    for (const [id, p] of Object.entries(projects)) {
      if (!p.images || p.images.length === 0) {
        try {
          const res = await fetch('/api/portfolio/placeholder', {
            method: 'POST', headers: { 'Content-Type': 'application/json', ...authHeaders() },
            body: JSON.stringify({ project_id: id, name: p.title, category: p.category, tags: p.tech || [] }),
          })
          if (res.ok) { const { url } = await res.json(); projects[id] = { ...p, images: [url] } }
        } catch {}
      }
    }
    const ok = await saveToServer({ ...data, allProjects: projects })
    if (ok) setData({ ...data, allProjects: projects })
    setSaveStatus(ok ? 'saved' : 'failed')
    setTimeout(() => setSaveStatus('idle'), 2500)
  }

  const reset = () => {
    if (!confirm('确认重置所有数据？此操作不可撤销。')) return
    setData({
      personalInfo: { ...personalInfo }, services: services.map(s => ({ ...s })),
      heroStats: heroStats.map(s => ({ ...s })), workflowSteps: workflowSteps.map(s => ({ ...s })),
      clients: [...clients], faqItems: faqItems.map(f => ({ ...f })),
      projectGroups: defaultGroups.map(g => ({ ...g, items: [...g.items] })),
      allProjects: JSON.parse(JSON.stringify(defaultProjects)),
    })
  }

  const addProject = () => {
    if (!data) return
    const id = 'project-' + Date.now()
    update({ allProjects: { ...data.allProjects, [id]: { id, title: '新项目', category: '未分类', description: '', tech: [], link: '/project/' + id, images: [], overview: '', capabilities: [], techNote: '', real: true } } })
    setEditingProject(id)
  }

  const deleteProject = (id: string) => {
    if (!data || !confirm('确认删除此项目？')) return
    const { [id]: _, ...rest } = data.allProjects
    update({ allProjects: rest, projectGroups: data.projectGroups.map(g => ({ ...g, items: g.items.filter(i => i !== id) })) })
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white text-sm">加载数据中...</div>

  const tabs: { key: Tab; label: string }[] = [
    { key: 'personal', label: '个人信息' }, { key: 'hero', label: 'Hero 区域' },
    { key: 'services', label: '服务方向' }, { key: 'projects', label: '项目管理' },
    { key: 'workflow', label: '合作流程' }, { key: 'clients', label: '服务单位' },
    { key: 'faq', label: 'FAQ' }, { key: 'contact', label: '联系方式' },
  ]

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      {/* ── Header ── */}
      <div className="card-float sticky top-0 z-50 border-b-0 rounded-none">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-text-secondary hover:text-white transition-colors"><ArrowLeft size={18} /></Link>
            <h1 className="text-lg font-bold"><span className="text-white">后台</span><span className="text-accent">管理</span></h1>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setShowChangePwd(true)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-secondary bg-white/[0.03] border border-white/[0.06] rounded-lg hover:text-white hover:bg-white/[0.06] hover:border-white/[0.12] transition-all duration-200"><Key size={13} /> 改密</button>
            <button onClick={() => { logout(); setAuthed(false) }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-secondary bg-white/[0.03] border border-white/[0.06] rounded-lg hover:text-red-400 hover:bg-red-500/5 hover:border-red-500/20 transition-all duration-200"><LogOut size={13} /> 退出</button>
            <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-text-secondary bg-white/[0.03] border border-white/[0.06] rounded-lg hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"><RotateCcw size={13} /> 重置</button>
            <button onClick={() => {
              const json = JSON.stringify(data, null, 2); const blob = new Blob([json], { type: 'application/json' })
              const url = URL.createObjectURL(blob); const a = document.createElement('a')
              a.href = url; a.download = `portfolio-backup-${new Date().toISOString().slice(0,10)}.json`; a.click(); URL.revokeObjectURL(url)
            }} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/[0.04] border border-white/[0.08] rounded-lg text-text-primary hover:bg-white/[0.08] hover:border-white/[0.15] transition-all duration-200"><Download size={13} /> 导出备份</button>
            <button onClick={save} disabled={saveStatus === 'saving'}
              className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all duration-300 ${
                saveStatus === 'saved' ? 'bg-emerald-600 text-white shadow-[0_0_12px_rgba(16,185,129,0.3)]' :
                saveStatus === 'failed' ? 'bg-red-600 text-white' :
                saveStatus === 'saving' ? 'bg-text-tertiary text-white' :
                'bg-gradient-to-r from-accent to-accent-deep text-surface-0 hover:shadow-[0_4px_16px_rgba(0,229,255,0.3)]'
              }`}>
              <Save size={13} />
              {saveStatus === 'saving' ? '保存中...' : saveStatus === 'saved' ? '✓ 已保存' : saveStatus === 'failed' ? '✗ 失败' : '保存'}
            </button>
          </div>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="border-b border-white/[0.04] bg-[#020617] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`relative px-4 py-3 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                tab === t.key ? 'text-white' : 'text-text-tertiary hover:text-text-primary'
              }`}>
              {t.label}
              {tab === t.key && (
                <motion.span layoutId="admin-tab" className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent to-accent-deep rounded-full"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Personal */}
        {tab === 'personal' && (
          <div className="space-y-6">
            <h2 className={SECTION_TITLE}><span className={TITLE_DECOR} />个人信息</h2>
            <div className="grid gap-4">
              {[
                { key: 'name', label: '团队名称' }, { key: 'tagline', label: '标签语' },
                { key: 'subtitle', label: '副标题' }, { key: 'email', label: '邮箱' }, { key: 'phone', label: '电话' },
              ].map(f => (
                <label key={f.key} className="block"><span className="text-xs text-text-tertiary mb-1 block">{f.label}</span>
                  <input value={(data.personalInfo as any)[f.key] || ''} onChange={e => update({ personalInfo: { ...data.personalInfo, [f.key]: e.target.value } })} className={INPUT_CLASS} /></label>
              ))}
            </div>
          </div>
        )}

        {/* Hero */}
        {tab === 'hero' && (
          <div className="space-y-6">
            <h2 className={SECTION_TITLE}><span className={TITLE_DECOR} />Hero 区域</h2>
            <label className="block"><span className="text-xs text-text-tertiary mb-1 block">主标题</span>
              <input value={data.personalInfo.heroTitle} onChange={e => update({ personalInfo: { ...data.personalInfo, heroTitle: e.target.value } })} className={INPUT_CLASS} /></label>
            <label className="block"><span className="text-xs text-text-tertiary mb-1 block">信任背书</span>
              <input value={data.personalInfo.heroCredibility} onChange={e => update({ personalInfo: { ...data.personalInfo, heroCredibility: e.target.value } })} className={INPUT_CLASS} /></label>
          </div>
        )}

        {/* Services */}
        {tab === 'services' && (
          <div className="space-y-6">
            <h2 className={SECTION_TITLE}><span className={TITLE_DECOR} />服务方向</h2>
            {data.services.map((s, i) => (
              <div key={i} className="card-premium rounded-xl p-5 space-y-3">
                <input value={s.title} onChange={e => { const ns = [...data.services]; ns[i] = { ...ns[i], title: e.target.value }; update({ services: ns }) }} className={INPUT_CLASS + ' font-semibold'} />
                <textarea rows={2} value={s.desc} onChange={e => { const ns = [...data.services]; ns[i] = { ...ns[i], desc: e.target.value }; update({ services: ns }) }} className={INPUT_CLASS + ' resize-none'} />
                <button onClick={() => update({ services: data.services.filter((_, j) => j !== i) })} className="text-xs text-text-tertiary hover:text-red-400 px-2 py-1 rounded hover:bg-red-500/5 transition-all duration-200">删除</button>
              </div>
            ))}
            <button onClick={() => update({ services: [...data.services, { title: '新服务', desc: '' }] })}
              className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-bright bg-accent/[0.04] border border-accent/10 px-3 py-1.5 rounded-lg hover:bg-accent/[0.08] hover:border-accent/20 transition-all duration-200"><Plus size={14} /> 添加服务</button>
          </div>
        )}

        {/* Projects */}
        {tab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={SECTION_TITLE + ' mb-0'}><span className={TITLE_DECOR} />项目管理</h2>
              <button onClick={addProject} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-accent to-accent-deep text-surface-0 text-xs font-semibold rounded-lg hover:shadow-[0_4px_16px_rgba(0,229,255,0.3)] transition-all duration-300"><Plus size={14} /> 新建项目</button>
            </div>
            {/* Groups */}
            <div className="card-premium rounded-xl p-4">
              <span className="text-xs text-text-tertiary mb-3 block">分组排序</span>
              {data.projectGroups.map((g, gi) => (
                <div key={gi} className="flex items-center gap-2 mb-2">
                  <input value={g.label} onChange={e => { const ng = [...data.projectGroups]; ng[gi] = { ...ng[gi], label: e.target.value }; update({ projectGroups: ng }) }} className={INPUT_CLASS + ' flex-1'} />
                  <button onClick={() => update({ projectGroups: data.projectGroups.filter((_, j) => j !== gi) })} className="text-text-tertiary hover:text-red-400"><Trash2 size={14} /></button>
                </div>
              ))}
              <button onClick={() => update({ projectGroups: [...data.projectGroups, { label: '新分组', items: [] }] })}
                className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-bright bg-accent/[0.04] border border-accent/10 px-3 py-1.5 rounded-lg mt-2 hover:bg-accent/[0.08] transition-all duration-200"><Plus size={14} /> 添加分组</button>
            </div>
            {/* Project list */}
            <div className="space-y-3">
              {Object.values(data.allProjects).map(p => (
                <div key={p.id} className="card-premium rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => setEditingProject(editingProject === p.id ? null : p.id)}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-text-tertiary w-16">{p.real ? '真实项目' : 'Demo'}</span>
                      <span className="text-sm font-medium text-white">{p.title}</span>
                      <span className="text-xs text-text-tertiary">{p.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={p.link} target="_blank" className="text-text-tertiary hover:text-white transition-colors"><Eye size={14} /></Link>
                      <button onClick={e => { e.stopPropagation(); deleteProject(p.id) }} className="text-text-tertiary hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                      <Edit3 size={14} className={`transition-transform ${editingProject === p.id ? 'rotate-180 text-accent' : 'text-text-tertiary'}`} />
                    </div>
                  </div>
                  {editingProject === p.id && (
                    <div className="border-t border-white/[0.04] p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {[{ key: 'title', label: '项目名称' }, { key: 'category', label: '分类' }].map(f => (
                          <label key={f.key} className="block"><span className="text-[10px] text-text-tertiary mb-1 block">{f.label}</span>
                            <input value={(p as any)[f.key] || ''} onChange={e => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, [f.key]: e.target.value } } })} className={INPUT_CLASS} /></label>
                        ))}
                      </div>
                      <label className="block"><span className="text-[10px] text-text-tertiary mb-1 block">简介</span>
                        <textarea rows={2} value={p.description} onChange={e => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, description: e.target.value } } })} className={INPUT_CLASS + ' resize-none'} /></label>
                      <label className="block"><span className="text-[10px] text-text-tertiary mb-1 block">项目概述</span>
                        <textarea rows={2} value={p.overview || ''} onChange={e => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, overview: e.target.value } } })} className={INPUT_CLASS + ' resize-none'} /></label>
                      <label className="block"><span className="text-[10px] text-text-tertiary mb-1 block">技术栈（逗号分隔）</span>
                        <input value={p.tech.join(', ')} onChange={e => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, tech: e.target.value.split(',').map(t => t.trim()).filter(Boolean) } } })} className={INPUT_CLASS + ' font-mono'} /></label>
                      <ImageUploader projectId={p.id} images={p.images || []} onChange={imgs => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, images: imgs } } })} />
                      <label className="block"><span className="text-[10px] text-text-tertiary mb-1 block">核心能力（每行一个）</span>
                        <textarea rows={3} value={(p.capabilities || []).join('\n')} onChange={e => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, capabilities: e.target.value.split('\n').filter(Boolean) } } })} className={INPUT_CLASS + ' resize-none'} /></label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Workflow */}
        {tab === 'workflow' && (
          <div className="space-y-6">
            <h2 className={SECTION_TITLE}><span className={TITLE_DECOR} />合作流程</h2>
            {data.workflowSteps.map((s, i) => (
              <div key={i} className="card-premium rounded-xl p-4 space-y-2">
                <input value={s.step} onChange={e => { const ns = [...data.workflowSteps]; ns[i] = { ...ns[i], step: e.target.value }; update({ workflowSteps: ns }) }} className={INPUT_CLASS + ' w-20 text-center'} />
                <input value={s.title} onChange={e => { const ns = [...data.workflowSteps]; ns[i] = { ...ns[i], title: e.target.value }; update({ workflowSteps: ns }) }} className={INPUT_CLASS} />
                <textarea rows={2} value={s.desc} onChange={e => { const ns = [...data.workflowSteps]; ns[i] = { ...ns[i], desc: e.target.value }; update({ workflowSteps: ns }) }} className={INPUT_CLASS + ' resize-none'} />
              </div>
            ))}
          </div>
        )}

        {/* Clients */}
        {tab === 'clients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between"><h2 className={SECTION_TITLE + ' mb-0'}><span className={TITLE_DECOR} />服务单位</h2>
              <button onClick={() => update({ clients: [...data.clients, '新单位'] })} className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-bright bg-accent/[0.04] border border-accent/10 px-3 py-1.5 rounded-lg transition-all duration-200"><Plus size={14} /> 添加</button></div>
            {data.clients.map((c, i) => (
              <div key={i} className="flex gap-2">
                <input value={c} onChange={e => { const nc = [...data.clients]; nc[i] = e.target.value; update({ clients: nc }) }} className={INPUT_CLASS + ' flex-1'} />
                <button onClick={() => update({ clients: data.clients.filter((_, j) => j !== i) })} className="text-text-tertiary hover:text-red-400 px-2 transition-colors"><Trash2 size={14} /></button>
              </div>
            ))}
          </div>
        )}

        {/* FAQ */}
        {tab === 'faq' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between"><h2 className={SECTION_TITLE + ' mb-0'}><span className={TITLE_DECOR} />FAQ</h2>
              <button onClick={() => update({ faqItems: [...data.faqItems, { q: '新问题', a: '新回答' }] })} className="flex items-center gap-1.5 text-xs text-accent hover:text-accent-bright bg-accent/[0.04] border border-accent/10 px-3 py-1.5 rounded-lg transition-all duration-200"><Plus size={14} /> 添加</button></div>
            {data.faqItems.map((f, i) => (
              <div key={i} className="card-premium rounded-xl p-4 space-y-2">
                <input value={f.q} onChange={e => { const ns = [...data.faqItems]; ns[i] = { ...ns[i], q: e.target.value }; update({ faqItems: ns }) }} className={INPUT_CLASS} />
                <textarea rows={3} value={f.a} onChange={e => { const ns = [...data.faqItems]; ns[i] = { ...ns[i], a: e.target.value }; update({ faqItems: ns }) }} className={INPUT_CLASS + ' resize-none'} />
                <button onClick={() => update({ faqItems: data.faqItems.filter((_, j) => j !== i) })} className="text-xs text-text-tertiary hover:text-red-400 px-2 py-1 rounded hover:bg-red-500/5 transition-all duration-200">删除</button>
              </div>
            ))}
          </div>
        )}

        {/* Contact */}
        {tab === 'contact' && (
          <div className="space-y-6">
            <h2 className={SECTION_TITLE}><span className={TITLE_DECOR} />联系方式</h2>
            <label className="block"><span className="text-xs text-text-tertiary mb-1 block">电话</span>
              <input value={data.personalInfo.phone} onChange={e => update({ personalInfo: { ...data.personalInfo, phone: e.target.value } })} className={INPUT_CLASS} /></label>
            <label className="block"><span className="text-xs text-text-tertiary mb-1 block">邮箱</span>
              <input value={data.personalInfo.email} onChange={e => update({ personalInfo: { ...data.personalInfo, email: e.target.value } })} className={INPUT_CLASS} /></label>
            <div className="card-premium rounded-xl p-4 border-accent-warm/10">
              <p className="text-xs text-text-secondary leading-relaxed">
                修改后点击右上角「保存」按钮。数据存储在浏览器 localStorage 中。
                <br /><strong className="text-accent-warm">⚠️ 图片请用文件路径（如 /projects/my-image.png），不要上传 base64 图片。</strong>
              </p>
            </div>
          </div>
        )}

        {/* Change Password Modal */}
        {showChangePwd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowChangePwd(false)}>
            <div className="card-premium rounded-2xl p-6 w-full max-w-sm mx-4" onClick={e => e.stopPropagation()}>
              <h3 className="text-lg font-bold text-white mb-4">修改密码</h3>
              <form onSubmit={changePassword} className="space-y-3">
                <input type="password" value={pwdCurrent} onChange={e => setPwdCurrent(e.target.value)} placeholder="当前密码" required className={INPUT_CLASS} />
                <input type="password" value={pwdNew} onChange={e => setPwdNew(e.target.value)} placeholder="新密码（至少6位）" required minLength={6} className={INPUT_CLASS} />
                {pwdError && <p className="text-xs text-red-400">{pwdError}</p>}
                {pwdOk && <p className="text-xs text-success">密码修改成功 ✓</p>}
                <div className="flex gap-2 pt-2">
                  <button type="button" onClick={() => setShowChangePwd(false)} className="flex-1 py-2.5 text-sm text-text-secondary hover:text-white transition-colors">取消</button>
                  <button type="submit" className="flex-1 py-2.5 bg-gradient-to-r from-accent to-accent-deep text-surface-0 text-sm font-semibold rounded-xl hover:shadow-[0_4px_16px_rgba(0,229,255,0.3)] transition-all duration-300">确认修改</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
