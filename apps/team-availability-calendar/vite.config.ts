import { fileURLToPath, URL } from 'node:url'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { defineConfig, PluginOption } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // treat all tags with a dash as custom elements
          isCustomElement: (tag: any) => tag.includes('aml-')
        }
      },
      reactivityTransform: true,
      script: {
        defineModel: true,
        propsDestructure: true
      }
    }),
    vuetify({ styles: { configFile: 'src/assets/settings.scss' } }),
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
    renameIndexPlugin('templates/team_calendar_ui_full.html') as PluginOption
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
        entryFileNames: `static/staff/[name].js`,
        chunkFileNames: `static/staff/[name].js`,
        assetFileNames: `static/staff/[name].[ext]`
      }
    }
  }
})
