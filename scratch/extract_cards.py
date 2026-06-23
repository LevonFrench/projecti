import os
import pypdf

# Paths
pdf_dir = "j:/projects/projecti/.wiki/raw/papers"
assets_dir = "j:/projects/projecti/.wiki/wiki/topics/illuminati/assets"

os.makedirs(assets_dir, exist_ok=True)

# Helper function to extract and filter images from a PDF file
def extract_from_pdf(filename, prefix):
    pdf_path = os.path.join(pdf_dir, filename)
    if not os.path.exists(pdf_path):
        print(f"Error: {filename} not found at {pdf_path}")
        return 0
    
    print(f"Processing {filename}...")
    reader = pypdf.PdfReader(pdf_path)
    page = reader.pages[0]
    
    count = 0
    # Keep track of written files to avoid duplicate naming conflicts
    for i, img in enumerate(page.images):
        data = img.data
        # Filter: Keep images > 10KB (filtering out icons, arrows, and small assets)
        if len(data) > 10000:
            count += 1
            # Format count with padding so files sort nicely
            out_name = f"card_{prefix}_{count:03d}.png"
            out_path = os.path.join(assets_dir, out_name)
            with open(out_path, "wb") as f:
                f.write(data)
                
    print(f"Extracted {count} card images from {filename}")
    return count

# Run extraction
p1_count = extract_from_pdf("Illuminati_Card_Game_Part_I.pdf", "p1")
p2_count = extract_from_pdf("Illuminati_Card_Game_Part_II.pdf", "p2")
print(f"Total card images successfully extracted: {p1_count + p2_count}")
