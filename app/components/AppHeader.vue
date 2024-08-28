<script setup lang="ts">
import type { NavItem } from '@nuxt/content'
import { useAuth } from '#imports'

const { data: session, status, signOut } = useAuth()

const navigation = inject<Ref<NavItem[]>>('navigation', ref([]))
const links = [{
  label: 'Docs',
  to: '/docs'
}, {
  label: 'Pricing',
  to: '/pricing'
}, {
  label: 'Blog',
  to: '/blog'
}]
</script>

<template>
  <UHeader :links="links">
    <template #logo>
      Nuxt UI Pro <UBadge
        label="SaaS"
        variant="subtle"
        class="mb-0.5"
      />
    </template>

    <template #right>
      <div v-if="status === 'authenticated'" class="relative group">
        <span class="cursor-pointer">{{ session?.user?.name }}</span>
        <!-- Dropdown Menu -->
        <div class="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <ul class="py-1">
            <li>
              <nuxt-link to="/profile" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</nuxt-link>
            </li>
            <li>
              <button @click="signOut({ callbackUrl: '/' })" class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
            </li>
          </ul>
        </div>
      </div>
      <div v-else>
        <UButton
          label="Sign in"
          color="gray"
          to="/login"
        />
        <UButton
          label="Sign up"
          icon="i-heroicons-arrow-right-20-solid"
          trailing
          color="black"
          to="/signup"
          class="hidden lg:flex"
        />
      </div>
    </template>

    <template #panel>
      <UNavigationTree
        :links="mapContentNavigation(navigation)"
        default-open
      />
    </template>
  </UHeader>
</template>
