**ORA CLIME** 

# **Product Requirements Document** 

Website • Partner Portal • Technician Portal • Support Operations 

Version 1.0  |  Prepared: 11 October 2026 

_Derived from the supplied Oraclime-main code archive_ 

ORA CLIME | Product Requirements Document | v1.0 

## **Document Control** 

|**Field**|**Details**|
|---|---|
|Product|ORA CLIME — B2B technical service coordination platform|
|Document type|Product Requirements Document (PRD)|
|Source reviewed|Oraclime-main.zip: public pages, shared CSS/JS, login pages,<br>partner dashboard, technician dashboard and support dashboard|
|Primary audience|Founder/product owner, engineering, UI/UX, QA, operations and<br>implementation partners|
|Status|Baseline PRD for review; production behaviour must be validated<br>against the live Supabase schema, policies and deployed application|
|Terminology|Use “ORA CLIME” consistently in product copy. “ORACLIME” is<br>present in current code and may remain in existing identifiers until a<br>controlled branding update.|



### **How to Read This PRD** 

This document separates observed implementation from product requirements and recommendations. A screen, field, label or JavaScript handler in the supplied archive is evidence of intended/current UI behaviour—not proof that the feature is secure, fully integrated, or production-ready. 

Priority labels: P0 = launch blocker/core workflow; P1 = important for reliable operations; P2 = enhancement. Success targets below are proposed initial targets, not existing measured results. 

## **1. Product Overview** 

ORA CLIME is a business-to-business technical service coordination platform intended to connect business service demand with coordinated field execution. The current codebase focuses strongly on air-conditioner (AC) and related technical service operations, with a public-facing website and role-specific operational portals. 

The product’s core operating loop is: a business partner or authorised team member records a service requirement; operations reviews and assigns work; a technician handles the assigned job and submits completion evidence; operations verifies closure and tracks related collections, status and reporting. 

### **1.1 Problem Statement** 

- Service requests can be fragmented across calls, messages and spreadsheets, making ownership and status difficult to track. 

- Partners need a repeatable way to submit customer jobs and see progress without relying on manual follow-ups. 

- Operations needs a central view of unassigned leads, technician assignments, completion verification, payment/collection signals and activity. 

- Technicians need a focused mobile-friendly workflow for assigned work, customer visit details, completion evidence and relevant account actions. 

### **1.2 Product Positioning** 

The public website should be B2B partner-first, targeting AC dealers, service centres, distributors, retailers, facility managers and electrical contractors. The platform should be presented as coordinated service execution—not as a homeowner-first booking marketplace or an aggregator of unrelated third-party technicians. 

### **1.3 Product Principles** 

- Operational clarity over decorative complexity: every job should have an owner, status and next action. 

- Role-specific access: partners, technicians and support staff should see only the data and actions they are authorised to use. 

- Evidence-based completion: service closure should be traceable and verifiable. 

- Mobile-first field usability: technicians must be able to use essential flows on small screens and variable networks. 

ORA CLIME | Product Requirements Document | v1.0 

- Honest product claims: do not publish unverified coverage, certifications, service categories, response-time guarantees or performance metrics. 

## **2. Goals and Objectives** 

|**Goal**|**Objective**|**How to measure**|
|---|---|---|
|Standardise service intake|Capture required customer, location, service<br>and scheduling information in a consistent<br>record.|Required-field completeness;<br>duplicate/invalid request rate|
|Improve operational visibility|Give operations one queue for new,<br>unassigned, assigned, in-progress and<br>completed work.|Share of active jobs with valid status and<br>assigned owner|
|Enable partner self-service|Let partners create and search jobs, inspect<br>progress and manage permitted profile/bank<br>requests.|Monthly active partners; partner-created job<br>share|
|Improve field execution|Give technicians a clear job list, status<br>actions, completion submission and history.|Assignment acceptance; completion cycle<br>time; evidence completeness|
|Strengthen accountability|Keep a reliable audit trail for status changes,<br>assignments, verification and financial-<br>related actions.|Audit event coverage; unresolved<br>reconciliation discrepancies|
|Protect customer and account data|Enforce authentication, server-side<br>authorisation and database-level access<br>control.|Unauthorised access tests passed; security<br>incidents|



