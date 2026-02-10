import { useContext } from "react"
import { UIContext } from "../../store/UIContext"

export default function HallCapacities({ hallCapacities = [] }) {
  const { setPopupOpen } = useContext(UIContext)
  if (!hallCapacities.length) return null

  return (
    <section className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg mb-8">
      <h3 className="text-xl sm:text-2xl font-bold mb-5 text-red-600">
        Hall Capacities
      </h3>

      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden md:block">
        <table className="min-w-full text-sm">
          <thead className="bg-gradient-to-r from-red-500 to-red-700 text-white">
            <tr>
              <th className="px-4 py-3 text-left">Area</th>
              <th className="px-4 py-3 text-left">Capacity</th>
              <th className="px-4 py-3 text-left">Floating</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-center">
                Availability (Day | Night)
              </th>
            </tr>
          </thead>
          <tbody>
            {hallCapacities.map((hall, i) => {
              const day = hall.day_availability === "yes" ? "Yes" : "No"
              const night = hall.night_availability === "yes" ? "Yes" : "No"

              return (
                <tr
                  key={i}
                  className={i % 2 === 1 ? "bg-gray-100" : "bg-white"}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {hall.area}
                  </td>
                  <td className="px-4 py-3">{hall.capacity}</td>
                  <td className="px-4 py-3">{hall.floating}</td>
                  <td className="px-4 py-3 capitalize">{hall.type}</td>
                  <td className="px-4 py-3 text-center font-medium">
                    <span
                      className={
                        day === "Yes" ? "text-green-600" : "text-red-600"
                      }
                    >
                      {day}
                    </span>
                    <span className="inline-block mx-3 text-gray-400">|</span>
                    <span
                      className={
                        night === "Yes" ? "text-green-600" : "text-red-600"
                      }
                    >
                      {night}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/*DESKTOP Check Availability Button  */}
      <div className="hidden md:flex items-center justify-between mt-4 px-1 select-none">
        <p className="text-sm text-gray-500 max-w-xl flex flex-wrap">
          Found a hall that fits your needs perfectly? Click on{" "}
          <span
            onClick={() => setPopupOpen(true)}
            className="text-red-600 font-medium mx-1.5 cursor-pointer hover:underline hover:text-gray-800"
          >
            Check Availability
          </span>
          to proceed now
        </p>

        <button
          onClick={() => setPopupOpen(true)}
          className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 ml-1 rounded-xl shadow transition whitespace-nowrap cursor-pointer"
        >
          Check Availability
        </button>
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="md:hidden flex flex-col gap-3">
        {hallCapacities.map((hall, i) => {
          const day = hall.day_availability === "yes" ? "Yes" : "No"
          const night = hall.night_availability === "yes" ? "Yes" : "No"

          return (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 flex flex-col gap-2"
            >
              <p className="font-bold text-red-600 text-lg">{hall.area}</p>

              <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                <span>
                  <strong>Capacity:</strong> {hall.capacity}
                </span>
                <span>
                  <strong>Floating:</strong> {hall.floating}
                </span>
                <span className="capitalize">
                  <strong>Type:</strong> {hall.type}
                </span>
              </div>

              <div className="text-sm text-gray-800 flex justify-start items-center gap-2">
                <strong>Avail. Day | Night:</strong>
                <span
                  className={day === "Yes" ? "text-green-600" : "text-red-600"}
                >
                  {day}
                </span>
                <span className="text-gray-400">|</span>
                <span
                  className={
                    night === "Yes" ? "text-green-600" : "text-red-600"
                  }
                >
                  {night}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      {/* ===== MOBILE BUTTON AFTER CARDS ===== */}
      <div className="md:hidden mt-4">
        <button
          onClick={() => setPopupOpen(true)}
          className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-xl shadow transition"
        >
          Check Availability
        </button>
      </div>
    </section>
  )
}