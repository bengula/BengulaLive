import React from 'react';
import Seo from '../seo';

export type LegalKind = 'disclaimer' | 'privacy' | 'terms';

interface LegalDoc {
  title: string;
  /** Date the content of this document was last revised. Update only when the text below changes. */
  lastUpdated: string;
  sections: [string, string][];
}

const documents: Record<LegalKind, LegalDoc> = {
  disclaimer: {
    title: 'Disclaimer',
    lastUpdated: '26 July 2026',
    sections: [
      ['Educational information only', 'Bengula Inc provides general financial literacy, business information, and educational tools. Nothing on this site is personalised investment, legal, tax, accounting, credit, or other regulated advice.'],
      ['Independent and personal capacity', 'Bengula Inc is an independent financial-education and advisory brand. Its founder is separately employed as a relationship manager at a licensed Kenyan bank, but everything published here is produced by Bengula Inc in a personal and independent capacity. No content on this site is issued by, endorsed by, or made on behalf of any employer, bank, or other third party, and no employer’s confidential or client information is used or reproduced.'],
      ['No public offer or guaranteed return', 'Any discussion of investments, private placements, research, or alternative assets is educational and does not constitute a public offer, solicitation, or guarantee of returns. Values can fall as well as rise and past performance does not predict future results.'],
      ['Licensed providers', 'Banking, investment, insurance, and other regulated products are issued, approved, and finalised only by the relevant licensed bank, provider, or professional. Bengula Inc does not accept client funds or finalise regulated products on their behalf.'],
      ['Rates and figures change', 'Interest rates, yields, fees, tax bands, statutory references, and worked examples are stated as at the date shown and change frequently. Information may be out of date by the time you read it. Always confirm current rates and rules with the Central Bank of Kenya, the Kenya Revenue Authority, or the relevant licensed provider before acting.'],
      ['External links', 'This site links to third-party websites for reference and further reading. We do not control those sites and are not responsible for their content, accuracy, availability, or privacy practices.'],
      ['Your decisions', 'You remain responsible for your decisions. Obtain independent professional advice and read the issuing provider’s documentation before acting. Calculator outputs are illustrative and depend on assumptions you select.'],
      ['Limitation of liability', 'To the fullest extent permitted by law, Bengula Inc accepts no liability for any loss or damage arising from reliance on any information, tool, or calculator output on this site. The site and its content are provided on an “as is” basis without warranties of any kind.'],
      ['Governing law', 'This site, its content, and these terms are governed by and construed in accordance with the laws of Kenya.'],
    ],
  },
  privacy: {
    title: 'Privacy',
    lastUpdated: '26 July 2026',
    sections: [
      ['Who is responsible', 'Bengula Inc (Kenya) is responsible for personal information collected through this website. For any privacy question or request, contact business@bengula.co.ke.'],
      ['What we collect', 'When you contact us or request a booking, you may choose to provide your name, email address, phone number, business details, and enquiry. Our website may also process basic technical information supplied by your browser, such as approximate device and page information.'],
      ['How we use it', 'We use enquiry and booking details to respond, arrange requested services, and maintain necessary business records. We do not sell personal information.'],
      ['Cookies, analytics, and local storage', 'This site stores small amounts of information on your own device, for example to remember which articles you have liked and your display preferences. We may also use privacy-respecting analytics to understand aggregate, non-identifying usage such as which pages are read and which links are followed. We do not use this to build advertising profiles about you. You can clear stored data at any time through your browser settings.'],
      ['Where it goes', 'This site uses email and WhatsApp links for enquiries. When you use them, your message is handled by your selected email or messaging provider as well as by Bengula Inc, and analytics or hosting providers may process limited technical data. Some of these providers operate outside Kenya and handle data under their own terms. Please do not send sensitive financial credentials or account details by email or WhatsApp.'],
      ['How we protect it', 'We take reasonable measures to protect the information you send us. However, no email or internet transmission is ever completely secure, which is exactly why we ask you not to send financial credentials, passwords, or account numbers through this site, by email, or by WhatsApp.'],
      ['Retention and choices', 'We retain information only as long as reasonably needed for the enquiry, service, record-keeping, or legal purpose involved. You may ask us to access, correct, or delete personal information by emailing business@bengula.co.ke, subject to applicable legal requirements.'],
      ['Your rights under Kenyan law', 'Under the Data Protection Act, 2019, you have rights to access your personal data, to have it corrected or deleted, and to object to certain processing. If you believe your personal data has been mishandled, you may lodge a complaint with the Office of the Data Protection Commissioner (ODPC) in Kenya.'],
      ['Changes to this notice', 'We may update this notice from time to time to reflect changes in our practices or the law. The “last updated” date below shows when it was last revised.'],
    ],
  },
  terms: {
    title: 'Terms of Use',
    lastUpdated: '26 July 2026',
    sections: [
      ['Acceptance of these terms', 'By accessing or using this website, you agree to these Terms of Use. If you do not agree, please do not use the site. These terms should be read together with our Disclaimer and Privacy notice.'],
      ['What this site is', 'This site is published by Bengula Inc (Kenya) for general financial education, business information, and educational tools. It is not a bank, a licensed financial adviser, or a broker, and it does not accept client funds or finalise regulated products.'],
      ['Not advice, and not an offer', 'Content, calculators, and research on this site are general and educational. They are not personalised investment, legal, tax, or credit advice, and nothing here is a public offer, solicitation, or guarantee of returns. You are responsible for your own decisions and should take independent professional advice before acting.'],
      ['Permitted use', 'You may read, share, and reference this content for personal, non-commercial purposes with attribution. You may not republish, resell, scrape, or reproduce substantial parts of the site, or present its content as your own, without our written permission.'],
      ['Intellectual property', 'Unless stated otherwise, the text, design, tools, and branding on this site belong to Bengula Inc or are used with permission. Third-party names, marks, images, and data referenced on the site remain the property of their respective owners.'],
      ['Tools and calculators', 'Calculators and projections are illustrative and depend on the assumptions you enter. Outputs are estimates for education only and are not quotes, offers, or promises of any rate, price, or return.'],
      ['Enquiries and bookings', 'Contacting us or requesting a booking starts a conversation, not a binding contract for any regulated product. Any regulated banking, investment, or insurance product is arranged and finalised separately, directly with the relevant licensed provider.'],
      ['Third-party links', 'This site links to third-party websites for convenience and reference. We do not control them and are not responsible for their content, accuracy, availability, or practices. Following an external link is at your own risk.'],
      ['Availability and changes', 'We may change, suspend, or remove parts of the site, and update these terms, at any time. Continued use of the site after a change means you accept the updated terms.'],
      ['Liability and governing law', 'To the fullest extent permitted by law, Bengula Inc accepts no liability for loss arising from use of, or reliance on, this site, which is provided on an “as is” basis. These terms are governed by the laws of Kenya, and the Kenyan courts have jurisdiction over any dispute.'],
      ['Contact', 'Questions about these terms can be sent to business@bengula.co.ke.'],
    ],
  },
};

export default function LegalPage({ kind }: { kind: LegalKind }) {
  const doc = documents[kind];
  return <article className="max-w-3xl mx-auto space-y-8 animate-fadeIn"><Seo title={`${doc.title} | Bengula Inc`} description={`${doc.title} information for Bengula Inc website visitors and enquiries.`} path={`/${kind}`} /><header className="space-y-3"><span className="text-xs font-semibold text-violet-700 uppercase tracking-widest">Bengula Inc</span><h1 className="text-3xl font-bold text-slate-900">{doc.title}</h1><p className="text-sm text-slate-600">Last updated: {doc.lastUpdated}</p></header><div className="space-y-6">{doc.sections.map(([heading, body]) => <section key={heading} className="glass-card rounded-xl p-6 space-y-2"><h2 className="text-lg font-bold text-slate-900">{heading}</h2><p className="text-sm leading-relaxed text-slate-600">{body}</p></section>)}</div></article>;
}