### **2.1 Non-Goals for the Initial MVP** 

- A public consumer marketplace with customer self-booking and self-service accounts. 

- Unverified AI-based diagnosis, automatic emergency breakdown classification or automatic service promises. 

- A full accounting/ERP replacement or automated payout system unless explicitly scoped and integrated. 

- Advanced route optimisation, live technician GPS tracking or dispatch automation unless separately approved. 

- Claims of nationwide coverage, guaranteed SLAs or certifications without operational evidence. 

## **3. Users, Roles and Permissions** 

|**Role**|**Primary needs**|**Expected permissions / boundaries**|
|---|---|---|
|Business Partner|Create service jobs, review own job history,<br>search/filter jobs, see assigned technician<br>details where allowed, submit bank-detail<br>change requests and contact support.|Access only to their own<br>organisation/partner records and associated<br>jobs; no cross-partner data access.|
|Technician|View assigned jobs, customer/site details,<br>update permitted status, submit completion<br>details/evidence, view completed history,<br>submit deposit/collection information and<br>manage allowed profile fields.|Access only to self and jobs assigned to<br>them; no reassignment, global reporting or<br>other technicians’ records.|
|Support / Operations|Manage leads, assign/change technicians,<br>maintain partner/technician records, review<br>completion evidence, track<br>services/payments, export authorised<br>reports and review activity/security signals.|Permissions should be granular; high-risk<br>actions should be logged and limited to<br>approved staff.|
|Unauthenticated visitor|Understand services and partner<br>proposition; contact the business or<br>navigate to the correct login.|No access to operational records or<br>dashboards.|
|Administrator (future/if required)|Manage configuration, roles, service<br>catalogue and system-level settings.|Separate privileged role; do not assume<br>Super Admin capabilities are implemented<br>simply because marketing/login copy<br>mentions them.|



Important access rule: hiding a button in the browser is not authorisation. Every protected database operation must be enforced through Supabase Row Level Security (RLS), trusted server-side logic, or equivalent policy controls. 

ORA CLIME | Product Requirements Document | v1.0 

## **4. Scope and Functional Requirements** 

### **4.1 Public Website** 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|WEB-01|Provide Home, About Us and<br>Contact pages with consistent<br>branding and navigation.|P0|Pages render without broken<br>links at desktop and mobile<br>widths.|
|WEB-02|Communicate the B2B partner-<br>first value proposition and<br>service coordination process.|P0|Primary CTA leads to Partner<br>With Us/contact path; copy does<br>not imply unverified capabilities.|
|WEB-03|Provide a usable contact/partner<br>enquiry form with validation and<br>clear feedback.|P0|Required fields validate;<br>success is shown only after the<br>submission is actually persisted<br>or delivered.|
|WEB-04|Provide clear navigation to the<br>correct login entry points.|P0|Partner, Technician and Support<br>access are distinct and do not<br>rely on users guessing their role.|
|WEB-05|Maintain responsive, accessible<br>layouts and readable form<br>errors.|P1|Keyboard focus is visible, labels<br>are associated with fields, and<br>core content works on narrow<br>screens.|



