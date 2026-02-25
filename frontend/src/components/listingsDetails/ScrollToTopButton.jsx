import { useEffect, useState } from "react"
import { LuArrowUp } from "react-icons/lu"

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top"
className="
  fixed
  bottom-36 md:bottom-24 lg:bottom-24
  right-6
  z-[8888]
  bg-white
  shadow-lg
  rounded-full
  p-4
  cursor-pointer
  transition duration-300 ease-in-out
  transform hover:scale-110
"
    >
      <LuArrowUp className="h-6 w-6 text-red-600" />
    </button>
  )
}