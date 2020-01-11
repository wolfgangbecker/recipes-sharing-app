<script>
  import { Router, Link, Route } from "svelte-routing";

  import Recipes from "./pages/Recipes.svelte"
  import NewRecipe from "./pages/NewRecipe.svelte"
  import NotFound from "./pages/NotFound.svelte"

  import FlashMessage from "./components/FlashMessage.svelte"
  import NavLink from "./components/NavLink.svelte"
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
        My Recipes
      </NavLink>
      <div class="right menu">
        <div class="item">
          Login
        </div>
      </div>
    </div>
    <div class="ui segment">
      <FlashMessage />
      <Route path="recipes" component="{Recipes}" />
      <Route path="recipes/new" component="{NewRecipe}" />
      <Route path="*"><NotFound /></Route>
    </div>
  </div>
</Router>
