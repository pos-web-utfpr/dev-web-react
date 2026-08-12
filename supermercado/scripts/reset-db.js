import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function globalSetup() {
  const dataDir = path.resolve(__dirname, "../backend/ServeRest/src/data");
  const initialDir = path.resolve(dataDir, "initial");

  if (!fs.existsSync(initialDir)) {
    console.error(`[DB Reset] Pasta de backup não encontrada em: ${initialDir}`);
    return;
  }

  const files = fs.readdirSync(initialDir).filter((file) => file.endsWith(".db"));
  for (const file of files) {
    const srcPath = path.join(initialDir, file);
    const destPath = path.join(dataDir, file);
    fs.copyFileSync(srcPath, destPath);
  }
  console.log("✅ [DB Reset] Arquivos de banco (.db) do ServeRest resetados com sucesso.");
}

// Permite execução direta via `node scripts/reset-db.js`
if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  globalSetup();
}
