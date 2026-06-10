import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { ArrowLeft, Save, RotateCcw, Download, Plus, Trash2, Edit3, Eye, Upload, X } from 'lucide-react'
import { loadAdminData, saveAdminData, resetAdminData, downloadJSON } from '../data/adminStore'
import type { AdminData } from '../data/adminStore'
import type { Project } from '../data/projects'

/** Compress an image via canvas and return as JPEG data URL */
function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const MAX = 800 // max width/height
      let { width, height } = img
      if (width > MAX || height > MAX) {
        if (width > height) { height = Math.round(height * MAX / width); width = MAX }
        else { width = Math.round(width * MAX / height); height = MAX }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, width, height)
      resolve(canvas.toDataURL('image/jpeg', 0.75))
    }
    img.onerror = () => reject(new Error('Failed to load image'))
    img.src = URL.createObjectURL(file)
  })
}

/** Image uploader — auto-compresses to ~30-80KB JPEG before storing */
function ImageUploader({ images, onChange }: { images: string[]; onChange: (imgs: string[]) => void }) {
  const fileRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    setUploading(true)
    const compressed: string[] = []
    for (let i = 0; i < files.length; i++) {
      try {
        const url = await compressImage(files[i])
        compressed.push(url)
      } catch { /* skip broken files */ }
    }
    onChange([...images, ...compressed])
    setUploading(false)
    if (fileRef.current) fileRef.current.value = ''
  }

  const removeImage = (idx: number) => {
    onChange(images.filter((_, i) => i !== idx))
  }

  return (
    <div>
      <span className="text-[10px] text-slate-500 mb-2 block">项目图片 — 直接上传，自动压缩</span>
      <div className="flex flex-wrap gap-2 mb-3">
        {images.map((img, i) => (
          <div key={i} className="relative w-20 h-14 rounded-lg overflow-hidden border border-white/[0.06] group">
            <img src={img} alt="" className="w-full h-full object-cover" />
            <button onClick={() => removeImage(i)} className="absolute top-0.5 right-0.5 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center text-white/60 hover:text-white hover:bg-red-500/80 transition-all opacity-0 group-hover:opacity-100"><X size={10} /></button>
          </div>
        ))}
        <button onClick={() => fileRef.current?.click()} disabled={uploading}
          className={`w-20 h-14 rounded-lg border border-dashed flex items-center justify-center transition-all ${
            uploading ? 'border-blue-500/30 text-blue-400' : 'border-white/[0.1] text-slate-600 hover:text-white hover:border-white/[0.2]'
          }`}>
          {uploading ? <span className="text-[9px]">压缩中</span> : <Upload size={14} />}
        </button>
      </div>
      <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} className="hidden" />
      <p className="text-[10px] text-slate-600">上传后自动压缩至 800px 宽 · JPEG 格式 · 单张约 30-80KB</p>
      <textarea rows={2} value={images.filter(i => !i.startsWith('data:')).join('\n')}
        onChange={e => {
          const paths = e.target.value.split('\n').filter(Boolean)
          const dataUrls = images.filter(i => i.startsWith('data:'))
          onChange([...dataUrls, ...paths])
        }}
        className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-xs text-white focus:outline-none focus:border-blue-500/50 resize-none font-mono mt-1"
        placeholder="或输入图片路径：/projects/my-image.png" />
    </div>
  )
}

type Tab = 'personal' | 'hero' | 'services' | 'projects' | 'workflow' | 'clients' | 'faq' | 'contact'

