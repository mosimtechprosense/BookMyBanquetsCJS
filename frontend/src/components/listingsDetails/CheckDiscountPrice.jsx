import { useContext, useEffect, useRef, useState } from "react"
import { UIContext } from "../../store/UIContext"
import { HiFire } from "react-icons/hi"
import { FaUserFriends, FaChevronDown } from "react-icons/fa"
import { CiCalendar } from "react-icons/ci"

const guestOptions = [
  "Less than 100",
  "100 – 200",
  "200 – 300",
  "300 – 400",
  "400 – 500",
  "More than 500"
]

export default function CheckDiscountPrice() {
  const { setPopupOpen } = useContext(UIContext)

  const [showCalendar, setShowCalendar] = useState(false)
  const [showGuests, setShowGuests] = useState(false)

  const [selectedDate, setSelectedDate] = useState("")
  const [selectedGuest, setSelectedGuest] = useState("")

  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [error, setError] = useState("")

  const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate()

  const getStartDay = (year, month) => {
    const day = new Date(year, month, 1).getDay()
    return day === 0 ? 6 : day - 1 // Monday first
  }

  const wrapperRef = useRef(null)

  /* ---- Outside click close ---- */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setShowCalendar(false)
        setShowGuests(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="relative mt-6 rounded-2xl bg-white p-5 shadow-lg"
    >
      {/* High demand */}
      <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
        <HiFire />
        Hurry up! This venue is filling fast
      </div>

      <h3 className="text-lg font-semibold text-gray-900">
        Check Discounted Price
      </h3>
      <p className="mt-1 text-sm text-gray-500">
        Select event date and number of guests to see prices
      </p>

      {/* Inputs */}
      <div className="mt-4 flex flex-col gap-3 md:flex-row">
        {/* Calendar */}
        <div className="relative w-full md:flex-1">
          <div
            onClick={() => {
              setShowCalendar(!showCalendar)
              setShowGuests(false)
            }}
            className="flex w-full items-center gap-3 cursor-pointer
               rounded-xl border border-gray-300 px-4 py-2.5
               hover:border-red-600 transition max-h-56"
          >
            <CiCalendar className="text-xl text-gray-400 shrink-0" />
            <span
              className={`text-sm truncate ${
                selectedDate ? "text-gray-900" : "text-gray-400"
              }`}
            >
              {selectedDate || "Select event date"}
            </span>
          </div>

          {showCalendar && (
            <div
              className="absolute top-[110%] left-0 z-[99] w-[280px]
                 rounded-xl border border-gray-300 bg-white
                 shadow-xl p-4"
            >
              {/* Header */}
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
                          `${day} ${currentMonth.toLocaleString("default", {
                            month: "short"
                          })} ${currentMonth.getFullYear()}`
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

        {/* Guests */}
        <div className="relative w-full md:flex-1">
          <div
            onClick={() => {
              setShowGuests(!showGuests)
              setShowCalendar(false)
            }}
            className="flex w-full items-center justify-between cursor-pointer
                       rounded-xl border border-gray-300 px-4 py-2.5
                       hover:border-red-600 transition"
          >
            <div className="flex items-center gap-3">
              <FaUserFriends className="text-gray-400" />
              <span
                className={`text-sm ${
                  selectedGuest ? "text-gray-900" : "text-gray-400"
                }`}
              >
                {selectedGuest || "Select guests"}
              </span>
            </div>

            <FaChevronDown
              className={`text-xs text-gray-400 transition ${
                showGuests ? "rotate-180" : ""
              }`}
            />
          </div>

          {showGuests && (
            <div
              className="absolute left-0 right-0 mt-1 z-[99]
             max-h-56 overflow-y-auto rounded-md
             border border-gray-300 bg-white shadow-lg
             scrollbar-hide"
            >
              {guestOptions.map((opt) => (
                <div
                  key={opt}
                  onClick={() => {
                    setSelectedGuest(opt)
                    setShowGuests(false)
                  }}
                  className="px-4 py-3 text-sm cursor-pointer
                             hover:bg-red-50 hover:text-red-600"
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* CTA */}
        <button
          onClick={() => {
            if (!selectedDate || !selectedGuest) {
              setError("Please fill in all details before checking price")
              return
            }
            setPopupOpen(true)
            setSelectedDate("") // clear date
            setSelectedGuest("") // clear guests
            setError("") // clear error
            setShowCalendar(false)
            setShowGuests(false)
          }}
          className={`min-w-[132px] rounded-xl px-6 py-2.5 text-sm font-semibold text-white
              transition whitespace-nowrap cursor-pointer
              ${
                !selectedDate || !selectedGuest
                  ? "bg-red-600 cursor-not-allowed"
                  : "bg-red-600 hover:bg-red-700"
              }`}
        >
          Check Price
        </button>
      </div>
      {/* Error message below inputs */}
      {error && (
        <p className="mt-3 text-sm font-medium text-red-600">{error}</p>
      )}
    </div>
  )
}
