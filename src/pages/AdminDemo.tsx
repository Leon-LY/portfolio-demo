import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Filter, ChevronDown, MoreHorizontal, Plus, Edit3, Trash2, Eye, Upload, X, Check, Download, RefreshCw } from 'lucide-react'
import PageTransition from '../components/PageTransition'

interface Row { id: number; name: string; email: string; role: string; status: 'active'|'inactive'; createdAt: string }
const initialData: Row[] = [
  { id: 1, name: '张明', email: 'zhangming@example.com', role: '管理员', status: 'active', createdAt: '2024-01-15' },
  { id: 2, name: '李华', email: 'lihua@example.com', role: '编辑', status: 'active', createdAt: '2024-02-20' },
  { id: 3, name: '王芳', email: 'wangfang@example.com', role: '观察者', status: 'inactive', createdAt: '2024-03-10' },
  { id: 4, name: '赵磊', email: 'zhaolei@example.com', role: '编辑', status: 'active', createdAt: '2024-04-05' },
  { id: 5, name: '陈静', email: 'chenjing@example.com', role: '管理员', status: 'active', createdAt: '2024-05-18' },
  { id: 6, name: '刘洋', email: 'liuyang@example.com', role: '观察者', status: 'inactive', createdAt: '2024-06-22' },
  { id: 7, name: '孙悦', email: 'sunyue@example.com', role: '编辑', status: 'active', createdAt: '2024-07-30' },
]

