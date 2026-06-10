from pathlib import Path
from xml.sax.saxutils import escape

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    Flowable,
    Image,
    KeepTogether,
    ListFlowable,
    ListItem,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "documents"
LOGO = ROOT / "public" / "images" / "ColoredBengulaIncLogo.png"
AS_OF = "9 June 2026"

BRAND = colors.HexColor("#4C1D95")
VIOLET = colors.HexColor("#7C3AED")
TEAL = colors.HexColor("#0F766E")
CYAN = colors.HexColor("#0E7490")
GOLD = colors.HexColor("#B7791F")
INK = colors.HexColor("#171321")
MUTED = colors.HexColor("#5F6470")
WASH = colors.HexColor("#F7F4FB")
LINE = colors.HexColor("#DDD8EA")

SOURCES = {
    "afdb2026": (
        "African Development Bank, African Economic Outlook 2026",
        "https://www.afdb.org/en/news-and-events/press-releases/africas-growth-holds-firm-amid-global-turbulence-says-2026-african-economic-outlook-93626",
    ),
    "worldBankKeu": (
        "World Bank, Kenya Economic Update series",
        "https://www.worldbank.org/en/country/kenya/publication/kenya-economic-update-keu",
    ),
    "treasuryBps": (
        "The National Treasury, Kenya Budget Policy Statement 2026",
        "https://www.treasury.go.ke/budget-policy-statement/",
    ),
    "cbkWeekly": (
        "Central Bank of Kenya, Weekly Bulletin February 27, 2026",
        "https://www.centralbank.go.ke/uploads/weekly_bulletin/706642360_Weekly%20CBK%20Bulletin%20Feb%2027%202026.pdf",
    ),
    "ilpa": (
        "Institutional Limited Partners Association, Due Diligence Questionnaire",
        "https://ilpa.org/resources-tools/resource-library/due-diligence-questionnaire/",
    ),
    "cmaAif": (
        "Capital Markets Authority Kenya, Alternative Investment Fund",
        "https://www.cma.or.ke/alternative-investment-fund/",
    ),
    "secRisk": (
        "U.S. SEC, Adviser due diligence for alternative investments",
        "https://www.sec.gov/newsroom/whats-new/risk-alert-selecting-alternative-investments-managers",
    ),
    "energy4Impact": (
        "Energy 4 Impact / Mercy Corps, Kenya cold-chain markets programme",
        "https://www.energy4impact.org/resources/cold-chain-markets-agriculture",
    ),
    "investKenya": (
        "Invest Kenya, Agro-processing Sector Investment Opportunity 2026",
        "https://www.investkenya.go.ke/wp-content/uploads/2026/03/202603_Invest-Kenya_Sector-pack_Agroprocessing_vPublish.pdf",
    ),
    "knaFlowers": (
        "Kenya News Agency, flower exports and freight pressure, June 2026",
        "https://www.kenyanews.go.ke/kenyan-flower-industry-eyes-new-markets-amid-rising-export-costs/",
    ),
}


