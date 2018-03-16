<template>
  <header class="bg-dark-gray w-100 ph3 pv3 pv2-m pv2-l ph4-m ph5-l shadow-3">
    <nav class="f7 fw3 ttu tracked flex flex-column flex-row-m flex-row-l justify-between">
      <div class="flex flex-column flex-row-m flex-row-l">
        <nuxt-link to="/" class="link dim white dib mr3 pv2" title="Countries">Countries</nuxt-link>
        <nuxt-link to="/location" class="link dim white dib mr3 pv2" title="My Location">My Location</nuxt-link>
        <nuxt-link to="/country" class="link dim white dib mr3 pv2" title="Country">Country</nuxt-link>
      </div>
      <nuxt-link to="/about" class="link dim white dib pv1" title="About">About</nuxt-link>
    </nav>
  </header>
</template>
