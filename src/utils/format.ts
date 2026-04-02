/**
 * Formats a number as Indonesian Rupiah currency.
 * @param price The amount to format
 * @returns Formatted currency string (e.g., Rp15.000)
 */
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price);
};
