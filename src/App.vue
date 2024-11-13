<template>
  <nav>
    <router-link to="/current">Current</router-link> |
    <router-link to="/add">Add</router-link> |
    <router-link to="/past">Past</router-link>
  </nav>
  <router-view/>
</template>

<script>

export default {
  name: 'App',
}
</script>