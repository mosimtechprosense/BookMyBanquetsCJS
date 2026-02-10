import { useNavigate } from "react-router-dom";

const Terms = () => {
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
        <span className="text-gray-600 font-normal">Terms & Conditions</span>
      </div>

      {/* Heading */}
      <div className="w-full text-center mx-auto px-4 md:px-8 mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#000000] mb-3">
          Terms & Conditions
        </h2>
        <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-6xl mx-auto">
          Welcome to{" "}
          <span className="font-semibold text-[#dc2626]">BookMyBanquets.</span>{" "}
          Through visiting or utilizing our site, www.bookmybanquets.in It is
          the expectation of the Terms and Conditions (herein referred to as
          “Terms”) that you will follow, that you will be bound by the
          subsequent Terms and Conditions once you agree to (the “Website”) and
          related services (collectively, the “BookMyBanquet Services”), and
          that you will accept the Terms and be bound by the Terms. Before using
          our platform, please read them carefully.
        </p>
      </div>

      {/* Terms Content */}
      <div className="max-w-5xl mx-auto space-y-8 text-gray-700 leading-relaxed">
        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            About BookMyBanquet
          </h3>
          <p>
            BookMyBanquet is an online company that operates by ensuring that
            customers who are in search of venues are connected with banquet
            halls, marriage venues, and event service providers on our website.
            We are only an aggregator and facilitator between the users
            (customers) and vendors (banquet partners). BookMyBanquet as an
            entity does not own, operate, or run any banquet halls or event
            services.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Acceptance of Terms
          </h3>
          <p>
            Coming to our website or using it, you accept our terms and privacy
            policy. In case you do not agree, then you should avoid using the
            BookMyBanquet Services. We may revise or make changes to such Terms
            at any time without giving any notice. Further usage of the platform
            implies acceptance of these changes.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Eligibility
          </h3>
          <p>
            You have to be 18 years old to access our services. In the process,
            you certify that you are legally competent to enter into a binding
            agreement under the applicable laws by utilizing the platform.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Nature of Services
          </h3>
          <p>
            BookMyBanquet is a resource, listing, and reviews platform, as well
            as a booking service to obtain a banquet hall or event venue.
            Although we work hard to achieve the desired level of accuracy, we
            do not guarantee that the information about the vendors, their
            pictures, and prices posted on the website is correct and does not
            contain any errors. All these bookings, payments, and transactions
            are made by customers and vendors. You do not hold us liable for the
            difference, cancellation, performance of service, or reimbursement
            of such dealings.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Vendor Responsibilities
          </h3>
          <p>
            It is the duty of vendors to make sure that everything that is
            posted in their profiles (images, facilities, and prices) is correct
            and legal. Any wrongful representation, misrepresentation, or
            copyright infringement will be the liability of the vendor alone.
            BookMyBanquet has the right to edit, suppress, or delete all
            listings that may not comply with our content or conduct policies.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            User Responsibilities
          </h3>
          <p>
            Users will accept the use of the website lawfully and respectfully.
            You will not leave false information, spam, offensive information,
            or copyrighted material without permission. At its full will,
            BookMyBanquet can either delete such content or deny its services to
            the people who break these terms.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Reviews and Feedback
          </h3>
          <p>
            The ratings and reviews of our customers on our website are supposed
            to assist other people in making informed choices. BookMyBanquet
            does not directly check the authenticity of all reviews but has the
            right to delete the reviews considered a scam, defamatory, or
            irrelevant.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Intellectual Property
          </h3>
          <p>
            All information, texts, logos, and graphics on BookMyBanquet are
            owned by the company and subject to the protection of the copyright
            and trademark laws. Users and vendors retain their ownership of
            uploaded pictures or content and give BookMyBanquet a non-exclusive
            right to use the content to promote it.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Limitation of Liability
          </h3>
          <p>
            BookMyBanquet is a facilitation platform that is informational and
            allows bookings. We do not incur any losses, damages, cancellations,
            or disputes between customers and vendors. It is the risk of the
            user to use our Services. The maximum liability that we will have in
            case of any liability is the amount you will pay (in case you pay)
            to use the services of BookMyBanquet.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Indemnification
          </h3>
          <p>
            You also agree to indemnify and hold harmless BookMyBanquet, its
            employees, affiliates, and partners against all claims, damages, or
            other liabilities due to your use of the platform or violation of
            these Terms.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Third-Party Links
          </h3>
          <p>
            The external websites may be linked to our website. BookMyBanquet
            has no control over the contents, privacy, or activity of
            third-party sites, and they are at their own will.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Dispute Resolution and Law Governing
          </h3>
          <p>
            Such terms will be controlled by and interpreted in the laws of
            India. All disputes concerning the utilization of the BookMyBanquet
            Services are bound to be under the jurisdiction of the courts of New
            Delhi, India.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold text-[#000000] mb-2">
            Contact Us
          </h3>
          <p>
            To receive answers or raise issues of concern about these terms,
            contact us at{" "}
            <a
              href="mailto:info@bookmybanquets.in"
              className="text-[#dc2626] font-medium hover:underline"
            >
              info@bookmybanquets.in
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
};

export default Terms;
