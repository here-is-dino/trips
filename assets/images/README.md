# Image Compression

When adding photos to the app, always compress them first:

```bash
python3 scripts/compress_image.py <path-to-your-photo.jpg> <output-name>
```

This will:
- Resize to max 1200px wide (perfect for retina + mobile)
- Compress to JPEG quality 80 (great quality, small file)
- Strip metadata
- Save to `assets/images/<output-name>.jpg`

**Before committing:** Run the script on any new images so the site loads fast on iPhone and desktop.
