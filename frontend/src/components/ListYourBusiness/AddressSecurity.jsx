export default function AddressSecurity({ data, updateField, next, prev, errors }) {

  return (

    <div>

      <h2 className="text-xl font-semibold mb-6">
        Address & Login Details
      </h2>

      <div>

        <textarea
          className="input mb-2"
          placeholder="Business Address"
          value={data.address}
          onChange={(e)=>updateField("address",e.target.value)}
        />

        {errors.address && <p className="error">{errors.address}</p>}

      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-4">

        <div>
          <input
            className="input"
            placeholder="City"
            value={data.city}
            onChange={(e)=>updateField("city",e.target.value)}
          />
          {errors.city && <p className="error">{errors.city}</p>}
        </div>

        <div>
          <input
            className="input"
            placeholder="State"
            value={data.state}
            onChange={(e)=>updateField("state",e.target.value)}
          />
          {errors.state && <p className="error">{errors.state}</p>}
        </div>

        <div>
          <input
            className="input"
            placeholder="Pincode"
            value={data.pincode}
            onChange={(e)=>updateField("pincode",e.target.value)}
          />
          {errors.pincode && <p className="error">{errors.pincode}</p>}
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-6">

        <div>
          <input
            type="password"
            className="input"
            placeholder="Password"
            value={data.password}
            onChange={(e)=>updateField("password",e.target.value)}
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div>
          <input
            type="password"
            className="input"

            
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChange={(e)=>updateField("confirmPassword",e.target.value)}
          />
          {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
        </div>

      </div>

      <div className="flex flex-col md:flex-row gap-4 md:justify-between mt-8">

        <button onClick={prev} className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition cursor-pointer">
          Previous
        </button>

        <button onClick={next} className="btn-primary">
          Next
        </button>

      </div>

    </div>

  )
}