### **4.2 Authentication and Account Lifecycle** 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|AUTH-01|Authenticate accounts through<br>Supabase Auth or an approved<br>identity provider.|P0|Invalid credentials fail safely; no<br>password is stored in<br>application tables or logs.|
|AUTH-02|Resolve the authenticated<br>identity to an application profile<br>and verify role and status.|P0|Only active accounts with the<br>correct role reach their<br>dashboard; other sessions are<br>signed out or denied.|
|AUTH-03|Use separate Partner,<br>Technician and Support login<br>experiences.|P0|Technician login has no role<br>selector; role is validated from<br>the trusted profile.|
|AUTH-04|Provide reliable logout and<br>protected-page session checks.|P0|Logged-out users cannot read<br>protected data by navigating<br>directly to dashboard URLs.|
|AUTH-05|Support secure password<br>recovery and account<br>activation/deactivation.|P1|Recovery uses provider-<br>supported secure flows; inactive<br>accounts cannot continue to<br>access protected operations.|
|AUTH-06|Prevent user enumeration and<br>avoid leaking sensitive<br>authentication/profile details.|P1|Error messages are helpful but<br>do not expose private account or<br>system internals.|



### **4.3 Partner Dashboard** 

The supplied partner dashboard includes a login view, overview counters, recent jobs, searchable/filterable job listing, create-job form, bulk Excel upload, profile, bank information, bank-detail change request, support and job-detail/assigned-technician areas. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|PAR-01|Show partner-specific overview<br>counts for total, new, assigned,<br>in-progress and completed jobs.|P0|Counts are derived from<br>authorised database records<br>and reconcile with the job list.|
|PAR-02|Create a service job with<br>customer name, mobile,<br>address, city/pincode, service<br>type and optional preferred<br>date/time and notes.|P0|Required values are validated; a<br>unique job/request identifier is<br>created; errors are actionable.|
|PAR-03|Search and filter thepartner’s|P0|Results are scoped to the|



ORA CLIME | Product Requirements Document | v1.0 

||jobs by keyword and status.||signed-in partner and filters can<br>be cleared.|
|---|---|---|---|
|PAR-04|Display job details and assigned<br>technician information when<br>available and authorised.|P0|Unassigned jobs show a clear<br>unassigned state; customer and<br>technician data are not exposed<br>across partners.|
|PAR-05|Support bulk Excel import with<br>preview, row-level validation and<br>a result summary.|P1|Invalid rows are not silently<br>accepted; duplicates and partial<br>imports are reported.|
|PAR-06|Display partner profile and bank<br>information under suitable<br>access controls.|P1|Sensitive values are masked<br>where practical and never<br>exposed to other partners.|
|PAR-07|Allow a partner to request a<br>bank-detail change with reason<br>and status tracking.|P1|Request is recorded for review; it<br>does not silently overwrite<br>verified payout details.|
|PAR-08|Provide a support contact path<br>and clear loading, empty,<br>success and error states.|P1|All major actions provide truthful<br>feedback and do not leave<br>controls indefinitely loading.|



### **4.4 Technician Dashboard** 

The supplied technician dashboard contains assigned/accepted/in-progress/completed counters, a job list, refresh action, completed-job history with date navigation, deposit collection form, profile modal and service-completion submission interface. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|TEC-01|Show a technician-specific<br>summary and assigned jobs.|P0|All job queries are limited to the<br>authenticated technician’s<br>permitted assignments.|
|TEC-02|Show job number, customer,<br>location/service details and<br>current status.|P0|Data is current, readable on<br>mobile and includes safe<br>handling for missing fields.|
|TEC-03|Allow only valid job-status<br>transitions.|P0|Invalid transitions are rejected<br>by trusted logic/database policy;<br>status changes are timestamped<br>and attributed.|
|TEC-04|Submit service completion<br>details and required evidence.|P0|Completion is not treated as<br>verified until required<br>fields/evidence are saved and,<br>where configured, reviewed.|
|TEC-05|Support completed-job history<br>and date-based navigation.|P1|History uses persisted<br>completion timestamps and<br>accurately reflects selected<br>dates.|
|TEC-06|Record deposit/collection<br>amount, mode, transaction<br>reference and proof where<br>applicable.|P1|Submission is auditable and<br>clearly marked pending<br>verification until reconciled.|
|TEC-07|Allow technician profile<br>viewing/updating only for<br>approved fields.|P1|Sensitive fields and role/status<br>cannot be self-edited by the<br>technician.|
|TEC-08|Provide loading, empty, error,<br>disabled and retry states.|P0|Network/database failures do<br>not appear as successful<br>updates.|



