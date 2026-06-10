"""Reusable PDF building blocks, all styled from the brand token module."""

from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.pagesizes import A4
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
    def __init__(self, title, subtitle, tag, summary, as_of):
        super().__init__()
        self.title = title
        self.subtitle = subtitle
        self.tag = tag
        self.summary = summary
        self.as_of = as_of
        self.width = 178 * mm
        self.height = 246 * mm

    def wrap(self, avail_width, avail_height):
        return avail_width, self.height

    def draw(self):
        c = self.canv
        c.saveState()
        c.setFillColor(brand.PRIMARY_DEEP)
        c.rect(-20 * mm, self.height - 96 * mm, 220 * mm, 118 * mm, stroke=0, fill=1)
        c.setFillColor(brand.ACCENT)
        c.circle(178 * mm, self.height - 8 * mm, 48 * mm, stroke=0, fill=1)
        c.setFillColor(brand.ACCENT_INDIGO)
        c.circle(196 * mm, self.height - 52 * mm, 30 * mm, stroke=0, fill=1)
        c.setFillColor(colors.Color(1, 1, 1, alpha=0.08))
        c.circle(18 * mm, self.height - 76 * mm, 46 * mm, stroke=0, fill=1)

        if LOGO.exists():
            c.setFillColor(colors.white)
            c.roundRect(0, self.height - 34 * mm, 42 * mm, 20 * mm, 4 * mm, stroke=0, fill=1)
            c.drawImage(str(LOGO), 4 * mm, self.height - 31 * mm, 34 * mm, 14 * mm, preserveAspectRatio=True, mask="auto")
        else:
            c.setFillColor(colors.white)
            c.setFont(brand.SANS_BOLD, 13)
            c.drawString(0, self.height - 24 * mm, "Bengula Inc")

        c.setFillColor(brand.COVER_TAG)
        c.setFont(brand.SANS_BOLD, 8)
        c.drawRightString(self.width, self.height - 24 * mm, self.tag.upper())

        title_style = ParagraphStyle(
            "CoverTitle",
            fontName=brand.SERIF_BOLD,
            fontSize=32,
            leading=34,
            textColor=colors.white,
            spaceAfter=8,
        )
        subtitle_style = ParagraphStyle(
            "CoverSubtitle",
            fontName=brand.SANS,
            fontSize=12,
            leading=17,
            textColor=brand.COVER_SUBTITLE,
        )
        title = Paragraph(escape(self.title), title_style)
        subtitle = Paragraph(escape(self.subtitle), subtitle_style)
        w, h = title.wrap(160 * mm, 70 * mm)
        title.drawOn(c, 0, self.height - 66 * mm - h)
        w, sh = subtitle.wrap(148 * mm, 36 * mm)
        subtitle.drawOn(c, 0, self.height - 74 * mm - h - sh)

        card_y = 76 * mm
        c.setFillColor(colors.white)
        c.setStrokeColor(brand.LINE)
        c.roundRect(0, card_y, self.width, 58 * mm, 5 * mm, stroke=1, fill=1)
        c.setFillColor(brand.PRIMARY)
        c.setFont(brand.SANS_BOLD, 8)
        c.drawString(8 * mm, card_y + 46 * mm, "DESK SUMMARY")
        summary_style = ParagraphStyle("Summary", fontName=brand.SANS, fontSize=10.5, leading=15, textColor=brand.INK)
        s = Paragraph(escape(self.summary), summary_style)
        _, ph = s.wrap(self.width - 16 * mm, 26 * mm)
        s.drawOn(c, 8 * mm, card_y + 41 * mm - ph)
        for i, label in enumerate(["Evidence-led positioning", "Risk-first execution", "East Africa context"]):
            x = 8 * mm + i * 54 * mm
            c.setFillColor(brand.TINT)
            c.roundRect(x, card_y + 7 * mm, 49 * mm, 16 * mm, 2 * mm, stroke=0, fill=1)
            c.setFillColor(brand.PRIMARY)
            c.setFont(brand.SANS_BOLD, 12)
            c.drawString(x + 3 * mm, card_y + 15 * mm, f"0{i+1}")
            c.setFillColor(brand.MUTED)
            c.setFont(brand.SANS, 7.5)
            c.drawString(x + 3 * mm, card_y + 9 * mm, label)

        c.setFillColor(brand.MUTED)
        c.setFont(brand.SANS, 8)
        meta = [("Brand", "Bengula Inc"), ("Prepared", self.as_of), ("Use", "Client education"), ("Status", "Public download")]
        for i, (k, v) in enumerate(meta):
            x = i * 45 * mm
            c.setFont(brand.SANS_BOLD, 7)
            c.drawString(x, 18 * mm, k.upper())
            c.setFont(brand.SANS, 8)
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


def data_table(headers, rows, widths=None):
    if widths is None:
        widths = [brand.CONTENT_WIDTH / len(headers)] * len(headers)
    data = [[para(f"<b>{h}</b>", "SmallB") for h in headers]]
    data.extend([[para(cell, "SmallB") for cell in row] for row in rows])
    t = Table(data, colWidths=widths, repeatRows=1, hAlign=TA_LEFT)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), brand.PRIMARY_DEEPEST),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.35, brand.LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
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
    canvas.drawRightString(A4[0] - doc.rightMargin, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()
