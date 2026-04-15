import { useState } from "react"
import { FiTrash2 } from "react-icons/fi"





const BASE_URL = import.meta.env.VITE_API_BASE
const FRONTEND_BASE_URL= "https://www.bookmybanquets.in"

export default function VenueImagesForm({ form, setForm, formId }) {
  const [uploading, setUploading] = useState(false)

  
  const handleUpload = async (file, e) => {
  if (!file) return;

  if (!formId) { // use the prop instead of form.id
    alert("Please save the listing before uploading images!");
    return;
  }

  try {
    setUploading(true);

    const formData = new FormData();
    formData.append("image", file);
    formData.append("listingId", String(formId)); // ✅ use prop

    const res = await fetch(`${BASE_URL}/api/admin/listings/upload-image`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Upload failed");

    setForm(prev => ({
      ...prev,
      venue_images: [...(prev.venue_images || []), {
        id: data.data.id,
        image: data.image,
        alt_text: ""
      }]
    }));

    if (e?.target) e.target.value = "";
  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    alert(err.message || "Upload failed ❌");
  } finally {
    setUploading(false);
  }
};

  const remove = async (i) => {
    const img = form.venue_images?.[i]
    if (!img) return

    try {
      if (img.id) {
        await fetch(
          `${BASE_URL}/api/admin/listings/delete-image/${img.id}`,
          { method: "DELETE" }
        )
      }

      const updated = form.venue_images.filter((_, index) => index !== i)

      setForm((prev) => ({
        ...prev,
        venue_images: updated
      }))

    } catch (err) {
      console.error(err)
      alert("Failed to delete image ❌")
    }
  }

  return (
    <div>
      <h3 className="font-semibold mb-2">Images</h3>

      {/* Upload */}
      <input
        type="file"
        accept="image/*"
        disabled={uploading}
        onChange={(e) => handleUpload(e.target.files[0], e)}
        className="mb-3"
      />

      {uploading && (
        <p className="text-sm text-blue-500">Uploading...</p>
      )}




























      {/* Images */}
<div className="w-full flex flex-wrap gap-3">
  {(form.venue_images || []).map((img, i) => {
    const imageName = img.image || ""

    const getImageUrl = (name, size = 120) => {
      if (!name) return "/placeholder.jpg"

      if (name.endsWith(".avif")) {
        return `${FRONTEND_BASE_URL}/listing_image/${name.replace(".avif", `_${size}.avif`)}`
      }

      return `${FRONTEND_BASE_URL}/listing_image/${name}`
    }

    const preview = getImageUrl(imageName, 120)

    return (
      <div
        key={i}
        className="flex items-center gap-2 w-full bg-gray-50 px-2 py-1 rounded-md"
      >
        {/* Small Image */}
        <img
          src={preview}
          alt={img.alt_text || "preview"}
          className="h-14 w-14 object-cover rounded"
        />

        {/* Alt Text */}
        <input
          placeholder="Alt text"
          value={img.alt_text || ""}
          onChange={(e) => {
            const updated = [...(form.venue_images || [])]
            updated[i].alt_text = e.target.value
            setForm((prev) => ({
              ...prev,
              venue_images: updated
            }))
          }}
          className="text-xs w-full px-1 py-0.5 bg-transparent focus:outline-none"
        />

        {/* Delete Icon */}
        <button
          onClick={() => remove(i)}
          className="text-red-500 hover:text-red-700 cursor-pointer"
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    )
  })}
</div>



























    </div>
  )
}