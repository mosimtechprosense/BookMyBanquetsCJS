const {
  registerBusiness,
  loginBusiness,
  getBusinessProfile
} = require("../../services/public/business.service.js");

const {
  registerSchema,
  loginSchema
} = require("../../validators/business.validator.js");


//* Register
const register = async (req, res) => {
  try {
    const validated = registerSchema.parse(req.body);

    await registerBusiness(validated);

    res.status(201).json({
      success: true,
      message: "Business registered successfully"
    });

    console.log(req.body)
console.log(req.file)

  } catch (error) {
    if (error.issues) {
      return res.status(400).json({
        success: false,
        message: error.issues[0].message
      });
    }

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


//* Login
const login = async (req, res) => {
  try {
    const validated = loginSchema.parse(req.body);

    const result = await loginBusiness(
      validated.email,
      validated.password
    );

    res.json({
      success: true,
      token: result.token,
      business: {
        id: result.business.id,
        businessName: result.business.businessName,
        ownerName: result.business.ownerName,
        verificationStatus: result.business.verificationStatus
      }
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


//* Get Profile
const getProfile = async (req, res) => {
  try {

    const profile = await getBusinessProfile(req.business.id);

    res.json({
      success: true,
      business: profile
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch profile"
    });
  }
};


module.exports = {
  register,
  login,
  getProfile
};