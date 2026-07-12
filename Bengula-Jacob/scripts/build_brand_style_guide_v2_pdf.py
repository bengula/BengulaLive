from pathlib import Path
import re
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    BaseDocTemplate,
    Frame,
    Flowable,
    ListFlowable,
    ListItem,
    PageBreak,
    PageTemplate,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "internal-docs" / "bengula_inc_brand_style_guide_v2.md"
OUTPUT = ROOT / "internal-docs" / "bengula_inc_brand_style_guide_v2.pdf"
FALLBACK_OUTPUT = ROOT / "internal-docs" / "bengula_inc_brand_style_guide_v2_branded.pdf"

PRIMARY = colors.HexColor("#5B21B6")
PRIMARY_DEEP = colors.HexColor("#4C1D95")
PRIMARY_DEEPEST = colors.HexColor("#2E1065")
INK = colors.HexColor("#0F172A")
BODY = colors.HexColor("#334155")
MUTED = colors.HexColor("#64748B")
LINE = colors.HexColor("#E2E8F0")
TINT = colors.HexColor("#F5F3FF")
ACCENT = colors.HexColor("#7C3AED")
ACCENT_ORCHID = colors.HexColor("#A855F7")
ACCENT_INDIGO = colors.HexColor("#6366F1")
POSITIVE = colors.HexColor("#047857")
CAUTION = colors.HexColor("#B45309")

MARGIN = 18 * mm
CONTENT_WIDTH = A4[0] - 2 * MARGIN
LOGO = ROOT / "public" / "images" / "ColoredBengulaIncLogo.png"


def styles():
    s = getSampleStyleSheet()
    s.add(ParagraphStyle("TitleB", fontName="Times-Bold", fontSize=24, leading=29, textColor=PRIMARY, spaceAfter=10))
    s.add(ParagraphStyle("H2B", fontName="Times-Bold", fontSize=16, leading=20, textColor=PRIMARY, spaceBefore=12, spaceAfter=7))
    s.add(ParagraphStyle("H3B", fontName="Helvetica-Bold", fontSize=11, leading=14, textColor=INK, spaceBefore=9, spaceAfter=5))
    s.add(ParagraphStyle("BodyB", fontName="Helvetica", fontSize=9, leading=12.5, textColor=BODY, spaceAfter=5))
    s.add(ParagraphStyle("SmallB", fontName="Helvetica", fontSize=7.5, leading=10, textColor=MUTED, spaceAfter=3))
    s.add(ParagraphStyle("HeaderB", fontName="Helvetica-Bold", fontSize=7.8, leading=10.5, textColor=colors.white))
    s.add(ParagraphStyle("BulletB", fontName="Helvetica", fontSize=8.7, leading=12, textColor=BODY))
    s.add(ParagraphStyle("CoverTitle", fontName="Times-Bold", fontSize=30, leading=34, textColor=colors.white))
    s.add(ParagraphStyle("CoverSubtitle", fontName="Helvetica", fontSize=11.5, leading=16, textColor=colors.white))
    s.add(ParagraphStyle("CoverSummary", fontName="Helvetica", fontSize=9.5, leading=13.5, textColor=BODY))
    return s


S = styles()


def inline(text):
    text = escape(text)
    text = re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", text)
    text = re.sub(r"`(.+?)`", r"<font name='Courier'>\1</font>", text)
    return text


def para(text, style="BodyB"):
    return Paragraph(inline(text), S[style])


