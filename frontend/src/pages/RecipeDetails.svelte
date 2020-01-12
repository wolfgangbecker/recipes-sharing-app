<script>
  import { onMount } from "svelte";
  import { fade } from 'svelte/transition';

  import request from "/utils/request";
  import Recipe from "/components/Recipe.svelte";

  export let id;

  let promise = Promise.resolve({data: {}});

  onMount(() => {
    promise = request.get(`recipes/${id}`).then(response => response.data);
  });
</script>

{#await promise}
  <div class="ui active centered inline loader" in:fade></div>
{:then recipe}
  <Recipe {...recipe} />
{:catch error}
  <p in:fade>Failed to fetch recipe.</p>
{/await}

