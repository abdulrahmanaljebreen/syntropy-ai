# Feedback mode

`/syntropy feedback` (or `syntropy: feedback`, «ملاحظة», «ملاحظات», «بلّغ») turns a mistake or an idea into a report the Syntropy owner can act on in one read. The agent writes the report; the person only adds what they saw and pastes it into the feedback list.

Feedback list (Notion form): https://app.notion.com/p/521333af0f8046cb89a6692368be729c

## Rules
1. Write the report from this conversation. Do not interview. If the conversation has nothing to report (the person typed `/syntropy feedback` first), ask one line: «وش الخطأ أو الفكرة؟ اكتبها بجملة» and write the report from the answer. Why: people give feedback when it is cheap.
2. Quote, do not summarise, what the person asked and what the agent produced (component names, variant values, tokens, copy). Why: the owner needs the exact output to reproduce it.
3. Name the rule or source that should have applied (non-negotiable number, file in `knowledge/`, component guide, contrast pair) and what the right answer is, when you know it. If you do not know it, say «غير معروف». Why: a report with the fix is fixed in minutes.
4. Pick one type: Wrong component · Wrong token or colour · Copy or Arabic · Missing component or pattern · Install problem · Idea. Why: these are the options in the feedback list.
5. Never include personal data, investor data, credentials, tokens, private Figma links or customer content. Replace them with placeholders (`{iban}`, `{name}`). Why: the list is readable by everyone at Safqah.
6. Write the report in the person's language (Arabic by default). Keep component, token and file names in English. No em dash character.
7. Output the report in one code block so it copies cleanly, then one line telling the person to open the feedback list and paste it into Details, with the Summary line as the title.

## Report template
```text
Summary: <one line, under 80 characters>
Type: <one of the six types>
Tool: <Claude Code · Claude Desktop · Claude.ai · Cursor · Codex · ChatGPT · Gemini · Figma Make · Other>

What was asked:
<the request, quoted>

What the agent did:
<the wrong output, quoted: components, variants, tokens, copy>

What it should be:
<the right answer and the rule or file it comes from, or «غير معروف»>

Where:
<Figma frame of the person's own work, screen name or file path, if any>
```

## Example
> **Person:** /syntropy feedback استخدم Tag بدل StatusPill لحالة التحقق
> **Agent:**
> ```text
> Summary: Tag used for KYC status instead of StatusPill
> Type: Wrong component
> Tool: Claude Code
>
> What was asked:
> «صمم صف حالة التحقق من الهوية في الإعدادات»
>
> What the agent did:
> Tag with the label «مكتمل»
>
> What it should be:
> StatusPill: a state, not a category (skills/syntropy-components/references/confusables.md, Tag vs StatusPill)
>
> Where:
> Settings, identity verification row
> ```
> افتح قائمة الملاحظات والصق هذا في Details، والسطر الأول عنوانًا: https://app.notion.com/p/521333af0f8046cb89a6692368be729c
