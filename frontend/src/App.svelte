<script>
  import { Router, Link, Route } from "svelte-routing";

  import Recipes from "./components/Recipes.svelte"
  import NewRecipe from "./components/NewRecipe.svelte"
  import NotFound from "./components/NotFound.svelte"

  import NavLink from "./NavLink.svelte"
</script>

<style>
  .container {
    margin-top: 3rem;
  }
</style>

<Router>
  <div class="ui container">
    <div class="ui pointing menu">
      <NavLink to="recipes/new">
        New Recipe
      </NavLink>
      <NavLink to="recipes">
        View Recipes
      </NavLink>
      <div class="right menu">
        <div class="item">
          Login
        </div>
      </div>
    </div>
    <div class="ui segment">
      <Route path="recipes" component="{Recipes}" />
      <Route path="recipes/new" component="{NewRecipe}" />
      <Route path="*"><NotFound /></Route>
    </div>
  </div>
</Router>
