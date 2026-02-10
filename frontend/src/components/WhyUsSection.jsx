const WhyUsSection = () => {

    const whyUsContent = [
    { title: "Events Organized", count: "1000+" },
    { title: "Present in Cities", count: "50+" },
    { title: "Wedding Venues", count: "500+" },
    { title: "Wedding Locations", count: "50+" },
  ];

  
  return (
     <section className="flex bg-gray-50 flex-col md:flex-row flex-wrap items-center justify-center gap-6 px-4 sm:px-8 md:px-16 lg:px-24 py-12 text-center">
        {whyUsContent.map((whyus) => (
          <div
            key={whyus.title}
            className="w-full sm:w-1/2 md:w-auto flex-1 min-w-[140px] sm:min-w-[180px] md:min-w-[220px]"
          >
            <p className="text-xl sm:text-lg md:text-xl font-semibold text-[#dc2626]">
              {whyus.title}
            </p>
            <h2 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#06002e] mt-2">
              {whyus.count}
            </h2>
          </div>
        ))}
      </section>
  )
}

export default WhyUsSection