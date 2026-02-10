import { useState } from "react";

export default function FAQSection({ faqs }) {
  const [openIndexes, setOpenIndexes] = useState([]);

  if (!faqs?.length) return null;

  const toggleOpen = (index) => {
    setOpenIndexes((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  };

  return (
    <section className="bg-white p-6 rounded-2xl shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-4">Frequently Asked Questions</h2>
      <div className="space-y-3 cursor-pointer">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="border rounded-lg overflow-hidden"
          >
            <button
              className="w-full px-4 py-3 text-left font-semibold text-red-600 flex justify-between items-center"
              onClick={() => toggleOpen(i)}
            >
              {faq.question}
              <span
                className={`transition-transform ${
                  openIndexes.includes(i) ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            {openIndexes.includes(i) && (
              <p className="px-4 py-3 text-gray-700 border-t">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}