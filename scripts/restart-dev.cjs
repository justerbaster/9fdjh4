const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const root = path.join(__dirname, "..");
const lockPath = path.join(root, ".next", "dev", "lock");

function stopPreviousDev() {
  try {
    const raw = fs.readFileSync(lockPath, "utf8");
    const j = JSON.parse(raw);
    if (!j.pid) return;
    try {
      process.kill(j.pid, 0);
    } catch {
      return;
    }
    try {
      process.kill(j.pid, "SIGTERM");
    } catch {}
    const deadline = Date.now() + 2500;
    while (Date.now() < deadline) {
      try {
        process.kill(j.pid, 0);
      } catch {
        break;
      }
    }
    try {
      process.kill(j.pid, 0);
      process.kill(j.pid, "SIGKILL");
    } catch {}
  } catch {}
  try {
    fs.unlinkSync(lockPath);
  } catch {}
}

stopPreviousDev();

const nextCli = path.join(root, "node_modules", "next", "dist", "bin", "next");
const child = spawn(
  process.execPath,
  [nextCli, "dev", "--hostname", "127.0.0.1", "--port", "3000"],
  { cwd: root, stdio: "inherit" }
);
child.on("exit", (code) => process.exit(code ?? 0));
