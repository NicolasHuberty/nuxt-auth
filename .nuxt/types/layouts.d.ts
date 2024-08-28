import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "auth" | "default"
declare module "../../node_modules/.pnpm/nuxt@3.13.0_@parcel+watcher@2.4.1_@types+node@22.5.0_better-sqlite3@11.2.1_drizzle-orm@0.33.0_ob77ehyr3joxkudxgnhru2f57y/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}