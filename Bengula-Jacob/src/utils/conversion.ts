export type ConversionAction =
  | 'whatsapp_click'
  | 'contact_email_prepare'
  | 'booking_email_prepare'
  | 'booking_page_open'
  | 'shop_add_to_cart'
  | 'shop_checkout_paystack'
  | 'shop_checkout_whatsapp';

export function trackConversion(action: ConversionAction, location: string) {
  if (typeof window === 'undefined') return;

  const event = {
    event: 'bengula_conversion',
    conversion_action: action,
    conversion_location: location,
  };

  const analyticsWindow = window as Window & {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  };

  analyticsWindow.dataLayer?.push(event);
  analyticsWindow.gtag?.('event', action, { conversion_location: location });
  window.dispatchEvent(new CustomEvent('bengula:conversion', { detail: event }));
}
