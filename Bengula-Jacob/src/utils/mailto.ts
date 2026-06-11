/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Static-host friendly form submission: every form on the site "submits" by
 * opening the visitor's email client pre-filled, instead of POSTing to a
 * server. All forms share this helper so the behaviour stays consistent.
 */

/** Build a mailto: URL with an encoded subject and body. */
export const buildMailto = (to: string, subject: string, bodyLines: string[]): string =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyLines.join('\n'))}`;

/** Open the visitor's email client with a pre-filled message. */
export const openMailto = (to: string, subject: string, bodyLines: string[]): void => {
  window.location.href = buildMailto(to, subject, bodyLines);
};
