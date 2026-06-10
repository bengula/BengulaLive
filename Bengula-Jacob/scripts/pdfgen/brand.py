"""Bengula Inc brand tokens for generated PDFs.

Single source of truth for document styling. Values mirror the palette the
live site actually uses (Tailwind violet-800 primary, slate neutrals,
emerald for positive signals, amber for cautions) so PDFs and web stay
consistent. If the site palette changes, change it here once.
"""

from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont

# ── Core palette (web equivalents noted) ─────────────────────────────
PRIMARY = colors.HexColor("#5B21B6")        # violet-800 — headings, buttons, rules
PRIMARY_DEEP = colors.HexColor("#4C1D95")   # violet-900 — covers, dark panels
PRIMARY_DEEPEST = colors.HexColor("#2E1065")  # violet-950 — table headers
ACCENT = colors.HexColor("#7C3AED")         # violet-600 — gradient/electric accent
ACCENT_ORCHID = colors.HexColor("#A855F7")  # purple-500 — gradient midpoint
ACCENT_INDIGO = colors.HexColor("#6366F1")  # indigo-500 — gradient endpoint

INK = colors.HexColor("#0F172A")            # slate-900 — headlines, primary text
BODY_TEXT = colors.HexColor("#334155")      # slate-700 — body copy
MUTED = colors.HexColor("#64748B")          # slate-500 — captions, metadata
LINE = colors.HexColor("#E2E8F0")           # slate-200 — hairlines, table grids
WASH = colors.HexColor("#F6F5FB")           # site body background
TINT = colors.HexColor("#F5F3FF")           # violet-50 — zebra rows, chips

POSITIVE = colors.HexColor("#047857")       # emerald-700 — growth, positive signals
POSITIVE_WASH = colors.HexColor("#ECFDF5")  # emerald-50
CAUTION = colors.HexColor("#B45309")        # amber-700 — risk callouts
CAUTION_WASH = colors.HexColor("#FFFBEB")   # amber-50

COVER_TAG = colors.HexColor("#C4B5FD")      # violet-300 — kicker text on dark covers
COVER_SUBTITLE = colors.HexColor("#EDE9FE") # violet-100 — subtitle on dark covers

NOTE_TONES = {
    "info": (ACCENT, TINT),
    "positive": (POSITIVE, POSITIVE_WASH),
    "risk": (CAUTION, CAUTION_WASH),
}

# ── Type scale ───────────────────────────────────────────────────────
# Brand sans is Helvetica Neue. ReportLab can only embed it from font
# files; genuine Helvetica Neue is a commercial Monotype font, so the
# repo ships Liberation Sans (SIL-licensed, metrically Helvetica/Arial
# compatible) in scripts/fonts/ as the embeddable stand-in. If licensed
# HelveticaNeue.ttf / HelveticaNeue-Bold.ttf are dropped into that
# folder they take priority automatically. Built-in base-14 Helvetica
# is the last-resort fallback. Times stands in for the Georgia/Charter
# editorial serif.
FONT_DIR = Path(__file__).resolve().parents[1] / "fonts"


def _register_ttf(name, filenames):
    for filename in filenames:
        path = FONT_DIR / filename
        if path.exists():
            pdfmetrics.registerFont(TTFont(name, str(path)))
            return name
    return None


SERIF_BOLD = "Times-Bold"
_sans = _register_ttf("BrandSans", ["HelveticaNeue.ttf", "HelveticaNeue-Regular.ttf", "LiberationSans-Regular.ttf"])
_sans_bold = _register_ttf("BrandSans-Bold", ["HelveticaNeue-Bold.ttf", "HelveticaNeueBold.ttf", "LiberationSans-Bold.ttf"])
if _sans and _sans_bold:
    # Both weights present: embed the brand sans and let <b> markup resolve.
    pdfmetrics.registerFontFamily("BrandSans", normal=_sans, bold=_sans_bold, italic=_sans, boldItalic=_sans_bold)
    SANS, SANS_BOLD = _sans, _sans_bold
else:
    SANS, SANS_BOLD = "Helvetica", "Helvetica-Bold"

CONTENT_WIDTH = 170 * mm


def build_styles():
    base = getSampleStyleSheet()
    base.add(ParagraphStyle("DocTitle", fontName=SERIF_BOLD, fontSize=24, leading=28, textColor=PRIMARY, spaceAfter=9))
    base.add(ParagraphStyle("H2B", fontName=SERIF_BOLD, fontSize=17, leading=20, textColor=PRIMARY, spaceBefore=10, spaceAfter=7))
    base.add(ParagraphStyle("H3B", fontName=SANS_BOLD, fontSize=9.5, leading=12, textColor=INK, spaceBefore=7, spaceAfter=4))
    base.add(ParagraphStyle("BodyB", fontName=SANS, fontSize=9.7, leading=14, textColor=BODY_TEXT, spaceAfter=6))
    base.add(ParagraphStyle("SmallB", fontName=SANS, fontSize=8.1, leading=11, textColor=MUTED, spaceAfter=4))
    base.add(ParagraphStyle("BulletB", fontName=SANS, fontSize=9.1, leading=12.5, textColor=BODY_TEXT))
    base.add(ParagraphStyle("NoteB", fontName=SANS, fontSize=9.3, leading=13, textColor=INK, leftIndent=2 * mm, rightIndent=2 * mm))
    base.add(ParagraphStyle("CenterB", fontName=SANS_BOLD, fontSize=10, leading=12, textColor=PRIMARY, alignment=TA_CENTER))
    return base


STYLES = build_styles()