export default function AdminDemo() {
  const [data, setData] = useState<Row[]>(initialData)
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState<number[]>([])
  const [editing, setEditing] = useState<Row | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [sortField, setSortField] = useState<keyof Row | null>(null)
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('asc')
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([])

  const filtered = data
    .filter(r => r.name.includes(search) || r.email.includes(search))
    .sort((a,b) => {
      if (!sortField) return 0
      const av = String(a[sortField]), bv = String(b[sortField])
      return sortDir==='asc' ? av.localeCompare(bv) : bv.localeCompare(av)
    })

  const toggleSort = (f: keyof Row) => {
    if (sortField===f) setSortDir(d=>d==='asc'?'desc':'asc')
    else { setSortField(f); setSortDir('asc') }
  }

  const toggleSelect = (id: number) => {
    setSelected(s=>s.includes(id)?s.filter(i=>i!==id):[...s,id])
  }

  const deleteRow = (id: number) => setData(d=>d.filter(r=>r.id!==id))
  const saveRow = (row: Row) => {
    if (data.find(r=>r.id===row.id)) setData(d=>d.map(r=>r.id===row.id?row:r))
    else setData(d=>[...d,{...row,id:Math.max(...d.map(r=>r.id))+1}])
    setEditing(null); setShowForm(false)
  }
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]; if (f) setUploadedFiles(s=>[...s,f.name])
  }

  return (
    <PageTransition>
      {/* Tech banner */}
      <div className="pt-20 bg-slate-900/50 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <p className="text-xs text-slate-500">技术展示 · Demo 页面 — 后台管理系统 CRUD、搜索筛选排序分页、弹窗表单、文件上传、批量操作。</p>
        </div>
      </div>

      {/* Sidebar layout */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden lg:flex flex-col w-56 bg-[#0d1117] border-r border-white/[0.04] p-4 gap-1">
          {[
            { icon: '📊', label: '数据概览', active: false },
            { icon: '👥', label: '用户管理', active: true },
            { icon: '📁', label: '项目管理', active: false },
            { icon: '📈', label: '分析报表', active: false },
            { icon: '⚙️', label: '系统设置', active: false },
          ].map(item => (
            <div key={item.label} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-all ${item.active?'bg-white/[0.06] text-white':'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'}`}>
              <span>{item.icon}</span><span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Main */}
        <div className="flex-1 p-6 lg:p-8">
          <div className="max-w-6xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-xl font-bold text-white">用户管理</h1>
                <p className="text-xs text-slate-500 mt-0.5">{data.length} 个用户</p>
              </div>
              <button onClick={()=>{setEditing({id:0,name:'',email:'',role:'编辑',status:'active',createdAt:''});setShowForm(true)}}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-all"><Plus size={14}/> 新增用户</button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="relative flex-1 max-w-xs">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="搜索姓名或邮箱..."
                  className="w-full pl-9 pr-4 py-2 bg-[#111827] border border-white/[0.08] rounded-lg text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50" />
              </div>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-slate-400 hover:text-white transition-all"><Filter size={13}/> 筛选</button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-slate-400 hover:text-white transition-all"><Download size={13}/> 导出</button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-slate-400 hover:text-white transition-all"><RefreshCw size={13}/> 刷新</button>
              {selected.length>0 && <button onClick={()=>{setData(d=>d.filter(r=>!selected.includes(r.id)));setSelected([])}} className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 hover:bg-red-500/20 transition-all"><Trash2 size={13}/> 删除 ({selected.length})</button>}
            </div>

            {/* Table */}
            <div className="bg-[#111827] border border-white/[0.04] rounded-2xl overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/[0.04] bg-white/[0.01]">
                    <th className="w-10 p-4"><input type="checkbox" onChange={e=>setSelected(e.target.checked?data.map(r=>r.id):[])} checked={selected.length===data.length} className="rounded" /></th>
                    {[
                      { k:'name' as const, l:'姓名' },{ k:'email' as const, l:'邮箱' },{ k:'role' as const, l:'角色' },
                      { k:'status' as const, l:'状态' },{ k:'createdAt' as const, l:'创建时间' },
                    ].map(col=>(
                      <th key={col.k} onClick={()=>toggleSort(col.k)} className="text-left p-4 text-xs font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:text-white transition-colors">
                        {col.l} {sortField===col.k&&<span className="ml-1">{sortDir==='asc'?'↑':'↓'}</span>}
                      </th>
                    ))}
                    <th className="w-16 p-4" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(row => (
                    <tr key={row.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                      <td className="p-4"><input type="checkbox" checked={selected.includes(row.id)} onChange={()=>toggleSelect(row.id)} className="rounded" /></td>
                      <td className="p-4 font-medium text-white">{row.name}</td>
                      <td className="p-4 text-slate-400">{row.email}</td>
                      <td className="p-4"><span className="px-2 py-0.5 bg-white/[0.04] rounded-md text-xs text-slate-300">{row.role}</span></td>
                      <td className="p-4"><span className={`px-2 py-0.5 rounded-md text-xs font-medium ${row.status==='active'?'text-emerald-400 bg-emerald-400/10':'text-slate-500 bg-slate-500/10'}`}>{row.status==='active'?'活跃':'停用'}</span></td>
                      <td className="p-4 text-slate-500 text-xs">{row.createdAt}</td>
                      <td className="p-4">
                        <div className="flex gap-1">
                          <button onClick={()=>{setEditing(row);setShowForm(true)}} className="p-1.5 rounded-lg text-slate-500 hover:text-white hover:bg-white/[0.06] transition-all"><Edit3 size={13}/></button>
                          <button onClick={()=>deleteRow(row.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-all"><Trash2 size={13}/></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* File upload demo */}
            <div className="mt-6 bg-[#111827] border border-white/[0.04] rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-white mb-3">文件上传</h3>
              <div className="flex items-center gap-3">
                <label className="px-4 py-2.5 bg-white/[0.04] border border-dashed border-white/[0.1] rounded-xl text-xs text-slate-400 hover:text-white hover:border-white/[0.2] transition-all cursor-pointer flex items-center gap-2">
                  <Upload size={14}/> 选择文件
                  <input type="file" onChange={handleFile} className="hidden" />
                </label>
                <span className="text-xs text-slate-600">支持 JPG、PNG、PDF，单文件不超过 10MB</span>
              </div>
              {uploadedFiles.length>0 && (
                <div className="mt-3 space-y-1">
                  {uploadedFiles.map((f,i)=>(<div key={i} className="flex items-center gap-2 text-xs text-slate-400"><Check size={12} className="text-emerald-400"/>{f}</div>))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Form modal */}
      <AnimatePresence>
        {showForm&&editing&&(
          <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>{setShowForm(false);setEditing(null)}}>
            <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}} className="bg-[#111827] border border-white/[0.08] rounded-2xl p-6 w-full max-w-md" onClick={e=>e.stopPropagation()}>
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-bold text-white">{editing.id?'编辑用户':'新增用户'}</h3>
                <button onClick={()=>{setShowForm(false);setEditing(null)}} className="text-slate-500 hover:text-white"><X size={18}/></button>
              </div>
              <div className="space-y-4">
                {[
                  { k:'name' as const, l:'姓名', type:'text' },
                  { k:'email' as const, l:'邮箱', type:'email' },
                  { k:'role' as const, l:'角色', type:'text' },
                ].map(f=>(
                  <label key={f.k} className="block"><span className="text-xs text-slate-500 mb-1 block">{f.l}</span>
                    <input type={f.type} value={(editing as any)[f.k]} onChange={e=>setEditing({...editing,[f.k]:e.target.value})}
                      className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50" /></label>
                ))}
                <label className="block"><span className="text-xs text-slate-500 mb-1 block">状态</span>
                  <select value={editing.status} onChange={e=>setEditing({...editing,status:e.target.value as any})}
                    className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50">
                    <option value="active">活跃</option><option value="inactive">停用</option>
                  </select></label>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={()=>saveRow(editing)} className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition-all">保存</button>
                <button onClick={()=>{setShowForm(false);setEditing(null)}} className="flex-1 py-2.5 bg-white/[0.04] text-white text-sm font-medium rounded-lg border border-white/[0.08] hover:bg-white/[0.08] transition-all">取消</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer nav */}
      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="/" className="hover:text-white transition-colors">← 返回首页</a>
            <span className="text-slate-700">|</span>
            <span>探索其他：</span>
            <a href="/dashboard" className="hover:text-white transition-colors">监控大屏</a>
            <a href="/api-docs" className="hover:text-white transition-colors">API 文档</a>
          </div>
          <p className="text-[11px] text-slate-600">技术栈：CRUD 操作 · 搜索筛选 · 排序分页 · 弹窗表单 · 文件上传 · 批量操作</p>
        </div>
      </div>
    </PageTransition>
  )
}
