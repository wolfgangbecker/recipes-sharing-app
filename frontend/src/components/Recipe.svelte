<script>
  import { Link, navigate } from "svelte-routing";

  import request from "/utils/request";

  export let id;
  export let title;
  export let imageURL;
  export let author;
  export let description;

  const handleDelete = async () => {
    await request.delete(`recipes/${id}`);
    // navigate to recipes and main page to refresh the recipes.
    await navigate("/recipes")
    navigate("/");
  }
</script>

<style>
  .trash:hover {
    color: grey;
  }
  .trash:active {
    color: red;
  }
</style>

<div class="ui card">
  <div class="image">
    <img src={imageURL}>
  </div>
  <div class="content">
    <Link to="recipes/{id}">
      <span class="header">{title}</span>
    </Link>
    <div class="right floated meta">
      <i class="trash icon" on:click={handleDelete}></i>
    </div>
    <div class="meta">
      by {author}
    </div>
    <div class="description">
      {description}
    </div>
  </div>
</div>
