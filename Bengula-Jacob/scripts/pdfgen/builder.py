"""Turn a parsed content spec into a finished branded PDF."""

from datetime import date
from pathlib import Path

from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.platypus import PageBreak, SimpleDocTemplate, Spacer

from . import components as c
from .sources import SOURCES

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / "public" / "documents"

BLOCK_BUILDERS = {
    "heading": lambda b: c.para(b[1], "H2B"),
    "para": lambda b: c.para(b[1]),
    "note": lambda b: c.note(b[2], b[1]),
    "bullets": lambda b: c.bullets(b[1]),
    "ordered": lambda b: c.ordered(b[1]),
    "table": lambda b: c.data_table(b[1], b[2], [w * mm for w in b[3]] if b[3] else None),
    "cards": lambda b: c.cards(b[1]),
    "palette": lambda b: c.palette_table(b[1]),
}


def source_page(keys):
    story = [PageBreak(), c.para("Selected Sources", "H2B")]
    if not keys:
        story.append(c.para("This internal brand guide is derived from the current Bengula Inc website, logo assets, resource-library styling, and stated brand positioning.", "BodyB"))
    for key in keys:
        label, url = SOURCES[key]
        story.append(c.para(f"<b>{label}</b><br/><font color='#5B21B6'>{url}</font>", "SmallB"))
    story.append(Spacer(1, 6))
    story.append(c.para("This document is general market education, not individualized financial, tax, legal, or investment advice. Readers should verify live rates, licensing status, legal documents, and suitability before acting.", "SmallB"))
    return story


def build_doc(spec):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUT_DIR / spec["file"]
    today = date.today()
    as_of = spec.get("date") or f"{today.day} {today.strftime('%B %Y')}"
    doc = SimpleDocTemplate(
        str(path),
        pagesize=A4,
        rightMargin=20 * mm,
        leftMargin=20 * mm,
        topMargin=17 * mm,
        bottomMargin=18 * mm,
        title=spec["title"],
        author="Bengula Inc",
    )
    story = [
        c.CoverBlock(spec["title"], spec["subtitle"], spec["tag"], spec["summary"], as_of),
        PageBreak(),
    ]
    for block in spec["body"]:
        story.append(BLOCK_BUILDERS[block[0]](block))
    story.extend(source_page(spec["sources"]))
    doc.build(story, onFirstPage=c.footer, onLaterPages=c.footer)
    return path
