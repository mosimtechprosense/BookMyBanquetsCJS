export default function BusinessDetails({ data, updateField, submit, prev, loading, errors  }) {

  return (

    <div>

      <h2 className="text-xl font-semibold mb-6">
        Additional Details
      </h2>

<textarea
  className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition mb-2"
  placeholder="Business Address"
  value={data.address}
  onChange={(e)=>updateField("address",e.target.value)}
/>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

<div>
  <input
    className="input"
    placeholder="GST Number (Optional)"
    value={data.gstNumber}
    onChange={(e)=>updateField("gstNumber",e.target.value.toUpperCase())}
  />
  {errors.gstNumber && <p className="text-red-500 text-xs mt-1">{errors.gstNumber}</p>}
</div>

<div>
  <input
    className="input"
    placeholder="PAN Number (Optional)"
    value={data.panNumber}
    onChange={(e)=>updateField("panNumber",e.target.value.toUpperCase())}
  />
  {errors.panNumber && <p className="text-red-500 text-xs mt-1">{errors.panNumber}</p>}
</div>
      </div>






<div className="mt-6">
  <label className="text-sm font-medium text-gray-700 block mb-2">
    Upload Business Document
  </label>

  <div className="relative w-full">
    {/* Styled container */}
    <div className="w-full border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-between cursor-pointer hover:border-red-500 transition">
      <span className="text-sm text-gray-500">
        {data.businessDocument ? data.businessDocument.name : "Choose file"}
      </span>
      <span className="text-red-600 font-medium ml-2">Browse</span>
    </div>

    {/* Invisible file input */}
    <input
      type="file"
      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      onChange={(e) => updateField("businessDocument", e.target.files[0])}
    />
  </div>
</div>






      <div className="flex flex-col md:flex-row gap-4 md:justify-between mt-8">

        <button onClick={prev} className="btn-secondary">
          Previous
        </button>

<button
  onClick={submit}
  disabled={loading}
  className="bg-red-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
>
  {loading ? "Submitting..." : "Submit Registration"}
</button>

      </div>

    </div>

  )
}