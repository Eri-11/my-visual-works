import { defineConfig } from 'vite';
import { resolve, join } from 'path';
import { readdirSync, statSync } from 'fs';
import { fileURLToPath } from 'url';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

// 自動収集したHTMLを入れるオブジェクト
const inputFiles = {
  main: resolve(__dirname, 'index.html'),
};

const targetDirs = [resolve(__dirname, '2d'), resolve(__dirname, '3d')];

targetDirs.forEach((dirPath) => {
  try {
    const files = readdirSync(dirPath);

    files.forEach((file) => {
      const fullPath = join(dirPath, file);

      if (statSync(fullPath).isDirectory()) {
        const htmlPath = join(fullPath, 'index.html');

        try {
          if (statSync(htmlPath).isFile()) {
            inputFiles[file] = htmlPath;
          }
        } catch (e) {}
      }
    });
  } catch (e) {}
});

export default defineConfig({
  base: '/my-visual-works/',
  root: './',
  build: {
    rollupOptions: {
      input: inputFiles,
    },
  },
});
