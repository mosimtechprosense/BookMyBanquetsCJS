import { useState } from "react"
import { LuChevronDown } from "react-icons/lu"

export default function FaqSection({ faqs = [] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!Array.isArray(faqs) || faqs.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Frequently Asked Questions
      </h2>

      <div className="max-w-4xl mx-auto space-y-4">
        {faqs.map((faq, index) => {
          const isOpen = activeIndex === index

          return (
            <div
              key={faq.id ?? index}
              className={`border rounded-lg overflow-hidden transition-all duration-300 ${
                isOpen ? "border-red-500 bg-red-50" : "border-gray-200"
              }`}
            >
              {/* Question */}
              <button
                onClick={() =>
                  setActiveIndex(isOpen ? null : index)
                }
                className="w-full flex items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium text-gray-800">
                  {faq.question}
                </span>

                <LuChevronDown
                  className={`h-5 w-5 transition-transform duration-300 ${
                    isOpen ? "rotate-180 text-red-600" : "text-gray-500"
                  }`}
                />
              </button>

              {/* Answer */}
              <div
                className={`px-5 transition-all duration-300 ease-in-out ${
                  isOpen
                    ? "max-h-40 pb-4 opacity-100"
                    : "max-h-0 opacity-0 overflow-hidden"
                }`}
              >
                <p className="text-gray-700 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}