/**
 * VISANAM-FORMS-CONFIG
 *
 * One place for the form settings used by the waitlist, the school enquiry and
 * the bespoke-comic enquiry.
 *
 * We post to Web3Forms rather than to our own server. Two reasons:
 *
 *  1. Our API is currently returning an error on every request, so anything
 *     posted to it is lost.
 *  2. Web3Forms uses a public "access key" instead of an email address, so our
 *     inbox address never appears in the website's source code where spam
 *     robots can harvest it.
 *
 * TO MAKE THE FORMS WORK: go to https://web3forms.com, enter the address that
 * should receive enquiries, and paste the key it emails you on the line below.
 * That is the only line in the whole website you need to change.
 */

export const WEB3FORMS_ACCESS_KEY = "PASTE-YOUR-WEB3FORMS-ACCESS-KEY-HERE";

/** Web3Forms' documented submission endpoint. Do not change. */
export const FORM_ENDPOINT = "https://api.web3forms.com/submit";

/** True once a real key has been pasted in above. */
export const formsAreConfigured =
  WEB3FORMS_ACCESS_KEY.length > 20 && !WEB3FORMS_ACCESS_KEY.startsWith("PASTE");