class CoverPage(Flowable):
    def __init__(self):
        super().__init__()
        self.width = CONTENT_WIDTH
        self.height = A4[1] - 34 * mm

    def wrap(self, avail_width, avail_height):
        return avail_width, self.height

    def draw(self):
        c = self.canv
        c.saveState()

        c.setFillColor(PRIMARY_DEEP)
        c.rect(-18 * mm, self.height - 96 * mm, A4[0], 118 * mm, stroke=0, fill=1)
        c.setFillColor(ACCENT)
        c.circle(self.width - 4 * mm, self.height - 8 * mm, 46 * mm, stroke=0, fill=1)
        c.setFillColor(ACCENT_INDIGO)
        c.circle(self.width + 12 * mm, self.height - 52 * mm, 30 * mm, stroke=0, fill=1)
        c.setFillColor(colors.Color(1, 1, 1, alpha=0.08))
        c.circle(15 * mm, self.height - 76 * mm, 44 * mm, stroke=0, fill=1)

        if LOGO.exists():
            c.setFillColor(colors.white)
            c.roundRect(0, self.height - 34 * mm, 43 * mm, 20 * mm, 4 * mm, stroke=0, fill=1)
            c.drawImage(str(LOGO), 4 * mm, self.height - 31 * mm, 35 * mm, 14 * mm, preserveAspectRatio=True, mask="auto")
        else:
            c.setFillColor(colors.white)
            c.setFont("Helvetica-Bold", 13)
            c.drawString(0, self.height - 24 * mm, "Bengula Inc")

        c.setFillColor(colors.HexColor("#C4B5FD"))
        c.setFont("Helvetica-Bold", 8)
        c.drawRightString(self.width, self.height - 24 * mm, "BRAND GUIDE")

        title = para("Bengula Inc Brand & Editorial Style Guide", "CoverTitle")
        _, title_h = title.wrap(148 * mm, 70 * mm)
        title.drawOn(c, 0, self.height - 66 * mm - title_h)

        subtitle = para(
            "A practical visual, verbal, and editorial system for research PDFs, articles, social posts, pitch decks, proposals, and client-facing marketing material.",
            "CoverSubtitle",
        )
        _, sub_h = subtitle.wrap(148 * mm, 40 * mm)
        subtitle.drawOn(c, 0, self.height - 74 * mm - title_h - sub_h)

        card_top = self.height - 116 * mm
        summary = para(
            "The Bengula Inc brand should feel sharp, trustworthy, financially literate, and human: advisory enough for boardrooms, warm enough for entrepreneurs, and visually consistent across web, PDF, slide, and social formats. Every piece of content should reduce uncertainty for the reader while making evidence, assumptions, and expert judgment clear.",
            "CoverSummary",
        )
        _, summary_h = summary.wrap(self.width - 16 * mm, 60 * mm)
        card_h = summary_h + 56 * mm
        card_y = card_top - card_h
        c.setFillColor(colors.white)
        c.setStrokeColor(LINE)
        c.roundRect(0, card_y, self.width, card_h, 5 * mm, stroke=1, fill=1)
        c.setFillColor(PRIMARY)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(8 * mm, card_top - 12 * mm, "DESK SUMMARY")
        summary.drawOn(c, 8 * mm, card_top - 18 * mm - summary_h)

        for i, label in enumerate(["Visual system", "Verbal & editorial", "Cross-format consistency"]):
            x = 8 * mm + i * 54 * mm
            y = card_y + 10 * mm
            c.setFillColor(TINT)
            c.roundRect(x, y, 49 * mm, 16 * mm, 2 * mm, stroke=0, fill=1)
            c.setFillColor(PRIMARY)
            c.setFont("Helvetica-Bold", 12)
            c.drawString(x + 3 * mm, y + 8 * mm, f"0{i + 1}")
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 7.5)
            c.drawString(x + 3 * mm, y + 3 * mm, label)

        meta = [("Brand", "Bengula Inc"), ("Prepared", "11 July 2026"), ("Use", "Team reference"), ("Status", "Internal only")]
        c.setFillColor(MUTED)
        for i, (k, v) in enumerate(meta):
            x = i * 43 * mm
            c.setFont("Helvetica-Bold", 7)
            c.drawString(x, 18 * mm, k.upper())
            c.setFont("Helvetica", 8)
            c.drawString(x, 13 * mm, v)

        c.restoreState()


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 9 * mm, "Bengula Inc Research Desk")
    canvas.drawRightString(A4[0] - doc.rightMargin, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()


def table_from_lines(lines):
    rows = [[cell.strip() for cell in line.strip().strip("|").split("|")] for line in lines]
    rows = [row for row in rows if not all(re.fullmatch(r":?-{3,}:?", c.strip()) for c in row)]
    if not rows:
        return []
    width = CONTENT_WIDTH
    is_palette = [cell.lower() for cell in rows[0]] == ["token", "hex", "tailwind", "use"]
    if is_palette:
        rows = [["", "Token", "Value", "Tailwind", "Use"]] + [["", *row] for row in rows[1:]]
        col_widths = [14 * mm, 36 * mm, 24 * mm, 26 * mm, width - 100 * mm]
    else:
        cols = len(rows[0])
        col_widths = [width / cols] * cols

    data = []
    for r, row in enumerate(rows):
        data.append([para(cell, "HeaderB" if r == 0 else "SmallB") for cell in row])
    t = Table(data, colWidths=col_widths, repeatRows=1, hAlign="LEFT")
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), PRIMARY_DEEPEST),
        ("GRID", (0, 0), (-1, -1), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE" if is_palette else "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 4),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 4),
    ]
    for idx in range(1, len(data), 2):
        style.append(("BACKGROUND", (0, idx), (-1, idx), TINT))
    if is_palette:
        for idx, row in enumerate(rows[1:], start=1):
            hex_value = row[2]
            if re.fullmatch(r"#[0-9A-Fa-f]{6}", hex_value):
                style.append(("BACKGROUND", (0, idx), (0, idx), colors.HexColor(hex_value)))
    t.setStyle(TableStyle(style))
    return [t, Spacer(1, 5)]