class CoverBlock(Flowable):
    def __init__(self, title, subtitle, tag, summary):
        super().__init__()
        self.title = title
        self.subtitle = subtitle
        self.tag = tag
        self.summary = summary
        self.width = 178 * mm
        self.height = 246 * mm

    def wrap(self, avail_width, avail_height):
        return avail_width, self.height

    def draw(self):
        c = self.canv
        c.saveState()
        c.setFillColor(BRAND)
        c.rect(-20 * mm, self.height - 96 * mm, 220 * mm, 118 * mm, stroke=0, fill=1)
        c.setFillColor(TEAL)
        c.circle(178 * mm, self.height - 8 * mm, 48 * mm, stroke=0, fill=1)
        c.setFillColor(colors.Color(1, 1, 1, alpha=0.08))
        c.circle(18 * mm, self.height - 76 * mm, 46 * mm, stroke=0, fill=1)

        if LOGO.exists():
            c.setFillColor(colors.white)
            c.roundRect(0, self.height - 34 * mm, 42 * mm, 20 * mm, 4 * mm, stroke=0, fill=1)
            c.drawImage(str(LOGO), 4 * mm, self.height - 31 * mm, 34 * mm, 14 * mm, preserveAspectRatio=True, mask="auto")
        else:
            c.setFillColor(colors.white)
            c.setFont("Helvetica-Bold", 13)
            c.drawString(0, self.height - 24 * mm, "Bengula Inc")

        c.setFillColor(colors.HexColor("#D8B4FE"))
        c.setFont("Helvetica-Bold", 8)
        c.drawRightString(self.width, self.height - 24 * mm, self.tag.upper())

        title_style = ParagraphStyle(
            "CoverTitle",
            fontName="Times-Bold",
            fontSize=32,
            leading=34,
            textColor=colors.white,
            spaceAfter=8,
        )
        subtitle_style = ParagraphStyle(
            "CoverSubtitle",
            fontName="Helvetica",
            fontSize=12,
            leading=17,
            textColor=colors.HexColor("#EEE7FF"),
        )
        title = Paragraph(escape(self.title), title_style)
        subtitle = Paragraph(escape(self.subtitle), subtitle_style)
        w, h = title.wrap(160 * mm, 70 * mm)
        title.drawOn(c, 0, self.height - 66 * mm - h)
        w, sh = subtitle.wrap(148 * mm, 36 * mm)
        subtitle.drawOn(c, 0, self.height - 74 * mm - h - sh)

        card_y = 76 * mm
        c.setFillColor(colors.white)
        c.setStrokeColor(LINE)
        c.roundRect(0, card_y, self.width, 58 * mm, 5 * mm, stroke=1, fill=1)
        c.setFillColor(BRAND)
        c.setFont("Helvetica-Bold", 8)
        c.drawString(8 * mm, card_y + 46 * mm, "DESK SUMMARY")
        summary_style = ParagraphStyle("Summary", fontName="Helvetica", fontSize=10.5, leading=15, textColor=INK)
        s = Paragraph(escape(self.summary), summary_style)
        _, ph = s.wrap(self.width - 16 * mm, 26 * mm)
        s.drawOn(c, 8 * mm, card_y + 41 * mm - ph)
        for i, label in enumerate(["Evidence-led positioning", "Risk-first execution", "East Africa context"]):
            x = 8 * mm + i * 54 * mm
            c.setFillColor(WASH)
            c.roundRect(x, card_y + 7 * mm, 49 * mm, 16 * mm, 2 * mm, stroke=0, fill=1)
            c.setFillColor(BRAND)
            c.setFont("Helvetica-Bold", 12)
            c.drawString(x + 3 * mm, card_y + 15 * mm, f"0{i+1}")
            c.setFillColor(MUTED)
            c.setFont("Helvetica", 7.5)
            c.drawString(x + 3 * mm, card_y + 9 * mm, label)

        c.setFillColor(MUTED)
        c.setFont("Helvetica", 8)
        meta = [("Brand", "Bengula Inc"), ("Prepared", AS_OF), ("Use", "Client education"), ("Status", "Public download")]
        for i, (k, v) in enumerate(meta):
            x = i * 45 * mm
            c.setFont("Helvetica-Bold", 7)
            c.drawString(x, 18 * mm, k.upper())
            c.setFont("Helvetica", 8)
            c.drawString(x, 13 * mm, v)
        c.restoreState()


def styles():
    base = getSampleStyleSheet()
    base.add(ParagraphStyle("DocTitle", fontName="Times-Bold", fontSize=24, leading=28, textColor=BRAND, spaceAfter=9))
    base.add(ParagraphStyle("H2B", fontName="Times-Bold", fontSize=17, leading=20, textColor=BRAND, spaceBefore=10, spaceAfter=7))
    base.add(ParagraphStyle("H3B", fontName="Helvetica-Bold", fontSize=9.5, leading=12, textColor=INK, spaceBefore=7, spaceAfter=4))
    base.add(ParagraphStyle("BodyB", fontName="Helvetica", fontSize=9.7, leading=14, textColor=colors.HexColor("#2F3340"), spaceAfter=6))
    base.add(ParagraphStyle("SmallB", fontName="Helvetica", fontSize=8.1, leading=11, textColor=MUTED, spaceAfter=4))
    base.add(ParagraphStyle("BulletB", fontName="Helvetica", fontSize=9.1, leading=12.5, textColor=colors.HexColor("#2F3340")))
    base.add(ParagraphStyle("NoteB", fontName="Helvetica", fontSize=9.3, leading=13, textColor=colors.HexColor("#1F2937"), leftIndent=2 * mm, rightIndent=2 * mm))
    base.add(ParagraphStyle("CenterB", fontName="Helvetica-Bold", fontSize=10, leading=12, textColor=BRAND, alignment=TA_CENTER))
    return base


