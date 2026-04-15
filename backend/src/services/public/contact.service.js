const prisma = require("../../config/db.js")
const { transporter } = require("../../config/email.js")

//* Create contact message + send email
const createContactMessage = async ({
  name,
  email,
  phone,
  message,
  pageUrl
}) => {
  //* Clean email
  const cleanEmail = email?.trim() || null

  //* Detect form type
  const isDiscountForm = !cleanEmail
  const isContactForm = !!cleanEmail
  const formType = isContactForm ? "contact form" : "discount form"

  //* Save message to database
  const savedMessage = await prisma.contactmessage.create({
    data: {
      name,
      email: cleanEmail,
      phone: phone ? phone.toString() : null,
      message,
      pageUrl: pageUrl || null,
    }
  })


  //* Send email safely
  try {
    const info = await transporter.sendMail({
      from: `"BookMyBanquets" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,

      //* FIXED CC (string format)
      cc: [
        process.env.EMAIL_CC,
        "aryan0594@gmail.com",
        "akshaybmb6@gmail.com",
        "mosimraza.techprosense@gmail.com"
      ]
        .filter(Boolean)
        .join(","),

      replyTo: cleanEmail || process.env.EMAIL_USER,
      subject: `New ${formType} submission`,

      //* FINAL HTML (NO CONDITIONAL BUGS)
      html: `
<div style="max-width:600px;margin:auto;font-family:Arial;background:#fff;border-radius:12px;overflow:hidden;">
  
  <div style="background:#dc2626;padding:20px;color:#fff;">
    <h2 style="margin:0;">BookMyBanquets</h2>
  </div>

  <div style="padding:20px;">
    <p>New <strong>${formType}</strong> received</p>

    <p><strong>Name:</strong> ${name || "N/A"}</p>

    <p><strong>Phone:</strong> ${
      phone ? phone.toString() : "N/A"
    }</p>

${
  isContactForm
    ? `<p><strong>Email:</strong> ${cleanEmail}</p>`
    : ""
}

    ${
      pageUrl
        ? `<p><strong>Page URL:</strong> 
            <a href="${pageUrl}" target="_blank">${pageUrl}</a>
           </p>`
        : ""
    }

    <p style="margin-top:12px;"><strong>Message:</strong></p>

    <div style="background:#f3f4f6;padding:12px;border-radius:6px;">
      ${message || "N/A"}
    </div>
  </div>

  <div style="padding:12px;text-align:center;font-size:12px;color:#6b7280;background:#f9fafb;">
    This message was sent from the BookMyBanquets website.
  </div>

</div>
`
    })

    console.log("✅ EMAIL SENT:", info.response)
  } catch (err) {
    console.error("❌ EMAIL FAILED:", err)
  }

  return savedMessage
}

//* Get all messages
const getAllContactMessages = async () => {
  return prisma.contactmessage.findMany({
    orderBy: { createdAt: "desc" }
  })
}

//* Get message by ID
const getContactMessageById = async (id) => {
  return prisma.contactmessage.findUnique({
    where: { id: parseInt(id) }
  })
}

//? Update message
const updateContactMessage = async (id, data) => {
  return prisma.contactmessage.update({
    where: { id: parseInt(id) },
    data
  })
}

//! Delete message
const deleteContactMessage = async (id) => {
  return prisma.contactmessage.delete({
    where: { id: parseInt(id) }
  })
}

module.exports = {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage
}