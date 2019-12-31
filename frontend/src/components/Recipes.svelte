<script>
  import Recipe from "./Recipe.svelte";


</script>

<div class="ui cards">
  {#each recipes as recipe}
    <Recipe {...recipe} />
  {/each}
</div>
