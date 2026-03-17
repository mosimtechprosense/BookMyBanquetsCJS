export default function Stepper({ step }) {

  const steps = [
    "Business Info",
    "Address & Login",
    "Additional Details"
  ]

  return (

    <div className="mb-10">

      <div className="flex items-center justify-between relative">

        {steps.map((label, index) => {

          const stepNumber = index + 1
          const active = step >= stepNumber

          return (

            <div key={label} className="flex flex-col items-center flex-1 relative">

              {/* Circle */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm z-10
                ${active ? "bg-red-600 text-white" : "bg-gray-200 text-gray-500"}`}
              >
                {stepNumber}
              </div>

              {/* Label */}
              <p
                className={`text-xs md:text-sm mt-2 text-center
                ${active ? "text-red-600" : "text-gray-400"}`}
              >
                {label}
              </p>

              

              {/* Connector */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-5 left-1/2 w-full h-[3px] bg-gray-200">

                  <div
                    className={`h-full bg-red-600 transition-all duration-500
                    ${step > stepNumber ? "w-full" : "w-0"}`}
                  />

                </div>
              )}

            </div>

          )

        })}

      </div>

    </div>
  )
}