export default function Admin() {
  const [data, setData] = useState<AdminData | null>(null)
  const [tab, setTab] = useState<Tab>('personal')
  const [editingProject, setEditingProject] = useState<string | null>(null)

  useEffect(() => { loadAdminData().then(setData) }, [])

  const update = (partial: Partial<AdminData>) => {
    if (!data) return
    setData({ ...data, ...partial })
  }

  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'failed'>('idle')

  const save = async () => {
    if (!data) return
    setSaveStatus('saving')
    const ok = await saveAdminData(data)
    setSaveStatus(ok ? 'saved' : 'failed')
    setTimeout(() => setSaveStatus('idle'), 2500)
  }

  const reset = () => {
    if (!confirm('确认重置所有数据？此操作不可撤销。')) return
    setData(resetAdminData())
  }

  const addProject = () => {
    if (!data) return
    const id = 'project-' + Date.now()
    const newProject: Project = {
      id, title: '新项目', category: '未分类', description: '',
      tech: [], link: '/project/' + id, images: [],
      overview: '', capabilities: [], techNote: '', real: true,
    }
    update({ allProjects: { ...data.allProjects, [id]: newProject } })
    setEditingProject(id)
  }

  const deleteProject = (id: string) => {
    if (!data || !confirm('确认删除此项目？')) return
    const { [id]: _, ...rest } = data.allProjects
    const groups = data.projectGroups.map(g => ({ ...g, items: g.items.filter(i => i !== id) }))
    update({ allProjects: rest, projectGroups: groups })
  }

  if (!data) return <div className="min-h-screen flex items-center justify-center text-white">加载中...</div>

  const tabs: { key: Tab; label: string }[] = [
    { key: 'personal', label: '个人信息' },
    { key: 'hero', label: 'Hero 区域' },
    { key: 'services', label: '服务方向' },
    { key: 'projects', label: '项目管理' },
    { key: 'workflow', label: '合作流程' },
    { key: 'clients', label: '服务单位' },
    { key: 'faq', label: 'FAQ' },
    { key: 'contact', label: '联系方式' },
  ]

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white">
      {/* Header */}
      <div className="bg-[#111827] border-b border-white/[0.05] sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-slate-400 hover:text-white transition-colors"><ArrowLeft size={18} /></Link>
            <h1 className="text-lg font-bold">后台管理</h1>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={reset} className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-400 hover:text-red-400 transition-colors"><RotateCcw size={13} /> 重置</button>
            <button onClick={() => downloadJSON(data)} className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-white/[0.04] border border-white/[0.08] rounded-lg text-slate-300 hover:bg-white/[0.08] transition-all"><Download size={13} /> 导出备份</button>
            <button onClick={save} disabled={saveStatus === 'saving'} className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${
  saveStatus === 'saved' ? 'bg-emerald-600 text-white' :
  saveStatus === 'failed' ? 'bg-red-600 text-white' :
  saveStatus === 'saving' ? 'bg-slate-600 text-white' :
  'bg-blue-600 text-white hover:bg-blue-500'
}`}>
  <Save size={13} />
  {saveStatus === 'saving' ? '保存中...' : saveStatus === 'saved' ? '已保存' : saveStatus === 'failed' ? '保存失败' : '保存'}
</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/[0.04] bg-[#0a0e1a] sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-6 flex gap-1 overflow-x-auto">
          {tabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-all ${tab === t.key ? 'border-blue-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'}`}
            >{t.label}</button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        {tab === 'personal' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">个人信息</h2>
            <div className="grid gap-4">
              {[
                { key: 'name', label: '姓名' },
                { key: 'tagline', label: '标签语' },
                { key: 'subtitle', label: '副标题' },
                { key: 'email', label: '邮箱' },
                { key: 'phone', label: '电话' },
              ].map(f => (
                <label key={f.key} className="block">
                  <span className="text-xs text-slate-500 mb-1 block">{f.label}</span>
                  <input value={(data.personalInfo as any)[f.key] || ''} onChange={e => update({ personalInfo: { ...data.personalInfo, [f.key]: e.target.value } })}
                    className="w-full px-4 py-2.5 bg-[#111827] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors" />
                </label>
              ))}
              <label className="block">
                <span className="text-xs text-slate-500 mb-1 block">个人简介（在 Hero 区显示）</span>
                <textarea rows={4} value={data.heroBio} onChange={e => update({ heroBio: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#111827] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none" />
              </label>
            </div>
          </div>
        )}

        {tab === 'hero' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Hero 区域配置</h2>
            <label className="block"><span className="text-xs text-slate-500 mb-1 block">主标题</span>
              <input value={data.heroTitle} onChange={e => update({ heroTitle: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#111827] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors" /></label>
            <label className="block"><span className="text-xs text-slate-500 mb-1 block">简介（换行分隔）</span>
              <textarea rows={3} value={data.heroBio} onChange={e => update({ heroBio: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#111827] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none" /></label>
            <label className="block"><span className="text-xs text-slate-500 mb-1 block">信任背书</span>
              <input value={data.heroCredibility} onChange={e => update({ heroCredibility: e.target.value })}
                className="w-full px-4 py-2.5 bg-[#111827] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors" /></label>

            <div>
              <span className="text-xs text-slate-500 mb-2 block">统计数字</span>
              {data.heroStats.map((s, i) => (
                <div key={i} className="flex gap-2 mb-2">
                  <input value={s.value} onChange={e => { const ns = [...data.heroStats]; ns[i] = { ...ns[i], value: e.target.value }; update({ heroStats: ns }) }}
                    className="w-24 px-3 py-2 bg-[#111827] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50" />
                  <input value={s.label} onChange={e => { const ns = [...data.heroStats]; ns[i] = { ...ns[i], label: e.target.value }; update({ heroStats: ns }) }}
                    className="flex-1 px-3 py-2 bg-[#111827] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50" />
                </div>
              ))}
            </div>

            <div>
              <span className="text-xs text-slate-500 mb-2 block">打字机轮播文字（每行一个）</span>
              <textarea rows={4} value={data.typewriterTexts.join('\n')} onChange={e => update({ typewriterTexts: e.target.value.split('\n') })}
                className="w-full px-4 py-2.5 bg-[#111827] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50 transition-colors resize-none font-mono" />
            </div>
          </div>
        )}

        {tab === 'services' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">服务方向</h2>
            {data.services.map((s, i) => (
              <div key={i} className="bg-[#111827] border border-white/[0.04] rounded-xl p-4 space-y-3">
                <input value={s.title} onChange={e => { const ns = [...data.services]; ns[i] = { ...ns[i], title: e.target.value }; update({ services: ns }) }}
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm font-semibold text-white focus:outline-none focus:border-blue-500/50" />
                <textarea rows={2} value={s.desc} onChange={e => { const ns = [...data.services]; ns[i] = { ...ns[i], desc: e.target.value }; update({ services: ns }) }}
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none" />
                <button onClick={() => update({ services: data.services.filter((_, j) => j !== i) })} className="text-xs text-slate-500 hover:text-red-400 transition-colors">删除</button>
              </div>
            ))}
            <button onClick={() => update({ services: [...data.services, { title: '新服务', desc: '' }] })}
              className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors"><Plus size={14} /> 添加服务</button>
          </div>
        )}

        {tab === 'projects' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">项目管理</h2>
              <button onClick={addProject} className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-all"><Plus size={14} /> 新建项目</button>
            </div>

            {/* Project groups order */}
            <div className="bg-[#111827] border border-white/[0.04] rounded-xl p-4">
              <span className="text-xs text-slate-500 mb-3 block">分组排序</span>
              {data.projectGroups.map((g, gi) => (
                <div key={gi} className="flex items-center gap-2 mb-2">
                  <input value={g.label} onChange={e => { const ng = [...data.projectGroups]; ng[gi] = { ...ng[gi], label: e.target.value }; update({ projectGroups: ng }) }}
                    className="flex-1 px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50" />
                  <button onClick={() => update({ projectGroups: data.projectGroups.filter((_, j) => j !== gi) })} className="text-slate-600 hover:text-red-400"><Trash2 size={14} /></button>
                </div>
              ))}
              <button onClick={() => update({ projectGroups: [...data.projectGroups, { label: '新分组', items: [] }] })}
                className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors mt-2"><Plus size={14} /> 添加分组</button>
            </div>

            {/* Individual projects */}
            <div className="space-y-3">
              {Object.values(data.allProjects).map(p => (
                <div key={p.id} className="bg-[#111827] border border-white/[0.04] rounded-xl overflow-hidden">
                  <div className="flex items-center justify-between p-4 hover:bg-white/[0.02] transition-colors cursor-pointer" onClick={() => setEditingProject(editingProject === p.id ? null : p.id)}>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-500 w-16">{p.real ? '真实项目' : 'Demo'}</span>
                      <span className="text-sm font-medium text-white">{p.title}</span>
                      <span className="text-xs text-slate-600">{p.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link to={p.link} target="_blank" className="text-slate-600 hover:text-white transition-colors"><Eye size={14} /></Link>
                      <button onClick={e => { e.stopPropagation(); deleteProject(p.id) }} className="text-slate-600 hover:text-red-400 transition-colors"><Trash2 size={14} /></button>
                      <Edit3 size={14} className={`transition-transform ${editingProject === p.id ? 'rotate-180 text-blue-400' : 'text-slate-600'}`} />
                    </div>
                  </div>

                  {editingProject === p.id && (
                    <div className="border-t border-white/[0.04] p-4 space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { key: 'title', label: '项目名称' },
                          { key: 'category', label: '分类' },
                        ].map(f => (
                          <label key={f.key} className="block"><span className="text-[10px] text-slate-500 mb-1 block">{f.label}</span>
                            <input value={(p as any)[f.key] || ''} onChange={e => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, [f.key]: e.target.value } } })}
                              className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50" /></label>
                        ))}
                      </div>
                      <label className="block"><span className="text-[10px] text-slate-500 mb-1 block">简介</span>
                        <textarea rows={2} value={p.description} onChange={e => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, description: e.target.value } } })}
                          className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none" /></label>
                      <label className="block"><span className="text-[10px] text-slate-500 mb-1 block">项目概述</span>
                        <textarea rows={2} value={p.overview || ''} onChange={e => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, overview: e.target.value } } })}
                          className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none" /></label>
                      <label className="block"><span className="text-[10px] text-slate-500 mb-1 block">技术方案</span>
                        <input value={p.techNote || ''} onChange={e => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, techNote: e.target.value } } })}
                          className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50" /></label>
                      <label className="block"><span className="text-[10px] text-slate-500 mb-1 block">技术栈（逗号分隔）</span>
                        <input value={p.tech.join(', ')} onChange={e => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, tech: e.target.value.split(',').map(t => t.trim()).filter(Boolean) } } })}
                          className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 font-mono" /></label>
                      <ImageUploader images={p.images || []} onChange={imgs => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, images: imgs } } })} />
                      <label className="block"><span className="text-[10px] text-slate-500 mb-1 block">核心能力（每行一个）</span>
                        <textarea rows={3} value={(p.capabilities || []).join('\n')} onChange={e => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, capabilities: e.target.value.split('\n').filter(Boolean) } } })}
                          className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none" /></label>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'workflow' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">合作流程</h2>
            {data.workflowSteps.map((s, i) => (
              <div key={i} className="bg-[#111827] border border-white/[0.04] rounded-xl p-4 space-y-2">
                <input value={s.step} onChange={e => { const ns = [...data.workflowSteps]; ns[i] = { ...ns[i], step: e.target.value }; update({ workflowSteps: ns }) }}
                  className="w-20 px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 text-center" />
                <input value={s.title} onChange={e => { const ns = [...data.workflowSteps]; ns[i] = { ...ns[i], title: e.target.value }; update({ workflowSteps: ns }) }}
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50" />
                <textarea rows={2} value={s.desc} onChange={e => { const ns = [...data.workflowSteps]; ns[i] = { ...ns[i], desc: e.target.value }; update({ workflowSteps: ns }) }}
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none" />
              </div>
            ))}
          </div>
        )}

        {tab === 'clients' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between"><h2 className="text-xl font-bold">服务单位</h2><button onClick={() => update({ clients: [...data.clients, '新单位'] })} className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300"><Plus size={14}/> 添加</button></div>
            {data.clients.map((c, i) => (
              <div key={i} className="flex gap-2">
                <input value={c} onChange={e => { const nc = [...data.clients]; nc[i] = e.target.value; update({ clients: nc }) }}
                  className="flex-1 px-3 py-2 bg-[#111827] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50" />
                <button onClick={() => update({ clients: data.clients.filter((_, j) => j !== i) })} className="text-slate-600 hover:text-red-400"><Trash2 size={14}/></button>
              </div>
            ))}
          </div>
        )}

        {tab === 'faq' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between"><h2 className="text-xl font-bold">FAQ</h2><button onClick={() => update({ faqItems: [...data.faqItems, { q: '新问题', a: '新回答' }] })} className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300"><Plus size={14}/> 添加</button></div>
            {data.faqItems.map((f, i) => (
              <div key={i} className="bg-[#111827] border border-white/[0.04] rounded-xl p-4 space-y-2">
                <input value={f.q} onChange={e => { const ns = [...data.faqItems]; ns[i] = { ...ns[i], q: e.target.value }; update({ faqItems: ns }) }}
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50" />
                <textarea rows={3} value={f.a} onChange={e => { const ns = [...data.faqItems]; ns[i] = { ...ns[i], a: e.target.value }; update({ faqItems: ns }) }}
                  className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none" />
                <button onClick={() => update({ faqItems: data.faqItems.filter((_, j) => j !== i) })} className="text-xs text-slate-500 hover:text-red-400">删除</button>
              </div>
            ))}
          </div>
        )}

        {tab === 'contact' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">联系方式</h2>
            <label className="block"><span className="text-xs text-slate-500 mb-1 block">电话</span>
              <input value={data.personalInfo.phone} onChange={e => update({ personalInfo: { ...data.personalInfo, phone: e.target.value } })}
                className="w-full px-4 py-2.5 bg-[#111827] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50" /></label>
            <label className="block"><span className="text-xs text-slate-500 mb-1 block">邮箱</span>
              <input value={data.personalInfo.email} onChange={e => update({ personalInfo: { ...data.personalInfo, email: e.target.value } })}
                className="w-full px-4 py-2.5 bg-[#111827] border border-white/[0.08] rounded-xl text-sm text-white focus:outline-none focus:border-blue-500/50" /></label>
            <div className="bg-amber-500/5 border border-amber-500/10 rounded-xl p-4">
              <p className="text-xs text-amber-400/80 leading-relaxed">
                  修改后点击右上角「保存」按钮。数据存储在浏览器 localStorage 中。
                  <br /><strong>⚠️ 图片请用文件路径（如 /projects/my-image.png），不要上传 data URL —— base64 图片太大会导致保存失败。</strong>
                  <br />图片文件放到 public/projects/ 目录，然后在这里输入路径即可。
                </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
