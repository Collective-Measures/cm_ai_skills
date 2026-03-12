#!/usr/bin/env node

/**
 * Syncs skills markdown files to a Google Drive shared folder.
 *
 * Creates two versions of each file:
 *   - Raw .md in a "skills-md/" subfolder (for agents to read)
 *   - Google Doc in a "skills-docs/" subfolder (for humans to read)
 *
 * Files are updated in-place if they already exist (matched by name).
 *
 * Required environment variables:
 *   GOOGLE_DRIVE_FOLDER_ID — ID of the shared Drive folder
 *   GOOGLE_APPLICATION_CREDENTIALS or ambient GCP auth (WIF in CI)
 */

import { google } from 'googleapis';
import { readFileSync, readdirSync } from 'fs';
import { join, basename, extname } from 'path';

const SKILLS_DIR = join(process.cwd(), 'skills');
const DRIVE_FOLDER_ID = process.env.GOOGLE_DRIVE_FOLDER_ID;

if (!DRIVE_FOLDER_ID) {
  console.error('GOOGLE_DRIVE_FOLDER_ID environment variable is required');
  process.exit(1);
}

async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/drive'],
  });
  return auth.getClient();
}

async function ensureSubfolder(drive, parentId, folderName) {
  // Check if folder already exists
  const res = await drive.files.list({
    q: `'${parentId}' in parents and name='${folderName}' and mimeType='application/vnd.google-apps.folder' and trashed=false`,
    fields: 'files(id, name)',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  if (res.data.files.length > 0) {
    return res.data.files[0].id;
  }

  // Create folder
  const folder = await drive.files.create({
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentId],
    },
    fields: 'id',
    supportsAllDrives: true,
  });

  console.log(`Created folder: ${folderName} (${folder.data.id})`);
  return folder.data.id;
}

async function findExistingFile(drive, parentId, fileName, mimeTypeFilter) {
  const query = mimeTypeFilter
    ? `'${parentId}' in parents and name='${fileName}' and mimeType='${mimeTypeFilter}' and trashed=false`
    : `'${parentId}' in parents and name='${fileName}' and trashed=false`;

  const res = await drive.files.list({
    q: query,
    fields: 'files(id, name)',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });

  return res.data.files.length > 0 ? res.data.files[0].id : null;
}

async function uploadOrUpdateRawMd(drive, folderId, filePath) {
  const fileName = basename(filePath);
  const content = readFileSync(filePath, 'utf-8');
  const existingId = await findExistingFile(drive, folderId, fileName);

  const media = {
    mimeType: 'text/markdown',
    body: content,
  };

  if (existingId) {
    await drive.files.update({
      fileId: existingId,
      media,
      supportsAllDrives: true,
    });
    console.log(`Updated raw MD: ${fileName}`);
  } else {
    await drive.files.create({
      requestBody: {
        name: fileName,
        parents: [folderId],
      },
      media,
      fields: 'id',
      supportsAllDrives: true,
    });
    console.log(`Created raw MD: ${fileName}`);
  }
}

async function uploadOrUpdateGoogleDoc(drive, folderId, filePath) {
  const rawName = basename(filePath, extname(filePath));
  // Convert filename to title: "practix-design-system" → "Practix Design System"
  const docTitle = rawName
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  const content = readFileSync(filePath, 'utf-8');
  const existingId = await findExistingFile(
    drive,
    folderId,
    docTitle,
    'application/vnd.google-apps.document'
  );

  const media = {
    mimeType: 'text/markdown',
    body: content,
  };

  if (existingId) {
    // Google Docs can't be updated with media in-place via simple upload.
    // Delete and recreate to get a clean conversion.
    await drive.files.delete({
      fileId: existingId,
      supportsAllDrives: true,
    });
    console.log(`Replacing Google Doc: ${docTitle}`);
  }

  await drive.files.create({
    requestBody: {
      name: docTitle,
      parents: [folderId],
      mimeType: 'application/vnd.google-apps.document',
    },
    media,
    fields: 'id',
    supportsAllDrives: true,
  });
  console.log(`Created Google Doc: ${docTitle}`);
}

async function syncIndexDoc(drive, folderId, skillFiles) {
  const docTitle = 'CM AI Skills — Index';
  const indexContent = `# CM AI Skills — Shared Skills Library

## For Humans
Browse the **skills-docs/** folder for formatted, readable versions of each skill document.

## For Claude Code Agents
Point your agent to the **skills-md/** folder. Raw markdown files are optimized for agent consumption.

Tell your agent:
> "Build this following the Practix design system. Read the skills files in the shared CM AI Skills Google Drive folder."

## Available Skills

${skillFiles
  .map((f) => {
    const name = basename(f, '.md')
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
    return `- **${name}**`;
  })
  .join('\n')}

## Skills Overview

| Skill | Purpose |
|-------|---------|
| Practix Prototype Scaffold | Project setup, tech stack, file structure for new prototypes |
| Practix Design System | Colors, typography, spacing, and design tokens |
| Practix Component Patterns | Reusable UI component code (sidebar, cards, tables, forms) |
| Practix Data Viz | Recharts patterns, KPI cards, and number formatting |
| Practix Quality Checklist | Pre-review checklist to catch common prototype issues |
`;

  const existingId = await findExistingFile(
    drive,
    folderId,
    docTitle,
    'application/vnd.google-apps.document'
  );

  if (existingId) {
    await drive.files.delete({
      fileId: existingId,
      supportsAllDrives: true,
    });
  }

  await drive.files.create({
    requestBody: {
      name: docTitle,
      parents: [folderId],
      mimeType: 'application/vnd.google-apps.document',
    },
    media: {
      mimeType: 'text/markdown',
      body: indexContent,
    },
    fields: 'id',
    supportsAllDrives: true,
  });
  console.log(`Created index doc: ${docTitle}`);
}

async function main() {
  const authClient = await getAuthClient();
  const drive = google.drive({ version: 'v3', auth: authClient });

  // Get all .md files in skills/
  const skillFiles = readdirSync(SKILLS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => join(SKILLS_DIR, f))
    .sort();

  if (skillFiles.length === 0) {
    console.log('No skill files found in skills/ directory');
    process.exit(0);
  }

  console.log(`Found ${skillFiles.length} skill files to sync`);

  // Ensure subfolders exist
  const mdFolderId = await ensureSubfolder(drive, DRIVE_FOLDER_ID, 'skills-md');
  const docsFolderId = await ensureSubfolder(drive, DRIVE_FOLDER_ID, 'skills-docs');

  // Sync each file
  for (const filePath of skillFiles) {
    await uploadOrUpdateRawMd(drive, mdFolderId, filePath);
    await uploadOrUpdateGoogleDoc(drive, docsFolderId, filePath);
  }

  // Sync index doc at root level
  await syncIndexDoc(drive, DRIVE_FOLDER_ID, skillFiles);

  console.log('\nSync complete!');
  console.log(`  Raw MD files: https://drive.google.com/drive/folders/${mdFolderId}`);
  console.log(`  Google Docs:  https://drive.google.com/drive/folders/${docsFolderId}`);
}

main().catch((err) => {
  console.error('Sync failed:', err.message);
  process.exit(1);
});
