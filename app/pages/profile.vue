<script setup lang="ts">
import { useAsyncData, useAuth, useRequestHeaders } from '#imports'

const { data: session, status, lastRefreshedAt, getCsrfToken, getProviders, signIn, signOut, getSession } = useAuth()

const providers = await getProviders()
const csrfToken = await getCsrfToken()

// Fetch token data
const { data: token } = await useAsyncData(
  '/api/token',
  async () => {
    const headers = useRequestHeaders(['cookie'])
    const result = await $fetch('/api/token', { headers })
    return result ?? null
  }
)
await useAsyncData('logEmail', async () => {
  const headers = useRequestHeaders(['cookie'])
  const result = await $fetch('/api/protected/user', { headers })
  return result
})
</script>

<template>
  <div>
    <h2>Profile Overview</h2>

    <div v-if="status === 'authenticated'">
      <div class="profile-header">
        <img :src="session?.user?.image || '/default-avatar.png'" alt="User Avatar" class="avatar" />
        <div class="profile-info">
          <h3>{{ session?.user?.name }}</h3>
          <p>{{ session?.user?.email }}</p>
        </div>
      </div>

      <h3>Session Information</h3>
      <pre>Status: {{ status }}</pre>
      <pre>Data: {{ session || 'No session data present, are you logged in?' }}</pre>
      <pre>Last refreshed at: {{ lastRefreshedAt || 'No refresh happened' }}</pre>

      <h3>JWT Token</h3>
      <pre>Decoded JWT token: {{ token || 'No token present, are you logged in?' }}</pre>

      <h3>CSRF Token</h3>
      <pre>CSRF Token: {{ csrfToken }}</pre>
      <h3>Actions</h3>
      <div>
        <button @click="signOut({ callbackUrl: '/' })" class="signout-button">
          Sign out
        </button>
      </div>
    </div>

    <div v-else>
      <p>You are not authenticated. Please <nuxt-link to="/login">sign in</nuxt-link>.</p>
    </div>
  </div>
</template>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 1rem;
}

.profile-info h3 {
  margin: 0;
}

.signout-button {
  background-color: #ff4d4f;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
