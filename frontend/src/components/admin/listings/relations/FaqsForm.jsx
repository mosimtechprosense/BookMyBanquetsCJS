export default function FaqsForm({ form, setForm }) {

  const add = () => {
    setForm({
      ...form,
      faqs: [...form.faqs, { question: "", answer: "" }]
    });
  };

  const update = (i, key, value) => {
    const updated = [...form.faqs];
    updated[i][key] = value;
    setForm({ ...form, faqs: updated });
  };

  const remove = (i) => {
    const updated = form.faqs.filter((_, index) => index !== i);
    setForm({ ...form, faqs: updated });
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold tracking-tight">FAQs</h3>

        <button
          type="button"
          onClick={add}
          className="px-3 py-1.5 text-xs bg-black text-white rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          + Add FAQ
        </button>
      </div>

      {/* FAQ Cards */}
      {(form.faqs || []).map((faq, i) => (
        <div
          key={i}
          className="relative border border-gray-200 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition"
        >

          {/* Remove */}
          <button
            type="button"
            onClick={() => remove(i)}
            className="absolute top-3 right-3 text-gray-300 hover:text-red-500 text-sm cursor-pointer"
          >
            ✕
          </button>

          {/* Content */}
          <div className="space-y-3">

            {/* Question */}
            <input
              placeholder="Question"
              className="w-full border-b border-gray-200 focus:border-black outline-none text-sm p-1 bg-transparent"
              value={faq.question}
              onChange={(e) => update(i, "question", e.target.value)}
            />

            {/* Answer */}
            <textarea
              placeholder="Answer"
              rows={2}
              className="w-full border-b border-gray-200 focus:border-black outline-none text-sm p-1 bg-transparent resize-none"
              value={faq.answer}
              onChange={(e) => update(i, "answer", e.target.value)}
            />

          </div>
        </div>
      ))}

    </div>
  );
}