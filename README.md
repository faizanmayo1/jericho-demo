# Jericho Care Group · Almanac Care Intelligence

A pre-sales demonstration built for **Benjamin Carter**, Co-Founder of Jericho Care Group
(jerichocare.com). Lead and thread owned by **Awais**.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## The prospect in one paragraph

Jericho Care Group is the trading name of Bayshire Central Valley, LLC, a California operator
founded in 2022 and run out of Fresno. It is the Central Valley platform of the larger Bayshire
group, and it runs around eight to nine skilled nursing facilities plus assisted and independent
living across Fresno and Madera counties. This is a **US CMS prospect**, so the whole build speaks
CDPH, CDSS, MDS 3.0, Section GG, PDPM, F tags, QAPI and INTERACT. Nothing in it mentions CQC, NEWS2
or RESTORE2, which would be the wrong regulator on the wrong continent.

Benjamin Carter and his co-founder Adam Salow are both **ex Plum Healthcare Group**, a fifty plus
facility post acute operator. They know five star mechanics, MDS and PDPM better than we do. Nothing
in this demo explains a fundamental to them.

## The constraint that shapes the build

Benjamin has said exactly one substantive thing in the thread:

> "I want to make sure you value our time. Will you please send me a brief summary of your
> presentation before we schedule a meeting?"

He has confirmed no pain, named no system and agreed to no date. So the first deliverable is not this
demo at all, it is `SUMMARY_EMAIL.md`, a one page note from Awais that unblocks the calendar. This
build is what that note describes.

Two facts from research shape everything else:

1. **Their campuses are mixed acuity.** Skilled nursing, assisted living and independent living sit
   on shared campuses. Residents move between levels, and each level documents completely
   differently.
2. **The corporate layer is thin.** Thirty two associated members on LinkedIn against eight or nine
   facilities. There is nobody in Fresno building cross facility views, and that absence is the
   reason this product has a buyer.

## The one distinction the whole demo rests on

Inside a skilled nursing facility the data is dense and regulated, threshold rules already work, and
Real Time Medical Systems already sells an intelligence layer on that data.

The blind spot is one level up. An **assisted living** resident has a service plan reviewed twice a
year, a med tech, and care staff logging assistance in free text. That is real documentation, and it
is close to dark next to MDS 3.0 and daily charting. So the signals arrive as prose written by people
who are not clinicians, and almost nothing in assisted living has a threshold to cross.

Three claims carry it, and the first one is the one that survives a fifty building operator:

1. **Every entry sat just under its own rule, or under no rule at all.** Each row on screen prints
   the rule it sat beneath, next to the value. Seven of twelve were sub threshold. Five landed in
   fields nobody monitors anywhere.
2. **The 24 hour report has no memory.** It is a twenty four hour window by construction, so a
   resident appearing three times in nine days in three sections never appears as a trend. That is a
   property of the artifact, not a criticism of the DON reading it.
3. **The report is a skilled nursing document.** Marguerite Ellison lives in an apartment on the
   other side of the same campus, so she has never been on it, and there is no equivalent for her.

## The hero, in acts

**Marguerite Ellison**, 84, apartment AL 214 at Alder Grove. Twelve entries, eight logs, six people,
three shifts, nineteen days, and not one rule fired.

| Act | Where | What happens |
|---|---|---|
| I | `/facility` | The 24 hour report, correct and finished, with recurrence marks in the margin that the report itself could never produce |
| II | `/facility` | The section it has never had: the other side of the campus, revealed on click |
| III | `/resident` | The convergence lanes, each with the rule it sat under drawn at the height it fires |
| IV | `/resident` | Her own prior stay at another campus, in the group record, invisible to her current chart |
| V | `/notification` | One event, three audiences, all held unsent, each naming its sender |
| VI | `/almanac` | The refusal, on camera, naming the physician and the Wellness Director |
| VII | `/reporting` | The same event as one dated line of evidence in the quarterly pack |
| VIII | `/almanac` | The close: which part to test first, and what would count as it having failed |

## Suggested demo path

