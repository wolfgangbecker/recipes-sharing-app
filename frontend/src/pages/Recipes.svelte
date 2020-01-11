<script>
  import { onMount } from "svelte";

  import request from "/utils/request";
  import Recipe from "/components/Recipe.svelte";

  let promise = Promise.resolve({data: []});

  onMount(() => {
    promise = request.get("recipes").then(response => response.data);
  });
</script>

{#await promise}
  <div class="ui active massive centered inline loader"></div>
{:then recipes}
  {#if recipes.length === 0}
    <p>No recipes available.</p>
  {:else}
    <div class="ui cards">
      {#each recipes as recipe}
        <Recipe {...recipe} />
      {/each}
    </div>
  {/if}
{:catch error}
  <p>Failed to fetch recipes.</p>
{/await}
