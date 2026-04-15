import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const BASE_URL = "https://blog.bookmybanquets.in/wp-json/wp/v2"

const PINNED_ID = 1269

// convert img Url
const transformImageUrl = (url) => {
  if (!url) return null

  return url.replace(
    "https://blog.bookmybanquets.in",
    "https://www.bookmybanquets.in/blog"
  )
}


const HomeBlogSection = () => {
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()


  // Fetch Blog List
useEffect(() => {
  // First fetch the pinned post directly
  fetch(`${BASE_URL}/posts/${PINNED_ID}?_embed`)
    .then((r) => r.json())
    .then((pinnedPost) => {

      // Then fetch latest 4 posts
      fetch(`${BASE_URL}/posts?_embed&per_page=4`)
        .then((res) => res.json())
        .then((data) => {
          // Remove duplicate if pinned already exists
          const filtered = data.filter((p) => p.id !== PINNED_ID)

          // Put pinned at first position
          const updated = [...filtered]

// insert pinned at 3rd position (index 2)
updated.splice(2, 0, pinnedPost)

setBlogs(updated.slice(0, 4))
        })
        .catch(() => setBlogs([]))
    })
    .catch(() => {
      // fallback if pinned fails
      fetch(`${BASE_URL}/posts?_embed&per_page=4`)
        .then((res) => res.json())
        .then(setBlogs)
        .catch(() => setBlogs([]))
    })
}, [])

  if (!blogs.length) return null

  return (
    <section className="max-w-7xl mx-auto px-6 py-14">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl md:text-3xl font-extrabold">Latest Blogs</h2>
        <button
          onClick={() => navigate("/blogs")}
          className="text-red-600 font-semibold hover:underline cursor-pointer"
        >
          View All →
        </button>
      </div>

      {/* BLOG CARDS */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {blogs.map((blog) => (
          <article
            key={blog.id}
            className="bg-white rounded-3xl shadow-sm hover:shadow-md transition overflow-hidden flex flex-col"
          >
            <Link to={`/blogs/${blog.slug}`}>
<img
  loading="lazy"
src={transformImageUrl(
  blog._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium_large
    ?.source_url ||
  blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url
)}
  alt={blog.title.rendered}
  className="h-56 w-full object-cover"
/>
            </Link>

            <div className="p-5 flex-1 flex flex-col">
              <h3 className="font-bold text-base leading-snug line-clamp-2 mb-3">
                <Link to={`/blogs/${blog.slug}`} className="hover:text-red-600">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: blog.title.rendered
                    }}
                  />
                </Link>
              </h3>

              <div
                className="text-sm text-gray-600 line-clamp-3" // ↑ show more lines
                dangerouslySetInnerHTML={{
                  __html: blog.excerpt.rendered.replace("[&hellip;]", "…")
                }}
              />
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default HomeBlogSection