1. `/` Open on the group. Camden Oaks is the campus to call today, and the reason is on the row.
2. `/facility` Read the 24 hour report as a document. Everything on it was worked correctly.
3. `/facility` Click **Read the other side of the campus**. The missing section appears.
4. `/watch` The cut is nine names because the stand up is thirty minutes, not because nine crossed a
   score. Show the ones deliberately below the line, and yesterday's three that closed as nothing.
5. `/resident` The signature. Hover a mark, then open the ledger and read one rule aloud.
6. `/resident` Click **Look across the group record** for the November 2025 stay.
7. `/followup` One incident end to end. Escalate the overdue action and show the audit history.
8. `/notification` Switch to the regional weekly summary, then press **Send** on a draft and let it
   refuse.
9. `/platform` Change role in the header to nursing supervisor and watch the navigation shrink. Then
   type a URL they cannot open.
10. `/almanac` Ask the urinary tract infection question. Let it decline. This is the moment.
11. `/almanac` Close on the pilot recommendation, which answers the last thing the requirements
    document asks for.

## Screens

| Route | Screen | What it proves |
|---|---|---|
| `/` | Executive | All eight campuses, ranked by what is waiting on a person rather than by a quality score |
| `/facility` | Facility | Alder Grove, with the 24 hour report as a document, assembled instead of pasted and given a memory |
| `/watch` | Watch List | The alarm fatigue guard as the subject of a screen, plus the group view typeset by county |
| **`/resident`** | **Resident** | **Signature. Threshold adjacency per entry, the cross level spine, the prior stay, the 360 view, the first refusal** |
| `/followup` | Follow-Up | One incident end to end with an audit history, plus the task board it feeds |
| `/notification` | Communication | Six role summaries, and three drafts that name their sender and do not send |
| `/platform` | Platform | Integration methods, seven roles, the control set and the audit log |
| `/reporting` | Quarterly Pack | Staffing against the binding California floor, quality, regulatory, QAPI |
| `/almanac` | Almanac | The copilot, with two refusals that name people, and the closing pilot recommendation |

## Coverage against the requirements document

Every one of the fourteen sections is answered on a screen.

| Section | Where |
|---|---|
| 1. Purpose, intelligence layer alongside existing systems | Throughout, and stated explicitly on `/platform` |
| 2. Primary users, seven roles, each seeing only what is relevant | Role picker in the masthead, enforced at the route |
| 3. Executive multi facility dashboard | `/` |
| 4. Facility operations dashboard | `/facility` |
| 5. Resident attention queue | `/watch` |
| 6. Resident 360 | `/resident` |
| 7. Shift and leadership summaries | `/notification`, six of them |
| 8. Incident follow up workflow | `/followup` |
| 9. Staff task management | `/followup` |
| 10. Family communication support | `/notification` |
| 11. Natural language questions | `/almanac`, clinical and operational |
| 12. Data and integration approach | `/platform` |
| 13. Security and oversight | `/platform`, plus the route guard |
| 14. What to pilot first | `/almanac`, closing panel |

### Two places the document was answered rather than followed literally

