const sharp = require("sharp")
const fs = require("fs")
const path = require("path")

const inputDir = path.join(__dirname, "../../public/listing_image")
const outputDir = path.join(__dirname, "../../public/listing_image_resized")

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

const sizes = [120, 300, 600]

const supportedFormats = [
  ".avif",
  ".webp",
  ".jpg",
  ".jpeg",
  ".png",
  ".jfif",
  ".bmp"
]

const files = fs.readdirSync(inputDir)

let totalImages = 0
let processedImages = 0

files.forEach(file => {

  const ext = path.extname(file).toLowerCase()

  if (!supportedFormats.includes(ext)) return

  // Skip only resized files like image_120.avif
  if (/_\d+\./.test(file)) return

  totalImages++

  const input = path.join(inputDir, file)
  const name = path.basename(file, ext)

  sizes.forEach(size => {

    const outputFile = `${outputDir}/${name}_${size}.avif`

    if (fs.existsSync(outputFile)) {
      console.log(`Skipped existing: ${name}_${size}.avif`)
      return
    }

    sharp(input)
      .resize(size)
      .avif({ quality: 60 })
      .toFile(outputFile)
      .then(() => console.log(`Created: ${name}_${size}.avif`))
      .catch(err => console.log(err))

  })

  processedImages++
})

console.log("\n========= SUMMARY =========")
console.log(`Original images found: ${totalImages}`)
console.log(`Images processed: ${processedImages}`)
console.log(`Sizes generated per image: ${sizes.length}`)
console.log(`Expected total output files: ${processedImages * sizes.length}`)