import { ArrowLeft, Check, LoaderCircle, LockKeyhole, Sparkles } from "lucide-react";
import { FormEvent, useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";
import { Seo } from "@/components/Seo";
import { getPricingForTimezone, valueOptions } from "@/lib/visanam";
import { trpc } from "@/lib/trpc";

export default function Checkout() {
  const tier = useMemo(() => getPricingForTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone), []);
  const suggestedValue = new URLSearchParams(window.location.search).get("value");
  const [parentName, setParentName] = useState(() => sessionStorage.getItem("visanam-checkout-parent") || "");
  const [childNameAge, setChildNameAge] = useState(() => sessionStorage.getItem("visanam-checkout-child") || "");
  const [valueFocus, setValueFocus] = useState(() => valueOptions.some((option) => option.value === suggestedValue) ? suggestedValue! : sessionStorage.getItem("visanam-journey-value") || "Courage");
  const checkout = trpc.checkout.createSession.useMutation({ onSuccess: ({ url }) => { toast.success("Your secure checkout is opening in a new tab."); window.open(url, "_blank", "noopener,noreferrer"); }, onError: (error) => toast.error(error.message || "We could not start checkout. Please try again.") });
  useEffect(() => { sessionStorage.setItem("visanam-checkout-parent", parentName); sessionStorage.setItem("visanam-checkout-child", childNameAge); }, [parentName, childNameAge]);
  const submit = (event: FormEvent) => { event.preventDefault(); checkout.mutate({ parentName, childNameAge, valueFocus, country: tier.country }); };
  return <><Seo title="Complete your Season 1 order" description="Securely complete your Visanam Season 1 purchase and begin a values-led comic experience with your child." />
    <section className="checkout-shell"><div className="checkout-wrap"><Link href="/pricing" className="small-back"><ArrowLeft size={15}/> Back to pricing</Link><div className="checkout-grid"><section><p className="section-kicker"><Sparkles size={14}/> Season 1 begins here</p><h1>Bring the story<br /><em>home.</em></h1><p className="checkout-lede">Tell us just enough to shape your parent wraparound. Your payment takes place on Stripe’s secure checkout page.</p><div className="checkout-includes"><p>YOUR SEASON INCLUDES</p>{["Six illustrated digital episodes", "Values-led Parent Insight Plan", "Conversation cards and episode recaps"].map((item) => <span key={item}><Check size={16}/>{item}</span>)}</div></section><section className="checkout-card"><div className="checkout-price"><div><span>VISANAM SEASON 1</span><p>Based on your {tier.country} region</p></div><strong>{tier.display}</strong></div><form onSubmit={submit}><label>Parent name<input value={parentName} onChange={(event) => setParentName(event.target.value)} placeholder="Your first and last name" required /></label><label>Child name plus age<input value={childNameAge} onChange={(event) => setChildNameAge(event.target.value)} placeholder="For example: Aanya, 7" required /></label><label>Selected values focus<select value={valueFocus} onChange={(event) => setValueFocus(event.target.value)}>{valueOptions.map((option) => <option key={option.value} value={option.value}>{option.value}</option>)}</select></label><button className="button button-dark checkout-submit" disabled={checkout.isPending}>{checkout.isPending ? <><LoaderCircle className="spin" size={16}/> Opening secure checkout…</> : <>Continue to secure checkout <LockKeyhole size={16}/></>}</button><p className="checkout-secure"><LockKeyhole size={13}/> Payments are securely processed by Stripe. We never see your card details.</p></form></section></div></div></section>
  </>;
}
