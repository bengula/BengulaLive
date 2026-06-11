/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Shared number/currency formatting helpers.
 */

/** Format a number as Kenyan Shillings, e.g. 1500000 → "KSh 1,500,000". */
export const formatKSh = (val: number): string =>
  new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(val)
    .replace('KES', 'KSh');
