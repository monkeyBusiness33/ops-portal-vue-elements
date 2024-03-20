import { fileURLToPath } from "node:url";
import { defineConfig, PluginOption } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import vue from "@vitejs/plugin-vue";
import vuetify from "vite-plugin-vuetify";

/**
 * @param newFilename {string}
 * @returns {import('vite').Plugin}
 */
const renameIndexPlugin = (newFilename: string) => {
  if (!newFilename) return;

  return {
    name: "renameIndex",
    enforce: "post",
    generateBundle(options: any, bundle: { [x: string]: any }) {
      const indexHtml = bundle["index.html"];
      indexHtml.fileName = newFilename;
    },
  };
};

export default defineConfig({
  assetsInclude: ["**/*.mp3"],
  plugins: [
    vue({
      reactivityTransform: true,
    }),
    vuetify({ styles: { configFile: "src/assets/settings.scss" } }),
    viteStaticCopy({
      targets: [
        {
          src: "src/_version.py",
          dest: "",
        },
        {
          src: "src/__init__.py",
          dest: "",
        },
      ],
    }),
    renameIndexPlugin("templates/chat_ui_full.html") as PluginOption,
  ],
  resolve: {
    alias: {
      //@ts-ignore
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  build: {
    /** If you set esmExternals to true, this plugins assumes that
         all external dependencies are ES modules */

    commonjsOptions: {
      esmExternals: true,
    },
    outDir: "../../amlopsvueelements",
    rollupOptions: {
      output: {
        entryFileNames: `static/chat/[name].js`,
        chunkFileNames: `static/chat/[name].js`,
        assetFileNames: `static/chat/[name].[ext]`,
      },
    },
  },
});
