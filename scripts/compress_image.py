#!/usr/bin/env python3
"""
Compress images for web use.
- Resizes to max 1200px width (good for retina displays, fast on mobile)
- JPEG quality 80 (great quality, much smaller file)
- Strips metadata
- Outputs to assets/images/

Usage: python3 scripts/compress_image.py <input_path> <output_name>
Example: python3 scripts/compress_image.py ~/Downloads/photo.jpg rhodope-cover
"""

import sys
import os
from PIL import Image

MAX_WIDTH = 1200
QUALITY = 80
OUTPUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'assets', 'images')

def compress(input_path, output_name):
    if not os.path.exists(input_path):
        print(f"Error: File not found: {input_path}")
        sys.exit(1)

    os.makedirs(OUTPUT_DIR, exist_ok=True)

    img = Image.open(input_path)
    original_size = os.path.getsize(input_path)

    # Convert to RGB if needed (handles PNG with transparency, HEIC, etc.)
    if img.mode in ('RGBA', 'LA', 'P'):
        background = Image.new('RGB', img.size, (255, 255, 255))
        if img.mode == 'P':
            img = img.convert('RGBA')
        background.paste(img, mask=img.split()[-1] if img.mode in ('RGBA', 'LA') else None)
        img = background
    elif img.mode != 'RGB':
        img = img.convert('RGB')

    # Resize if wider than MAX_WIDTH
    if img.width > MAX_WIDTH:
        ratio = MAX_WIDTH / img.width
        new_height = int(img.height * ratio)
        img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)
        print(f"Resized: {img.width}x{new_height}")

    output_path = os.path.join(OUTPUT_DIR, f"{output_name}.jpg")
    img.save(output_path, 'JPEG', quality=QUALITY, optimize=True, progressive=True)

    compressed_size = os.path.getsize(output_path)
    savings = (1 - compressed_size / original_size) * 100

    print(f"Original:  {original_size / 1024:.0f} KB")
    print(f"Compressed: {compressed_size / 1024:.0f} KB")
    print(f"Savings:   {savings:.0f}%")
    print(f"Output:    {output_path}")

if __name__ == '__main__':
    if len(sys.argv) < 3:
        print(__doc__)
        sys.exit(1)
    compress(sys.argv[1], sys.argv[2])
