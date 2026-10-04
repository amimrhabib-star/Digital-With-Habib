import fs from 'node:fs';
import path from 'node:path';
import { randomUUID } from 'node:crypto';

export function atomicWrite(file: string, data: unknown) {
  fs.mkdirSync(path.dirname(file), {recursive: true});
  const temporary = `${file}.${randomUUID()}.tmp`;
  const fd = fs.openSync(temporary, 'wx', 0o600);
  try { fs.writeFileSync(fd, JSON.stringify(data, null, 2)); fs.fsyncSync(fd); }
  finally { fs.closeSync(fd); }
  fs.renameSync(temporary, file);
  const dir = fs.openSync(path.dirname(file), 'r');
  try { fs.fsyncSync(dir); } finally { fs.closeSync(dir); }
}

export function createStore(directory: string, seed: Record<string, any>) {
  fs.mkdirSync(directory, {recursive: true});
  const contentPath = path.join(directory, 'content.json');
  const backupDir = path.join(directory, 'revisions');
  fs.mkdirSync(backupDir, {recursive: true});
  if (!fs.existsSync(contentPath)) atomicWrite(contentPath, {...seed, revision: 1});
  // Corrupt files fail visibly. Never replace an unreadable file with defaults.
  const read = () => JSON.parse(fs.readFileSync(contentPath, 'utf8'));
  read();
  const save = (content: Record<string, any>, expected: number) => {
    const current = read();
    if (current.revision !== expected) throw Object.assign(new Error('Another session changed the site. Reload the latest version before saving.'), {status: 409});
    const next = {...content, revision: current.revision + 1, updatedAt: new Date().toISOString()};
    atomicWrite(path.join(backupDir, `${String(current.revision).padStart(10,'0')}.json`), current);
    atomicWrite(contentPath, next);
    // Keep 100 content revisions; uploaded media is never automatically deleted.
    fs.readdirSync(backupDir).filter(f => /^\d+\.json$/.test(f)).sort().slice(0,-100).forEach(f => fs.unlinkSync(path.join(backupDir,f)));
    return next;
  };
  return {read, save, contentPath, backupDir};
}
