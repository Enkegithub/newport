const fs = require("fs");
const path = require("path");

const workspaceDir = __dirname;
const certificateDir = path.join(workspaceDir, "certificate");
const outputPath = path.join(workspaceDir, "certificates-data.js");
const supportedExtensions = new Set([".pdf", ".jpg", ".jpeg", ".png", ".webp"]);

function formatTitle(fileName) {
  return fileName
    .replace(/\.[^.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function buildPublicPath(fileName) {
  return `./certificate/${encodeURIComponent(fileName).replace(/%2F/g, "/")}`;
}

function main() {
  if (!fs.existsSync(certificateDir)) {
    fs.mkdirSync(certificateDir, { recursive: true });
  }

  const files = fs
    .readdirSync(certificateDir, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => supportedExtensions.has(path.extname(name).toLowerCase()))
    .map((name) => {
      const extension = path.extname(name).slice(1).toLowerCase();
      const absolutePath = path.join(certificateDir, name);
      const stats = fs.statSync(absolutePath);

      return {
        filename: name,
        title: formatTitle(name),
        src: buildPublicPath(name),
        extension,
        kind: extension === "pdf" ? "pdf" : "image",
        updatedAt: stats.mtime.toISOString(),
      };
    })
    .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt));

  const output = `window.CERTIFICATES = ${JSON.stringify(files, null, 2)};\n`;
  fs.writeFileSync(outputPath, output, "utf8");
  process.stdout.write(`Generated ${files.length} certificate entries in certificates-data.js\n`);
}

main();
