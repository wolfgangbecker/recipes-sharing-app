<script>
  import { Link, navigate } from "svelte-routing";
  import { fade } from 'svelte/transition';

  import message from "/messageStore";
  import request from "/utils/request";

  export let id;
  export let title;
  export let imageURL;
  export let author;
  export let description;

  let deleting = false;

  const handleEdit = async () => {
    navigate(`/recipes/${id}/edit`)
  }

  const handleDelete = async () => {
    deleting = true
    try {
      await request.delete(`recipes/${id}`);
      // navigate to recipes and main page to refresh the recipes.
      await navigate("/")
      navigate("/recipes");
    } catch {
      deleting = false
      message.show({
        type: "error",
        title: "Error",
        text: "Failed to delete recipe"
      })
    }
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

<div class="ui card" in:fade>
  <div class="image">
    <img src={imageURL}>
  </div>
  <div class="content">
    <Link to="recipes/{id}">
      <span class="header">{title}</span>
    </Link>
    <div class="right floated meta">
      <i class="edit icon" on:click={handleEdit}></i>
      {#if deleting}
        <div class="ui active inline loader tiny" in:fade></div>
      {:else}
        <i class="trash icon" on:click={handleDelete}></i>
      {/if}
    </div>
    <div class="meta">
      by {author}
    </div>
    <div class="description">
      {description}
    </div>
  </div>
</div>
