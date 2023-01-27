<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-black text-white">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          ChatGPT V2
        </q-toolbar-title>

        <!-- <div>Quasar v{{ $q.version }}</div> -->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
    <br />
      <q-list>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
  {
    title: 'Reset Thread',
    // caption: 'Reset Thread',
    icon: 'autorenew'
    // link: '/'
  },
  {
    title: 'Dark Mode',
    // caption: 'Dark Mode',
    icon: 'dark_mode'
  },
  {
    title: 'Discord',
    // caption: 'Discord',
    icon: 'discord'
  },
  {
    title: 'Learn More',
    // caption: 'Learn More',
    icon: 'open_in_new',
    link: 'https://instagram.com/singotech.id/'
  },
  {
    title: 'Log out',
    // caption: 'Log out',
    icon: 'logout'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
