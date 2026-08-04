import { Cite, Panel, PanelHead, SectionTitle, Sheet, Stat, Tag } from '../components/ui'
import { useRole } from '../components/RoleContext'
import {
  AUDIT_LOG,
  CONTROLS,
  INTEGRATIONS,
  deniedEvents,
  readOnlyCount,
  totalIntegrations,
} from '../data/platform'
import { BURDEN, LIMITS, SOURCES, WRITES, freeTextRows, totalRows } from '../data/sources'
import { ROLES } from '../data/roles'
import { num } from '../data/jericho'

export function Platform() {
  const { role, setRole } = useRole()

  return (
    <div className="stagger space-y-8">
      <SectionTitle
        eyebrow="Integration, permissions and audit"
        title="What it connects to, who can see it, and what it can prove"
        sub="None of this is exciting and all of it is disqualifying if the answer is vague. We do not name the record system Jericho runs, because it is very likely one of two and asserting it would be the fastest way to be wrong out loud."
      />

      {/* What it reads */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <Panel flush>
          <PanelHead
            eyebrow={`${num(totalRows())} rows read this cycle, finished at 08:11`}
            title="Read only, from the records that already exist"
          />
          <div className="xscroll border-t border-line">
            <table className="w-full min-w-[720px] border-collapse text-left">
              <thead>
                <tr className="border-b border-line bg-mist/40">
                  {['Module', 'Level', 'Kind', 'Rows', 'Read'].map((h) => (
                    <th
                      key={h}
                      className="px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-faint"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SOURCES.map((s) => (
                  <tr key={s.module} className="border-b border-line align-top last:border-b-0">
                    <td className="px-4 py-3">
                      <div className="text-[12.5px] font-semibold text-ink">{s.module}</div>
                      <div className="mt-0.5 max-w-md text-[11.5px] leading-relaxed text-ink-soft">
                        {s.note}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3">
                      <Tag tone={s.level === 'AL' ? 'change' : 'quiet'}>{s.level}</Tag>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-[11.5px] text-ink-soft">
                      {s.kind}
                    </td>
                    <td className="tnum whitespace-nowrap px-4 py-3 text-[12px] text-ink">
                      {num(s.rows)}
                    </td>
                    <td className="tnum whitespace-nowrap px-4 py-3 text-[11.5px] text-ink-faint">
                      {s.lastRead}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <div className="space-y-5">
          <Panel tone="ai">
            <div className="eyebrow">{WRITES.heading}</div>
            <div className="mt-1 text-figure font-semibold text-almanac-deep">{WRITES.answer}</div>
            <p className="mt-3 text-[12.5px] leading-relaxed text-ink-soft">{WRITES.detail}</p>
          </Panel>

          <Panel>
            <PanelHead
              eyebrow="What it costs the floor"
              title="Nothing on anybody's shift"
              sub="Your own words are that Jericho begins with a culture of caring for staff. Anything that adds documentation to a care aide's shift is abandoned inside a month, and it deserves to be."
            />
            <div className="space-y-2.5">
              {BURDEN.map((b) => (
                <div
                  key={b.label}
                  className="flex items-baseline justify-between border-b border-line pb-2 last:border-b-0"
                >
                  <span className="text-[12px] text-ink-soft">{b.label}</span>
                  <span className="tnum text-[15px] font-semibold text-plum">{b.value}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel tone="quiet">
            <Stat
              label="Of everything it read"
              value={num(freeTextRows())}
              note="rows are free text somebody typed on a shift, which is where the earliest signal almost always lives and the only place a language model earns its place"
              tone="plum"
            />
          </Panel>
        </div>
      </div>

      {/* How it connects */}
      <Panel flush>
        <PanelHead
          eyebrow={`${readOnlyCount()} of ${totalIntegrations()} connections are read only`}
          title="How it would connect to what you already run"
          sub="Whichever route fits each system. An API where one is licensed, a secure file exchange or a scheduled import where it is not. The one outbound path is email and SMS, and it only fires after a named person approves."
        />
        <div className="xscroll border-t border-line">
          <table className="w-full min-w-[880px] border-collapse text-left">
            <thead>
              <tr className="border-b border-line bg-mist/40">
                {['System', 'Method', 'Direction', 'Cadence'].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2 text-[10.5px] font-semibold uppercase tracking-[0.1em] text-ink-faint"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {INTEGRATIONS.map((i) => (
                <tr key={i.system} className="border-b border-line align-top last:border-b-0">
                  <td className="px-4 py-3">
                    <div className="text-[12.5px] font-semibold text-ink">{i.system}</div>
                    <div className="mt-0.5 max-w-lg text-[11.5px] leading-relaxed text-ink-soft">
                      {i.note}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[11.5px] text-ink-soft">{i.method}</td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <Tag tone={i.direction === 'Read only' ? 'quiet' : 'change'}>{i.direction}</Tag>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-[11.5px] text-ink-faint">
                    {i.cadence}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {/* Roles */}
      <Panel flush>
        <PanelHead
          eyebrow="Role based access and facility permissions"
          title="Seven roles, and two of them are deliberately uncomfortable"
          sub="A nursing supervisor cannot open the quarterly pack, and the family communication coordinator cannot open a resident record at all. Showing a role that is locked out of most of the product is what makes the other six credible. Change role in the header and watch the navigation shrink."
        />
        <div className="border-t border-line">
          {ROLES.map((r) => (
            <button
              key={r.id}
              type="button"
              onClick={() => setRole(r.id)}
              className={`flex w-full flex-wrap gap-x-4 gap-y-1 border-b border-line px-5 py-3 text-left transition-colors last:border-b-0 ${
                r.id === role.id ? 'bg-plum-wash' : 'hover:bg-mist/50'
              }`}
            >
              <span className="w-44 shrink-0 text-[12.5px] font-semibold text-ink">{r.label}</span>
              <span className="w-48 shrink-0 text-[11.5px] text-ink-faint">{r.person}</span>
              <span className="tnum w-24 shrink-0 text-[11.5px] text-ink-soft">
                {r.routes.length} screens
              </span>
              <span className="w-28 shrink-0 text-[11.5px] text-ink-soft">
                {r.scope === 'all' ? 'All campuses' : 'One campus'}
              </span>
              <span className="w-28 shrink-0 text-[11.5px] text-ink-soft">
                {r.levels.length ? r.levels.join(', ') : 'No resident access'}
              </span>
              <span className="min-w-[220px] flex-1 text-[11.5px] leading-relaxed text-ink-faint">
                {r.note}
              </span>
            </button>
          ))}
        </div>
      </Panel>

      {/* Controls and audit */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <Panel>
          <PanelHead eyebrow="Oversight" title="The controls behind that" />
          <div className="space-y-3">
            {CONTROLS.map((c) => (
              <div key={c.control} className="border-b border-line pb-3 last:border-b-0">
                <div className="text-[12.5px] font-semibold text-ink">{c.control}</div>
                <p className="mt-0.5 text-[12px] leading-relaxed text-ink-soft">{c.how}</p>
              </div>
            ))}
          </div>
        </Panel>

        <div className="space-y-5">
          <Sheet>
            <div className="flex items-baseline justify-between gap-3 border-b border-line pb-3">
              <h3 className="text-[15px] font-semibold text-ink">Audit log, this morning</h3>
              {deniedEvents() > 0 && <Tag tone="change">{deniedEvents()} access denied</Tag>}
            </div>
            <div className="mt-3 space-y-2">
              {AUDIT_LOG.map((a) => (
                <div
                  key={`${a.at}-${a.what}`}
                  className="flex flex-wrap gap-x-3 border-b border-line pb-2 text-[11.5px] leading-relaxed last:border-b-0"
                >
                  <span className="tnum w-20 shrink-0 text-ink-faint">{a.at}</span>
                  <span
                    className={`w-36 shrink-0 font-medium ${
                      a.who === 'Almanac' ? 'text-almanac-deep' : 'text-ink'
                    }`}
                  >
                    {a.who}
                  </span>
                  <span className="min-w-0 flex-1 text-ink-soft">{a.what}</span>
                  <span className="w-full text-ink-faint sm:w-36 sm:text-right">{a.scope}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 border-t border-line pt-3">
              <Cite>
                The denied entry is a care coordinator opening the quarterly pack. It failed, and the
                attempt was recorded, which is the point of having a log rather than a policy.
              </Cite>
            </div>
          </Sheet>

          <Panel tone="quiet">
            <PanelHead
              eyebrow="The honest limits"
              title="Where this layer is blind"
              sub="Stated up front, because finding these yourself in month two is how a pilot dies."
            />
            <div className="space-y-2.5">
              {LIMITS.map((l, i) => (
                <p key={i} className="border-l-2 border-line-strong pl-3 text-[12px] leading-relaxed text-ink-soft">
                  {l}
                </p>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}
