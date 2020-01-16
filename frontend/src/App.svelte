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

  .grid {
    padding: 10px 0 20px 0;
  }
</style>

<Router>
  <div class="ui container">
    <div class="ui pointing menu">
      {#if $isAuthenticated}
        <NavLink to="recipes/new">
          New Recipe
        </NavLink>
        <NavLink to="recipes">
          My Recipes
        </NavLink>
      {/if}
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
      <Route path="/">
        <div class="ui centered grid spacing">
          <div class="ui row huge header">Welcome!</div>
          {#if !$isAuthenticated}
            <p>Please login to manage your recipes.</p>
          {:else}
            <p class="row">To create a recipe go to "New Recipe"</p>
            <p class="row">To manage existing recipes go to "My Recipes"</p>
          {/if}
        </div>
      </Route>
      <Route path="recipes/:id/edit" component="{EditRecipe}" />
      <Route path="recipes/new" component="{NewRecipe}" />
      <Route path="recipes" component="{Recipes}" />
      <Route path="recipes/:id" component="{RecipeDetails}" />
      <Route path="auth" component="{AuthCallback}" />
      <Route path="*"><NotFound /></Route>
    </div>
  </div>
</Router>
