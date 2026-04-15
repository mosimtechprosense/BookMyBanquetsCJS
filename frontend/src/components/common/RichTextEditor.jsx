import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Placeholder from "@tiptap/extension-placeholder"
import Underline from "@tiptap/extension-underline"
import Link from "@tiptap/extension-link"
import { useEffect, useMemo } from "react"
import "../../style/RichTextEditor.css"

// 🧼 CLEAN HTML FUNCTION
const cleanHTML = (html) => {
  return html
    .replace(/<p[^>]*><\/p>/g, "")
    .replace(/<p[^>]*>(\s|&nbsp;)*<\/p>/g, "")
    .replace(/<li><p[^>]*>/g, "<li>")
    .replace(/<\/p><\/li>/g, "</li>")
    .replace(/\sclass="[^"]*"/g, "")
    .trim()
}

export default function RichTextEditor({
  value,
  onChange,
  placeholder,
  className = ""
}) {
  const extensions = useMemo(
    () => [
      StarterKit.configure({
        heading: { levels: [1, 2, 3, 4] }, // ✅ H1 → H4
        underline: false
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start typing something magical..."
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-600 underline cursor-pointer"
        }
      }),
      Underline
    ],
    [placeholder]
  )

  const editor = useEditor({
    extensions,
    content: value || "",
    onUpdate: ({ editor }) => {
      onChange(cleanHTML(editor.getHTML()))
    }
  })

  // 🔄 Sync content (no loop)
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", false)
    }
  }, [value, editor])

  if (!editor) return null

  // 🎛 Toolbar Button Helper
  const Btn = ({ onClick, active, children }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all
      ${
        active
          ? "bg-black text-white shadow"
          : "bg-gray-100 hover:bg-gray-200 text-gray-700"
      }`}
    >
      {children}
    </button>
  )

  return (
    <div
      className={`border border-gray-200 rounded-2xl shadow-sm ${className}`}
    >
      {/* 🎛 TOOLBAR */}
      <div className="flex flex-wrap gap-2 p-3 border-b bg-white rounded-t-2xl">
        {/* Text styles */}
        <Btn
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          B
        </Btn>

        <Btn
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          I
        </Btn>

        <Btn
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          U
        </Btn>

        <Btn
          onClick={() => {
            const url = prompt("Enter URL")

            if (url) {
              editor.chain().focus().setLink({ href: url }).run()
            }
          }}
          active={editor.isActive("link")}
        >
          Link
        </Btn>

        <Btn onClick={() => editor.chain().focus().unsetLink().run()}>
          Unlink
        </Btn>

        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Headings */}
        {[1, 2, 3, 4].map((level) => (
          <Btn
            key={level}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
            active={editor.isActive("heading", { level })}
          >
            H{level}
          </Btn>
        ))}

        <div className="w-px h-6 bg-gray-200 mx-1" />

        {/* Lists */}
        <Btn
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          • List
        </Btn>

        <Btn
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          1. List
        </Btn>
      </div>

      {/* ✍️ EDITOR */}
      <div className="px-4 py-3 min-h-35 bg-gray-50 rounded-b-2xl">
        <EditorContent
          editor={editor}
          className="outline-none min-h-30 prose prose-sm max-w-none"
        />
      </div>
    </div>
  )
}
