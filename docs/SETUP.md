# Setup Guide — CM AI Skills Google Drive Sync

## Prerequisites

- Access to GCP project `iconic-glider-100518`
- Admin access to the GitHub org to create the repo
- Google Workspace admin to create a shared Drive folder

---

## Step 1: Create the Shared Google Drive Folder

1. Go to Google Drive
2. Create a new folder: **"CM AI Skills"**
3. Share it with the entire org (or specific groups) — **Viewer** access is sufficient for consumers
4. Copy the folder ID from the URL: `https://drive.google.com/drive/folders/FOLDER_ID_HERE`

---

## Step 2: Grant the Service Account Access to the Drive Folder

The GitHub Actions workflow uses `github-actions-wif@iconic-glider-100518.iam.gserviceaccount.com`.

1. Open the shared Drive folder
2. Click **Share**
3. Add `github-actions-wif@iconic-glider-100518.iam.gserviceaccount.com` as **Editor**
4. Uncheck "Notify people" (it's a service account)

The service account also needs the Drive API enabled:

```bash
gcloud services enable drive.googleapis.com --project=iconic-glider-100518
```

---

## Step 3: Add a WIF Provider for This Repo

The existing Workload Identity Pool (`github-actions`) can be reused. Add a new provider for this repo:

```bash
gcloud iam workload-identity-pools providers create-oidc cm-ai-skills-provider \
  --project=iconic-glider-100518 \
  --location=global \
  --workload-identity-pool=github-actions \
  --display-name="CM AI Skills GitHub Actions" \
  --attribute-mapping="google.subject=assertion.sub,attribute.actor=assertion.actor,attribute.repository=assertion.repository" \
  --issuer-uri="https://token.actions.githubusercontent.com"
```

Then allow the provider to impersonate the service account. Replace `YOUR_GITHUB_ORG/cm_ai_skills` with the actual repo path:

```bash
gcloud iam service-accounts add-iam-policy-binding \
  github-actions-wif@iconic-glider-100518.iam.gserviceaccount.com \
  --project=iconic-glider-100518 \
  --role="roles/iam.workloadIdentityUser" \
  --member="principalSet://iam.googleapis.com/projects/230593617634/locations/global/workloadIdentityPools/github-actions/attribute.repository/YOUR_GITHUB_ORG/cm_ai_skills"
```

---

## Step 4: Create the GitHub Repository

```bash
cd ~/code/cm_ai_skills
git init
git add .
git commit -m "Initial commit: Practix design system skills for agency-wide Claude Code adoption"
gh repo create YOUR_GITHUB_ORG/cm_ai_skills --private --source=. --push
```

---

## Step 5: Add the GitHub Secret

Add the Drive folder ID as a repository secret:

```bash
gh secret set GOOGLE_DRIVE_FOLDER_ID --body "FOLDER_ID_FROM_STEP_1"
```

---

## Step 6: Verify

1. Push a change to any file in `skills/` on the `main` branch
2. Check GitHub Actions — the "Sync Skills to Google Drive" workflow should run
3. Open the shared Drive folder — you should see:
   - **CM AI Skills — Index** (Google Doc at root)
   - **skills-md/** subfolder with raw .md files
   - **skills-docs/** subfolder with formatted Google Docs

---

## How People Use It

### Non-developers (humans reading)
Open the shared Drive folder → browse **skills-docs/** → read the formatted Google Docs.

### Non-developers (with Claude Code agents)
Tell the agent:
> "Build this following the Practix design system. Read the skills files in the CM AI Skills shared Drive folder: https://drive.google.com/drive/u/0/folders/0AGf8K3k5ulRuUk9PVA"

If the user has Google Drive for Desktop syncing, the agent can read the files directly from their local `~/Google Drive/` path.

Alternatively, download the .md files from **skills-md/** into the prototype project directory.

### Developers
Clone this repo and reference the skills in their project's CLAUDE.md:
```markdown
See ~/code/cm_ai_skills/skills/ for Practix platform design standards.
```

---

## Updating Skills

1. Edit files in `skills/` in this repo
2. Commit and push to `main`
3. GitHub Actions automatically syncs to Google Drive
4. Everyone sees the updated docs within minutes
