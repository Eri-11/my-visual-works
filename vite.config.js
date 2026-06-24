import { defineConfig } from "vite";
import { resolve, join } from "path";
import { readdirSync, statSync } from "fs";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

// auto collect HTML files
const inputFiles = {
  main: resolve(__dirname, "index.html"),
};

const srcDir = resolve(__dirname, "src");

try {
  const files = readdirSync(srcDir);

  files.forEach((file) => {
    const fullPath = join(srcDir, file);

    if (statSync(fullPath).isDirectory() && file !== "css") {
      const htmlPath = join(fullPath, "index.html");

      try {
        if (statSync(htmlPath).isFile()) {
          inputFiles[file] = htmlPath;
        }
      } catch (e) {}
    }
  });
} catch (e) {
  console.error("srcディレクトリの読み込みに失敗:", e);
}

export default defineConfig({
  root: "./",
  build: {
    rollupOptions: {
      input: inputFiles,
    },
  },
});
