import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Plus, Edit3, Trash2, Upload, X, Check, ChevronLeft, ChevronRight, Eye, BarChart3, Users, FileText, Activity, Filter, Download } from 'lucide-react'
import PageTransition from '../components/PageTransition'

interface Row { id:number; name:string; email:string; role:string; status:'active'|'inactive'; dept:string; projects:number; lastLogin:string }

const allData: Row[] = [
  { id:1,name:'张明',email:'zhangming@example.com',role:'管理员',status:'active',dept:'技术部',projects:12,lastLogin:'2025-06-09 14:32'},
  { id:2,name:'李华',email:'lihua@example.com',role:'编辑',status:'active',dept:'产品部',projects:8,lastLogin:'2025-06-09 11:15'},
  { id:3,name:'王芳',email:'wangfang@example.com',role:'观察者',status:'inactive',dept:'市场部',projects:3,lastLogin:'2025-05-28 09:00'},
  { id:4,name:'赵磊',email:'zhaolei@example.com',role:'编辑',status:'active',dept:'技术部',projects:15,lastLogin:'2025-06-09 13:45'},
  { id:5,name:'陈静',email:'chenjing@example.com',role:'管理员',status:'active',dept:'产品部',projects:20,lastLogin:'2025-06-09 16:00'},
  { id:6,name:'刘洋',email:'liuyang@example.com',role:'观察者',status:'inactive',dept:'市场部',projects:1,lastLogin:'2025-04-12 10:30'},
  { id:7,name:'孙悦',email:'sunyue@example.com',role:'编辑',status:'active',dept:'技术部',projects:9,lastLogin:'2025-06-08 17:20'},
  { id:8,name:'周杰',email:'zhoujie@example.com',role:'管理员',status:'active',dept:'运营部',projects:18,lastLogin:'2025-06-09 08:55'},
  { id:9,name:'吴桐',email:'wutong@example.com',role:'编辑',status:'inactive',dept:'运营部',projects:5,lastLogin:'2025-05-20 14:10'},
  { id:10,name:'郑爽',email:'zhengshuang@example.com',role:'观察者',status:'active',dept:'产品部',projects:2,lastLogin:'2025-06-09 09:30'},
  { id:11,name:'马超',email:'machao@example.com',role:'编辑',status:'active',dept:'技术部',projects:11,lastLogin:'2025-06-09 15:00'},
  { id:12,name:'黄丽',email:'huangli@example.com',role:'管理员',status:'active',dept:'市场部',projects:7,lastLogin:'2025-06-09 12:00'},
]

const PAGE_SIZE = 6

