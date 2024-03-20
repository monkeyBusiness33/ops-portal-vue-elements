import { fileURLToPath } from 'node:url'
import { defineConfig, PluginOption } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import vue from '@vitejs/plugin-vue'

/**
 * @param newFilename {string}
 * @returns {import('vite').Plugin}
 */
const renameIndexPlugin = (newFilename: string) => {
  if (!newFilename) return

  return {
    name: 'renameIndex',
    enforce: 'post',
    generateBundle(options: any, bundle: { [x: string]: any }) {
      const indexHtml = bundle['index.html']
      indexHtml.fileName = newFilename
    }
  }
}

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag) => tag.includes('aml-')
        }
      },
      reactivityTransform: true,
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/_version.py',
          dest: ''
        },
        {
          src: 'src/__init__.py',
          dest: ''
        }
      ]
    }),
    renameIndexPlugin('templates/mission_create_ui_full.html') as PluginOption
  ],
  resolve: {
    alias: {
      //@ts-ignore
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    modules: {
      localsConvention: 'camelCase'
    }
  },
  build: {
    /** If you set esmExternals to true, this plugins assumes that
         all external dependencies are ES modules */

    commonjsOptions: {
      esmExternals: true
    },
    outDir: '../../amlopsvueelements',
    rollupOptions: {
      output: {
        entryFileNames: `static/mission/[name].js`,
        chunkFileNames: `static/mission/[name].js`,
        assetFileNames: `static/mission/[name].[ext]`
      }
    }
  }
})
