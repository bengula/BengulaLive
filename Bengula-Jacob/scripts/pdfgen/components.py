"""Reusable PDF building blocks, all styled from the brand token module."""

from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_LEFT
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.platypus import (
    Flowable,
    HRFlowable,
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
    def __init__(self, title, subtitle, tag, summary, as_of, internal=False, pillars=None):
        super().__init__()
        self.title = title
        self.subtitle = subtitle
        self.tag = tag
        self.summary = summary
        self.as_of = as_of
        self.internal = internal
        # The three numbered chips below the desk summary. Each document sets
        # its own via the :pillars: field; fall back to generic ones only when
        # a document omits them. Capped at 3 to fit the row.
        self.pillars = (pillars or ["Evidence-led positioning", "Risk-first execution", "East Africa context"])[:3]
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
            # The subtitle sits on the white area below the banner, so it uses
            # the orchid accent for contrast instead of the near-white tint
            # that only reads on the dark banner.
            textColor=brand.ACCENT_ORCHID,
        )
        title = Paragraph(escape(self.title), title_style)
        subtitle = Paragraph(escape(self.subtitle), subtitle_style)
        w, h = title.wrap(160 * mm, 70 * mm)
        title.drawOn(c, 0, self.height - 66 * mm - h)
        w, sh = subtitle.wrap(148 * mm, 36 * mm)
        subtitle_bottom = self.height - 74 * mm - h - sh
        subtitle.drawOn(c, 0, subtitle_bottom)

        # The card top tracks the subtitle bottom so the summary panel never
        # rides up over the subtitle on documents with a longer subtitle.
        # The card grows to fit the summary so the chip row never collides
        # with a long desk summary (heights computed top-down from card_top).
        card_top = subtitle_bottom - 8 * mm
        summary_style = ParagraphStyle("Summary", fontName=brand.SANS, fontSize=10.5, leading=15, textColor=brand.INK)
        s = Paragraph(escape(self.summary), summary_style)
        _, ph = s.wrap(self.width - 16 * mm, 60 * mm)
        summary_top = card_top - 17 * mm
        chips_top = summary_top - ph - 6 * mm
        chips_h = 16 * mm
        card_y = chips_top - chips_h - 7 * mm
        c.setFillColor(colors.white)
        c.setStrokeColor(brand.LINE)
        c.roundRect(0, card_y, self.width, card_top - card_y, 5 * mm, stroke=1, fill=1)
        c.setFillColor(brand.PRIMARY)
        c.setFont(brand.SANS_BOLD, 8)
        c.drawString(8 * mm, card_top - 12 * mm, "DESK SUMMARY")
        s.drawOn(c, 8 * mm, summary_top - ph)
        for i, label in enumerate(self.pillars):
            x = 8 * mm + i * 54 * mm
            c.setFillColor(brand.TINT)
            c.roundRect(x, chips_top - chips_h, 49 * mm, chips_h, 2 * mm, stroke=0, fill=1)
            c.setFillColor(brand.PRIMARY)
            c.setFont(brand.SANS_BOLD, 12)
            c.drawString(x + 3 * mm, chips_top - 8 * mm, f"0{i+1}")
            c.setFillColor(brand.MUTED)
            c.setFont(brand.SANS, 7.5)
            c.drawString(x + 3 * mm, chips_top - 14 * mm, label)

        c.setFillColor(brand.MUTED)
        c.setFont(brand.SANS, 8)
        use, status = ("Team reference", "Internal only") if self.internal else ("Client education", "Public download")
        meta = [("Brand", "Bengula Inc"), ("Prepared", self.as_of), ("Use", use), ("Status", status)]
        for i, (k, v) in enumerate(meta):
            x = i * 45 * mm
            c.setFont(brand.SANS_BOLD, 7)
            c.drawString(x, 18 * mm, k.upper())
            c.setFont(brand.SANS, 8)
            c.drawString(x, 13 * mm, v)
        c.restoreState()


def para(text, style="BodyB"):
    return Paragraph(text, S[style])


def heading(text, level=2):
    """Document heading. Level 1 (# ) carries a violet rule; 2 (## ) and
    3 (### ) are plain paragraphs at descending weights."""
    if level == 1:
        return [
            para(text, "H1B"),
            HRFlowable(width="100%", thickness=1.1, color=brand.PRIMARY,
                       spaceBefore=1, spaceAfter=8, lineCap="round"),
        ]
    if level == 3:
        return [para(text, "H3Head")]
    return [para(text, "H2B")]


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