### **4.5 Support and Operations Dashboard** 

The supplied support dashboard is the largest operational surface. Its visible sections include service operations, leads, technician assignments, technicians, partners, customers, lead control, reports, services, payments, technician collection, data export, notifications, recent activity, activity logs, settings, account/security, password reset, completion-code creation and completion verification. 

|**ID**|**Requirement**|**Priority**|**Acceptance criteria**|
|---|---|---|---|
|OPS-01|Provide a central dashboard for|P0|Counters use consistent|



ORA CLIME | Product Requirements Document | v1.0 

||lead and job statuses including<br>new, unassigned, assigned, in-<br>progress, completed,<br>rescheduled and payment-<br>pending signals where<br>supported.||definitions and match underlying<br>filtered records.|
|---|---|---|---|
|OPS-02|List/search/filter leads and<br>expose clear<br>empty/loading/error states.|P0|Filters work together predictably<br>and do not reveal unauthorised<br>records.|
|OPS-03|Assign a technician and change<br>assignment with a recorded<br>reason/actor where appropriate.|P0|Only eligible active technicians<br>can be assigned; changes are<br>auditable.|
|OPS-04|Manage technician and partner<br>records within authorised<br>permissions.|P1|Create/update/deactivate<br>actions validate required fields<br>and record actor/time.|
|OPS-05|Review service completion<br>submissions and evidence;<br>approve, reject or request<br>correction.|P0|Decision, reviewer, timestamp<br>and reason are stored; rejected<br>submissions return to a clear<br>actionable state.|
|OPS-06|Manage service catalogue and<br>lead control where<br>implemented.|P1|Inactive service types cannot be<br>newly selected; historical<br>records remain readable.<br>i|
|OPS-07|Provide reports and complete<br>data export for authorised staff.|P1|Exports respect filters, access<br>permissions and data-<br>minimisation rules; export<br>activity is logged.|
|OPS-08|Track payment/collection states<br>and technician collection<br>submissions.|P1|Operational statuses are distinct<br>from confirmed financial<br>reconciliation.|
|OPS-09|Expose notifications, recent<br>activity and activity logs.|P1|Events include actor, action,<br>target record and timestamp;<br>sensitive data is not copied into<br>logs.|
|OPS-10|Provide account/security<br>settings and password-reset<br>workflows.|P1|Privileged operations require<br>proper authorisation and secure<br>provider-supported flows.|



### **4.6 Service Request / Job Lifecycle** 

|**Stage**|**Expected behaviour**|**Control / exit condition**|
|---|---|---|
|1. Created / New|Partner or authorised operations user<br>submits a request with customer, location,<br>service and scheduling information.|Required fields valid; unique request/job ID<br>generated.|
|2. Review / Unassigned|Operations checks completeness, scope<br>and serviceability.|Request is accepted for dispatch, corrected,<br>rejected or otherwise explicitly<br>dispositioned.|
|3. Assigned|Operations assigns an eligible technician.|Assignment saved with actor and<br>timestamp; technician can see the job.|
|4. Accepted / In progress|Technician acknowledges and progresses<br>the job using permitted transitions.|State transition and relevant timestamps<br>recorded.|
|5. Completion submitted|Technician records outcome and uploads<br>required service evidence.|Required completion data saved; status<br>becomes awaiting verification if review is<br>required.|
|6. Verified / Completed|Operations reviews evidence and confirms<br>closure, or rejects/returns it for correction.|Verifier, decision, timestamp and reason<br>recorded; metrics use a consistent closure<br>timestamp.|
|7. Rescheduled / Cancelled / Exception|Authorised user records exception, reason<br>and next action.|Reason and actor recorded; job remains<br>traceable and is not silently deleted.|



