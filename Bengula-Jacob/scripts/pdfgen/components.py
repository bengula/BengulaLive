"""Reusable PDF building blocks, all styled from the brand token module."""

from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    Flowable,
    KeepTogether,
    ListFlowable,
    ListItem,
    Paragraph,
    Spacer,
    Table,
    TableStyle,
)

from . import brand

ROOT = Path(__file__).resolve().parents[2]
LOGO = ROOT / "public" / "images" / "ColoredBengulaIncLogo.png"

S = brand.STYLES


class CoverBlock(Flowable):
    def __init__(self, title, subtitle, tag, summary, as_of, internal=False):
        super().__init__()
        self.title = title
        self.subtitle = subtitle
        self.tag = tag
        self.summary = summary
        self.as_of = as_of
        self.internal = internal
        self.width = brand.CONTENT_WIDTH
        self.height = 250 * mm

    def wrap(self, avail_width, avail_height):
        return avail_width, self.height

    def draw(self):
        c = self.canv
        c.saveState()

        # Consulting-report cover: restrained hierarchy, ample white space,
        # and a single brand accent instead of decorative hero graphics.
        c.setFillColor(colors.white)
        c.rect(-20 * mm, -18 * mm, self.width + 40 * mm, self.height + 35 * mm, stroke=0, fill=1)
        c.setFillColor(brand.PRIMARY_DEEP)
        c.rect(0, self.height - 4 * mm, self.width, 2 * mm, stroke=0, fill=1)
        c.setFillColor(brand.ACCENT)
        c.rect(0, self.height - 4 * mm, 28 * mm, 2 * mm, stroke=0, fill=1)

        if LOGO.exists():
            c.drawImage(str(LOGO), 0, self.height - 24 * mm, 34 * mm, 14 * mm, preserveAspectRatio=True, mask="auto")
        else:
            c.setFillColor(brand.INK)
            c.setFont(brand.SANS_BOLD, 13)
            c.drawString(0, self.height - 18 * mm, "Bengula Inc")

        c.setFillColor(brand.PRIMARY)
        c.setFont(brand.SANS_BOLD, 8)
        c.drawRightString(self.width, self.height - 16 * mm, self.tag.upper())
        c.setStrokeColor(brand.LINE)
        c.setLineWidth(0.5)
        c.line(0, self.height - 32 * mm, self.width, self.height - 32 * mm)

        title_style = ParagraphStyle(
            "CoverTitle",
            fontName=brand.SANS_BOLD,
            fontSize=28,
            leading=31,
            textColor=brand.INK,
            spaceAfter=8,
        )
        subtitle_style = ParagraphStyle(
            "CoverSubtitle",
            fontName=brand.SANS,
            fontSize=11,
            leading=15,
            textColor=brand.BODY_TEXT,
        )
        title = Paragraph(escape(self.title), title_style)
        subtitle = Paragraph(escape(self.subtitle), subtitle_style)
        _, h = title.wrap(136 * mm, 70 * mm)
        title_top = self.height - 60 * mm
        c.setFillColor(brand.PRIMARY)
        c.rect(0, title_top - h - 2 * mm, 2.2 * mm, h + 5 * mm, stroke=0, fill=1)
        title.drawOn(c, 7 * mm, title_top - h)
        _, sh = subtitle.wrap(122 * mm, 34 * mm)
        subtitle.drawOn(c, 7 * mm, title_top - h - 9 * mm - sh)

        summary_y = 77 * mm
        summary_h = 72 * mm
        c.setFillColor(colors.HexColor("#F8FAFC"))
        c.setStrokeColor(brand.LINE)
        c.roundRect(0, summary_y, self.width, summary_h, 1.5 * mm, stroke=1, fill=1)
        c.setFillColor(brand.PRIMARY_DEEP)
        c.rect(0, summary_y + summary_h - 2 * mm, self.width, 2 * mm, stroke=0, fill=1)
        c.setFillColor(brand.INK)
        c.setFont(brand.SANS_BOLD, 8)
        c.drawString(8 * mm, summary_y + summary_h - 13 * mm, "EXECUTIVE SUMMARY")
        # Caption wraps inside the 40mm left column instead of bleeding across
        # the divider into the summary body (drawString does not wrap).
        caption_style = ParagraphStyle(
            "SummaryCaption",
            fontName=brand.SANS,
            fontSize=8,
            leading=11,
            textColor=brand.MUTED,
        )
        caption = Paragraph("What the reader should understand before going further", caption_style)
        _, cap_h = caption.wrap(34 * mm, summary_h)
        caption.drawOn(c, 8 * mm, summary_y + summary_h - 18 * mm - cap_h)
        c.setStrokeColor(brand.LINE)
        c.line(48 * mm, summary_y + 10 * mm, 48 * mm, summary_y + summary_h - 10 * mm)

        summary_style = ParagraphStyle(
            "Summary",
            fontName=brand.SANS,
            fontSize=10.2,
            leading=14.4,
            textColor=brand.INK,
        )
        s = Paragraph(escape(self.summary), summary_style)
        _, ph = s.wrap(self.width - 64 * mm, summary_h - 20 * mm)
        s.drawOn(c, 56 * mm, summary_y + summary_h - 14 * mm - ph)

        signals_y = 50 * mm
        c.setStrokeColor(brand.LINE)
        c.line(0, signals_y + 18 * mm, self.width, signals_y + 18 * mm)
        for i, label in enumerate(["Evidence-led", "Risk-first", "Decision-ready"]):
            x = i * (self.width / 3)
            c.setFillColor(brand.PRIMARY)
            c.setFont(brand.SANS_BOLD, 8)
            c.drawString(x, signals_y + 9 * mm, f"0{i+1}")
            c.setFillColor(brand.INK)
            c.setFont(brand.SANS_BOLD, 8)
            c.drawString(x + 9 * mm, signals_y + 9 * mm, label)
            c.setFillColor(brand.MUTED)
            c.setFont(brand.SANS, 7)
            captions = ["Verified claims and visible assumptions", "Risks stated beside the opportunity", "Analysis tied to practical action"]
            c.drawString(x + 9 * mm, signals_y + 4 * mm, captions[i])

        c.setFillColor(brand.MUTED)
        c.setFont(brand.SANS, 8)
        use, status = ("Team reference", "Internal only") if self.internal else ("Client education", "Public download")
        meta = [("Brand", "Bengula Inc"), ("Prepared", self.as_of), ("Use", use), ("Status", status)]
        c.setStrokeColor(brand.LINE)
        c.line(0, 28 * mm, self.width, 28 * mm)
        for i, (k, v) in enumerate(meta):
            x = i * (self.width / 4)
            c.setFont(brand.SANS_BOLD, 7)
            c.setFillColor(brand.MUTED)
            c.drawString(x, 19 * mm, k.upper())
            c.setFont(brand.SANS, 8)
            c.setFillColor(brand.INK)
            c.drawString(x, 13 * mm, v)
        c.restoreState()


