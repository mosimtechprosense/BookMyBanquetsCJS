import { useNavigate } from "react-router-dom";

const Privacy = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-gradient-to-b from-[#ffffff] to-[#f9f9f9] py-8 px-6 md:px-16 lg:px-24">
      {/* Breadcrumb */}
      <div className="flex items-center gap-x-2 mb-10 text-sm md:text-base">
        <h3
          className="text-red-600 font-medium cursor-pointer hover:text-gray-800"
          onClick={() => navigate("/")}
        >
          Home
        </h3>
        <span>/</span>
        <span className="text-gray-600 font-normal">Privacy Policy</span>
      </div>

      {/* Heading */}
      <div className="w-full text-center mx-auto px-4 md:px-8 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-3">
          Privacy Policy
        </h2>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-6xl mx-auto">
          At{" "}
          <span className="font-semibold text-[#dc2626]">BookMyBanquets</span>,
          we give importance to privacy, and we are bound to preserve your
          personal information. This Privacy Policy identifies what data we
          gather and how we utilize, store, and protect it once you visit or use
          our site <span className="font-medium">www.bookmybanquets.in</span>{" "}
          and related services. By visiting or utilizing our website, you agree
          to this Privacy Policy.
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Information We Collect
          </h3>
          <p>
            We collect data to offer superior services and enhance your
            experience. The information we gather includes:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <span className="font-medium">Personal Information:</span> When
              contacting us, completing forms, or booking events, we may collect
              your name, phone number, email address, and event details.
            </li>
            <li>
              <span className="font-medium">Non-Personal Information:</span>{" "}
              This includes information about your browser, device, IP address,
              and browsing history, tracked via cookies or analytics.
            </li>
            <li>
              <span className="font-medium">Vendor Information:</span> For
              vendors or banquet owners registering with us, we collect business
              details, photos, venue prices, and contact information.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            How We Use Your Information
          </h3>
          <p>We use the collected information to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Facilitate communication between customers and vendors.</li>
            <li>Respond to your inquiries, requests, or feedback.</li>
            <li>Enhance our website’s functionality and user experience.</li>
            <li>Send offers, promotions, or updates (only if you opt-in).</li>
            <li>Ensure secure transactions and prevent misuse.</li>
          </ul>
          <p className="mt-2">
            Your personal information is{" "}
            <span className="font-semibold">never sold, rented, or traded</span>{" "}
            to third parties for marketing purposes.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Sharing of Information
          </h3>
          <p>We may share your information only in the following cases:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              <span className="font-medium">With Vendors:</span> When you make
              an inquiry or booking request, we share your contact information
              with the relevant banquet partner to process your request.
            </li>
            <li>
              <span className="font-medium">With Service Providers:</span> We
              engage trusted third-party partners for hosting, analytics, or
              payment processing — all bound by confidentiality.
            </li>
            <li>
              <span className="font-medium">When Legally Required:</span> We may
              disclose your information as required by law or government
              authorities.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Data Retention and Security
          </h3>
          <p>
            We retain your personal data only as long as necessary to provide
            our services or as required by law. We apply standard security
            measures to protect your data from unauthorized access or
            alteration. However, no online platform can guarantee absolute
            security, and users are encouraged to share data responsibly.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Third-Party Links
          </h3>
          <p>
            Our website may contain links to third-party sites not operated by
            us. We are not responsible for their content, privacy, or security.
            Please review their privacy policies before sharing any personal
            information.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Your Rights and Choices
          </h3>
          <p>You have the right to:</p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>Access, change, or delete your personal information.</li>
            <li>Withdraw consent to data collection (as allowed by law).</li>
          </ul>
          <p className="mt-2">
            To exercise these rights, contact us at{" "}
            <a
              href="mailto:info@bookmybanquets.in"
              className="text-[#dc2626] font-medium hover:underline"
            >
              info@bookmybanquets.in
            </a>
            .
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Updates to This Policy
          </h3>
          <p>
            BookMyBanquet reserves the right to amend or revise this Privacy
            Policy at any time. Updates take effect immediately upon posting.
            Please revisit this page periodically to stay informed.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Contact Us
          </h3>
          <p>
            <span className="font-semibold">BookMyBanquet</span> <br />
            Email:{" "}
            <a
              href="mailto:info@bookmybanquets.in"
              className="text-[#dc2626] font-medium hover:underline"
            >
              info@bookmybanquets.in
            </a>
            <br />
            Website:{" "}
            <a
              href="https://www.bookmybanquets.in"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#dc2626] font-medium hover:underline"
            >
              www.bookmybanquets.in
            </a>
          </p>
        </section>
      </div>
    </div>
  );
};

export default Privacy;
