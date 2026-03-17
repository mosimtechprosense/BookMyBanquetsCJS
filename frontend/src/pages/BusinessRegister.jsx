import { useState } from "react"
import Stepper from "../components/ListYourBusiness/Stepper"
import BusinessInformation from "../components/ListYourBusiness/BusinessInformation"
import AddressSecurity from "../components/ListYourBusiness/AddressSecurity"
import BusinessDetails from "../components/ListYourBusiness/BusinessDetails"
import RegistrationSuccess from "../components/ListYourBusiness/RegistrationSuccess"
import { registerBusiness } from "../api/businessApi"
import { useNavigate } from "react-router-dom"

export default function BusinessRegister() {

  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState("")
const navigate = useNavigate()

  const [formData, setFormData] = useState({
    businessName: "",
    ownerName: "",
    email: "",
    businessType: "",
    phone: "",
    alternatePhone: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    description: "",
    gstNumber: "",
    panNumber: "",
    businessDocument: null
  })

  const updateField = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const validateStep1 = () => {

    const newErrors = {}

    if (!formData.businessName.trim())
      newErrors.businessName = "Business name is required"

    if (!formData.ownerName.trim())
      newErrors.ownerName = "Owner name is required"

    if (!/^\S+@\S+\.\S+$/.test(formData.email))
      newErrors.email = "Enter valid email"

    if (!/^[6-9]\d{9}$/.test(formData.phone))
      newErrors.phone = "Enter valid 10 digit phone"

    if (!formData.businessType)
      newErrors.businessType = "Select business type"

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {

    const newErrors = {}

    if (!formData.address.trim())
      newErrors.address = "Address is required"

    if (!formData.city.trim())
      newErrors.city = "City required"

    if (!formData.state.trim())
      newErrors.state = "State required"

    if (!/^\d{6}$/.test(formData.pincode))
      newErrors.pincode = "Invalid pincode"

    if (formData.password.length < 6)
      newErrors.password = "Minimum 6 characters"

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match"

    setErrors(newErrors)

    return Object.keys(newErrors).length === 0
  }


  const validateStep3 = () => {

  const newErrors = {}

  if (formData.gstNumber && !/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/.test(formData.gstNumber)) {
    newErrors.gstNumber = "Invalid GST format"
  }

  if (formData.panNumber && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(formData.panNumber)) {
    newErrors.panNumber = "Invalid PAN format"
  }

  setErrors(newErrors)

  return Object.keys(newErrors).length === 0
}


  const submitRegistration = async () => {

    try {

      setLoading(true)

      await registerBusiness(formData)

      setStep(4)

    } catch (err) {

      setApiError(err?.response?.data?.message || "Registration failed")

    } finally {
      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-4">

      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-12">

          <h1 className="text-4xl font-bold text-gray-900">
            List Your Business
          </h1>

          <p className="text-gray-500 mt-3">
            Join thousands of vendors growing with our platform
          </p>

        </div>

        {step <= 3 && <Stepper step={step} />}

        <div className="bg-white border border-gray-100 shadow-xl rounded-2xl p-6 md:p-10">

          {apiError && (
  <div className="mb-6 p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-sm">
    {apiError}
  </div>
)}


          {step === 1 && (
            <BusinessInformation
              data={formData}
              updateField={updateField}
              errors={errors}
              next={() => {
                if (validateStep1()) setStep(2)
              }}
            />
          )}

          {step === 2 && (
            <AddressSecurity
              data={formData}
              updateField={updateField}
              errors={errors}
              prev={() => setStep(1)}
              next={() => {
                if (validateStep2()) setStep(3)
              }}
            />
          )}

          {step === 3 && (
            <BusinessDetails
              data={formData}
              updateField={updateField}
              errors={errors}
              prev={() => setStep(2)}
              submit={() => {
  if (validateStep3()) submitRegistration()
}}
              loading={loading}
            />
          )}

          {step === 4 && <RegistrationSuccess />}

        </div>

        <div className="text-center mt-4 text-sm text-gray-600">
  Already have a vendor account?{" "}
  <span
    onClick={() => navigate("/business/login")}
    className="text-red-600 font-medium cursor-pointer hover:underline"
  >
    Login here
  </span>
</div>


      </div>

    </div>
  )
}