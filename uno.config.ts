import { defineConfig, presetMini, presetUno } from 'unocss'
import presetIcons from '@unocss/preset-icons'
import presetAttributify from '@unocss/preset-attributify'
import { presetScrollbarHide } from 'unocss-preset-scrollbar-hide'
import shadcnPreset from './preset.shadcn'

export default defineConfig({
  presets: [
    shadcnPreset(),
    presetMini(),
    presetUno(),
    presetIcons({
      collections: {
        mdi: () => import('@iconify-json/mdi/icons.json').then(i => i.default),
      },
    }),
    presetAttributify(),
    presetScrollbarHide(),
  ],
  shortcuts: [
    {
      'animate-accordion-up': 'accordion-up',
      'animate-accordion-down': 'accordion-down',
    },
  ],
  include: [/\.ts/, /\.vue$/, /\.vue\?vue/],
})