**Facility names stay invented.** Section 11 uses a real one ("What changed at Bethel since last
week?"). Bethel Lutheran and Twilight Haven are real Jericho facilities, and this build shows
staffing gaps, overdue follow ups and flagged residents. Putting invented problems on a building
Benjamin Carter is accountable for is not worth a little extra recognition in the room, and the
footer says so on every screen.

**The executive view is not a tile grid.** Section 3 asks for facility comparison first, and it is
first. It is ranked by what is waiting on a person rather than by a care quality score, because a
league table of quality between an operator's own buildings is a conversation with a regional
director, not a number on a screen.

## Signature components

**`ConvergenceLanes`** renders eight heterogeneous data types on one time axis: a meal attendance
count, a medication refusal, an absence from a sign in sheet, a sentence somebody typed, a work
order, a weight. They cannot share a y axis, so this cannot be a chart. Each lane carries a hairline
at the height its own rule fires, and every mark sits visibly underneath. Three lanes have no
hairline because no rule exists for that field, which is worse.

**`LevelSpine`** bands three and a half years of her life by care level, with width as time and
height as documentation density. Seventeen days of skilled nursing produced more record than forty
months of everything else. Height is log scaled, because a linear scale would make the assisted band
vanish and overstate a point that is already strong enough.

## Design language: "Kept Record"

A record that is kept, in both senses. A kept house and a kept ledger.

| Role | Hex |
|---|---|
| Canvas | `#EFE7EC` warm neutral carrying a real plum cast |
| Software surface | `#FCF9FB` |
| Document surface | `#FFFFFF`, square corners |
| Ink | `#1D181C`, soft `#544A51`, faint `#796D75` |
| **Plum, the brand** | `#6E2150` |
| **Almanac, the AI** | `#1F63EE` |
| Baseline / Change in condition / Acute | `#5E6A78` / `#C4820F` / `#BC3A1D` |
| Dusk, the one dark surface | `#271327` aubergine black |

The palette was rebalanced after a first pass read as dull. The rules did not change and neither did
what any colour means. What changed was chroma and separation: a near white canvas under near white
panels gives a page no colour and no depth, and a low chroma plum reads as grey brown at 11px, which
means the brand disappears at exactly the sizes it appears most often. The canvas gained a real tint
so white documents read as documents sitting on something, the brand gained saturation so it survives
small type, and every rung of the ladder gained chroma so an ochre that looked cautious now reads as
amber. Faint ink was darkened to clear 4.5 to 1, which the original value did not.

Type is **Literata** display and **Instrument Sans** body. The rule that keeps them apart is that
**the serif speaks and the sans counts**: Literata for anything read aloud, Instrument Sans with
tabular lining figures for every table, date, room number and HPRD value.

**The one colour rule: everything a person did is warm, everything Almanac did is cool.** Plum is
Jericho and never a status. Almanac blue is the layer and nothing else, so anything blue on screen
was worked out by the machine. The status ladder is warm throughout so it can never be confused with
either.

**The one deliberate departure from the house ruleset:** the ladder has a baseline tone. Other demos
ban one because "on schedule is not an achievement", which is right for a shipment and wrong for a
person. Applied to residents, a ladder with no baseline renders every name on a census as some grade
of problem, which manufactures the exact alarm fatigue this product exists to prevent. Baseline is a
quiet slate, it is not green, and it carries most of the census.

Two radii are load bearing. Anything Almanac generated as a document is square and white. Anything
that is software is rounded and warm. A viewer learns this in four seconds without being told.

### The signature: a ruled ledger margin

The product's claim is that the record is the page and the layer writes in the margin. On the 24 hour
report that stops being content and becomes structure. A plum hairline is set in from the left edge,
section names sit outside it in the margin, entries sit inside it, and where Almanac annotated a
section its mark appears in that same margin column. The layout states the thesis before a word of
copy does.

It appears at large sizes only. On a phone a ruled margin is lost width, so the page falls back to a
single column and gives up nothing.

### The rest of the elevation pass

- **Depth is spent in one place.** Software panels carry almost no shadow and take their definition
  from a hairline border. Paper gets a real contact shadow so a document reads as lying on the canvas
  rather than floating above it.
- **Scale contrast.** A named type scale (`thesis`, `title`, `figure`, `lede`) replaced a jumble of
  arbitrary pixel values, and page titles are set in Literata at 33px so the display face finally
  does some work.
- **The canvas is a surface.** Light falls from above and a 2.5 percent fractal grain sits over
  everything, which is below the level anybody consciously notices and above the level at which a
  large flat colour starts to look like unpainted software.
- **Eyebrows point at something.** Each carries a short leading rule. Without it an uppercase label
  repeated on every panel is decoration.
- **Page load is orchestrated**, not simultaneous, with a 60ms cascade that walks the eye down the
  page. Respects `prefers-reduced-motion`.
- **One accessory removed.** The masthead had a vertical ruling that encoded nothing true about
  shifts or anything else. It is gone, and the radial lighting carries the surface on its own.

## Data rules

- **Everything is invented.** All eight campuses, every resident, every member of staff. Twilight
  Haven and Bethel Lutheran are real Jericho facilities and appear nowhere in this build. No real
  facility, person or record carries a figure, a flag or a deficiency here.
- **Alarm fatigue guard.** Alder Grove holds 216 residents and the morning list is nine, which is
  4.2 percent. No campus exceeds five percent of its own census. The cut is **capacity bounded**: the
  stand up runs thirty minutes, the watch list gets eighteen of them, and a name that produces a
  decision takes two. The screen derives the list length from that arithmetic rather than asserting
  it, so the division a buyer does in his head comes out at nine. At forty minutes it derives to
  fourteen.
- **Names route to the owner the licence implies.** The stand up is a skilled nursing meeting and the
  DON compiles the report, so the assisted and independent living names on the same list carry the
  Wellness Director and the Executive Director instead. One list because the resident is one person,
  two owners because the licence says so.
- **Ranked by unownedness, not severity.** Two objectively sicker residents are not on the list
  because they already have a person, a clock and a next step.
- **Expected non events are disclosed.** Yesterday nine were flagged, five produced action and three
  closed as stable. Almanac says so out loud.
- **All arithmetic derives from the data rows** through functions in `src/data/`, so a headline
  cannot drift from its own table. Verified: the group totals reconcile against the eight campus rows.
- **No claim about their EHR.** PointClickCare is likely and unverified, so integration is framed as
  "reads from your EHR" and the actual system is a question for the call.
- **Never state a precise facility count.** "Around eight to nine" is the only defensible phrasing.

## Domain accuracy notes

- **Two regulators on one campus.** Skilled nursing is a CDPH licensed SNF. Assisted living is a
  residential care facility for the elderly licensed by CDSS. That distinction drives the entire
  refusal on `/notification` and `/almanac`: there is no house physician in assisted living, so
  escalation goes to her own community doctor, and a level of care determination belongs to the
  administrator with a physician.
- **Section GG** is used correctly as the six level scale that replaced Section G on 1 October 2023.
- **The federal minimum staffing rule is dead** and the quarterly pack says so explicitly. California
  Health and Safety Code 1276.5 at 3.5 HPRD, with the 1276.65 assistant sub minimum, is the binding
  floor, and the pack reports eleven days below it rather than hiding them in an average.
- F tags used: F657, F686, F689, F758. Scope and severity letters are used correctly.
- Stop and Watch and INTERACT are US. RESTORE2 is UK and appears nowhere.

## Standing build rules observed

- No monospace or typewriter face anywhere. `.tnum` tabular lining figures carry column alignment.
- No em dashes in any content string. Verified by grep across `src/` and `index.html`.
- One colour reserved exclusively for the AI. The brand colour is never a status.
- The copilot contains two refusals delivered on camera, each naming a person and what they own.
- No fake maps. There is real geography here and no coordinate data, so the eight campuses are
  typeset by county and sorted by town, and the screen says why.

## Verification

`npm run build` is clean. The production build was then driven over CDP in headless system Chrome
(managed Chrome blocks localhost on this machine), **56 checks, all passing**:

- All 9 routes render, each with the full 9 item nav
- **Zero console errors on every route**
- **Zero horizontal overflow at 390px on every route**
- Command palette opens on meta+K
- Executive tiles reconcile against the eight campus rows, 40 flags and 37 open shifts
- The facility hero reveals the missing assisted living section
- The resident screen reveals the prior stay at another campus
- The resident screen carries a named refusal block
- The copilot refusal fires and names the physician
- The copilot generates the family letter artifact
- A cross screen action lands on `/notification`
- Pressing Send is refused with a toast naming the sender
- The resident 360 carries the care plan, the care team and the what changed summary
- An overdue action escalates to a named administrator, and the incident carries an audit history
- Role summaries switch and report change rather than state
- The copilot answers an operational aggregate question and closes on a pilot recommendation
- Navigation shrinks from 9 screens to 4 for a nursing supervisor, and hidden screens are disclosed
- Permissions are enforced at the route, not only in the navigation
- The family communication role sees one screen and no resident carrier
- Group totals reconcile against their own table: 40 flags and 1,074 residents across 8 campuses

Greps confirm no em dashes, no monospace declaration, no UK regime terms, and no retired Section G
usage.
