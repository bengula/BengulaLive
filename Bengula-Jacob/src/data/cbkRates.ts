/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * Market rates, parsed at BUILD TIME from CSVs committed in /data:
 *   • data/forex.csv      — CBK "Trade Weighted Average Indicative Rates"
 *                           (download from https://www.centralbank.go.ke/forex/)
 *   • data/key-rates.csv  — CBK Key Rates (Central Bank Rate, T-Bill, etc.)
 *
 * To update rates, edit those CSVs (locally OR directly on GitHub) and push —
 * Cloudflare rebuilds and the new numbers go live. No code change needed.
 */

import forexCsv from '../../data/forex.csv?raw';
import keyRatesCsv from '../../data/key-rates.csv?raw';

export interface FxRate {
  label: string;
  value: string;
}

export interface KeyRate {
  name: string;
  value: string;
  date: string;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// Map CBK label to display symbol pair
const FX_MAP: Record<string, string> = {
  'US DOLLAR': 'USD/KES',
  'SW KRONER': 'SEK/KES',
  'NOR KRONER': 'NOK/KES',
  'DAN KRONER': 'DKK/KES',
  'IND RUPEE': 'INR/KES',
  'HONGKONG DOLLAR': 'HKD/KES',
  'SINGAPORE DOLLAR': 'SGD/KES',
  'SAUDI RIYAL': 'SAR/KES',
  'CHINESE YUAN': 'CNY/KES',
  'JPY (100)': '100JPY/KES',
  'S FRANC': 'CHF/KES',
  'CAN $': 'CAD/KES',
  'STG POUND': 'GBP/KES',
  'EURO': 'EUR/KES',
  'SA RAND': 'ZAR/KES',
  'KES / USHS': 'KES/UGX',
  'KES / TSHS': 'KES/TZS',
  'KES / RWF': 'KES/RWF',
  'KES / BIF': 'KES/BIF',
  'AE DIRHAM': 'AED/KES',
  'AUSTRALIAN $': 'AUD/KES',
};

const stripBom = (s: string) => s.replace(/^﻿/, '');

function parseForex(csv: string): { asOf: string; rates: FxRate[] } {
  const rows = stripBom(csv)
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => line.replace(/^"|"$/g, '').split('","'))
    .filter((cols) => cols.length === 3);

  const toDate = (d: string) => {
    const [dd, mm, yyyy] = d.split('/').map(Number);
    return new Date(yyyy, mm - 1, dd);
  };

  let latest = new Date(0);
  let latestKey = '';
  for (const [d] of rows) {
    const dt = toDate(d);
    if (dt > latest) {
      latest = dt;
      latestKey = d;
    }
  }

  const rates: FxRate[] = [];
  for (const [, c, r] of rows.filter(([d]) => d === latestKey)) {
    const cbkName = c.trim();
    const label = FX_MAP[cbkName] || `${cbkName}/KES`;
    const value = isNaN(Number(r)) ? r : Number(r).toFixed(2);
    rates.push({ label, value });
  }

  const asOf = latestKey ? `${latest.getDate()} ${MONTHS[latest.getMonth()]} ${latest.getFullYear()}` : '';
  return { asOf, rates };
}

function parseKeyRates(csv: string): KeyRate[] {
  return stripBom(csv)
    .trim()
    .split(/\r?\n/)
    .slice(1)
    .map((line) => {
      const parts = line.split(',');
      // Date is everything after the name + value (tolerates "May,2026").
      return {
        name: (parts[0] ?? '').trim(),
        value: (parts[1] ?? '').trim(),
        date: parts.slice(2).join(',').replace(/,/g, ' ').trim(),
      };
    })
    .filter((r) => r.name && r.value);
}

const forex = parseForex(forexCsv);

export const exchangeRates = {
  asOf: forex.asOf,
  source: 'Central Bank of Kenya (indicative)',
  rates: forex.rates,
};

export const keyRates: KeyRate[] = parseKeyRates(keyRatesCsv);

