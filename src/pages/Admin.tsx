import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Save, RotateCcw, Download, Plus, Trash2, Edit3, Eye } from 'lucide-react'
import { loadAdminData, saveAdminData, resetAdminData, downloadJSON } from '../data/adminStore'
import type { AdminData } from '../data/adminStore'
import type { Project } from '../data/projects'

type Tab = 'personal' | 'hero' | 'services' | 'projects' | 'contact'

export default function Admin() {
  const [data, setData] = useState<AdminData | null>(null)
  const [tab, setTab] = useState<Tab>('personal')
  const [saved, setSaved] = useState(false)
  const [editingProject, setEditingProject] = useState<string | null>(null)

  useEffect(() => { setData(loadAdminData()) }, [])

  const update = (partial: Partial<AdminData>) => {
    if (!data) return
    setData({ ...data, ...partial })
  }

  const save = () => {
    if (!data) return
    saveAdminData(data)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
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
            <button onClick={save} className={`flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold rounded-lg transition-all ${saved ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-500'}`}><Save size={13} /> {saved ? '已保存' : '保存'}</button>
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
                      <label className="block"><span className="text-[10px] text-slate-500 mb-1 block">图片路径（每行一个）</span>
                        <textarea rows={3} value={(p.images || []).join('\n')} onChange={e => update({ allProjects: { ...data.allProjects, [p.id]: { ...p, images: e.target.value.split('\n').filter(Boolean) } } })}
                          className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.06] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50 resize-none font-mono" /></label>
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
              <p className="text-xs text-amber-400/80">修改后点击右上角「保存」按钮。数据存储在浏览器 localStorage 中。导出备份可保存到本地。</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
