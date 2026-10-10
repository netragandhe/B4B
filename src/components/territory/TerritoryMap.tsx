import React, { useState, useMemo, useRef } from 'react'
import { geoAlbersUsa, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import usData from 'us-atlas/states-10m.json'
import { STATE_TERRITORY_MAP, FED_DISTRICT_COLORS } from '@/mock-data/territoryStates'
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

interface StatePathItem {
  fips: string
  info: typeof STATE_TERRITORY_MAP[string] | undefined
  pathD: string | null
  geometry: any
}

interface TerritoryMapProps {
  selectedDistrictId?: number | null
  selectedStateCode?: string | null
  onSelectDistrict: (districtNumber: number) => void
  onSelectState?: (stateCode: string) => void
  highlightedSearchQuery?: string
}

export const TerritoryMap: React.FC<TerritoryMapProps> = ({
  selectedDistrictId,
  selectedStateCode,
  onSelectDistrict,
  onSelectState,
  highlightedSearchQuery = '',
}) => {
  const [hoveredState, setHoveredState] = useState<{
    fips: string
    name: string
    code: string
    district: number
    districtName: string
    x: number
    y: number
  } | null>(null)

  const [zoomLevel, setZoomLevel] = useState(1)
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 })
  const isDragging = useRef(false)
  const dragStart = useRef({ x: 0, y: 0 })

  // Generate GeoJSON paths using Albers USA projection
  const statePaths: StatePathItem[] = useMemo(() => {
    const projection = geoAlbersUsa().scale(1150).translate([480, 290])
    const pathGenerator = geoPath().projection(projection)

    const statesGeo = feature(usData as any, usData.objects.states as any) as any

    const paths: StatePathItem[] = (statesGeo.features || []).map((feat: any) => {
      const fips = String(feat.id).padStart(2, '0')
      const info = STATE_TERRITORY_MAP[fips]
      const pathD = pathGenerator(feat)
      return {
        fips,
        info,
        pathD,
        geometry: feat,
      }
    })

    return paths
  }, [])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button !== 0) return
    isDragging.current = true
    dragStart.current = { x: e.clientX - panOffset.x, y: e.clientY - panOffset.y }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    setPanOffset({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    })
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  const resetZoom = () => {
    setZoomLevel(1)
    setPanOffset({ x: 0, y: 0 })
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900/90 select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={() => {
        isDragging.current = false
        setHoveredState(null)
      }}
    >
      {/* Zoom / Pan Controls Overlay */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 bg-slate-800/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-700 shadow-md">
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.min(z + 0.3, 3))}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => setZoomLevel((z) => Math.max(z - 0.3, 0.7))}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={resetZoom}
          className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
          title="Reset View"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* SVG Canvas */}
      <svg
        viewBox="0 0 960 580"
        className="w-full h-auto cursor-grab active:cursor-grabbing transition-transform duration-75"
        style={{
          transform: `translate(${panOffset.x}px, ${panOffset.y}px) scale(${zoomLevel})`,
          transformOrigin: 'center center',
        }}
      >
        <g>
          {statePaths.map(({ fips, info, pathD }) => {
            if (!pathD) return null

            const isSelected = selectedDistrictId
              ? info?.primaryDistrict === selectedDistrictId
              : selectedStateCode && info?.code === selectedStateCode

            const isHovered = hoveredState?.fips === fips

            const matchesSearch =
              highlightedSearchQuery &&
              info &&
              (info.name.toLowerCase().includes(highlightedSearchQuery.toLowerCase()) ||
                info.code.toLowerCase().includes(highlightedSearchQuery.toLowerCase()) ||
                info.districtName.toLowerCase().includes(highlightedSearchQuery.toLowerCase()))

            const baseColor = info ? FED_DISTRICT_COLORS[info.primaryDistrict] : '#475569'

            return (
              <path
                key={fips}
                d={pathD}
                fill={baseColor}
                fillOpacity={isSelected ? 1 : isHovered ? 0.9 : selectedDistrictId ? 0.35 : 0.75}
                stroke={isSelected || isHovered ? '#FFFFFF' : '#0F172A'}
                strokeWidth={isSelected ? 2.5 : isHovered ? 1.8 : 0.75}
                className="transition-all duration-150 cursor-pointer focus:outline-none"
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect()
                  if (info) {
                    setHoveredState({
                      fips,
                      name: info.name,
                      code: info.code,
                      district: info.primaryDistrict,
                      districtName: info.districtName,
                      x: e.clientX,
                      y: e.clientY,
                    })
                  }
                }}
                onClick={() => {
                  if (info) {
                    onSelectDistrict(info.primaryDistrict)
                    if (onSelectState) onSelectState(info.code)
                  }
                }}
              />
            )
          })}
        </g>
      </svg>

      {/* Hover Tooltip Overlay */}
      {hoveredState && (
        <div
          className="pointer-events-none fixed z-50 rounded-xl bg-slate-900/95 p-3 text-white shadow-xl border border-slate-700 backdrop-blur-md text-xs -translate-x-1/2 -translate-y-full -mt-3"
          style={{
            left: `${hoveredState.x}px`,
            top: `${hoveredState.y}px`,
          }}
        >
          <div className="font-extrabold text-sm flex items-center gap-1.5">
            <span>{hoveredState.name}</span>
            <span className="text-slate-400 font-mono text-[11px]">({hoveredState.code})</span>
          </div>
          <div className="text-slate-300 mt-1 flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full inline-block"
              style={{ backgroundColor: FED_DISTRICT_COLORS[hoveredState.district] }}
            />
            <span className="font-semibold">District {hoveredState.district} — {hoveredState.districtName}</span>
          </div>
        </div>
      )}
    </div>
  )
}
