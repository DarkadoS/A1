

'use client'
import React, { useMemo, useState } from 'react'
import TokenRow from './TokenRow'
import clsx from 'clsx'


type Token = { symbol: string; name: string; category: string }


export default function TokenTable({ tokens, isLoading, isError, prices }: { tokens: Token[]; isLoading: boolean; isError: boolean; prices: Record<string, any> }) {
const [sortKey, setSortKey] = useState<'symbol' | 'price'>('symbol')
const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
const [filter, setFilter] = useState<'All' | 'New pairs' | 'Final Stretch' | 'Migrated'>('All')


const filtered = useMemo(() => (filter === 'All' ? tokens : tokens.filter((t) => t.category === filter)), [tokens, filter])


const sorted = useMemo(() => {
if (isLoading) return filtered
const copy = [...filtered]
copy.sort((a, b) => {
if (sortKey === 'symbol') {
const r = a.symbol.localeCompare(b.symbol)
return sortDir === 'asc' ? r : -r
}
const pa = prices[a.symbol]?.price ?? 0
const pb = prices[b.symbol]?.price ?? 0
return sortDir === 'asc' ? pa - pb : pb - pa
})
return copy
}, [filtered, sortKey, sortDir, isLoading, prices])


if (isError) return <div className="p-4 text-red-600">Failed to load tokens.</div>


return (
<div className="bg-white rounded-lg shadow-sm overflow-hidden">
<div className="px-4 py-3 border-b flex items-center justify-between">
<div className="flex gap-3 items-center">
<div className="flex items-center gap-2">
<button className={clsx('px-2 py-1 rounded text-sm', sortKey === 'symbol' ? 'bg-slate-100' : 'hover:bg-slate-50')} onClick={() => setSortKey('symbol')}>
Symbol
</button>
<button className={clsx('px-2 py-1 rounded text-sm', sortKey === 'price' ? 'bg-slate-100' : 'hover:bg-slate-50')} onClick={() => setSortKey('price')}>
Price
</button>
<button className="px-2 py-1 rounded text-sm hover:bg-slate-50" onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))} aria-label="toggle-sort-direction">
{sortDir === 'asc' ? '▲' : '▼'}
</button>
</div>


<div className="flex items-center gap-2">
{(['All', 'New pairs', 'Final Stretch', 'Migrated'] as const).map((c) => (
<button key={c} onClick={() => setFilter(c)} className={clsx('px-2 py-1 rounded text-sm', filter === c ? 'bg-slate-800 text-white' : 'hover:bg-slate-50')}>
{c}
</button>
))}
</div>
</div>
<div className="text-sm text-slate-500">Real-time demo (mock)</div>
</div>


<div className="min-w-full">
<div className="grid grid-cols-[160px_1fr_180px_140px] gap-0 items-center px-4 py-3">
<div className="px-4 py-3 font-medium text-sm border-b">Pair</div>
<div className="px-4 py-3 font-medium text-sm border-b">Name</div>
<div className="px-4 py-3 font-medium text-sm border-b">Price</div>
<div className="px-4 py-3 font-medium text-sm border-b">Actions</div>
</div>
{isLoading
? Array.from({ length: 6 }).map((_, i) => (
<div key={i} className="grid grid-cols-[160px_1fr_180px_140px] gap-0 items-center px-4 py-3 table-row">
<div className="h-6 w-20 skeleton rounded" />
<div className="h-6 skeleton rounded" />
<div className="h-6 w-24 skeleton rounded" />
<div className="h-8 w-20 skeleton rounded" />
</div>
))
: sorted.map((t) => (
<TokenRow key={t.symbol} token={t} price={prices[t.symbol]} />
))}
</div>
</div>
)
}