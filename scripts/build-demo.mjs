// Builds the Aushrit ERP prototype (backend-free demo mode) into public/demo,
// so the marketing site serves it at /demo/ from the same deployment.
//
// Usage:  npm run demo:build
// The prototype source defaults to the folder unzipped next to this project;
// override with DEMO_DIR=/path/to/original_frontend.
import { execSync } from 'node:child_process'
import { existsSync, rmSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const siteRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const demoDir = resolve(
  process.env.DEMO_DIR || resolve(siteRoot, '../../Aushrit_Prototype_Demo/Aushrit_Repository_Based_V3/original_frontend'),
)
const outDir = resolve(siteRoot, 'public/demo')

if (!existsSync(resolve(demoDir, 'package.json'))) {
  console.error(`Prototype not found at ${demoDir}. Set DEMO_DIR to its original_frontend folder.`)
  process.exit(1)
}
if (!existsSync(resolve(demoDir, 'node_modules'))) {
  console.log('Installing prototype dependencies…')
  execSync('npm ci --no-audit --no-fund', { cwd: demoDir, stdio: 'inherit' })
}

rmSync(outDir, { recursive: true, force: true })
console.log(`Building prototype into ${outDir}…`)
execSync(`npx vite build --outDir "${outDir}" --emptyOutDir`, {
  cwd: demoDir,
  stdio: 'inherit',
  env: { ...process.env, VITE_DEMO_MODE: 'true', VITE_BASE_PATH: '/demo/' },
})
console.log('Done. The live demo is served at /demo/')
