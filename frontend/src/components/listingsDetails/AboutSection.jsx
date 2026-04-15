import { useState, useMemo } from "react"
import DOMPurify from "dompurify"
import "../../style/ContentHTML.css"

export default function AboutSection({ description }) {
  const [showFullDesc, setShowFullDesc] = useState(false)

  const { cleanHTML, textOnly, shortText } = useMemo(() => {
    if (!description) {
      return { cleanHTML: "", textOnly: "", shortText: "" }
    }

    const cleanHTML = DOMPurify.sanitize(description, {
  FORBID_ATTR: ["style"], // removes inline styles
})

    const tempDiv = document.createElement("div")
    tempDiv.innerHTML = cleanHTML

    const textOnly = tempDiv.textContent || tempDiv.innerText || ""
    const shortText = textOnly.slice(0, 300)

    return { cleanHTML, textOnly, shortText }
  }, [description])

  if (!description) return null

  return (
    <section className="bg-white p-4 sm:p-6 rounded-2xl shadow-md mb-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-3 text-red-600">
        About this Banquet
      </h2>

      <div
        className={`content-html max-w-none text-gray-700 ${
          !showFullDesc && textOnly.length > 300 ? "collapsed fade" : ""
        }`}
        dangerouslySetInnerHTML={{
          __html:
            showFullDesc || textOnly.length <= 300
              ? cleanHTML
              : `<p>${shortText}...</p>`
        }}
      />

      {textOnly.length > 300 && (
        <button
          className="text-red-600 mt-2 hover:underline text-sm sm:text-base cursor-pointer"
          onClick={() => setShowFullDesc(!showFullDesc)}
        >
          {showFullDesc ? "Read Less" : "Read More"}
        </button>
      )}
    </section>
  )
}