The exact status vocabulary in the database must be standardised before implementation. The labels above describe a recommended workflow; they must be mapped to existing enum values and business rules rather than blindly added as new statuses. 

ORA CLIME | Product Requirements Document | v1.0 

## **5. User Experience Requirements** 

### **5.1 Core Journeys** 

1. Partner journey: sign in → overview → create job or bulk import → review job status → open job details → contact support if blocked. 

2. Technician journey: sign in → view assigned jobs → open job → perform permitted status updates → submit completion and evidence → check completion history or collection status. 

3. Support journey: sign in → review new/unassigned leads → validate request → assign/change technician → monitor progress → verify completion → review collection/payment signals → report/export. 

4. Visitor journey: understand B2B offer → review company/services → submit enquiry or choose the appropriate login. 

### **5.2 UX Standards** 

- Use plain, businesslike language and consistent service/status terminology. 

- Every form must show required fields, validation, submission progress and a final success/error outcome. 

- Disable duplicate submissions while an operation is in flight; do not display success until persistence is confirmed. 

- Use explicit empty states such as “No jobs assigned yet” rather than unexplained blank panels. 

- On mobile, keep primary technician actions easy to reach and avoid dense multi-column detail layouts. 

- Use confirmation for destructive or high-impact actions such as deactivation, reassignment or export. 

- Ensure keyboard navigation, visible focus, sufficient contrast, associated labels and accessible status messages. 

## **6. Data and Integration Requirements** 

### **6.1 Observed Technical Direction** 

The archive references Supabase Auth and the Supabase JavaScript client, and the README explicitly calls out Supabase Auth, PostgreSQL, Storage, backend/API validation and RLS as production integration requirements. The supplied public pages are static HTML/CSS/JavaScript. The README proposes a future migration to Next.js, TypeScript, Tailwind, Supabase and Vercel; this is a recommendation in the README, not proof that migration has occurred. 

### **6.2 Core Data Entities (proposed logical model)** 

|**Entity**|**Important fields / relationships**|**Notes**|
|---|---|---|
|app_users|id linked to auth user, full_name, email, role,<br>status|Role and status must be controlled by<br>trusted operations, not user-editable client<br>input.<br>i|
|partners|partner_id, organisation/contact details,<br>status, linked user(s)|Exact schema must be confirmed against<br>Supabase.|
|technicians|technician_id, linked user, status, approved<br>profile fields|Only eligible active technicians should be<br>assignable.|
|service_jobs / leads|job_id, public/reference code, partner_id,<br>customer/site details, service type,<br>schedule, status, notes|Use consistent canonical status and<br>timestamp fields.|
|assignments|job_id, technician_id, assigned_by,<br>assigned_at, history|Keep history when assignment changes; do<br>not overwrite all evidence of prior<br>assignments.|
|completion_submissions|job_id, technician_id, outcome, photos/files,<br>submitted_at, review state, reviewer|Separate submitted completion from verified<br>completion where review is required.|
|collection_records|job_id/technician_id, amount, mode,<br>reference, proof, verification state|Do not equate submitted proof with<br>confirmed receipt.|
|bank_change_requests|partner_id, request details, reason, status,<br>reviewer, timestamps|Sensitive changes require review and audit<br>trail.|
|audit_events|actor, action, entity, entity_id, timestamp,<br>safe metadata|Must be append-only or otherwise protected<br>from ordinary user modification.|



ORA CLIME | Product Requirements Document | v1.0 

### **6.3 File and Photo Storage** 

The UI includes completion evidence and collection-proof concepts, but the supplied archive alone does not establish the definitive storage location or production retention policy. Production requirements: store files in Supabase Storage or an approved object store; use private buckets for customer/service evidence; enforce access through authenticated, short-lived access mechanisms and storage policies; associate each file with a job and uploader; validate size/type; define retention/deletion rules; and avoid public bucket access for private service photographs. 

