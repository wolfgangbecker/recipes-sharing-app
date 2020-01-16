<script>
  import { Router, Link, Route } from "svelte-routing";

  import auth, {isAuthenticated} from "/utils/auth";

  import Recipes from "./pages/Recipes.svelte"
  import NewRecipe from "./pages/NewRecipe.svelte"
  import EditRecipe from "./pages/EditRecipe.svelte"
  import RecipeDetails from "./pages/RecipeDetails.svelte"
  import NotFound from "./pages/NotFound.svelte"

  import FlashMessage from "./components/FlashMessage.svelte"
  import NavLink from "./components/NavLink.svelte"
  import AuthCallback from "./components/AuthCallback.svelte"
</script>

<style>
  .container {
    margin-top: 3rem;
  }

  .login:hover {
    cursor: pointer;
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
        {#if $isAuthenticated}
          <div class="item login" on:click={auth.logout}>
            Logout
          </div>
        {:else}
          <div class="item login" on:click={auth.login}>
            Login
          </div>
        {/if}
      </div>
    </div>
    <div class="ui segment">
      <FlashMessage />
      <Route path="/" component="{Recipes}" />
      <Route path="recipes" component="{Recipes}" />
      <Route path="recipes/:id" component="{RecipeDetails}" />
      <Route path="recipes/:id/edit" component="{EditRecipe}" />
      <Route path="recipes/new" component="{NewRecipe}" />
      <Route path="auth" component="{AuthCallback}" />
      <Route path="*"><NotFound /></Route>
    </div>
  </div>
</Router>
