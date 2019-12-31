<script>
  import axios from "axios";
  import { onMount } from "svelte";
  import Recipe from "./Recipe.svelte";

  let promise = Promise.resolve({data: []});

  onMount(() => {
    promise = axios.get("http://localhost:3000/recipes").then(response => response.data);
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