### **6.4 Integration and Environment Requirements** 

- Use separate development/staging/production environments and keep credentials out of source control. 

- A publishable/anon key may be used in the browser only with correctly configured RLS; never ship a service-role/secret key in frontend code. 

- Use trusted server-side functions/API endpoints for privileged operations, sensitive workflow transitions, bulk imports and any operation that cannot be safely enforced by RLS alone. 

- Add database migrations, schema documentation and repeatable setup instructions. 

- Define backup, recovery, monitoring and alerting procedures before production launch. 

## **7. Non-Functional Requirements** 

|**Area**|**Requirement**|**Proposed acceptance target**|
|---|---|---|
|Security|Role-based authorisation, RLS, least<br>privilege, safe secrets, secure session<br>handling and audit trail.|All role-boundary and direct-URL/API access<br>tests pass before launch.|
|Performance|Optimise dashboard queries, pagination and<br>payload size.|Core dashboard view target ≤ 3 seconds at<br>the 95th percentile under agreed test<br>conditions.|
|Reliability|Handle transient network/database errors<br>and avoid duplicate writes.|Critical mutations are idempotent or<br>guarded against duplicate submission.|
|Responsive design|Support modern desktop and mobile<br>browsers.|No horizontal overflow in core workflows at<br>360 px viewport width.|
|Accessibility|Keyboard access, labels, focus, contrast<br>and meaningful status announcements.|Core forms and navigation pass a manual<br>accessibility checklist.|
|Privacy|Minimise customer data exposure and<br>restrict exports/files.|Cross-partner and cross-technician data<br>leakage tests pass.|
|Maintainability|Shared components, documented status<br>model, typed/validated data contracts and<br>migration history.|A new developer can run the project using<br>documented setup instructions.|
|Observability|Capture errors and operational events<br>without secrets or unnecessary personal<br>data.|Critical auth, assignment, completion and<br>export failures are traceable.|



Targets are proposed starting points. Confirm expected usage, hosting, network conditions and service commitments before treating them as contractual SLAs. 

## **8. Success Metrics** 

|**Metric**|**Definition**|**Initial target / measurement note**|
|---|---|---|
|Job intake completeness|Requests with all required intake fields ÷ all<br>submitted requests.|≥ 95%; review weekly.|
|Assignment turnaround|Time from valid request creation to first<br>technician assignment.|Establish baseline first; set target by service<br>type/operating hours.|
|Assignment coverage|Eligible active jobs with an assigned<br>technician ÷ eligible active jobs.|≥ 95% within the agreed dispatch window.|
|Completion evidence completeness|Completion submissions containing all<br>required fields/files ÷ submissions.|≥ 95%; measure by service type.|
|Verified completion rate|Verified completed jobs ÷ jobs due for<br>completion in the period.|Set a baseline; segment by partner, service<br>and technician.|



ORA CLIME | Product Requirements Document | v1.0 

|Rework / rejection rate|Completion submissions returned for<br>correction ÷ all completion submissions.|Track trend; investigate by reason rather<br>than rewarding artificially low reporting.|
|---|---|---|
|Partner adoption|Partners active in a month (e.g., at least one<br>valid job action).|Define active precisely; track month-over-<br>month.|
|Login success rate|Successful login attempts ÷ valid attempted<br>sign-ins, excluding known test traffic.|Monitor trends; separate user errors from<br>service failures.|
|Data integrity|Duplicate jobs, orphaned assignments,<br>invalid status transitions and reconciliation<br>mismatches.|Zero known critical integrity errors at<br>release; monitor continuously.<br>i|
|User-reported friction|Support contacts attributable to portal<br>confusion or failed workflows.|Baseline first; review recurring themes<br>monthly.|



Do not publish targets as achieved results until real usage data supports them. A dashboard counter is not itself a success metric unless its definition and source are consistent. 

## **9. MVP Prioritisation** 

