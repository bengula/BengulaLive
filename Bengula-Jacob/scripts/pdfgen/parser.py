"""Parse a plain-text document description into a build spec.

Content format (line oriented):

    :file: output_name.pdf            required metadata at top
    :title: Document Title
    :subtitle: One-sentence subtitle.
    :tag: Cover kicker
    :summary: Cover desk-summary paragraph.
    :sources: key1, key2              keys into pdfgen.sources.SOURCES
    :date: 9 June 2026                optional; defaults to today

    ## Section Heading
    Plain paragraph. Consecutive lines are joined into one paragraph;
    blank lines separate paragraphs.

    > info: Callout box. Tones: info (violet), positive (emerald), risk (amber).
    >       Continuation lines start with ">".

    - bulleted item, one per line

    1. numbered item, one per line

    [table widths=35,70,65]          widths in mm, optional
    Header | Header | Header        add "compact" for tighter row padding:
    cell | cell | cell              [table widths=... compact]
    [/table]

    @landscape                       switch to landscape pages from here
    @portrait                        switch back to portrait pages
    (each starts a new page)

    [cards]
    Card Title :: card body text
    [/cards]

    [palette]
    Token Name | #5B21B6 | what the color is for
    [/palette]

    // comment lines are ignored

All text is XML-escaped, so &, <, > are safe to use literally.
"""

import re
from xml.sax.saxutils import escape

META_RE = re.compile(r"^:(\w+):\s*(.*)$")
ORDERED_RE = re.compile(r"^\d+[.)]\s+(.*)$")
BLOCK_OPEN_RE = re.compile(r"^\[(table|cards|palette)([^\]]*)\]$")


class ContentError(ValueError):
    pass


def _split_row(line):
    return [escape(cell.strip()) for cell in line.split("|")]


def parse_file(path):
    spec = {"sources": [], "date": None, "body": []}
    body = spec["body"]
    lines = path.read_text(encoding="utf-8").splitlines()
    i = 0
    n = len(lines)

    while i < n:
        raw = lines[i]
        line = raw.strip()
        i += 1

        if not line or line.startswith("//"):
            continue

        m = META_RE.match(line)
        if m:
            key, value = m.group(1), m.group(2).strip()
            if key == "sources":
                spec["sources"] = [k.strip() for k in value.split(",") if k.strip()]
            else:
                spec[key] = value
            continue

        if line.startswith("## "):
            body.append(("heading", escape(line[3:].strip())))
            continue

        if line in ("@landscape", "@portrait"):
            body.append(("orient", line[1:].capitalize()))
            continue

        if line.startswith(">"):
            text = line.lstrip(">").strip()
            tone = "info"
            tone_match = re.match(r"^(info|positive|risk):\s*(.*)$", text)
            if tone_match:
                tone, text = tone_match.group(1), tone_match.group(2)
            parts = [text]
            while i < n and lines[i].strip().startswith(">"):
                parts.append(lines[i].strip().lstrip(">").strip())
                i += 1
            body.append(("note", tone, escape(" ".join(p for p in parts if p))))
            continue

        if line.startswith("- "):
            items = [escape(line[2:].strip())]
            while i < n and lines[i].strip().startswith("- "):
                items.append(escape(lines[i].strip()[2:].strip()))
                i += 1
            body.append(("bullets", items))
            continue

        m = ORDERED_RE.match(line)
        if m:
            items = [escape(m.group(1).strip())]
            while i < n and ORDERED_RE.match(lines[i].strip()):
                items.append(escape(ORDERED_RE.match(lines[i].strip()).group(1).strip()))
                i += 1
            body.append(("ordered", items))
            continue

        m = BLOCK_OPEN_RE.match(line)
        if m:
            kind, attrs = m.group(1), m.group(2)
            rows = []
            closed = False
            while i < n:
                inner = lines[i].strip()
                i += 1
                if inner == f"[/{kind}]":
                    closed = True
                    break
                if not inner or inner.startswith("//"):
                    continue
                rows.append(inner)
            if not closed:
                raise ContentError(f"{path.name}: unclosed [{kind}] block")
            body.append(_parse_block(kind, attrs, rows, path))
            continue

        # Plain paragraph: join consecutive non-directive lines.
        parts = [line]
        while i < n:
            nxt = lines[i].strip()
            if not nxt or nxt.startswith(("## ", "- ", ">", "[", ":", "//", "@")) or ORDERED_RE.match(nxt):
                break
            parts.append(nxt)
            i += 1
        body.append(("para", escape(" ".join(parts))))

    for key in ("file", "title", "subtitle", "tag", "summary"):
        if not spec.get(key):
            raise ContentError(f"{path.name}: missing required ':{key}:' field")
    return spec


def _parse_block(kind, attrs, rows, path):
    if kind == "table":
        if len(rows) < 2:
            raise ContentError(f"{path.name}: [table] needs a header row and at least one data row")
        widths = None
        wm = re.search(r"widths=([\d.,\s]+)", attrs)
        if wm:
            widths = [float(w) for w in wm.group(1).split(",")]
        header = _split_row(rows[0])
        data = [_split_row(r) for r in rows[1:]]
        for r in data:
            if len(r) != len(header):
                raise ContentError(f"{path.name}: table row has {len(r)} cells, header has {len(header)}")
        return ("table", header, data, widths, "compact" in attrs.split())

    if kind == "cards":
        items = []
        for r in rows:
            if "::" not in r:
                raise ContentError(f"{path.name}: [cards] line needs 'Title :: text': {r!r}")
            title, text = r.split("::", 1)
            items.append((escape(title.strip()), escape(text.strip())))
        return ("cards", items)

    # palette
    items = []
    for r in rows:
        cells = [c.strip() for c in r.split("|")]
        if len(cells) != 3 or not re.match(r"^#[0-9a-fA-F]{6}$", cells[1]):
            raise ContentError(f"{path.name}: [palette] line needs 'Name | #RRGGBB | usage': {r!r}")
        items.append((escape(cells[0]), cells[1], escape(cells[2])))
    return ("palette", items)
