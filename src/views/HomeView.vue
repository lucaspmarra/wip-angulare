<script setup>
import PostComponent from '../components/Post/PostComponent.vue';
import RegisterComponent from '../components/Register/RegisterComponent.vue';


</script>

<template>
  <main class="container text-center">
    <article class="row">
      <section class="col">
        <PostComponent />
      </section>
      <section class="col">
        <RegisterComponent />
      </section>
    </article>
  </main>
</template>
