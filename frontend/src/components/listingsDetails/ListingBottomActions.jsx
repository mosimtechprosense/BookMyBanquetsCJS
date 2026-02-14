import React from "react"
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa"

export default function ListingBottomActions({ setPopupOpen }) {
  const phoneNumber = "8920597474"
  const whatsappNumber = "918920597474"

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4 lg:hidden">
      {/* Floating Dock */}
      <div className="bg-white/95 backdrop-blur-xl shadow-2xl 
                      rounded-2xl border border-gray-200 
                      p-2">
        <div className="flex items-center gap-2">
          {/* Call Now */}
          <a
            href={`tel:${phoneNumber}`}
            className="flex-1 h-10 flex items-center justify-center gap-2
                       rounded-xl 
                       bg-blue-50 text-blue-600 
                       font-medium text-xs
                       hover:bg-blue-100 
                       active:scale-95 transition"
          >
            <FaPhoneAlt className="text-sm" />
            Call Now
          </a>

          {/* Check Availability - Primary */}
          <button
            onClick={() => setPopupOpen(true)}
            className="flex-1 h-10 px-2 flex items-center justify-center
                       rounded-xl 
                       bg-gradient-to-r from-blue-700 to-cyan-600
                     text-white 
                       font-semibold text-xs tracking-normal
                       hover:opacity-90 
                       active:scale-[0.98] transition"
          >
            Check Availability
          </button>

          {/* WhatsApp */}
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 h-10 flex items-center justify-center gap-2
                       rounded-xl 
                       bg-green-50 text-green-600 
                       font-medium text-xs
                       hover:bg-green-100 
                       active:scale-95 transition"
          >
            <FaWhatsapp className="text-base" />
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