export default function AdminDemo() {
  const [data, setData] = useState(allData)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState<number[]>([])
  const [editing, setEditing] = useState<Row|null>(null)
  const [showForm, setShowForm] = useState(false)
  const [detailRow, setDetailRow] = useState<Row|null>(null)
  const [uploaded, setUploaded] = useState<string[]>([])
  const [sortField, setSortField] = useState<keyof Row|null>(null)
  const [sortDir, setSortDir] = useState<'asc'|'desc'>('asc')

  const filtered = data
    .filter(r=>!search||r.name.includes(search)||r.email.includes(search)||r.dept.includes(search))
    .sort((a,b)=>{if(!sortField)return 0;const av=String(a[sortField]),bv=String(b[sortField]);return sortDir==='asc'?av.localeCompare(bv):bv.localeCompare(av)})
  const totalPages = Math.ceil(filtered.length/PAGE_SIZE)
  const paged = filtered.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE)

  const toggleSort = (f:keyof Row)=>setSortField(s=>s===f?(setSortDir(d=>d==='asc'?'desc':'asc'),s):(setSortDir('asc'),f))
  const deleteRow = (id:number)=>setData(d=>d.filter(r=>r.id!==id))
  const saveRow = (row:Row)=>{if(data.find(r=>r.id===row.id))setData(d=>d.map(r=>r.id===row.id?row:r));else setData(d=>[...d,{...row,id:Math.max(...d.map(r=>r.id))+1}]);setEditing(null);setShowForm(false)}
  const handleFile = (e:React.ChangeEvent<HTMLInputElement>)=>{const f=e.target.files?.[0];if(f)setUploaded(s=>[...s,f.name])}

  const stats = [
    { label:'总用户', value:data.length, icon:Users, color:'text-blue-400' },
    { label:'活跃', value:data.filter(r=>r.status==='active').length, icon:Activity, color:'text-emerald-400' },
    { label:'项目数', value:data.reduce((s,r)=>s+r.projects,0), icon:FileText, color:'text-violet-400' },
    { label:'部门', value:new Set(data.map(r=>r.dept)).size, icon:BarChart3, color:'text-amber-400' },
  ]

  return (
    <PageTransition>
      <div className="pt-20 bg-slate-900/50 border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-3">
          <p className="text-xs text-slate-500">技术展示 · Demo 页面 — 后台管理系统：搜索筛选、排序分页、弹窗表单、详情抽屉、文件上传、批量操作。</p>
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* Sidebar */}
        <div className="hidden lg:flex flex-col w-52 bg-[#0d1117] border-r border-white/[0.04] p-4 gap-1 flex-shrink-0">
          {[
            {icon:'📊',label:'数据概览'},{icon:'👥',label:'用户管理',active:true},{icon:'📁',label:'项目管理'},{icon:'📈',label:'分析报表'},{icon:'⚙️',label:'系统设置'},
          ].map(i=>(<div key={i.label} className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-all ${i.active?'bg-white/[0.06] text-white':'text-slate-500 hover:text-slate-300'}`}><span>{i.icon}</span><span>{i.label}</span></div>))}
        </div>

        {/* Main */}
        <div className="flex-1 p-6 lg:p-8 min-w-0">
          <div className="max-w-6xl">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
              {stats.map(s=>(<div key={s.label} className="bg-[#0d1117] border border-white/[0.04] rounded-xl p-4"><div className="flex items-center justify-between mb-1"><span className="text-[10px] text-slate-500 uppercase">{s.label}</span><s.icon size={14} className={s.color}/></div><div className="text-xl font-bold text-white">{s.value}</div></div>))}
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div><h1 className="text-lg font-bold text-white">用户管理</h1><p className="text-[10px] text-slate-500">{filtered.length} 条记录</p></div>
              <button onClick={()=>{setEditing({id:0,name:'',email:'',role:'编辑',status:'active',dept:'技术部',projects:0,lastLogin:''});setShowForm(true)}}
                className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-500 transition-all"><Plus size={14}/> 新增用户</button>
            </div>

            {/* Toolbar */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <div className="relative flex-1 max-w-xs"><Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"/><input value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}} placeholder="搜索姓名/邮箱/部门..." className="w-full pl-9 pr-4 py-2 bg-[#0d1117] border border-white/[0.08] rounded-lg text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50"/></div>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-slate-400 hover:text-white transition-all"><Filter size={13}/> 筛选</button>
              <button className="flex items-center gap-1.5 px-3 py-2 bg-white/[0.03] border border-white/[0.06] rounded-lg text-xs text-slate-400 hover:text-white transition-all"><Download size={13}/> 导出</button>
              {selected.length>0&&<button onClick={()=>{setData(d=>d.filter(r=>!selected.includes(r.id)));setSelected([])}} className="flex items-center gap-1.5 px-3 py-2 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 hover:bg-red-500/20 transition-all"><Trash2 size={13}/> 删除({selected.length})</button>}
            </div>

            {/* Table */}
            <div className="bg-[#0d1117] border border-white/[0.04] rounded-2xl overflow-hidden mb-4">
              <table className="w-full text-sm"><thead><tr className="border-b border-white/[0.04] bg-white/[0.01]">
                <th className="w-10 p-3"><input type="checkbox" onChange={e=>setSelected(e.target.checked?filtered.map(r=>r.id):[])} checked={selected.length===filtered.length&&filtered.length>0}/></th>
                {[{k:'name' as const,l:'姓名'},{k:'email' as const,l:'邮箱'},{k:'dept' as const,l:'部门'},{k:'role' as const,l:'角色'},{k:'status' as const,l:'状态'},{k:'lastLogin' as const,l:'最近登录'}].map(c=>(
                  <th key={c.k} onClick={()=>toggleSort(c.k)} className="text-left p-3 text-[10px] font-medium text-slate-500 uppercase tracking-wider cursor-pointer hover:text-white transition-colors">{c.l}{sortField===c.k&&<span className="ml-1">{sortDir==='asc'?'↑':'↓'}</span>}</th>
                ))}
                <th className="w-20 p-3"/>
              </tr></thead>
              <tbody>
                {paged.map(row=>(<tr key={row.id} className="border-b border-white/[0.02] hover:bg-white/[0.02] transition-colors">
                  <td className="p-3"><input type="checkbox" checked={selected.includes(row.id)} onChange={()=>setSelected(s=>s.includes(row.id)?s.filter(i=>i!==row.id):[...s,row.id])}/></td>
                  <td className="p-3 font-medium text-white text-xs">{row.name}</td>
                  <td className="p-3 text-slate-400 text-xs">{row.email}</td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-white/[0.04] rounded text-[10px] text-slate-300">{row.dept}</span></td>
                  <td className="p-3"><span className="px-2 py-0.5 bg-white/[0.04] rounded text-[10px] text-slate-300">{row.role}</span></td>
                  <td className="p-3"><span className={`px-2 py-0.5 rounded text-[10px] font-medium ${row.status==='active'?'text-emerald-400 bg-emerald-400/10':'text-slate-500 bg-slate-500/10'}`}>{row.status==='active'?'活跃':'停用'}</span></td>
                  <td className="p-3 text-slate-500 text-[10px]">{row.lastLogin}</td>
                  <td className="p-3"><div className="flex gap-1">
                    <button onClick={()=>setDetailRow(row)} className="p-1.5 rounded-lg text-slate-500 hover:text-white transition-all"><Eye size={13}/></button>
                    <button onClick={()=>{setEditing(row);setShowForm(true)}} className="p-1.5 rounded-lg text-slate-500 hover:text-white transition-all"><Edit3 size={13}/></button>
                    <button onClick={()=>deleteRow(row.id)} className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 transition-all"><Trash2 size={13}/></button>
                  </div></td>
                </tr>))}
              </tbody></table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] text-slate-500">第 {page}/{totalPages} 页 · 共 {filtered.length} 条</span>
              <div className="flex gap-1">
                <button onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1} className="p-1.5 rounded-lg text-slate-500 hover:text-white disabled:opacity-30 transition-all"><ChevronLeft size={14}/></button>
                {Array.from({length:totalPages},(_,i)=>i+1).filter(p=>p===1||p===totalPages||Math.abs(p-page)<=1).map((p,i,arr)=>(<>
                  {i>0&&arr[i-1]!==p-1&&<span key={`dots-${p}`} className="px-1 text-slate-600">…</span>}
                  <button key={p} onClick={()=>setPage(p)} className={`w-7 h-7 rounded-lg text-xs font-medium transition-all ${p===page?'bg-blue-600 text-white':'text-slate-500 hover:text-white hover:bg-white/[0.04]'}`}>{p}</button>
                </>))}
                <button onClick={()=>setPage(p=>Math.min(totalPages,p+1))} disabled={page===totalPages} className="p-1.5 rounded-lg text-slate-500 hover:text-white disabled:opacity-30 transition-all"><ChevronRight size={14}/></button>
              </div>
            </div>

            {/* File upload */}
            <div className="bg-[#0d1117] border border-white/[0.04] rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white mb-3">文件上传</h3>
              <div className="flex items-center gap-3">
                <label className="px-4 py-2.5 bg-white/[0.04] border border-dashed border-white/[0.1] rounded-xl text-xs text-slate-400 hover:text-white hover:border-white/[0.2] transition-all cursor-pointer flex items-center gap-2"><Upload size={14}/> 选择文件<input type="file" onChange={handleFile} className="hidden"/></label>
                <span className="text-[10px] text-slate-600">支持 JPG、PNG、PDF，≤10MB</span>
              </div>
              {uploaded.length>0&&<div className="mt-3 space-y-1">{uploaded.map((f,i)=>(<div key={i} className="flex items-center gap-2 text-xs text-slate-400"><Check size={12} className="text-emerald-400"/>{f}</div>))}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Form modal */}
      <AnimatePresence>{showForm&&editing&&(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={()=>{setShowForm(false);setEditing(null)}}>
          <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}} className="bg-[#111827] border border-white/[0.08] rounded-2xl p-6 w-full max-w-md" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5"><h3 className="text-lg font-bold text-white">{editing.id?'编辑用户':'新增用户'}</h3><button onClick={()=>{setShowForm(false);setEditing(null)}} className="text-slate-500 hover:text-white"><X size={18}/></button></div>
            <div className="space-y-3">
              {[{k:'name',l:'姓名',t:'text'},{k:'email',l:'邮箱',t:'email'},{k:'dept',l:'部门',t:'text'},{k:'role',l:'角色',t:'text'}].map(f=>(<label key={f.k} className="block"><span className="text-[10px] text-slate-500 mb-1 block">{f.l}</span><input type={f.t} value={(editing as any)[f.k]} onChange={e=>setEditing({...editing,[f.k]:e.target.value})} className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50"/></label>))}
              <label className="block"><span className="text-[10px] text-slate-500 mb-1 block">状态</span><select value={editing.status} onChange={e=>setEditing({...editing,status:e.target.value as any})} className="w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-lg text-sm text-white focus:outline-none focus:border-blue-500/50"><option value="active">活跃</option><option value="inactive">停用</option></select></label>
            </div>
            <div className="flex gap-3 mt-5"><button onClick={()=>saveRow(editing)} className="flex-1 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-500 transition-all">保存</button><button onClick={()=>{setShowForm(false);setEditing(null)}} className="flex-1 py-2.5 bg-white/[0.04] text-white text-sm font-medium rounded-lg border border-white/[0.08] hover:bg-white/[0.08] transition-all">取消</button></div>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>

      {/* Detail drawer */}
      <AnimatePresence>{detailRow&&(
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" onClick={()=>setDetailRow(null)}>
          <motion.div initial={{x:300}} animate={{x:0}} exit={{x:300}} transition={{type:'spring',damping:25,stiffness:200}} className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-[#111827] border-l border-white/[0.08] p-6 overflow-y-auto" onClick={e=>e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6"><h3 className="text-lg font-bold text-white">用户详情</h3><button onClick={()=>setDetailRow(null)} className="text-slate-500 hover:text-white"><X size={18}/></button></div>
            <div className="space-y-4">
              {[{l:'姓名',v:detailRow.name},{l:'邮箱',v:detailRow.email},{l:'部门',v:detailRow.dept},{l:'角色',v:detailRow.role},{l:'状态',v:detailRow.status==='active'?'活跃':'停用'},{l:'项目数',v:detailRow.projects},{l:'最近登录',v:detailRow.lastLogin}].map(f=>(<div key={f.l}><p className="text-[10px] text-slate-500 mb-0.5">{f.l}</p><p className="text-sm text-white">{f.v}</p></div>))}
            </div>
          </motion.div>
        </motion.div>
      )}</AnimatePresence>

      <div className="border-t border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <a href="/" className="hover:text-white transition-colors">← 返回首页</a><span className="text-slate-700">|</span>
            <a href="/dashboard" className="hover:text-white transition-colors">监控大屏</a>
            <a href="/api-docs" className="hover:text-white transition-colors">API 文档</a>
          </div>
          <p className="text-[11px] text-slate-600">技术栈：CRUD · 排序分页 · 弹窗表单 · 详情抽屉 · 文件上传 · 批量操作</p>
        </div>
      </div>
    </PageTransition>
  )
}
