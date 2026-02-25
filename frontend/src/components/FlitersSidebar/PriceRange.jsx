import { useState, useEffect, useRef } from "react"
import { Range } from "react-range"

export default function PriceRange({ onChange, value }) {
  const min = 0
  const max = 1000000

  const [localValue, setLocalValue] = useState(value || [min, max])
  const isSyncingFromProps = useRef(false)

  // Sync when parent value changes
  useEffect(() => {
    if (!value) return

    isSyncingFromProps.current = true

    const [minVal, maxVal] = value
    setLocalValue([
      Math.max(min, minVal ?? min),
      Math.min(max, maxVal ?? max),
    ])
  }, [value])

  const handleChange = (values) => {
    const sorted = [...values].sort((a, b) => a - b)
    setLocalValue(sorted)
    onChange?.(sorted)
  }

  // Debounce when typing
  useEffect(() => {
    if (isSyncingFromProps.current) {
      isSyncingFromProps.current = false
      return
    }

    if (localValue[0] === "" || localValue[1] === "") return

    const t = setTimeout(() => {
      const minVal = Math.max(min, Number(localValue[0]))
      const maxVal = Math.min(max, Number(localValue[1]))

      if (minVal <= maxVal) {
        onChange?.([minVal, maxVal])
      }
    }, 1000)

    return () => clearTimeout(t)
  }, [localValue])

  return (
    <div className="mt-4 w-full max-w-md mx-auto">
      <label className="font-semibold text-sm">Price</label>

      {/* Slider */}
      <Range
        step={500}
        min={min}
        max={max}
        values={[
          Number(localValue[0]) || min,
          Number(localValue[1]) || max,
        ]}
        onChange={handleChange}
        renderTrack={({ props, children }) => {
          const { key, ...rest } = props
          return (
            <div
              key={key}
              {...rest}
              className="relative w-full h-2 rounded mt-2 bg-gray-300"
              style={{ ...rest.style }}
            >
              <div
                className="absolute h-2 rounded bg-red-500"
                style={{
                  left: `${((Number(localValue[0]) || 0) / max) * 100}%`,
                  right: `${100 - ((Number(localValue[1]) || max) / max) * 100}%`,
                }}
              />
              {children}
            </div>
          )
        }}
        renderThumb={({ props }) => {
          const { key, ...rest } = props
          return (
            <div
              key={key}
              {...rest}
              className="w-4.5 h-4.5 bg-white border-2 border-red-500 rounded-full shadow-md cursor-pointer"
              style={{ ...rest.style }}
            />
          )
        }}
      />

      <p className="mt-3 text-[11px] font-medium text-gray-800">
        Type / Drag
      </p>

      

      <div className="flex items-center gap-2 mt-2 w-full min-w-0">
  {/* Min Input */}
  <input
    type="text"
    className="flex-1 min-w-0 border border-gray-300 rounded px-1.5 py-1 text-sm
      focus:border-white focus:outline-none focus:ring-2 focus:ring-red-400"
    value={
      localValue[0] === "" ? "" : `₹${Number(localValue[0]).toLocaleString("en-IN")}`
    }
    onChange={(e) => {
      const raw = e.target.value.replace(/[^\d]/g, "")
      const num = raw === "" ? "" : Math.min(Number(raw), max)
      // CLEAR Max when Min changes
      setLocalValue([num, ""])
    }}
    onBlur={() => {
      let minVal = Number(localValue[0]) || min
      let maxVal = Number(localValue[1]) || max
      // enforce min <= max only if max is filled
      if (maxVal !== "") maxVal = Math.max(maxVal, minVal)
      setLocalValue([minVal, maxVal])
    }}
  />

  <span className="text-gray-600">—</span>

  {/* Max Input */}
<input
  type="text"
  className="flex-1 min-w-0 border border-gray-300 rounded px-1.5 py-1 text-sm
    focus:border-white focus:outline-none focus:ring-2 focus:ring-red-400"
  placeholder="Max"
  value={
    localValue[1] === ""
      ? ""
      : `${Number(localValue[1]).toLocaleString("en-IN")}` // remove automatic + for max
  }
  onFocus={() => {
    // optional: remove formatting on focus so user can type freely
    if (localValue[1] !== "") setLocalValue([localValue[0], Number(localValue[1])])
  }}
  onChange={(e) => {
    const raw = e.target.value.replace(/[^\d]/g, "")
    const num = raw === "" ? "" : Math.min(Number(raw), max)
    setLocalValue([localValue[0], num])
  }}
  onBlur={() => {
    let minVal = Number(localValue[0]) || min
    let maxVal = Number(localValue[1]) || max
    // enforce max >= min only if max is filled
    if (maxVal !== "") maxVal = Math.max(maxVal, minVal)
    setLocalValue([minVal, maxVal])
  }}
/></div>
    </div>
  )
}