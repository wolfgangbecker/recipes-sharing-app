<script>
  import { onMount } from "svelte";
  import { fade } from 'svelte/transition';
  import { navigate } from "svelte-routing";

  import request from "/utils/request";
  import message from "/messageStore";
  import RecipeForm from "/components/RecipeForm.svelte";

  export let id;

  let form;

  const handleSubmit = event => {
    request.patch(`recipes/${id}`, event.detail)
      .then(() => {
        message.show({ type: "success", title: "Success" })
        navigate('/recipes')
      }).catch(() => {
        message.show({ type: "error", title: "Error" })
      })
  }

  onMount(() => {
    request.get(`recipes/${id}`)
      .then(response => {
        form.setInitialValues({
          title: response.data.title,
          imageURL: response.data.imageURL,
          description: response.data.description
        })
      })
      .catch(() => {
        message.show({
          type: "error",
          title: "Error",
          text: "Failed to fetch values"
        })
      });
  });
</script>

<RecipeForm on:submit={handleSubmit} bind:this={form} />
