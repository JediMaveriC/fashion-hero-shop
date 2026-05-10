'use client'

import { useState } from 'react'
import { InsightsTopbar } from '@/components/insights/insights-topbar'
import { InsightsModeBar } from '@/components/insights/insights-mode-bar'
import { InsightsSidebar } from '@/components/insights/insights-sidebar'
import { OverviewView } from '@/components/insights/views/overview'
import { ReturnsView } from '@/components/insights/views/returns'
import { SeasonView } from '@/components/insights/views/season'
import { SizesView } from '@/components/insights/views/sizes'
import { PricesView } from '@/components/insights/views/prices'
import { CompetitorsView } from '@/components/insights/views/competitors'
import { ForecastView } from '@/components/insights/views/forecast'
import { AIRecsView } from '@/components/insights/views/ai-recs'
import { categoryData, CATEGORY_LABELS, type Category, type Mode, type View } from '@/components/insights/insights-data'

const VIEW_TITLES: Record<View, string> = {
  overview: 'Przegląd', returns: 'Zwroty', season: 'Sezonowość',
  sizes: 'Rozmiary i kolory', prices: 'Ceny',
  competitors: 'Konkurencja', forecast: 'Prognoza Q3', ai: 'Rekomendacje AI',
}

export default function InsightsPage() {
  const [mode, setMode] = useState<Mode>('free')
  const [activeView, setActiveView] = useState<View>('overview')
  const [category, setCategory] = useState<Category>('sukienki')

  const data = categoryData[category]
  const upgradePlus = () => setMode('plus')

  return (
    <div className="min-h-screen bg-secondary text-foreground text-[13px]">
      <InsightsTopbar mode={mode} />
      <InsightsModeBar mode={mode} onModeChange={setMode} />

      {mode === 'external' && (
        <div className="bg-[#E6F1FB] border-b border-[#B5D4F4] px-4 py-1.5 flex items-center justify-between gap-3">
          <p className="text-[11px] text-[#185FA5] leading-snug flex-1">
            <strong>Przykładowe dane kategorii FashionHero.</strong> Dołącz jako sprzedawca żeby odblokować pełny dashboard.
          </p>
          <div className="flex gap-1.5 flex-shrink-0">
            <button className="text-[11px] px-2.5 py-1 bg-white text-[#185FA5] border border-[#B5D4F4] rounded-md font-medium">
              Kup raport PDF — 299 PLN
            </button>
            <button onClick={upgradePlus} className="text-[11px] px-2.5 py-1 bg-[#D85A30] text-white rounded-md font-medium">
              Dołącz — 399 PLN/mies
            </button>
          </div>
        </div>
      )}

      <div className="flex">
        <InsightsSidebar activeView={activeView} mode={mode} onViewChange={setActiveView} />

        <div className="flex-1 p-3.5 min-w-0 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-[15px] font-medium">{VIEW_TITLES[activeView]}</h1>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category)}
              className="text-[12px] px-2 py-1 rounded-md border border-border bg-card cursor-pointer"
            >
              {(Object.entries(CATEGORY_LABELS) as [Category, string][]).map(([val, label]) => (
                <option key={val} value={val}>{label}</option>
              ))}
            </select>
          </div>

          {activeView === 'overview'     && <OverviewView     data={data} mode={mode} />}
          {activeView === 'returns'      && <ReturnsView      data={data} mode={mode} />}
          {activeView === 'season'       && <SeasonView       data={data} mode={mode} />}
          {activeView === 'sizes'        && <SizesView        data={data} mode={mode} />}
          {activeView === 'prices'       && <PricesView       data={data} mode={mode} />}
          {activeView === 'competitors'  && <CompetitorsView  mode={mode} onUpgrade={upgradePlus} />}
          {activeView === 'forecast'     && <ForecastView     mode={mode} onUpgrade={upgradePlus} />}
          {activeView === 'ai'           && <AIRecsView       mode={mode} onUpgrade={upgradePlus} />}
        </div>
      </div>
    </div>
  )
}
