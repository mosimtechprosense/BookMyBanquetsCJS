const prisma = require("../../config/db.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//* Register Business
const registerBusiness = async (data) => {

  const existing = await prisma.business.findUnique({
    where: { email: data.email }
  });

  if (existing) {
    throw new Error("Email already registered");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const business = await prisma.business.create({
    data: {
      businessName: data.businessName,
      ownerName: data.ownerName,
      email: data.email,
      businessType: data.businessType,
      phone: data.phone,
      alternatePhone: data.alternatePhone || null,
      password: hashedPassword,
      address: data.address,
      city: data.city,
      state: data.state,
      pincode: data.pincode,
      description: data.description || null,
      gstNumber: data.gstNumber || null,
      panNumber: data.panNumber || null,
      verificationStatus: "PENDING"
    }
  });

  return business;
};


//* Login Business
const loginBusiness = async (email, password) => {

  const business = await prisma.business.findUnique({
    where: { email }
  });

  if (!business) {
    throw new Error("Invalid email or password");
  }

  const match = await bcrypt.compare(password, business.password);

  if (!match) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    { id: business.id },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return { business, token };
};


//* Get Business Profile
const getBusinessProfile = async (id) => {

  return prisma.business.findUnique({
    where: { id: parseInt(id) },
    select: {
      id: true,
      businessName: true,
      ownerName: true,
      email: true,
      phone: true,
      alternatePhone: true,
      address: true,
      city: true,
      state: true,
      pincode: true,
      description: true,
      businessType: true,
      gstNumber: true,
      panNumber: true,
      verificationStatus: true,
      createdAt: true
    }
  });
};


module.exports = {
  registerBusiness,
  loginBusiness,
  getBusinessProfile
};