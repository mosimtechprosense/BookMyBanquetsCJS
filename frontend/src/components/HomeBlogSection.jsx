import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const BASE_URL = "https://www.bookmybanquets.in/blog/wp-json/wp/v2"

const HomeBlogSection = () => {
  const [blogs, setBlogs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`${BASE_URL}/posts?_embed&per_page=4`)
      .then((res) => res.json())
      .then(setBlogs)
      .catch(() => setBlogs([]))
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
                src={blog._embedded?.["wp:featuredmedia"]?.[0]?.source_url}
                alt={blog.title.rendered}
                className="h-56 w-full object-cover" // ↑ taller image
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
