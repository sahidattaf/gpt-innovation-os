import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const forwarded = process.argv.slice(2);
const isPreview =
  forwarded.includes("--host") || forwarded.includes("--strictPort");

if (!isPreview) {
  const turbo = fileURLToPath(
    new URL("../node_modules/turbo/bin/turbo", import.meta.url),
  );
  const child = spawn(process.execPath, [turbo, "run", "dev", ...forwarded], {
    stdio: "inherit",
  });
  child.on("exit", (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    process.exit(code ?? 1);
  });
} else {
  const next = fileURLToPath(
    new URL("../apps/website/node_modules/next/dist/bin/next", import.meta.url),
  );
  const nextArgs = ["dev"];

  for (let index = 0; index < forwarded.length; index += 1) {
    const argument = forwarded[index];
    if (argument === "--" || argument === "--strictPort") continue;
    if (argument === "--host") {
      nextArgs.push("--hostname");
      const host = forwarded[index + 1];
      if (host) {
        nextArgs.push(host);
        index += 1;
      }
      continue;
    }
    nextArgs.push(argument);
  }

  const child = spawn(process.execPath, [next, ...nextArgs], {
    cwd: fileURLToPath(new URL("../apps/website", import.meta.url)),
    stdio: "inherit",
  });
  child.on("exit", (code, signal) => {
    if (signal) process.kill(process.pid, signal);
    process.exit(code ?? 1);
  });
}
