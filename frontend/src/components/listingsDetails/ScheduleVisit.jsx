import { useState, useRef, useEffect, useContext } from "react"
import { CiCalendar } from "react-icons/ci"
import { FaClock } from "react-icons/fa"
import { UIContext } from "../../store/UIContext"

export default function ScheduleVisit() {
  const { setPopupOpen } = useContext(UIContext)

  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedDate, setSelectedDate] = useState("")
  const [scheduleTime, setScheduleTime] = useState("")
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [error, setError] = useState("")

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const wrapperRef = useRef(null)

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()
  const getStartDay = (year, month) => {
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1 // Monday first
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowCalendar(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // error handling
  const handleErrors = () => {
    if (!name || !number || !selectedDate || !scheduleTime) {
      setError("Please fill in all details before scheduling your visit")
      return
    }

    setPopupOpen(true)

    // clear form
    setName("")
    setNumber("")
    setSelectedDate("")
    setScheduleTime("")
    setError("")
    setShowCalendar(false)
  }

  return (
    <div
      ref={wrapperRef}
      className="relative mt-6 rounded-2xl bg-white p-5 shadow-lg max-w-5xl mx-auto select-none"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-1 py-2 text-xl font-semibold text-red-600">
        <span>Schedule Your Visit</span>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">
        Book a Food Tasting Experience
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Select your details below to schedule a visit for food testing
      </p>

      {/* Inputs: 2 Rows */}
      <div className="mt-4 flex flex-col gap-3 md:gap-4">
        {/* Row 1: Name & Number */}
        <div className="flex flex-col md:flex-row gap-3">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-600"
          />
          <input
            type="tel"
            placeholder="Your Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="flex-1 rounded-xl border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-red-600"
          />
        </div>

        {/* Row 2: Event Date & Schedule Time */}
        <div className="flex flex-col md:flex-row gap-3">
          {/* Event Date */}
          <div className="relative flex-1">
            <div
              onClick={() => setShowCalendar(!showCalendar)}
              className="flex w-full items-center gap-3 cursor-pointer
                         rounded-xl border border-gray-300 px-4 py-3
                         hover:border-red-600 transition h-[52px]"
            >
              <CiCalendar className="text-xl text-gray-400 shrink-0" />
              <span
                className={`text-sm truncate ${
                  selectedDate ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {selectedDate || "Select Event Date"}
              </span>
            </div>

            {showCalendar && (
              <div
                className="absolute top-[110%] left-0 z-[99] w-full
                              rounded-xl border border-gray-300 bg-white
                              shadow-xl p-4"
              >
                {/* Calendar Header */}
                <div className="mb-3 flex items-center justify-between">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() - 1,
                          1
                        )
                      )
                    }}
                    className="text-2xl font-semibold text-gray-400 cursor-pointer hover:text-red-600"
                  >
                    ‹
                  </button>
                  <h4 className="text-sm font-semibold">
                    {currentMonth.toLocaleString("default", {
                      month: "long",
                      year: "numeric"
                    })}
                  </h4>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setCurrentMonth(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth() + 1,
                          1
                        )
                      )
                    }}
                    className="text-2xl font-semibold text-gray-400 cursor-pointer hover:text-red-600"
                  >
                    ›
                  </button>
                </div>

                {/* Weekdays */}
                <div className="grid grid-cols-7 text-xs text-gray-400 mb-2">
                  {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
                    <div key={d} className="text-center">
                      {d}
                    </div>
                  ))}
                </div>

                {/* Dates */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({
                    length:
                      getStartDay(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth()
                      ) +
                      getDaysInMonth(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth()
                      )
                  }).map((_, i) => {
                    const day =
                      i -
                      getStartDay(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth()
                      ) +
                      1
                    return (
                      <div
                        key={i}
                        onClick={(e) => {
                          if (day < 1) return
                          e.stopPropagation()
                          setSelectedDate(
                            `${day} ${currentMonth.toLocaleString("default", { month: "short" })} ${currentMonth.getFullYear()}`
                          )
                          setShowCalendar(false)
                        }}
                        className={`h-9 flex items-center justify-center rounded text-sm
                          ${day < 1 ? "" : "cursor-pointer hover:bg-red-50"}`}
                      >
                        {day > 0 ? day : ""}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
{/* Schedule Time */}
<div className="relative flex-1">
  <div
    onClick={() => {
      document.getElementById("schedule-time-input")?.showPicker?.() ||
      document.getElementById("schedule-time-input")?.focus()
    }}
    className="flex w-full items-center gap-3 cursor-pointer
               rounded-xl border border-gray-300 px-4 py-3
               hover:border-red-600 transition h-[52px]"
  >
    <FaClock className="text-gray-400 shrink-0 cursor-pointer" />

    <input
      id="schedule-time-input"
      type="time"
      value={scheduleTime}
      onChange={(e) => setScheduleTime(e.target.value)}
      onClick={(e) => e.currentTarget.showPicker?.()}
      className="w-full text-sm focus:outline-none cursor-pointer bg-transparent"
    />
  </div>
</div>

        </div>
      </div>

      {/* Schedule Visit Button */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 px-1 gap-2 select-none">
        {/* Text on the left (stacked on mobile) */}
        <p className="hidden md:block text-sm text-gray-500 max-w-xl text-left">
          Want to book a food tasting experience? Click on{" "}
          <span
            onClick={() => setPopupOpen(true)}
            className="text-red-600 font-medium cursor-pointer hover:underline hover:text-gray-800"
          >
            Schedule Visit
          </span>{" "}
          to proceed now
        </p>

        {/* Schedule Visit Button */}
        <button
          onClick={handleErrors}
          className={`text-white font-semibold px-6 py-2 rounded-xl shadow
              whitespace-nowrap transition w-full md:w-auto cursor-pointer
              ${
                !name || !number || !selectedDate || !scheduleTime
                  ? "bg-red-600 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
        >
          Schedule Visit
        </button>
      </div>
      {error && (
        <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
      )}
    </div>
  )
}