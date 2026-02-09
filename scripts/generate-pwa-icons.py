#!/usr/bin/env python3
"""
HARNESS Project - PWA Icon Generator
Generates all required PWA icon sizes from source image

Requirements:
    - Python 3.x
    - Pillow: pip install Pillow

Usage:
    python scripts/generate-pwa-icons.py
"""

import os
import sys
from pathlib import Path

# Try to import PIL
try:
    from PIL import Image
except ImportError:
    print("❌ Error: Pillow package not found")
    print("   Install it with: pip install Pillow")
    print("   Or use: python -m pip install Pillow")
    sys.exit(1)

# Configuration
SCRIPT_DIR = Path(__file__).parent
PROJECT_ROOT = SCRIPT_DIR.parent
SOURCE_IMAGE = PROJECT_ROOT / "images" / "harness.png"
OUTPUT_DIR = PROJECT_ROOT / "icons"

# Icon sizes required by manifest.json
ICON_SIZES = [72, 96, 128, 144, 152, 192, 384, 512]

def main():
    """Generate all PWA icons"""
    print("HARNESS PWA Icon Generator\n")

    # Create output directory
    OUTPUT_DIR.mkdir(exist_ok=True)
    print(f"[OK] Icons directory ready: {OUTPUT_DIR}\n")

    # Check source image exists
    if not SOURCE_IMAGE.exists():
        print(f"[ERROR] Source image not found: {SOURCE_IMAGE}")
        print("        Please ensure harness.png exists in the images/ directory")
        sys.exit(1)

    print(f"Source: {SOURCE_IMAGE}")
    print(f"Output: {OUTPUT_DIR}\n")
    print("Generating icons...\n")

    # Load source image
    try:
        source_img = Image.open(SOURCE_IMAGE)
        print(f"[OK] Loaded source image: {source_img.size[0]}x{source_img.size[1]}px\n")
    except Exception as e:
        print(f"[ERROR] Failed to load source image: {e}")
        sys.exit(1)

    # Generate each icon size
    generated = 0
    failed = 0

    for size in ICON_SIZES:
        output_path = OUTPUT_DIR / f"icon-{size}x{size}.png"

        try:
            # Resize with high-quality resampling
            # Using LANCZOS for best quality
            icon = source_img.resize((size, size), Image.Resampling.LANCZOS)

            # Save as PNG
            icon.save(output_path, "PNG", optimize=True)

            print(f"  [OK] Generated icon-{size}x{size}.png")
            generated += 1

        except Exception as e:
            print(f"  [ERROR] Failed to generate {size}x{size}: {e}")
            failed += 1

    # Summary
    print(f"\n{'='*50}")
    print(f"[SUCCESS] Icon generation complete!")
    print(f"          Generated: {generated}/{len(ICON_SIZES)} icons")
    if failed > 0:
        print(f"          Failed: {failed} icons")
    print(f"          Location: {OUTPUT_DIR}")
    print(f"{'='*50}\n")

    if generated == len(ICON_SIZES):
        print("All icons created successfully!")
        print("Your PWA is now ready for installation.")
    else:
        print("[WARNING] Some icons failed to generate.")
        print("          You may need to create them manually.")

if __name__ == "__main__":
    main()
