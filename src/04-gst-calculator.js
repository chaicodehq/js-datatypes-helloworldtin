/**
 * 🧾 GST Calculator - Tax Lagao Bhai!
 *
 * Bunty apni dukaan ke liye GST calculator bana raha hai. Customer ko bill
 * dena hai jisme base price, GST amount, aur total clearly dikhna chahiye.
 * GST rate category ke hisaab se change hota hai.
 *
 * GST Rates (by category string, case-insensitive):
 *   - "essential"   => 0% GST  (dal, chawal, atta, etc.)
 *   - "food"        => 5% GST  (packaged food, restaurant below Rs 7500)
 *   - "standard"    => 12% GST (processed food, business class tickets)
 *   - "electronics" => 18% GST (phones, laptops, etc.)
 *   - "luxury"      => 28% GST (cars, aerated drinks, tobacco)
 *   - Any other category => return null
 *
 * Rules:
 *   - Calculate: gstAmount = amount * rate / 100
 *   - Calculate: totalAmount = amount + gstAmount
 *   - Round gstAmount aur totalAmount to 2 decimal places using
 *     parseFloat(value.toFixed(2))
 *   - Return object: { baseAmount, gstRate, gstAmount, totalAmount }
 *   - category ko lowercase mein compare karo (case-insensitive)
 *   - Hint: Use toFixed(), parseFloat(), Number.isFinite(), toLowerCase()
 *
 * Validation:
 *   - Agar amount positive finite number nahi hai, return null
 *   - Agar category string nahi hai, return null
 *   - Agar category unknown hai, return null
 *
 * @param {number} amount - Base amount before tax
 * @param {string} category - Product category
 * @returns {{ baseAmount: number, gstRate: number, gstAmount: number, totalAmount: number } | null}
 *
 * @example
 *   calculateGST(1000, "electronics")
 *   // => { baseAmount: 1000, gstRate: 18, gstAmount: 180, totalAmount: 1180 }
 *
 *   calculateGST(500, "essential")
 *   // => { baseAmount: 500, gstRate: 0, gstAmount: 0, totalAmount: 500 }
 */
export function calculateGST(amount, category) {
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount < 1)
    return null;

  if (typeof category !== "string") return null;

  let GST_amount = 0;
  let rate = 0;

  switch (category.toLowerCase()) {
    case "essential":
      GST_amount = 0;
      break;
    case "food":
      GST_amount = amount * (5 / 100);
      rate = 5;
      break;
    case "standard":
      rate = 12;
      GST_amount = amount * (12 / 100);
      break;
    case "electronics":
      rate = 18;
      GST_amount = amount * (18 / 100);
      break;
    case "luxury":
      rate = 28;
      GST_amount = amount * (28 / 100);
      break;
    default:
      return null;
  }
  const totalNumber = Number((amount + GST_amount).toFixed(2));
  return {
    baseAmount: amount,
    gstRate: rate,
    gstAmount: Number(GST_amount.toFixed(2)),
    totalAmount: totalNumber,
  };
}
