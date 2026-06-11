"""Turn a parsed content spec into a finished branded PDF."""

from datetime import date
from pathlib import Path

from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    NextPageTemplate,
    PageBreak,
    PageTemplate,
    Spacer,
)

from . import components as c
from .sources import SOURCES

ROOT = Path(__file__).resolve().parents[2]
OUT_DIR = ROOT / "public" / "documents"
# Internal documents are kept out of public/ so they never ship with the
# static build or appear on the website.
INTERNAL_OUT_DIR = ROOT / "internal-docs"

BLOCK_BUILDERS = {
    "heading": lambda b: [c.para(b[1], "H2B")],
    "para": lambda b: [c.para(b[1])],
    "note": lambda b: [c.note(b[2], b[1])],
    "bullets": lambda b: [c.bullets(b[1])],
    "ordered": lambda b: [c.ordered(b[1])],
    "table": lambda b: [c.data_table(b[1], b[2], [w * mm for w in b[3]] if b[3] else None, compact=b[4])],
    "cards": lambda b: [c.cards(b[1])],
    "palette": lambda b: [c.palette_table(b[1])],
    # Orientation switches start a fresh page on the named template.
    "orient": lambda b: [NextPageTemplate(b[1]), PageBreak()],
}

MARGIN = 20 * mm
TOP_MARGIN = 17 * mm
BOTTOM_MARGIN = 18 * mm


def _frame(pagesize, frame_id):
    return Frame(
        MARGIN,
        BOTTOM_MARGIN,
        pagesize[0] - 2 * MARGIN,
        pagesize[1] - TOP_MARGIN - BOTTOM_MARGIN,
        id=frame_id,
        leftPadding=0,
        rightPadding=0,
        topPadding=0,
        bottomPadding=0,
    )


def source_page(keys, sourcenote=None):
    story = [PageBreak(), c.para("Selected Sources", "H2B")]
    if not keys:
        story.append(c.para(sourcenote or "Prepared by the Bengula Inc research desk.", "BodyB"))
    for key in keys:
        label, url = SOURCES[key]
        story.append(c.para(f"<b>{label}</b><br/><font color='#5B21B6'>{url}</font>", "SmallB"))
    story.append(Spacer(1, 6))
    story.append(c.para("This document is general market education, not individualized financial, tax, legal, or investment advice. Readers should verify live rates, licensing status, legal documents, and suitability before acting.", "SmallB"))
    return story


def build_doc(spec):
    internal = str(spec.get("internal", "")).lower() in ("true", "yes", "1")
    out_dir = INTERNAL_OUT_DIR if internal else OUT_DIR
    out_dir.mkdir(parents=True, exist_ok=True)
    path = out_dir / spec["file"]
    today = date.today()
    as_of = spec.get("date") or f"{today.day} {today.strftime('%B %Y')}"
    doc = BaseDocTemplate(
        str(path),
        pagesize=A4,
        rightMargin=MARGIN,
        leftMargin=MARGIN,
        topMargin=TOP_MARGIN,
        bottomMargin=BOTTOM_MARGIN,
        title=spec["title"],
        author="Bengula Inc",
    )
    land = landscape(A4)
    doc.addPageTemplates([
        PageTemplate(id="Portrait", frames=[_frame(A4, "p")], onPage=c.footer, pagesize=A4),
        PageTemplate(id="Landscape", frames=[_frame(land, "l")], onPage=c.footer, pagesize=land),
    ])
    story = [
        c.CoverBlock(spec["title"], spec["subtitle"], spec["tag"], spec["summary"], as_of, internal=internal),
        PageBreak(),
    ]
    for block in spec["body"]:
        story.extend(BLOCK_BUILDERS[block[0]](block))
    story.extend(source_page(spec["sources"], spec.get("sourcenote")))
    doc.build(story)
    return path