|**Priority**|**Scope**|
|---|---|
|P0 — Must ship|Reliable role-specific login; protected dashboard data; partner job<br>creation/list/detail; support lead queue and technician assignment;<br>technician job view and valid status progression; completion<br>submission and verification; consistent statuses; auditability for<br>critical changes; secure RLS and private evidence storage; mobile-<br>ready core flows.|
|P1 — Should ship|Bulk Excel import with validation; partner bank-detail change<br>request; technician collection/deposit submission; completed-job<br>history/date filters; reports/export; notifications/activity feed; profile<br>management; password recovery and account lifecycle controls.|
|P2 — Later|Advanced dispatch optimisation, analytics segmentation, richer<br>notifications, customer-facing tracking, native mobile-specific<br>capabilities, integrations with external accounting/CRM systems.|



## **10. Acceptance Criteria for MVP Release** 

- An active partner can authenticate and create a valid service job; the job persists and appears only in the correct partner’s workspace and authorised operations views. 

- An active support user can review a new job, assign an eligible technician and see the assignment reflected consistently. 

- A technician can sign in, see only their assigned work and perform only allowed status transitions. 

- A technician can submit completion data and evidence; operations can review it and record an approve/reject decision with an audit trail. 

- A user with the wrong role, inactive status or no valid session cannot access dashboard data by directly opening URLs or calling database/API endpoints. 

- Private customer/service files are not publicly accessible and only authorised users can retrieve them. 

- Dashboard counters, job lists, status filters and reports use the same agreed status definitions. 

- All core screens have loading, empty, success and failure states; no failed operation is shown as successful. 

- Core workflows pass mobile, keyboard navigation, duplicate-submit and poor-network retry tests. 

- Environment setup, schema migrations, role/policy setup, backups and release/rollback instructions are documented. 

## **11. Risks, Gaps and Decisions Required** 

|**Risk / gap**|**Why it matters**|**Required action**|
|---|---|---|
|Frontend does not prove backend readiness|Somepages or features maybepresent in UI|Audit live schema,RLSpolicies,storage|



ORA CLIME | Product Requirements Document | v1.0 

||but still be incomplete, demo-only or<br>dependent on database policies.|policies, triggers and deployed behaviour<br>before release.<br>i|
|---|---|---|
|Potential mismatch between login pages and<br>roles|A generic login page and dedicated role login<br>pages can confuse users or permit incorrect<br>routing if role checks differ.<br>f|Define one source of truth for role and<br>status; specify intended entry URLs and<br>remove obsolete role selectors.|
|Unclear canonical job statuses|Different counters and screens can disagree<br>if labels/enums are inconsistent.|Approve a state machine, transition matrix<br>and definitions for every status.|
|Photo/storage behaviour not confirmed|Customer service images may be exposed or<br>lost if storage is misconfigured.|Confirm bucket names, path convention,<br>privacy, upload validation, retention and<br>database references.|
|Financial information sensitivity|Bank details, deposits and collection proof<br>require stronger access controls and review.|Define masking, approval, audit,<br>reconciliation and retention requirements.|
|Bulk import errors|Duplicate/invalid rows can create<br>operational and customer issues.|Add preview, validation, deduplication<br>strategy, partial-success report and import<br>audit log.|
|Static HTML/JS scaling and maintainability|Duplicated logic and client-side privilege<br>assumptions become harder to manage as<br>the product grows.|Choose and document the production<br>architecture; centralise validation and<br>privileged business logic.|
|Public copy may overpromise|Unsupported coverage, response-time or<br>service-category claims damage trust.|Approve a source-of-truth service catalogue<br>and only publish substantiated claims.|



### **11.1 Decisions to Confirm Before Engineering Sign-Off** 

5. What are the canonical job statuses and allowed transitions, including cancellation, rescheduling, rejection and rework? 

6. Which fields and photos are mandatory for each service type, and which are optional? 