S = styles()


def para(text, style="BodyB"):
    return Paragraph(text, S[style])


def bullets(items):
    return ListFlowable(
        [ListItem(para(item, "BulletB"), leftIndent=0) for item in items],
        bulletType="bullet",
        leftIndent=12,
        bulletFontName="Helvetica",
        bulletFontSize=7,
        spaceAfter=6,
    )


def ordered(items):
    return ListFlowable(
        [ListItem(para(item, "BulletB"), leftIndent=0) for item in items],
        bulletType="1",
        leftIndent=16,
        bulletFontName="Helvetica-Bold",
        bulletFontSize=8,
        spaceAfter=6,
    )


def note(text, tone="info"):
    color = CYAN if tone == "info" else GOLD
    fill = colors.HexColor("#ECFEFF") if tone == "info" else colors.HexColor("#FFF8E6")
    t = Table([[para(text, "NoteB")]], colWidths=[170 * mm])
    t.setStyle(
        TableStyle(
            [
                ("BACKGROUND", (0, 0), (-1, -1), fill),
                ("BOX", (0, 0), (-1, -1), 0.35, colors.HexColor("#D8DEE9")),
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
        widths = [170 * mm / len(headers)] * len(headers)
    data = [[para(f"<b>{h}</b>", "SmallB") for h in headers]]
    data.extend([[para(cell, "SmallB") for cell in row] for row in rows])
    t = Table(data, colWidths=widths, repeatRows=1, hAlign=TA_LEFT)
    style = [
        ("BACKGROUND", (0, 0), (-1, 0), colors.HexColor("#33205F")),
        ("TEXTCOLOR", (0, 0), (-1, 0), colors.white),
        ("GRID", (0, 0), (-1, -1), 0.35, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]
    for idx in range(1, len(data), 2):
        style.append(("BACKGROUND", (0, idx), (-1, idx), colors.HexColor("#FBF9FE")))
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
                ("BOX", (0, 0), (-1, -1), 0.35, LINE),
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


def section(title, *parts):
    return [para(title, "H2B"), *parts]


def source_page(keys):
    story = [PageBreak(), para("Selected Sources", "H2B")]
    if not keys:
        story.append(para("This internal brand guide is derived from the current Bengula Inc website, logo assets, resource-library styling, and stated brand positioning.", "BodyB"))
    for key in keys:
        label, url = SOURCES[key]
        story.append(para(f"<b>{label}</b><br/><font color='#4C1D95'>{url}</font>", "SmallB"))
    story.append(Spacer(1, 6))
    story.append(para("This document is general market education, not individualized financial, tax, legal, or investment advice. Readers should verify live rates, licensing status, legal documents, and suitability before acting.", "SmallB"))
    return story


def footer(canvas, doc):
    canvas.saveState()
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawString(doc.leftMargin, 9 * mm, "Bengula Inc Research Desk")
    canvas.drawRightString(A4[0] - doc.rightMargin, 9 * mm, f"Page {doc.page}")
    canvas.restoreState()


DOCS = [
    {
        "file": "annual_east_africa_fiscal_macro_trends_analysis_2026.pdf",
        "title": "East Africa Fiscal & Macro-Trends Analysis 2026",
        "subtitle": "A practical market brief for Kenyan business owners, treasury teams, and investors reading rate, fiscal, currency, and regional-growth signals.",
        "tag": "Market Analysis",
        "summary": "East Africa remains one of Africa's stronger growth regions, but the investable story in 2026 is selective: fiscal consolidation, debt-service pressure, food and fuel sensitivity, infrastructure spend, and local-rate transmission all matter more than a simple growth headline.",
        "sources": ["afdb2026", "worldBankKeu", "treasuryBps", "cbkWeekly"],
        "body": [
            *section(
                "Executive View",
                para("The 2026 opportunity is not just yield. It is the discipline to separate nominal return from real risk. Regional growth is still supported by infrastructure, services, trade corridors, agriculture recovery, tourism, and digital payments, while government balance sheets remain constrained by debt service, revenue collection, and imported inflation risk."),
                note("Desk stance: treat East Africa as a growth market with balance-sheet stress, not a stressed market with no growth. That distinction changes how you size duration, credit exposure, working-capital buffers, and equity risk."),
            ),
            *section(
                "Signals To Track In 2026",
                data_table(
                    ["Signal", "Why it matters", "Desk interpretation"],
                    [
                        ["East Africa growth", "AfDB expects East Africa to remain the continent's fastest-growing region in 2026, even as global shocks and import costs weigh on momentum.", "Growth supports private-sector opportunity, but cross-country dispersion remains high. Prefer cash-flow-backed sectors over macro beta."],
                        ["Kenya fiscal path", "The Budget Policy Statement frames the medium-term budget around fiscal consolidation, revenue reform, and expenditure discipline.", "Debt service crowds out room for stimulus. Businesses should stress-test tax, supplier, and public-sector receivable assumptions."],
                        ["Inflation mix", "Food, fuel, and exchange-rate pass-through remain the practical inflation channels for households and SMEs.", "Rates can ease only as far as inflation expectations and the shilling allow. Keep liquidity buffers."],
                        ["Domestic debt market", "CBK weekly data shows the domestic-debt stock and T-bill auctions remain central to government financing.", "High-quality fixed income remains relevant, but reinvestment and auction-pricing discipline matter."],
                        ["Private credit", "Bank liquidity and risk appetite determine how quickly lower policy rates translate into SME borrowing costs.", "Negotiate from cash-conversion evidence: receivables aging, stock turns, and proven repayment capacity."],
                    ],
                    [35 * mm, 70 * mm, 65 * mm],
                ),
            ),
            *section(
                "Allocation Implications",
                cards(
                    [
                        ("For Operators", "Protect working capital before expanding inventory. Price contracts with explicit fuel, FX, and tax-change triggers. Use bank facilities against verified purchase orders, invoices, and receivables rather than unsecured expansion narratives."),
                        ("For Investors", "Separate liquidity buckets: emergency cash, treasury income, medium-duration income, and growth risk. Check real yields after fees, withholding tax, and inflation rather than focusing on headline coupon."),
                    ]
                ),
            ),
            *section(
                "2026 Desk Framework",
                ordered(
                    [
                        "Start with cash-cycle reality: revenue timing, supplier terms, tax calendar, and debt maturities.",
                        "Map exposure to four shocks: fuel, FX, food inflation, and government-payment delay.",
                        "Match asset duration to known cash needs. Do not fund short liabilities with illiquid assets.",
                        "Benchmark any private opportunity against available risk-free and near-risk-free yields.",
                        "Document the decision in one page: thesis, evidence, downside case, exit, and review date.",
                    ]
                ),
                note("Red flag: a proposal that sells high returns but cannot explain licensing, cash custody, exit rights, tax treatment, or what happens under a 90-day liquidity squeeze should be treated as incomplete, regardless of sponsor reputation.", "risk"),
            ),
        ],
    },
    {
        "file": "due_diligence_framework_for_alternative_placements.pdf",
        "title": "Due Diligence Framework for Alternative Placements",
        "subtitle": "A field-ready checklist for private placements, land syndicates, SPVs, private credit, agribusiness pools, and other off-market opportunities.",
        "tag": "Due Diligence Guide",
        "summary": "Alternative placements can improve diversification, but the manager, documents, custody, valuation, and exit mechanics are often more important than the underlying asset.",
        "sources": ["ilpa", "cmaAif", "secRisk", "worldBankKeu"],
        "body": [
            *section(
                "Use This Before You Send Money",
                para("The purpose of diligence is not to prove that a deal is exciting. It is to prove that the deal survives boring questions: who owns the asset, who controls cash, who marks value, who can sell, who reports performance, and who is accountable if the plan fails."),
                note("Decision rule: no subscription, deposit, contribution, or capital call should move until the investor can independently verify registration or exemption basis, ownership documents, bank/custody flow, fees, related-party conflicts, and exit terms."),
            ),
            *section(
                "The Seven-Gate Review",
                data_table(
                    ["Gate", "Evidence to request", "Pass standard"],
                    [
                        ["Sponsor", "Profiles, track record, audited history, references, adverse media search, litigation search.", "The people asking for capital have a verifiable history and no unresolved integrity concern."],
                        ["Structure", "Term sheet, trust deed/SPV documents, shareholder agreement, offering memorandum, tax opinion.", "Rights, obligations, voting, transfer, and wind-up terms are written in enforceable documents."],
                        ["Asset", "Title, leases, invoices, purchase contracts, licenses, insurance, technical reports.", "Underlying asset exists, is legally controlled, and can produce the claimed cash flow."],
                        ["Cash control", "Bank account mandate, signatories, escrow/custody arrangement, payment waterfall.", "Investor funds cannot be casually redirected by the sponsor or a related party."],
                        ["Valuation", "Methodology, assumptions, comparable evidence, independent valuation where relevant.", "Value is supported by market or income evidence, not merely sponsor-stated."],
                        ["Liquidity", "Lock-up, redemption, transfer rights, secondary sale process, penalties, gates.", "Exit limits are explicit and suitable for the investor's time horizon."],
                        ["Reporting", "Frequency, content, audit rights, covenant package, breach remedies.", "Investors receive enough evidence to monitor performance and intervene early."],
                    ],
                    [30 * mm, 73 * mm, 67 * mm],
                ),
            ),
            *section(
                "Questions That Change The Conversation",
                bullets(
                    [
                        "Which regulated entity, advocate, trustee, or administrator is responsible for investor records?",
                        "What exact document proves the sponsor can sell, lease, pledge, farm, build on, or collect from the asset?",
                        "Where will investor cash sit before deployment, and who must approve movement out of that account?",
                        "Which fees are charged at entry, during management, on exit, and on performance?",
                        "What happens if the sponsor dies, loses key staff, is sued, or misses two reporting periods?",
                    ]
                ),
            ),
            *section(
                "Risk Scoring",
                data_table(
                    ["Score", "Meaning", "Action"],
                    [
                        ["1", "Institutional-grade evidence, clean structure, strong reporting, aligned incentives.", "Proceed to suitability and sizing review."],
                        ["2", "Mostly clear, with fixable document gaps or limited operating history.", "Proceed only after conditions are closed in writing."],
                        ["3", "Promising asset but weak controls, valuation uncertainty, or narrow exit path.", "Reduce size, require protections, or pause."],
                        ["4", "Material legal, custody, conflict, or reporting weakness.", "Do not fund until independently remediated."],
                        ["5", "Unverified ownership, pressure selling, guaranteed returns, or evasive sponsor.", "Reject and document why."],
                    ],
                    [18 * mm, 87 * mm, 65 * mm],
                ),
                note("Do not accept urgency as a substitute for diligence. Scarcity language, guaranteed returns, incomplete documents, or requests to pay into personal accounts are practical stop signs.", "risk"),
            ),
        ],
    },
    {
        "file": "emerging_agri_horticulture_cold_chain_logistics_report.pdf",
        "title": "Agri-Horticulture Cold-Chain Logistics Report",
        "subtitle": "A sector brief on Kenya's perishable-produce logistics opportunity, from farm-gate cooling to export reliability and financing readiness.",
        "tag": "Sector Report",
        "summary": "Cold-chain investment is moving from nice-to-have infrastructure to a competitiveness requirement. The investable edge is utilization, energy reliability, route density, quality assurance, and buyer-linked offtake.",
        "sources": ["energy4Impact", "investKenya", "knaFlowers", "worldBankKeu"],
        "body": [
            *section(
                "Sector Thesis",
                para("Kenya's horticulture, dairy, fish, and fresh-food systems lose value when cooling is too far from the farm, too expensive to run, or disconnected from buyers. The strongest projects in 2026 are modular, energy-aware, buyer-linked, and built around measurable utilization rather than cold-room capacity alone."),
                note("A cold room is not the business model. The business model is reliable throughput: producer aggregation, grading, temperature logs, route planning, buyer contracts, and payment discipline."),
            ),
            *section(
                "Market Drivers",
                data_table(
                    ["Driver", "Current signal", "Investment implication"],
                    [
                        ["Post-harvest loss", "Kenya-focused cold-chain programmes cite high fresh-produce losses where affordable cooling is unavailable close to production.", "Farm-gate and aggregation-point cooling can unlock value before produce reaches urban or export nodes."],
                        ["Export pressure", "Flower exporters are seeking new markets while facing freight cost and logistics disruption pressure.", "Exporters need quality assurance, temperature proof, and routing flexibility."],
                        ["Agro-processing policy", "Invest Kenya's 2026 sector pack positions agro-processing, fruit, vegetables, logistics, and value addition as investable themes.", "Cold chain should be packaged with processing, packaging, and market access."],
                        ["Energy transition", "Solar and hybrid systems reduce diesel exposure and improve uptime in rural nodes.", "Finance models must consider capex, maintenance, battery replacement, and utilization ramp-up."],
                        ["Data visibility", "Sensors and digital logs are becoming part of buyer assurance and insurance conversations.", "Temperature records can improve claims, pricing, and buyer confidence."],
                    ],
                    [38 * mm, 72 * mm, 60 * mm],
                ),
            ),
            *section(
                "Project Bankability Checklist",
                bullets(
                    [
                        "Anchor demand: signed buyer, exporter, processor, cooperative, or distributor commitments.",
                        "Utilization model: daily tonnage assumptions by crop, season, price, and route.",
                        "Energy plan: solar, grid, generator, battery, maintenance, and uptime responsibilities.",
                        "Quality system: grading, crates, pre-cooling standards, temperature logs, and rejection process.",
                        "Working capital: farmer payment timing, buyer payment timing, spoilage reserve, and insurance.",
                    ]
                ),
            ),
            *section(
                "Financing Structures",
                cards(
                    [
                        ("Asset Finance", "Suitable for solar refrigeration units, reefer trucks, crates, and monitoring hardware when utilization is predictable and collateral can be identified."),
                        ("Receivables Finance", "Useful where exporters, processors, or institutional buyers create verifiable invoices and repeat payment flows."),
                        ("Cooperative/SPV Pool", "Works when farmers or investors share infrastructure, but requires strong governance, transparent pricing, and independent accounts."),
                        ("Blended Capital", "Appropriate for rural nodes where grant, guarantee, or concessional funds can absorb early utilization risk."),
                    ]
                ),
            ),
            *section(
                "90-Day Pilot Plan",
                ordered(
                    [
                        "Select one crop corridor with recurring losses and a named buyer.",
                        "Measure baseline rejection, spoilage, price discounting, and transport delays for two harvest cycles.",
                        "Install or contract cooling capacity only after demand and operator accountability are clear.",
                        "Track temperature, volume, revenue, loss reduction, energy cost, and farmer payment timing weekly.",
                        "Convert pilot data into a lending memo: capex, utilization, margins, downside case, and expansion trigger.",
                    ]
                ),
                note("Red flag: capacity-first projects with no buyer contract, no utilization floor, weak maintenance plan, or unclear farmer-payment process are vulnerable even when the technology is good.", "risk"),
            ),
        ],
    },
    {
        "file": "bengula_inc_brand_style_guide.pdf",
        "title": "Bengula Inc Brand Style Guide",
        "subtitle": "A concise visual and verbal system for research PDFs, social posts, pitch decks, articles, proposals, and client-facing marketing material.",
        "tag": "Brand Guide",
        "summary": "The Bengula Inc brand should feel sharp, trustworthy, financially literate, and human: advisory enough for boardrooms, warm enough for entrepreneurs, and visually consistent across web, PDF, slide, and social formats.",
        "sources": [],
        "body": [
            *section(
                "Brand Position",
                para("Bengula Inc helps East African businesses grow by combining data-driven digital visibility with finance and banking advisory. The brand voice should make complex money, trade, and growth decisions feel understandable without making them feel simplistic."),
                data_table(
                    ["Element", "Guidance"],
                    [
                        ["Core promise", "Practical clarity for business growth, capital access, and investment decisions."],
                        ["Tone", "Clear, composed, precise, optimistic, and evidence-led."],
                        ["Avoid", "Guaranteed-return language, hype, excessive luxury cues, jargon without explanation, and overly casual finance claims."],
                        ["Signature line", "Adding meaning to life."],
                        ["Audience", "Kenyan and East African SMEs, professionals, investors, founders, cooperatives, and diaspora clients."],
                    ],
                    [42 * mm, 128 * mm],
                ),
            ),
            *section(
                "Visual Identity",
                data_table(
                    ["Token", "Use", "Value"],
                    [
                        ["Bengula Aubergine", "Primary headers, buttons, rules, PDF covers", "#4C1D95"],
                        ["Electric Violet", "Accent highlights, charts, active states", "#7C3AED"],
                        ["Market Teal", "Positive signals, operating notes, sector-growth accents", "#0F766E"],
                        ["Cyan Signal", "Data callouts and analytical accents", "#0E7490"],
                        ["Graphite Ink", "Main text and serious UI surfaces", "#171321"],
                        ["Warm Gold", "Cautions, opportunity markers, premium details", "#B7791F"],
                        ["Paper Wash", "Background tint for documents and cards", "#F7F4FB"],
                    ],
                    [44 * mm, 86 * mm, 40 * mm],
                ),
                note("Use violet as the authority color, teal/cyan as the data and growth colors, gold as a caution or premium accent, and graphite for trust. Keep backgrounds light for documents and reserve dark gradients for covers or hero moments."),
            ),
            *section(
                "Typography",
                data_table(
                    ["Role", "Recommended font", "Usage"],
                    [
                        ["Headlines", "Georgia or Charter", "Editorial, credible, advisory. Use for PDF covers, article titles, and major section headings."],
                        ["Body/UI", "Aptos, Segoe UI, or Inter", "Clean, highly readable, modern. Use for web, decks, tables, captions, and body copy."],
                        ["Numbers/data", "Aptos Mono or JetBrains Mono", "Use sparingly for rates, tickers, IDs, and compact dashboards."],
                        ["Fallback", "Arial", "Use where platform compatibility matters more than character."],
                    ],
                    [36 * mm, 50 * mm, 84 * mm],
                ),
                bullets(
                    [
                        "Do not use more than two font families in one asset unless data tables need a mono style.",
                        "Headlines should be confident and plain, not slogan-heavy.",
                        "Tables should use smaller type only when spacing remains comfortable.",
                    ]
                ),
            ),
            *section(
                "Layout And Voice Rules",
                bullets(
                    [
                        "Use generous white space and clean section hierarchy before adding decoration.",
                        "Use tables only for true comparisons, checklists, or data. Use prose for explanation.",
                        "Every marketing PDF should include a cover, executive summary, practical framework, source list, and compliance note.",
                        "Say: Target return depends on execution, liquidity, and documented risk controls.",
                        "Say: We help clients understand the evidence, risks, and next steps before capital moves.",
                    ]
                ),
            ),
        ],
    },
]


def build_doc(spec):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUT_DIR / spec["file"]
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
        CoverBlock(spec["title"], spec["subtitle"], spec["tag"], spec["summary"]),
        PageBreak(),
        *spec["body"],
        *source_page(spec["sources"]),
    ]
    doc.build(story, onFirstPage=footer, onLaterPages=footer)
    return path


if __name__ == "__main__":
    generated = [build_doc(spec) for spec in DOCS]
    for item in generated:
        print(item)