def blocks(markdown):
    story = []
    lines = markdown.splitlines()
    in_code = False
    table_lines = []
    list_items = []
    paragraph = []

    def flush_paragraph():
        nonlocal paragraph
        if paragraph:
            story.append(para(" ".join(paragraph)))
            paragraph = []

    def flush_list():
        nonlocal list_items
        if list_items:
            story.append(ListFlowable([ListItem(para(item, "BulletB"), leftIndent=0) for item in list_items], bulletType="bullet", leftIndent=12, spaceAfter=5))
            list_items = []

    def flush_table():
        nonlocal table_lines
        if table_lines:
            story.extend(table_from_lines(table_lines))
            table_lines = []

    for raw in lines:
        line = raw.rstrip()
        stripped = line.strip()

        if stripped.startswith("```"):
            flush_paragraph()
            flush_list()
            flush_table()
            in_code = not in_code
            continue
        if in_code:
            if stripped:
                story.append(para(stripped, "SmallB"))
            continue
        if not stripped or stripped == "---":
            flush_paragraph()
            flush_list()
            flush_table()
            if stripped == "---":
                story.append(Spacer(1, 4))
            continue
        if stripped.startswith("|"):
            flush_paragraph()
            flush_list()
            table_lines.append(stripped)
            continue
        flush_table()
        if stripped.startswith("# "):
            flush_paragraph()
            flush_list()
            story.append(para(stripped[2:], "TitleB"))
        elif stripped.startswith("## "):
            flush_paragraph()
            flush_list()
            story.append(para(stripped[3:], "H2B"))
        elif stripped.startswith("### "):
            flush_paragraph()
            flush_list()
            story.append(para(stripped[4:], "H3B"))
        elif re.match(r"^- ", stripped):
            flush_paragraph()
            list_items.append(stripped[2:])
        elif re.match(r"^\d+\. ", stripped):
            flush_paragraph()
            list_items.append(re.sub(r"^\d+\. ", "", stripped))
        else:
            flush_list()
            paragraph.append(stripped)

    flush_paragraph()
    flush_list()
    flush_table()
    return story


def build():
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    output = OUTPUT
    if OUTPUT.exists():
        try:
            with OUTPUT.open("r+b"):
                pass
        except PermissionError:
            output = FALLBACK_OUTPUT
    doc = BaseDocTemplate(
        str(output),
        pagesize=A4,
        rightMargin=MARGIN,
        leftMargin=MARGIN,
        topMargin=16 * mm,
        bottomMargin=18 * mm,
        title="Bengula Inc Brand & Editorial Style Guide v2.2",
        author="Bengula Inc Research Desk",
    )
    frame = Frame(MARGIN, 18 * mm, CONTENT_WIDTH, A4[1] - 34 * mm, leftPadding=0, rightPadding=0, topPadding=0, bottomPadding=0)
    doc.addPageTemplates([PageTemplate(id="main", frames=[frame], onPage=footer)])
    story = [CoverPage(), PageBreak()]
    story.extend(blocks(SOURCE.read_text(encoding="utf-8")))
    doc.build(story)
    print(output)


if __name__ == "__main__":
    build()
