<!-- syntropy-lint-disable fake-urgency -->
<!-- This page quotes violating examples on purpose (Don't columns, red-team cases). -->
# Notifications: push, in-app, SMS, email

How to write Safqah notifications so they inform without pressure and respect the user's consent. Open this for push titles and bodies, in-app notification rows, SMS (including OTP), email subjects and permission primers. Consent and preference rules come from the syntropy-compliance-ux skill (PDPL); this file covers the words.

## Rules
1. **Classify first: service or marketing.** Service = transaction, security, payout, status of the user's own investments, regulatory notices. Marketing = new deal campaigns, offers, news. Marketing goes only to users who opted in for that channel, and carries a one-tap stop route.
   Why: PDPL Art. 25; preferences are per channel.
2. **Title = the event; body = amount, deal, next step.** Push title about 30 characters, body about 90 characters, in Arabic and English. Lock screens cut the rest.
   Why: the user reads only the first line.
3. **Name the thing.** Deal name, exact amount with currency after it, real date.
   Why: confirms exactly what happened.
4. **No FOMO, no flattery, no emoji on money, no exclamation marks.** No «سارع»، «لا تفوّت»، «آخر فرصة» unless a real deadline is stated as a plain fact.
   Why: T6 and anti-pressure rules.
5. **Tone matches the state**: late payment is calm and specific; defaulted is direct; security is factual with one action.
   Why: alarm fatigue.
6. **Every OTP message states its purpose** and warns not to share it.
   Why: SAMA consumer protection rule 12(b); fraud prevention.
7. **No sensitive detail on the lock screen**: no full IBAN, no national ID, no balance unless the user enabled balance previews.
   Why: privacy on a shared or visible screen.
8. **Deep link to the exact screen** the notification is about; the in-app row repeats the same copy.
   Why: the action must be one tap away.
9. **Dates in Gregorian for money events**, Hijri only for religious occasions (Ramadan, Zakah).
   Why: R5.

## Push and in-app examples (service)
| Event | Title (AR) | Body (AR) | Title (EN) | Body (EN) |
|---|---|---|---|---|
| Investment confirmed | «تم تأكيد استثمارك» | «استثمرت 5,000.00 ر.س في الحجاز ريفيرا. يمكنك الإلغاء حتى 17 أكتوبر 2026، 14:30.» | "Investment confirmed" | "You invested 5,000.00 SAR in Hijaz Riviera. You can cancel until 17 Oct 2026, 14:30." |
| Deposit received | «تم الإيداع» | «أُضيف 10,000.00 ر.س إلى محفظتك.» | "Deposit received" | "10,000.00 SAR was added to your wallet." |
| Distribution paid | «وصلتك دفعة من الريم 46» | «أُودع 1,240.00 ر.س في محفظتك.» | "Payment from Al Reem 46" | "1,240.00 SAR was added to your wallet." |
| Cash-out sent | «تم تحويل المبلغ» | «حُوّل 4,000.00 ر.س إلى حسابك البنكي. يصل خلال 1-2 يوم عمل.» | "Transfer sent" | "4,000.00 SAR is on its way to your bank. Arrives in 1-2 business days." |
| Deal fully funded | «اكتمل تمويل الحجاز ريفيرا» | «تبدأ مدة الاستثمار بعد صرف التمويل للمطور.» | "Hijaz Riviera is fully funded" | "The investment term starts once funds are disbursed to the developer." |
| Funding failed (refund) | «لم يكتمل تمويل الصفقة» | «أُعيد 5,000.00 ر.س إلى محفظتك.» | "The deal didn't reach its target" | "5,000.00 SAR was returned to your wallet." |
| Payment late (warning) | «تأخر سداد الريم 46» | «نتابع مع المطور وسنخبرك بأي تحديث.» | "Al Reem 46 payment is late" | "We're following up with the developer and will update you." |
| Defaulted (error) | «الريم 46 متعثرة» | «بدأت إجراءات التحصيل. اطّلع على التفاصيل.» | "Al Reem 46 has defaulted" | "Recovery has started. See details." |
| KYC action needed | «مطلوب تحديث شهادة الآيبان» | «حدّثها لإكمال توثيق حسابك.» | "IBAN certificate update needed" | "Update it to complete your verification." |
| Account verified | «تم توثيق حسابك» | «يمكنك الآن الاستثمار في الصفقات المتاحة.» | "Your account is verified" | "You can now invest in open deals." |
| Reservation ending (real hold) | «ينتهي حجزك اليوم 18:00» | «أكمل الدفع لتأكيد 50,000.00 ر.س في الحجاز ريفيرا.» | "Your reservation ends today at 18:00" | "Complete payment to confirm 50,000.00 SAR in Hijaz Riviera." |
| New device sign-in | «تسجيل دخول من جهاز جديد» | «إن لم يكن أنت، غيّر رمز الدخول الآن.» | "New device sign-in" | "If this wasn't you, change your passcode now." |

## Opt-in alerts and marketing
| Type | Arabic | English | Notes |
|---|---|---|---|
| Deal alert the user created | «صفقة جديدة تطابق تنبيهك» · «نسبة العائد المتوقع 12.0% · المدة 12 شهر» | "New deal matches your alert" · "Expected return 12.0% · Term 12 months" | Service-like, only because the user created the alert |
| New deal campaign (opted in) | «صفقة جديدة متاحة» · «الحجاز ريفيرا · نسبة العائد المتوقع 12.0%» | "New deal available" · "Hijaz Riviera · Expected return 12.0%" | Include the stop route in email and SMS |
| Don't | «🔥 فرصة لا تعوض! سارع قبل نفاد الصكوك» | "🔥 Don't miss out! Only a few sukuk left" | Fake urgency, emoji |
| Don't | «صفقة مناسبة لك» | "A deal recommended for you" | Suitability claim |

## SMS
- OTP: «رمز التحقق {code} لتأكيد سحب {amount} ر.س. لا تشاركه مع أحد.» / "Your code {code} confirms a withdrawal of {amount} SAR. Don't share it with anyone."
- OTP for a new bank account: «رمز التحقق {code} لإضافة حساب بنكي جديد. لا تشاركه مع أحد.»
- Don't: «رمز التحقق: 4821» with no purpose.
- Marketing SMS ends with the stop route the channel supports.
- Keep Arabic SMS under 70 characters per segment where possible (Arabic uses UCS-2 encoding).

## Email subjects
- Name the event and the thing: «إيصال استثمارك في الحجاز ريفيرا» / "Your Hijaz Riviera investment receipt"; «كشف حسابك لشهر سبتمبر 2026» / "Your September 2026 statement".
- No all caps, no emoji, no «عاجل» unless it is a security event.

## Permission primer (before the OS prompt)
| Part | Arabic | English |
|---|---|---|
| Title | «تنبيهات التوزيعات والصفقات» | "Payout and deal alerts" |
| Body | «نخبرك عند إيداع أرباحك وعند طرح صفقة تناسب أهدافك» | "We'll tell you when profit lands and when a matching deal opens" |
| Primary | «السماح» | "Allow" |
| Secondary (equal weight) | «ليس الآن» | "Not now" |
Show it at the moment of need (after verification or the first investment), never on first launch. Never confirmshame the decline. Note: if "matching" deals are mentioned, they must come from the user's own alert criteria, not a suitability engine.

## Self-check
- [ ] Service or marketing decided; marketing only with opt-in and a stop route.
- [ ] Title is the event, body names amount, deal and next step; within about 30 and 90 characters.
- [ ] Currency after the amount, two decimals, Gregorian date for money events.
- [ ] No emoji, no exclamation marks, no urgency words, no «مناسبة لك».
- [ ] Late uses warning wording; defaulted uses direct error wording.
- [ ] OTP states its purpose and "do not share".
- [ ] No sensitive data on the lock screen.

## Sources
- Compliance guidance: PDPL consent (rules 12 to 14, 17, primer copy), SAMA consumer protection (OTP purpose, rule 15), anti-pressure guidance.
- `references/data/content/voice-tone.md` (T3, T6), warning versus error copy.
- Syntropy patterns: invest and reserve (reservation deadline), payment (transfer timing), KYC (rejection copy).
