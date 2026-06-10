"""Generate the branded resource PDFs served from public/documents.

Usage:
    python scripts/generate_resource_pdfs.py                 # build every .txt in scripts/content
    python scripts/generate_resource_pdfs.py path/to/doc.txt # build specific content files

Document content lives in plain-text files under scripts/content (see
pdfgen/parser.py for the format). Brand colors and type live in
pdfgen/brand.py so every document follows the style guide automatically.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

from pdfgen import build_doc, parse_file

CONTENT_DIR = Path(__file__).resolve().parent / "content"


def main(argv):
    if argv:
        paths = [Path(a) for a in argv]
        missing = [p for p in paths if not p.is_file()]
        if missing:
            raise SystemExit(f"content file not found: {', '.join(str(p) for p in missing)}")
    else:
        paths = sorted(CONTENT_DIR.glob("*.txt"))
        if not paths:
            raise SystemExit(f"no .txt content files found in {CONTENT_DIR}")

    for path in paths:
        out = build_doc(parse_file(path))
        print(out)


if __name__ == "__main__":
    main(sys.argv[1:])
