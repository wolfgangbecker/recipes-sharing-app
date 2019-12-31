<script>
  import { onMount } from "svelte";
  import request from "/utils/request";
  import Recipe from "./Recipe.svelte";

  let promise = Promise.resolve({data: []});

  onMount(() => {
    promise = request.get("recipes").then(response => response.data);
  });
</script>

{#await promise}
  <div class="ui active massive centered inline loader"></div>
{:then recipes}
  <div class="ui cards">
    {#each recipes as recipe}
      <Recipe {...recipe} />
    {/each}
  </div>
{:catch error}
  <p>Failed to fetch recipes.</p>
{/await}
