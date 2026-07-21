---
id: AI-detectors
title: "Stop Wasting Money on AI Detectors: Why Statistical Guesswork Cannot Solve the AI Problem"
metaTitle: "Why AI Detectors Fail: Guesswork, Not Proof | Bengula Inc"
metaDescription: "AI detectors give probabilities, not proof. OpenAI retired its own classifier and universities are dropping the tools. Here is why detection is unreliable."
summary: "AI detectors promise certainty and deliver probability. OpenAI retired its own classifier at 26% accuracy, Stanford found the tools biased against non-native English writers, and universities are quietly dropping them. This is why detection cannot settle a question of authorship, what the false-positive problem does to real people, and why provenance beats guesswork."
category: Digital Strategy
author:
  name: Bengula Jacob
  role: Founder, Bengula Inc.
  avatar: /images/jacob.jpg
date: June 6, 2026
readTime: 11 min read
coverImage: https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1600
---

_This article was first written in 2024 on [LinkedIn](https://www.linkedin.com/pulse/stop-wasting-money-ai-detectors-random-guesses-bengula-inc-5mwef/). This version has been expanded with additional research and updated examples._

![A robotic hand reaching toward a human hand](https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg?auto=compress&cs=tinysrgb&w=1200 "AI detectors promise a certainty they cannot deliver. Photo: Pexels")

Artificial intelligence is now woven into ordinary writing, research, coding, teaching, marketing, and office work. Students brainstorm assignments with it. Researchers use it to organise literature and draft sections. Businesses generate product descriptions, emails, reports, and support content with it. The worry about undisclosed AI use is legitimate.

The trouble is the shortcut many institutions reach for in response: **use AI to catch AI.**

AI detectors are marketed as though they can determine whether a document was written by a person or produced by a machine. They cannot do that with certainty. What they produce is a statistical estimate, based on patterns like predictability, phrasing, sentence structure, and resemblance to text seen during training. That is a fundamentally weaker claim than it sounds, and building consequences on top of it, a failed grade, a lost client, a damaged reputation, is where the real harm begins.

> **Key Insight:** A plagiarism checker can point to a matching source; that is verifiable evidence. An AI detector can only say a piece of text *resembles* patterns it associates with machine writing. It answers "does this look like AI?" and dresses the answer up as a percentage. Precision is not proof, and a confident number is not evidence. In most settings where it matters, the score is not reliable enough to justify a consequence.

```cards
- icon: Percent
  title: Probability, not proof
  desc: Detectors estimate resemblance to AI patterns. They cannot point to an act of authorship the way a plagiarism checker points to a source.
- icon: TriangleAlert
  title: The false positive is the real harm
  desc: Flagging human work as AI ends careers and academic records. A few word swaps can flip a score from 97% AI to 100% human.
  type: amber
- icon: BadgeCheck
  title: Verify, do not detect
  desc: Provenance systems record how content was made. Asking a creator to show their process beats guessing at their style.
  linkText: How we judge content
  linkUrl: /blog/sme-seo-inbound-lead-engine
  type: emerald
```

---

## Probability, Not Proof

Most detectors analyse a handful of surface characteristics: sentence predictability, writing consistency, vocabulary patterns, structural repetition, and statistical similarity to known AI text. None of that detects authorship. It estimates probability.

The distinction is the whole argument, so it is worth being precise about. A plagiarism checker compares your text against a corpus of known sources and, when it finds a match, can show you the source. That is falsifiable evidence. An AI detector cannot compare your document against every sentence ChatGPT, Gemini, Claude, or any other model has ever generated, because that set is effectively infinite and unrecorded. So it does something else entirely: it asks whether your text *resembles* the kind of thing AI systems tend to produce.

The honest answer to that question is never certainty. It is only ever a likelihood, and a shaky one, because the features that supposedly mark "AI writing", clean structure, even tone, careful phrasing, are also the features of good human writing. Many of the vendors hide the method behind the phrase "proprietary technology" and decline to explain how a verdict was reached. A score you cannot interrogate is not a finding; it is an assertion.

---

## The False Positive Is the Dangerous Error

Detectors make two kinds of mistake, and they are not equally costly.

A **false negative** lets AI-generated text pass as human. Someone slips past a policy. That is a problem, but a bounded one.

A **false positive** flags genuine human work as machine-made. That can sink a student's record, cost a writer a client, or brand an honest person a cheat. When the tool is wrong in this direction, the damage lands on someone who did nothing wrong, and they are put in the near-impossible position of proving a negative.

The examples are not edge cases:

- **The Bible.** Multiple detectors have flagged passages of scripture as AI-generated. Text written centuries before any language model, scored as machine output.
- **A 2016 CNN article.** I ran a pre-AI news article, a piece by CNN's Greg Krieg published years before ChatGPT existed, through ZeroGPT, one of the most popular detectors. It came back **100% AI-generated**. The date alone makes that impossible, yet the tool reported it with total confidence.
- **Non-native English writers.** Stanford researchers found detectors were systematically biased against people writing in English as a second language, flagging large numbers of genuine human essays as AI. A tool that penalises you for not writing like a native speaker is not measuring authorship; it is measuring fluency, and discriminating on it.
- **The word swap.** A document that scored 97% AI became 100% human after changing just six words. Nothing meaningful about the authorship changed. The number moved anyway.

![ZeroGPT scoring a 2016 CNN article as 100% AI-generated](/images/zerogpt-cnn-2016-false-positive.png "ZeroGPT rates a CNN article published in 2016, years before ChatGPT, as 100% AI GPT. A confident score, and a demonstrably impossible one.")

The lesson from all four is the same: **confidence is not evidence.** A detector can hand you a precise-looking percentage, and precision is exactly what makes people mistake it for proof. The screenshot above is the point in one image: a real percentage, rendered with total assurance, about a document no AI could have written.

---

## Even the Detector Companies Admit It

The vendors know. Originality.ai's founder, Jon Gillham, states plainly that "AI content detection is not perfect, and it does produce false positives." The company lists factors that can skew its results, including [Grammarly](https://www.grammarly.com/) corrections, academic formatting, statistical data, quotations, public-domain content, and short documents.

Gillham has also been candid about what the number actually means, and it is not what most people assume. The percentage reflects the detector's **confidence that a text is AI-generated, not the share of the work that was AI-written.** A "97% AI" verdict does not mean 97% of the piece came from a machine; it means the tool is 97% sure, on criteria it will not disclose, that some of it did. Readers, and unfortunately many of the professors acting on the scores, routinely mistake the first meaning for the second, and treat a confidence estimate as a measured quantity of guilt.

Read the false-positive list again, because it is self-defeating. Statistics belong in research papers. Quotations belong in journalism. Citations and formal structure belong in academic work. Grammar tools are used by careful writers everywhere. The very features that mark competent, well-edited writing are the ones that raise the false-positive risk. If doing the job well makes you more likely to be flagged, the writer has no reliable way to know whether a verdict against them can be trusted, and neither does the person judging them.

---

## OpenAI Tried, and Gave Up

If anyone could build a working detector, it should be the company behind ChatGPT. OpenAI launched an AI classifier in January 2023 and quietly retired it months later.

Its own reported numbers explain why: the tool correctly identified AI-written text only **26% of the time**, while flagging human writing as AI roughly **9% of the time**. A detector that misses three-quarters of its targets and still manages to falsely accuse nearly one in ten innocent documents is not a safeguard.

OpenAI now says so directly. Its current guidance acknowledges that AI detectors are unreliable, that ChatGPT itself cannot tell whether text was AI-generated, that detection systems are error-prone, and that small edits can swing the result. Instead of scores, OpenAI recommends looking at drafts, revision history, prompts, and evidence of the author's actual working process. That is a more honest and far more useful standard.

---

## The Evidence in One Table

| Test | What happened | Source |
|---|---|---|
| OpenAI's own classifier (2023) | Caught only 26% of AI text, flagged 9% of human text, retired within months | OpenAI |
| Stanford study | Essays by non-native English writers widely misflagged as AI | Stanford HAI |
| The Bible test | Multiple detectors labelled Biblical passages AI-generated | Documented cases |
| ZeroGPT on a 2016 CNN article | Scored 100% AI-generated, years before ChatGPT existed | Author's test |
| The word-swap experiment | A 97% AI score became 100% human after changing just six words | Author's client |

---

## Can Humans Detect AI Writing?

Rejecting detectors does not mean AI writing is undetectable. The reality is more nuanced. Experienced teachers, editors, and researchers can sometimes spot signs that content was heavily AI-assisted. Commonly cited indicators include repetitive sentence structures, uniform tone, generic or superficial explanations, hallucinated facts and citations, arguments so balanced they take no position, unwarranted confidence in wrong information, and an absence of personal insight.

But these are clues, not proof, and they cut both ways. Human writers produce every one of these traits on an off day, and capable AI users routinely avoid them. A skilled writer using AI responsibly can produce work showing none of the tells, while a nervous student writing entirely alone can produce work full of them. That is why serious reviewers never rest on a single signal. They weigh context, drafts, revision history, subject knowledge, and whether the author can explain their own reasoning.

The problem gets harder still with partial assistance, which is now the norm rather than the exception. A student brainstorms with AI and writes the paper themselves. A journalist summarises research with AI and writes the analysis independently. A researcher organises literature with AI and owns the conclusions. In every case the binary question, "was AI used," is the wrong one. The question that matters is **how** it was used, and whether the person stands behind the result.

---

## The Academic World Has Moved On

When this article was first written, universities were piling into detection software hoping it would reliably catch AI work. The evidence since has run the other way.

Institutions increasingly accept that detectors produce false positives, struggle with reliability, and should never be the sole basis for a disciplinary decision. In 2025 the University of Cape Town announced it would **discontinue AI detectors** over exactly these concerns: unreliability and the risk of falsely accusing students. Admissions and education bodies are shifting focus too. UCAS, which runs UK university admissions, now publishes guidance on using AI tools responsibly rather than pretending they can be banned.

The conversation is moving from "how do we catch AI?" to "how do we assess understanding in a world where AI exists?" The second question is harder and far more productive.

---

## AI Is This Generation's Calculator

Critics of detectors are sometimes accused of defending cheating. That misreads both the purpose of the tools and the history of every tool before them.

Humanity advances by building instruments that extend what we can do. We invented writing so we would not have to memorise everything, books to carry knowledge across generations, and calculators so engineers and scientists could spend their effort on problems rather than arithmetic. Few would now argue that bridges should be designed with pencil and paper, or that statistical analysis should be done by hand. We accepted these tools because they raised productivity, cut errors, and freed human attention for work that mattered.

We have already lived a mild version of this with writing itself. Spell-checkers gave way to grammar-checkers, which gave way to Grammarly, all of them machine assistance on human writing, and almost nobody called it cheating. Large language models are the same lineage one step further on. The line between "acceptable help" and "cheating" was never really about whether a machine was involved; it was about whether the person understood and owned the result.

AI is the next step in that line. As knowledge expands, the problems worth solving, in medicine, engineering, climate, economics, genetics, software, get too large for any individual to hold unaided. AI already helps discover materials, accelerate research, analyse vast datasets, and write software. The meaningful question was never whether AI is being used; it already is. The question is whether the person using it understands the work, can verify the output, and remains accountable for it.

A student brainstorming with AI is not categorically different from a student using a calculator. The danger is not the tool; it is using the tool without grasping the underlying concept. Banning AI to stop cheating would be like banning calculators because someone once cheated on a maths exam. It would not stop misuse. It would only slow everyone else down.

---

## The Real Fix Is Verification, Not Detection

The more serious response to the problem is already taking shape, and it points away from guessing entirely. Rather than asking whether content *looks* AI-generated, provenance systems record how content was actually made.

Initiatives like the **Content Authenticity Initiative (CAI)** and the **Coalition for Content Provenance and Authenticity (C2PA)** attach metadata and cryptographic signatures to images, video, audio, and documents, creating a verifiable record of origin and editing history. The question changes from the unanswerable "does this look like AI?" to the answerable "can the creator show how this was produced?" No system is perfect, but a signed record of process is a far sturdier foundation than a statistical guess about writing style.

---

## The Human Cost of False Accusations

The road to this mess was paved with good intentions. Detectors were sold as a defence against cheating, and their misuse created a different harm.

Freelance writers have lost clients over a suspicious score on honest work, ending long professional relationships on the strength of a number. I saw this directly when a client told me she had fired another writer after a detector flagged their work, then, in the same conversation, demonstrated how easily those scores move: a document scoring 97% AI became 100% human after changing just six words. Nothing real had changed.

Students carry the same risk, and one case shows how far it can go. Marley Stevens, a University of North Georgia student, used [Grammarly](https://www.grammarly.com/) to check the grammar on a criminal-justice paper in 2023, as she always had. Turnitin's AI detector flagged the work, and she was given a zero, lost a scholarship, was placed on academic probation, and was required to pay to attend a seminar on cheating. The irony is exact: Grammarly's grammar suggestions are not generative AI at all, yet using an ordinary writing-improvement tool was enough to trigger both the accusation and the punishment.

Cases like hers force honest people to prove a negative, defending themselves against an algorithmic suspicion they cannot inspect. That is a dangerous precedent to normalise. Integrity should be protected with evidence, not probabilities, and the burden of proof should not fall on the accused because a tool that admits it is often wrong said so.

---

## Bengula View

Three points from the desk, because this is not only an academic question; it is a business one.

First, **do not buy certainty that does not exist.** Paying for a detector to police your content or your team's is paying for a confident number with a documented error rate, and then being tempted to act on it. The money and the authority are both misplaced.

Second, **judge content by the standard that actually matters.** In client work we assess writing on whether it is accurate, specific, and useful to the buyer, never on how it was drafted. That standard is what builds search visibility and trust, and it is the one we argue for in [the SME SEO and inbound lead engine](/blog/sme-seo-inbound-lead-engine). A detector score tells you nothing about whether a page answers a customer's question.

Third, **shift the effort from catching to verifying.** For a business, that means keeping drafts and briefs, being able to explain how a piece was made, and treating accountability for the output as the real deliverable. The responsible-use version of this argument for finance sits in [the role of AI in fintech](/blog/role-of-ai-in-fintech-kenya).

---

## Conclusion

AI is not going away. It is already part of research, software, education, science, medicine, journalism, and creative work, and future readers will likely regard it the way we regard calculators, spreadsheets, and search engines: ordinary tools for hard problems. The challenge is not eliminating AI. It is using it responsibly and staying accountable for the result.

Detectors try to shortcut that challenge with statistical guesswork. The weight of evidence, from researchers, from universities, from the detector companies themselves, and from OpenAI, is that the tools are far less reliable than their marketing implies. A detector may give you a clue. It does not give you proof.

As AI settles deeper into everyday work, trust will rest less on detection and more on transparency, accountability, and verification. The advantage will not go to those who avoid AI, or to those who buy a tool that claims to police it, but to those who learn to use it well and answer for what they produce.

_Research and editorial assistance for this article was provided using an AI assistant, which is rather the point._

## References

**Research and background**

- [Wikipedia: Artificial Intelligence Content Detection](https://en.wikipedia.org/wiki/Artificial_intelligence_content_detection)
- [Stanford HAI: AI Detectors Biased Against Non-Native English Writers](https://hai.stanford.edu/news/ai-detectors-biased-against-non-native-english-writers)
- [Stanford SCALE: GPT Detectors Are Biased Against Non-Native English Writers](https://scale.stanford.edu/publications/gpt-detectors-are-biased-against-non-native-english-writers)

**AI detector failures**

- [Atheer Mahir: How AI Detectors Mistakenly Identified the Bible as AI-Generated](https://www.linkedin.com/pulse/how-ai-detectors-mistakenly-identify-author-bible-atheer-mahir/)
- [The CNN article used in the ZeroGPT experiment](https://www.cnn.com/2016/12/21/politics/donald-trump-hillary-clinton-popular-vote-final-count/index.html)
- [Bilal Mushtaq: examples of AI flags in academic publishing](https://twitter.com/MushtaqBilalPhD/status/1769740682632020103)

**Detector company statements**

- [Originality.ai: most common reasons for false positives](https://help.originality.ai/en/article/most-common-reasons-for-false-positives-with-originality-1sf6ykc/)

**OpenAI and detection**

- [OpenAI: New AI Classifier for Indicating AI-Written Text](https://openai.com/index/new-ai-classifier-for-indicating-ai-written-text/)
- [PCMag: OpenAI Quietly Shuts Down AI Text Detection Tool Over Inaccuracies](https://www.pcmag.com/news/openai-quietly-shuts-down-ai-text-detection-tool-over-inaccuracies)
- [OpenAI: How Educators Can Respond to AI-Generated Content](https://help.openai.com/en/articles/8313351-how-can-educators-respond-to-students-presenting-ai-generated-content-as-their-own)

**Higher education and real-world cases**

- [UCAS: AI Tools Guide](https://www.ucas.com/ai-tools-guide)
- [University of Cape Town: UCT Scraps Flawed AI Detectors](https://www.news.uct.ac.za/article/-2025-07-24-uct-scraps-flawed-ai-detectors)
- [EdSurge: Can Using a Grammar Checker Set Off AI-Detection Software?](https://www.edsurge.com/news/2024-04-04-can-using-a-grammar-checker-set-off-ai-detection-software) (the Marley Stevens case)
- [Fox 5 Atlanta: Georgia college student used Grammarly, now she is on academic probation](https://www.fox5atlanta.com/news/grammarly-georgia-college-student-academic-probation-plagiarism-allegations)

**Content provenance**

- [Content Authenticity Initiative](https://contentauthenticity.org/)
- [Coalition for Content Provenance and Authenticity (C2PA)](https://c2pa.org/)

---

*General education on content and technology, not legal or academic-policy advice. Tool accuracy figures are as reported by the sources cited and change over time; verify current details before relying on them.*