def para(text, style="BodyB"):
    return Paragraph(text, S[style])


def bullets(items):
    return ListFlowable(
        [ListItem(para(item, "BulletB"), leftIndent=0) for item in items],
        bulletType="bullet",
        leftIndent=12,
        bulletFontName=brand.SANS,
        bulletFontSize=7,
        spaceAfter=6,
    )


def ordered(items):
    return ListFlowable(
        [ListItem(para(item, "BulletB"), leftIndent=0) for item in items],
        bulletType="1",
        leftIndent=16,
        bulletFontName=brand.SANS_BOLD,
        bulletFontSize=8,
        spaceAfter=6,
    )


def note(text, tone="info"):
    color, fill = brand.NOTE_TONES.get(tone, brand.NOTE_TONES["info"])
    t = Table([[para(text, "NoteB")]], colWidths=[brand.CONTENT_WIDTH])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 0.35, brand.LINE),
                ("LINEBEFORE", (0, 0), (0, -1), 4, color),
                ("LEFTPADDING", (0, 0), (-1, -1), 7),
                ("RIGHTPADDING", (0, 0), (-1, -1), 7),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return KeepTogether([t, Spacer(1, 5)])


def data_table(headers, rows, widths=None, compact=False):
    if widths is None:
        widths = [brand.CONTENT_WIDTH / len(headers)] * len(headers)
    data = [[para(f"<b>{h}</b>", "SmallB") for h in headers]]
    data.extend([[para(cell, "SmallB") for cell in row] for row in rows])
    t = Table(data, colWidths=widths, repeatRows=1, hAlign=TA_LEFT)
    vpad = 3 if compact else 6
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), brand.PRIMARY_DEEPEST),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.35, brand.LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), vpad),
        ("BOTTOMPADDING", (0, 0), (-1, -1), vpad),
    ]
    for idx in range(1, len(data), 2):
        style.append(("BACKGROUND", (0, idx), (-1, idx), brand.TINT))
    t.setStyle(TableStyle(style))
    return KeepTogether([t, Spacer(1, 6)])


def cards(items):
    row = []
    data = []
    for title, text in items:
        row.append([para(f"<b>{title}</b>", "H3B"), para(text, "SmallB")])
        if len(row) == 2:
            data.append(row)
            row = []
    if row:
        row.append("")
        data.append(row)
    t = Table(data, colWidths=[82 * mm, 82 * mm], hAlign=TA_LEFT)
    t.setStyle(
        TableStyle(
            [
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ("BOX", (0, 0), (-1, -1), 0.35, brand.LINE),
                ("INNERGRID", (0, 0), (-1, -1), 6, colors.white),
                ("BACKGROUND", (0, 0), (-1, -1), colors.white),
                ("LEFTPADDING", (0, 0), (-1, -1), 8),
                ("RIGHTPADDING", (0, 0), (-1, -1), 8),
                ("TOPPADDING", (0, 0), (-1, -1), 7),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
            ]
        )
    )
    return KeepTogether([t, Spacer(1, 6)])


def palette_table(rows):
    """Color reference table with a real swatch per row: (name, hex, usage)."""
    data = [["", para("<b>Token</b>", "SmallB"), para("<b>Value</b>", "SmallB"), para("<b>Use</b>", "SmallB")]]
    for name, hex_value, usage in rows:
        data.append(["", para(f"<b>{name}</b>", "SmallB"), para(hex_value.upper(), "SmallB"), para(usage, "SmallB")])
    t = Table(data, colWidths=[14 * mm, 36 * mm, 22 * mm, 98 * mm], hAlign=TA_LEFT)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), brand.PRIMARY_DEEPEST),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.35, brand.LINE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]
    for idx, (_, hex_value, _) in enumerate(rows, start=1):
        style.append(("BACKGROUND", (0, idx), (0, idx), colors.HexColor(hex_value)))
    t.setStyle(TableStyle(style))
    return KeepTogether([t, Spacer(1, 6)])


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont(brand.SANS, 7.5)
    canvas.setFillColor(brand.MUTED)
    canvas.drawString(doc.leftMargin, 9 * mm, "Bengula Inc Research Desk")
    # doc.pagesize follows the active page template (portrait or landscape).
    canvas.drawRightString(doc.pagesize[0] - doc.rightMargin, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()
