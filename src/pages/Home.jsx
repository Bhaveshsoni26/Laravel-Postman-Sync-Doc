import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStats, useReveal, useCounters } from '../lib/fx.js'
import { Badge, Button, StatCard, SectionHeading, CodeBlock } from '../components/ui.jsx'

const GITHUB = 'https://github.com/Bhaveshsoni26/Laravel-Postman-Sync'
const PACKAGIST = 'https://packagist.org/packages/bhaveshsoni26/laravel-postman-sync'
const BV = '{{base_url}}'

function TransformPanel() {
  const tree = [
    { folder: 'auth', requests: [{ m: 'post', n: 'login' }, { m: 'post', n: 'register' }] },
    { folder: 'users', requests: [{ m: 'get', n: 'index' }, { m: 'post', n: 'store' }, { m: 'get', n: 'show' }] },
  ]
  return (
    <div className="relative">
      <div className="surface-card overflow-hidden">
        <div className="flex items-center gap-2 border-b border-hairline px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-delete/60" /><span className="h-2.5 w-2.5 rounded-full bg-put/60" /><span className="h-2.5 w-2.5 rounded-full bg-get/60" />
          <span className="ml-2 font-mono text-xs text-faint">routes/api.php</span>
        </div>
        <div className="space-y-2.5 px-4 py-4 font-mono text-[0.8rem] leading-relaxed">
          <div className="flex items-center gap-3"><span className="method method-post">POST</span><span className="text-muted">Route::post(<span className="text-accent">'/login'</span>, ...);</span></div>
          <div className="flex items-center gap-3"><span className="method method-post">POST</span><span className="text-muted">Route::post(<span className="text-accent">'/register'</span>, ...);</span></div>
          <div className="flex items-center gap-3"><span className="method method-get">GET</span><span className="text-muted">Route::apiResource(<span className="text-accent">'users'</span>, ...);</span></div>
        </div>
      </div>
      <div className="relative mx-auto flex h-16 w-px items-center justify-center">
        <div className="pipe absolute inset-x-0 top-0 h-full w-px" />
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-accent/40 bg-canvas px-3 py-1 font-mono text-[0.7rem] text-accent shadow-lg shadow-accent/10">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" className="animate-float"><path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 4v5h-5" /></svg>
          php artisan postman:sync
        </div>
      </div>
      <div className="surface-card overflow-hidden">
        <div className="flex items-center justify-between border-b border-hairline px-4 py-2.5">
          <span className="flex items-center gap-2 font-mono text-xs text-faint"><span className="h-2 w-2 rounded-sm bg-accent" /> CRM API · collection</span>
          <span className="font-mono text-[0.68rem] text-faint">v2.1</span>
        </div>
        <div className="px-2 py-3 font-mono text-[0.78rem]">
          {tree.map((node) => (
            <div key={node.folder}>
              <div className="flex items-center gap-2 px-2 py-1.5 text-muted">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" /></svg>
                <span className="text-ink">{node.folder}</span>
              </div>
              {node.requests.map((req) => (
                <div key={req.n} className="ml-5 flex items-center gap-2.5 rounded-md px-2 py-1.5 transition hover:bg-accent/5">
                  <span className={'method method-' + req.m}>{req.m.toUpperCase()}</span>
                  <span className="text-muted">{req.n}</span>
                  <span className="ml-auto text-faint">{BV}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PostmanMock() {
  const tree = [
    { folder: 'auth', open: true, requests: [{ m: 'post', n: 'login', active: true }, { m: 'post', n: 'register' }] },
    { folder: 'users', open: true, requests: [{ m: 'get', n: 'index' }, { m: 'post', n: 'store' }, { m: 'get', n: 'show' }] },
    { folder: 'projects', open: false, requests: [] },
  ]
  return (
    <div className="surface-card overflow-hidden">
      <div className="flex items-center gap-2 border-b border-hairline px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-delete/60" /><span className="h-2.5 w-2.5 rounded-full bg-put/60" /><span className="h-2.5 w-2.5 rounded-full bg-get/60" />
        <span className="ml-2 font-mono text-xs text-faint">Postman — CRM API</span>
      </div>
      <div className="grid grid-cols-1 divide-y divide-hairline sm:grid-cols-[1fr_1.25fr] sm:divide-x sm:divide-y-0">
        {/* collection tree */}
        <div className="space-y-0.5 p-2.5 font-mono text-[0.72rem]">
          <div className="flex items-center gap-1.5 px-1.5 pb-1 text-faint"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12a9 9 0 1 1-2.64-6.36" /><path d="M21 4v5h-5" /></svg> CRM API</div>
          {tree.map((node) => (
            <div key={node.folder}>
              <div className="flex items-center gap-1.5 rounded px-1.5 py-1 text-muted">
                <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={node.open ? 'rotate-90 transition' : 'transition'}><path d="m9 18 6-6-6-6" /></svg>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-accent"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" /></svg>
                <span className="text-ink">{node.folder}</span>
              </div>
              {node.open && node.requests.map((req) => (
                <div key={req.n} className={'ml-4 flex items-center gap-2 rounded px-1.5 py-1 ' + (req.active ? 'bg-accent/12' : '')}>
                  <span className={'method method-' + req.m}>{req.m.toUpperCase()}</span>
                  <span className={req.active ? 'text-ink' : 'text-muted'}>{req.n}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
        {/* request preview */}
        <div className="p-3">
          <div className="flex items-center gap-2 rounded-lg border border-hairline bg-canvas/60 p-1.5">
            <span className="method method-post">POST</span>
            <span className="truncate font-mono text-[0.72rem] text-muted">{BV}/login</span>
            <span className="ml-auto rounded-md bg-gradient-to-br from-accent to-accent2 px-2.5 py-1 font-mono text-[0.66rem] font-600 text-[#04140f]">Send</span>
          </div>
          <div className="mt-2.5 flex gap-3 border-b border-hairline pb-1.5 font-mono text-[0.66rem]">
            <span className="text-faint">Params</span><span className="text-faint">Auth</span>
            <span className="border-b-2 border-accent pb-1 text-ink">Body</span>
            <span className="text-faint">Tests</span>
          </div>
          <div className="mt-2.5 space-y-1.5 rounded-lg border border-hairline bg-canvas/60 p-2.5 font-mono text-[0.7rem]">
            <div><span className="text-faint">{'{'}</span></div>
            <div className="pl-3"><span className="text-accent">"email"</span><span className="text-muted">: </span><span className="text-put">"user@example.com"</span><span className="text-muted">,</span></div>
            <div className="pl-3"><span className="text-accent">"password"</span><span className="text-muted">: </span><span className="text-put">"password"</span></div>
            <div><span className="text-faint">{'}'}</span></div>
          </div>
          <div className="mt-2.5 flex items-center gap-2 font-mono text-[0.66rem]">
            <span className="rounded bg-get/15 px-1.5 py-0.5 text-get">200 OK</span>
            <span className="text-faint">142 ms · 1.2 KB</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero({ stats }) {
  const onMove = (e) => { e.currentTarget.style.setProperty('--mx', e.clientX + 'px'); e.currentTarget.style.setProperty('--my', (e.clientY + window.scrollY) + 'px') }
  return (
    <section className="relative overflow-hidden" onMouseMove={onMove}>
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-60" />
      <div className="glow-spot pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-5 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-8 lg:pb-28 lg:pt-24">
        <div>
          <Badge><span className="h-1.5 w-1.5 rounded-full bg-accent" />v1.x — Laravel 10, 11 &amp; 12 Support</Badge>
          <h1 className="mt-6 font-display text-[2.5rem] font-700 leading-[1.05] tracking-tight text-ink sm:text-[3.2rem]">Keep Postman in sync with your <span className="gradient-text">Laravel API</span> — automatically.</h1>
          <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">Laravel Postman Sync reads your routes, controllers and form requests, then generates a complete Postman collection — request bodies, validation rules, auth headers and documentation — and pushes it to your workspace with one command.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Button href="/docs/introduction">Get Started <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg></Button>
            <Button href={GITHUB} variant="ghost"><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" /></svg>View GitHub</Button>
            <a href={PACKAGIST} className="inline-flex items-center gap-2 px-2 py-2 text-sm font-500 text-muted transition hover:text-ink">Packagist ↗</a>
          </div>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-2 text-sm text-faint">
            <span className="font-mono">{stats.version}</span>
            <span className="flex items-center gap-1.5"><span className="text-accent font-600 font-mono">{stats.downloads_total.toLocaleString()}</span> installs</span>
            <span className="flex items-center gap-1.5"><span className="text-accent font-600 font-mono">{stats.stars}</span> stars</span>
            <span>MIT licensed</span>
          </div>
        </div>
        <div className="reveal" data-delay="120"><TransformPanel /></div>
      </div>
    </section>
  )
}

function StatGrid({ stats }) {
  return (
    <section className="border-y border-hairline bg-surface/30">
      <div className="mx-auto max-w-7xl px-5 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Total installs" value={stats.downloads_total} />
          <StatCard label="This month" value={stats.downloads_monthly} />
          <StatCard label="GitHub stars" value={stats.stars} />
          <StatCard label="Latest version" display={stats.version} />
          <StatCard label="PHP" display="8.2+" />
          <StatCard label="Laravel" display="10·11·12" />
        </div>
      </div>
    </section>
  )
}

const FEATURES = [
  ['Automatic route discovery', 'Scans every API route — GET, POST, apiResource, resource — and reads the controller behind it. No annotations.', '<path d="M3 12h4l3 8 4-16 3 8h4"/>'],
  ['Postman collection sync', 'Generates a clean Collection v2.1 with folders mirroring your URL paths and pushes it to your workspace.', '<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 4v5h-5"/>'],
  ['Request body detection', 'Reads form requests and controller input to build example bodies and query parameters automatically.', '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h6"/>'],
  ['Validation rules export', 'Turns Laravel validation rules into a typed field table in each request’s documentation.', '<path d="m9 12 2 2 4-4"/><circle cx="12" cy="12" r="9"/>'],
  ['Authentication support', 'Detects Sanctum, Passport, JWT and custom guards, and wires a Bearer token header on protected routes.', '<rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>'],
  ['Environment variables', 'Creates a reusable Postman environment with a base URL and a single token variable per stage.', '<path d="M4 7h16M4 12h16M4 17h10"/>'],
  ['Documentation generation', 'Writes endpoint docs into each request’s Docs tab and exports an OpenAPI 3 document.', '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/>'],
  ['CI/CD ready', 'Run one command in your pipeline to keep the collection current on every deploy. Output is deterministic.', '<path d="M12 2v4m0 12v4M2 12h4m12 0h4"/><circle cx="12" cy="12" r="4"/>'],
  ['Zero configuration', 'Install, publish config, run sync. Sensible defaults work out of the box for standard Laravel APIs.', '<circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2"/>'],
]

function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading eyebrow="capabilities" title="Everything your API already describes" sub="The package treats your Laravel app as the source of truth. Each feature pulls real data from your code — not a separate spec you have to maintain." />
      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(([t, d, i], idx) => (
          <div key={t} className="reveal surface-card surface-card-hover group p-6" data-delay={(idx % 3) * 70}>
            <div className="grid h-11 w-11 place-items-center rounded-xl border border-hairline bg-accent/10 text-accent transition group-hover:border-accent/40">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: i }} />
            </div>
            <h3 className="mt-5 font-display text-[1.05rem] font-600 text-ink">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

const STEPS = [
  ['Laravel routes', 'Your existing api.php — nothing to annotate.', '<path d="M3 12h4l3 8 4-16 3 8h4"/>'],
  ['Package scanner', 'Resolves controllers, middleware and form requests.', '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'],
  ['Request analysis', 'Extracts params, validation, auth and responses.', '<path d="M3 3v18h18"/><path d="m7 14 4-4 3 3 5-6"/>'],
  ['Collection generator', 'Builds folders, requests, docs and tests.', '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/>'],
  ['Postman collection', 'Created or merged into your workspace.', '<path d="M21 12a9 9 0 1 1-2.64-6.36"/><path d="M21 4v5h-5"/>'],
  ['Team collaboration', 'Everyone works from the same, current API.', '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>'],
]

function Workflow() {
  return (
    <section className="relative overflow-hidden border-y border-hairline bg-surface/30">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading eyebrow="how it works" title="From routes to a shared collection" sub="One command runs the whole pipeline. Re-run it any time your API changes — the output is deterministic, so diffs stay small." />
        <div className="mt-16 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-6">
          {STEPS.map(([t, d, i], idx) => (
            <div key={t} className="reveal relative" data-delay={idx * 70}>
              {idx < STEPS.length - 1 && <div className="pointer-events-none absolute left-[2.1rem] top-5 hidden h-px w-[calc(100%+1.5rem)] bg-gradient-to-r from-accent/50 to-hairline lg:block" />}
              <div className="relative grid h-11 w-11 place-items-center rounded-xl border border-accent/40 bg-canvas text-accent">
                <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" dangerouslySetInnerHTML={{ __html: i }} />
                <span className="absolute -right-2 -top-2 grid h-5 w-5 place-items-center rounded-full bg-accent font-mono text-[0.62rem] font-700 text-[#04140f]">{idx + 1}</span>
              </div>
              <h3 className="mt-4 font-display text-[0.98rem] font-600 text-ink">{t}</h3>
              <p className="mt-1.5 text-[0.82rem] leading-relaxed text-muted">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Install() {
  return (
    <section id="install" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div className="reveal">
          <span className="eyebrow">// installation</span>
          <h2 className="mt-3 font-display text-[2rem] font-700 tracking-tight text-ink sm:text-[2.4rem]">Up and running in three commands</h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">No service providers to register, no boilerplate. Pull it in with Composer, publish the config, and run the sync command. It works immediately on a standard Laravel API.</p>
          <div className="mt-7 flex flex-wrap gap-3"><Button href="/docs/installation">Read the install guide</Button><Button href="/docs/configuration" variant="ghost">Configuration</Button></div>
        </div>
        <div className="reveal space-y-3" data-delay="100">
          {[['01', 'composer require bhaveshsoni26/laravel-postman-sync'], ['02', 'php artisan vendor:publish --tag=postman-sync-config'], ['03', 'php artisan postman:sync']].map(([n, c]) => (
            <div key={n} className="flex items-start gap-3"><span className="mt-3 font-mono text-xs text-faint">{n}</span><CodeBlock language="bash" code={c} className="flex-1" /></div>
          ))}
        </div>
      </div>
    </section>
  )
}

const QS = [
  ['Install the package', 'Pull it in with Composer and publish the config file.'],
  ['Add your Postman API key', 'Drop POSTMAN_API_KEY in your .env so the package can talk to Postman.'],
  ['Connect a workspace', 'Optionally set a workspace and collection id to target an existing collection.'],
  ['Run the sync command', 'php artisan postman:sync --push generates and uploads in one step.'],
  ['Collection appears in Postman', 'Open Postman — folders, requests, auth and docs are all there.'],
]

function QuickStart() {
  return (
    <section id="quick-start" className="border-y border-hairline bg-surface/30">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading eyebrow="quick start" title="Five steps to a synced collection" sub="The whole onboarding, start to finish. Each step takes seconds." />
        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <ol className="space-y-3">
            {QS.map(([t, d], i) => (
              <li key={t} className="reveal flex gap-4 rounded-xl border border-transparent p-3 transition hover:border-hairline hover:bg-surface/60" data-delay={i * 50}>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-accent/40 bg-accent/10 font-mono text-sm font-600 text-accent">{i + 1}</span>
                <div><h3 className="font-display text-[1rem] font-600 text-ink">{t}</h3><p className="mt-0.5 text-sm leading-relaxed text-muted">{d}</p></div>
              </li>
            ))}
          </ol>
          <div className="reveal" data-delay="120"><PostmanMock /></div>
        </div>
      </div>
    </section>
  )
}

const ENV = `POSTMAN_API_KEY=PMAK-xxxxxxxxxxxxxxxx
POSTMAN_WORKSPACE_ID=          # optional — target a workspace when creating
POSTMAN_COLLECTION_ID=         # optional — set to update an existing collection`

const OPTIONS = [
  ['api_prefix', "'api'", 'Only routes under this prefix are scanned.'],
  ['base_url', 'APP_URL/api', 'Seeds the base URL Postman variable.'],
  ['auth_token_variable', "'token'", 'The single bearer-token variable every authed request uses.'],
  ['environments', "['local', 'staging', 'production']", 'One Postman environment file per stage.'],
  ['inspect_form_requests', 'true', 'Read form requests + controller input to build bodies and params.'],
  ['generate_tests', 'true', 'Attach baseline test scripts to every request.'],
  ['postman.sync_mode', "'merge'", 'merge keeps manual edits; replace overwrites the collection.'],
]

function Configuration() {
  return (
    <section id="configuration" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading eyebrow="configuration" title="Sensible defaults, full control" sub="Everything works out of the box. When you need to, the published config file and a few env values cover the rest." />
      <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="reveal">
          <h3 className="mb-3 font-mono text-sm text-faint">.env</h3>
          <CodeBlock language="bash" filename=".env" code={ENV} />
          <p className="mt-4 text-sm leading-relaxed text-muted">The API key is the only required value to push. Leave the collection id empty the first time — the package creates the collection and prints its id for you to reuse.</p>
        </div>
        <div className="reveal" data-delay="100">
          <h3 className="mb-3 font-mono text-sm text-faint">config/postman-sync.php</h3>
          <div className="surface-card overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-hairline text-left"><th className="px-4 py-3 font-mono text-[0.68rem] uppercase tracking-wider text-faint">Option</th><th className="px-4 py-3 font-mono text-[0.68rem] uppercase tracking-wider text-faint">Default</th></tr></thead>
              <tbody>
                {OPTIONS.map(([k, d, desc]) => (
                  <tr key={k} className="border-b border-hairline/60 last:border-0 align-top">
                    <td className="px-4 py-3"><div className="font-mono text-[0.8rem] text-accent">{k}</div><div className="mt-1 text-xs leading-relaxed text-muted">{desc}</div></td>
                    <td className="px-4 py-3 font-mono text-[0.74rem] text-faint">{d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  )
}

const COMMANDS = [
  ['php artisan postman:sync', 'Generate locally (dry run)', 'Writes collection.json, environments and openapi.json to storage — no network, nothing pushed.', 'Routes Found        164\nRequests Generated  164\nFiles Written       5\nSynced Successfully'],
  ['php artisan postman:sync --push', 'Push & incrementally merge', 'Uploads to Postman, appending new routes and updating changed ones while keeping your manual edits.', 'Pushed to Postman (merge): added 10, updated 2, unchanged 152, orphaned 0'],
  ['php artisan postman:sync --push --fresh', 'Force a full replace', 'Rebuilds the remote collection from scratch — use when you want the generated output to win outright.', 'Pushed to Postman (replace): added 164, updated 0, unchanged 0, orphaned 0'],
]

function Commands() {
  return (
    <section id="commands" className="border-y border-hairline bg-surface/30">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading eyebrow="commands" title="One command, three modes" sub="Generate locally, push with a safe merge, or force a clean replace. Every run prints exactly what changed." />
        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {COMMANDS.map(([cmd, label, desc, out], i) => (
            <div key={cmd} className="reveal flex flex-col" data-delay={i * 70}>
              <div className="surface-card flex h-full flex-col p-5">
                <span className="eyebrow">{label}</span>
                <div className="mt-3"><CodeBlock language="bash" code={cmd} /></div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{desc}</p>
                <div className="mt-auto pt-4"><div className="rounded-lg border border-hairline bg-canvas/60 p-3 font-mono text-[0.72rem] leading-relaxed text-muted"><span className="text-faint">› output</span><pre className="mt-1 whitespace-pre-wrap text-accent/90">{out}</pre></div></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const BEFORE = `// routes/api.php
Route::post('/login', [AuthController::class, 'login']);

// app/Http/Requests/LoginRequest.php
public function rules(): array
{
    return [
        'email'    => 'required|email',
        'password' => 'required|min:8',
    ];
}`
const AFTER = `{
  "name": "login",
  "request": {
    "method": "POST",
    "header": [
      { "key": "Accept", "value": "application/json" }
    ],
    "url": { "raw": "{{base_url}}/login" },
    "body": {
      "mode": "raw",
      "raw": "{ \\"email\\": \\"user@example.com\\" }"
    }
  }
}`

function Examples() {
  return (
    <section id="examples" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <SectionHeading eyebrow="before / after" title="Your code in, a real request out" sub="The route and its form request on the left become a complete, ready-to-send Postman request on the right — body, headers and variables included." />
      <div className="mt-14 grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
        <div className="reveal">
          <div className="mb-3 flex items-center gap-2"><span className="method method-post">POST</span><span className="font-mono text-sm text-muted">Laravel route + validation</span></div>
          <CodeBlock language="php" filename="your application" code={BEFORE} />
        </div>
        <div className="hidden items-center justify-center lg:flex"><div className="grid h-10 w-10 place-items-center rounded-full border border-accent/40 bg-canvas text-accent"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M5 12h14m-7-7 7 7-7 7" /></svg></div></div>
        <div className="reveal" data-delay="100">
          <div className="mb-3 flex items-center gap-2"><span className="grid h-5 w-5 place-items-center rounded bg-accent/15 text-accent"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="m20 6-11 11-5-5" /></svg></span><span className="font-mono text-sm text-muted">Generated Postman request</span></div>
          <CodeBlock language="json" filename="collection.json" code={AFTER} />
        </div>
      </div>
    </section>
  )
}

const MATRIX = ['Laravel 10', 'Laravel 11', 'Laravel 12', 'Sanctum', 'Passport', 'JWT', 'Form Requests', 'Resource Routes', 'API Resources', 'Custom guards', 'Nested route folders', 'OpenAPI 3 export']

function Matrix() {
  return (
    <section id="matrix" className="border-y border-hairline bg-surface/30">
      <div className="mx-auto max-w-4xl px-5 py-24 lg:px-8">
        <SectionHeading eyebrow="compatibility" title="Supported out of the box" sub="Built and tested against the Laravel versions and auth stacks teams actually run." />
        <div className="reveal mt-12 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-3">
          {MATRIX.map((r) => (
            <div key={r} className="flex items-center justify-between bg-surface px-5 py-4">
              <span className="text-sm text-ink">{r}</span>
              <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/15 text-accent"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="m20 6-11 11-5-5" /></svg></span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const PROBLEMS = [
  ['Collections go stale', 'Someone changes a route and the shared collection silently falls out of date.'],
  ['Endpoints go missing', 'New routes never make it into Postman because adding them by hand is tedious.'],
  ['Teams drift apart', 'Everyone keeps their own slightly different copy and nobody agrees what is current.'],
  ['Docs and reality diverge', 'Request bodies and auth in the docs no longer match what the API actually expects.'],
]

function Why() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <div className="reveal">
          <span className="eyebrow">// the problem</span>
          <h2 className="mt-3 font-display text-[2rem] font-700 tracking-tight text-ink sm:text-[2.4rem]">Manual Postman upkeep never lasts</h2>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">Keeping a collection in step with a growing API by hand is a losing game. It works for a week, then reality drifts and trust in the collection quietly erodes.</p>
          <div className="mt-8 rounded-2xl border border-accent/30 bg-accent/8 p-6"><h3 className="font-display text-[1.05rem] font-600 text-ink">The fix</h3><p className="mt-2 text-sm leading-relaxed text-muted">Make the collection a build artifact. Re-run one command and your routes, bodies, auth, docs and tests regenerate from the code — so Postman is always a faithful mirror of the API, not a separate thing to maintain.</p></div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {PROBLEMS.map(([t, d], i) => (
            <div key={t} className="reveal surface-card p-5" data-delay={(i % 2) * 70}>
              <div className="grid h-9 w-9 place-items-center rounded-lg border border-delete/30 bg-delete/10 text-delete"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6 6 18M6 6l12 12" /></svg></div>
              <h3 className="mt-4 font-display text-[0.98rem] font-600 text-ink">{t}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const QUOTES = [
  ['We deleted the “update Postman” line from our PR checklist. The collection just tracks main now.', 'Aarav M.', 'Backend Lead', 'from-emerald-500 to-teal-500'],
  ['Onboarding a new dev used to mean re-exporting a collection by hand. Now they run one artisan command.', 'Priya S.', 'Senior Laravel Engineer', 'from-sky-500 to-blue-500'],
  ['The incremental merge is the killer feature — it adds new routes without clobbering the notes we wrote in Postman.', 'Daniel K.', 'API Platform Engineer', 'from-violet-500 to-indigo-500'],
]

function Testimonials() {
  return (
    <section id="testimonials" className="border-y border-hairline bg-surface/30">
      <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
        <SectionHeading eyebrow="from the community" title="Built for real Laravel teams" sub="How teams describe working with a collection that maintains itself." />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {QUOTES.map(([q, n, r, c], i) => (
            <figure key={n} className="reveal surface-card flex h-full flex-col p-6" data-delay={i * 80}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="text-accent/40"><path d="M7.5 6C5 6 3 8 3 10.5S5 15 7.5 15c0 2-1.5 3-3 3.5 4-.5 7-3.5 7-8C11.5 7.5 9.7 6 7.5 6Zm9 0C14 6 12 8 12 10.5S14 15 16.5 15c0 2-1.5 3-3 3.5 4-.5 7-3.5 7-8C20.5 7.5 18.7 6 16.5 6Z" /></svg>
              <blockquote className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-ink">“{q}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className={'grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br font-display text-sm font-700 text-white ' + c}>{n[0]}</span>
                <span><span className="block text-sm font-600 text-ink">{n}</span><span className="block font-mono text-[0.72rem] text-faint">{r}</span></span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="reveal mt-6 text-center font-mono text-[0.7rem] text-faint">Illustrative personas — swap in real quotes once you collect them.</p>
      </div>
    </section>
  )
}

const FAQS = [
  ['How does synchronization actually work?', 'The package scans your API routes, reflects the controllers and form requests behind them, and builds a Postman Collection v2.1 in memory. With --push it fetches the existing collection, merges in new and changed requests by a stable id, and uploads the result.'],
  ['Does it support Sanctum, Passport and JWT?', 'Yes. It detects auth middleware for Sanctum, Passport, JWT and custom guards, marks protected routes, and adds an Authorization Bearer token header so requests are ready to send once you set the token.'],
  ['Can I run it in CI/CD?', 'Absolutely — that is a core use case. Add one postman:sync --push step to your pipeline with the API key and collection id as secrets, and Postman stays current on every deploy.'],
  ['Does it work with Laravel 12?', 'Yes. The package supports Laravel 10, 11 and 12 on PHP 8.2 and above.'],
  ['Will it overwrite edits I made in Postman?', 'No. The default merge mode preserves requests you have not changed in code — including manual docs, tests and examples. Use --fresh only when you explicitly want a full replace.'],
  ['Is it production ready?', 'Yes. It is covered by an extensive test suite, passes static analysis at a strict level, and produces deterministic output so re-runs create minimal diffs.'],
]

function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq" className="mx-auto max-w-3xl px-5 py-24 lg:px-8">
      <SectionHeading eyebrow="faq" title="Frequently asked questions" />
      <div className="mt-12 space-y-3">
        {FAQS.map(([q, a], i) => (
          <div key={q} className="reveal surface-card overflow-hidden" data-delay={i * 40}>
            <button onClick={() => setOpen(open === i ? -1 : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left">
              <span className="font-display text-[1rem] font-600 text-ink">{q}</span>
              <svg className={'shrink-0 text-faint transition-transform duration-200 ' + (open === i ? 'rotate-45' : '')} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
            </button>
            {open === i && <p className="px-5 pb-5 text-sm leading-relaxed text-muted">{a}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}

const RELEASES = [
  ['v1.2.0', 'Push & incremental merge', 'One-command push to the Postman API with a safe merge that preserves manual edits, plus --fresh for a full replace.'],
  ['v1.1.0', 'In-Postman docs & OpenAPI', 'Documentation embedded in each request’s Docs tab, an OpenAPI 3 export, and auto-generated test scripts.'],
  ['v1.0.0', 'Initial release', 'Route scanning, collection generation, validation extraction, auth detection and reusable environments.'],
]

function Changelog() {
  return (
    <section id="changelog" className="border-y border-hairline bg-surface/30">
      <div className="mx-auto max-w-3xl px-5 py-24 lg:px-8">
        <SectionHeading eyebrow="changelog" title="What’s shipped" />
        <div className="mt-14">
          {RELEASES.map(([v, t, d], i) => (
            <div key={v} className="reveal relative flex gap-6 pb-10 last:pb-0" data-delay={i * 60}>
              {i < RELEASES.length - 1 && <div className="absolute left-[0.6rem] top-7 h-full w-px bg-hairline" />}
              <div className="relative mt-1 grid h-5 w-5 shrink-0 place-items-center"><span className="h-3 w-3 rounded-full border-2 border-accent bg-canvas" /></div>
              <div><div className="flex items-center gap-3"><span className="font-mono text-sm font-600 text-accent">{v}</span><span className="font-display text-[1.05rem] font-600 text-ink">{t}</span></div><p className="mt-1.5 text-sm leading-relaxed text-muted">{d}</p></div>
            </div>
          ))}
        </div>
        <div className="reveal mt-4 text-center"><Link to="/docs/changelog" className="inline-flex items-center gap-1.5 font-mono text-sm text-accent hover:text-ink">Full changelog →</Link></div>
      </div>
    </section>
  )
}

function GithubCta() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-24 lg:px-8">
      <div className="reveal relative overflow-hidden rounded-3xl border border-hairline bg-surface/60 px-6 py-16 text-center sm:px-12">
        <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[640px] -translate-x-1/2 rounded-full bg-accent/12 blur-[110px]" />
        <div className="relative">
          <span className="eyebrow">// open source</span>
          <h2 className="mx-auto mt-3 max-w-2xl font-display text-[2rem] font-700 tracking-tight text-ink sm:text-[2.6rem]">Contribute to Laravel Postman Sync</h2>
          <p className="mx-auto mt-4 max-w-xl text-[1.02rem] leading-relaxed text-muted">It’s MIT licensed and built in the open. Star it to follow along, open an issue when something’s off, or send a pull request — contributions are welcome.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href={GITHUB}><svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49v-1.7c-2.78.62-3.37-1.21-3.37-1.21-.46-1.18-1.11-1.49-1.11-1.49-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.36 9.36 0 0 1 5 0c1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.34 4.81-4.57 5.06.36.32.68.94.68 1.9v2.82c0 .27.18.59.69.49A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2Z" /></svg>Star on GitHub</Button>
            <Button href={GITHUB + '/issues'} variant="ghost">Report an issue</Button>
            <Button href={GITHUB + '/issues/new'} variant="ghost">Request a feature</Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const stats = useStats()
  useReveal([stats])
  useCounters([stats])
  return (
    <>
      <Hero stats={stats} />
      <StatGrid stats={stats} />
      <FeatureGrid />
      <Workflow />
      <Install />
      <QuickStart />
      <Configuration />
      <Commands />
      <Examples />
      <Matrix />
      <Why />
      <Faq />
      <Changelog />
      <GithubCta />
    </>
  )
}