7. Does every completion require support verification, or can some job types auto-close under approved rules? 

8. What exactly constitutes a deposit/collection, who verifies it, and how is it reconciled? 

9. Can a partner have multiple user accounts? Can a technician be assigned to more than one active job at a time? 

10. What are the data retention periods for customer records, service photos, exports and audit events? 

11. Which service categories are in the launch catalogue, and which claims/coverage areas are operationally confirmed? 

12. Is the target release the current static app with hardened backend integration or a migration to the README’s proposed Next.js/TypeScript architecture? 

## **12. QA and Test Plan** 

|**Test group**|**Examples**|
|---|---|
|Authentication & roles|Correct role login; wrong role denial; inactive account denial; logout;<br>expired session; direct URL access.<br>i|
|Partner isolation|Partner A cannot read/update Partner B’s jobs, profile, bank details<br>or file evidence.|
|Technician isolation|Technician A cannot access Technician B’s jobs or change<br>assignments/roles.|
|Workflow transitions|Valid transitions succeed; invalid/skipped transitions fail;<br>reassignment and completion decisions are logged.<br>i|
|Forms & imports|Required-field validation, malformed mobile/pincode, invalid service<br>type, duplicate submission, invalid spreadsheet rows.<br>i|
|Evidence & files|Upload type/size validation, private access, missing file, rejected<br>completion and resubmission.<br>l|
|Responsive/accessibility|Small screens, keyboard-only flow, visible focus, form labels, error<br>announcements and contrast.|
|Reliability|Slow connection, timeout, refresh during submission, retry<br>behaviour and duplicate-write prevention.<br>i|
|Reports & export|Permission checks, filter consistency, correct totals, export audit<br>and data minimisation.|



ORA CLIME | Product Requirements Document | v1.0 

## **13. Recommended Release Sequence** 

13. Phase 0 — Validate foundation: inspect production Supabase schema/policies, inventory every UI action, confirm roles and status state machine. 

14. Phase 1 — Secure core: harden auth/session checks, RLS, storage privacy, server-side validation and audit events. 

15. Phase 2 — End-to-end operations: partner job creation → support assignment → technician execution → completion review. 

16. Phase 3 — Operational completeness: bulk import, collection workflow, profile/bank requests, reporting and notifications. 

17. Phase 4 — Release readiness: QA matrix, accessibility/mobile checks, monitoring, backup/rollback and controlled pilot with selected business partners. 

## **Appendix A — Code Archive Inventory** 

|**Path**|**Observed purpose**|
|---|---|
|index.html|Public home/marketing page.|
|about.html|Company positioning and operating model.|
|contact.html|Contact/partner enquiry experience.<br>i|
|login.html|General login entry page with role-related UI identifiers.|
|technician-login.html|Dedicated technician login; Supabase Auth and app_users<br>role/status checks are visible in code.|
|support-login.html|Dedicated support login; Supabase Auth and SUPPORT role/status<br>checks are visible in code.|
|partner-dashboard.html|Partner login/dashboard, job management, bulk import, profile and<br>bank-related flows.|
|technician-dashboard.html|Technician jobs, history, completion, deposit/collection and profile<br>flows.|
|support-dashboard.html|Large support operations dashboard covering leads, assignments,<br>completion review, reports, payments/collections, exports and<br>activity.|
|assets/style.css|Shared site styling.|
|assets/app.js|Shared JavaScript; requires full behaviour review before production<br>sign-off.|
|README.md|Describes current archive as a responsive website starter and lists<br>production integrations and a possible future stack.|



## **Appendix B — PRD Boundaries** 

This PRD is based on a structural and feature-oriented review of the supplied archive. It does not certify the live deployment, database schema, storage configuration, security policies, actual user analytics, or all runtime paths. Those items require code execution and backend configuration review. Product owners should approve the proposed requirements and targets before they are treated as committed scope. 

ORA CLIME | Product Requirements Document | v1.0 

