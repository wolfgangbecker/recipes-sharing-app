<script>
  import { onMount } from "svelte";
  import { fade } from 'svelte/transition';

  import request from "/utils/request";
  import Recipe from "/components/Recipe.svelte";

  let promise = Promise.resolve({data: []});

  onMount(() => {
    promise = request.get("recipes").then(response => response.data);
  });
</script>

{#await promise}
  <div class="ui active centered inline loader" in:fade></div>
{:then recipes}
  {#if recipes.length === 0}
    <p in:fade>No recipes available.</p>
  {:else}
    <div class="ui cards">
      {#each recipes as recipe}
        <Recipe {...recipe} />
      {/each}
    </div>
  {/if}
{:catch error}
  <p in:fade>Failed to fetch recipes.</p>
{/await}
