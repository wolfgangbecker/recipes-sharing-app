<script>
  import { onMount } from "svelte";
  import { fade } from 'svelte/transition';
  import { navigate } from "svelte-routing";

  import request from "/utils/request";
  import message from "/messageStore";
  import RecipeForm from "/components/RecipeForm.svelte";

  export let id;

  let form;
  let loading = true;

  const handleSubmit = event => {
    const formData = event.detail;

    request.patch(`recipes/${id}`, {
      title: formData.title,
      description: formData.description
    })
      .then(({data}) => {
        return request.put(data.uploadUrl, formData.image);
      })
      .then(() => {
        message.show({ type: "success", title: "Success" })
        navigate('/recipes')
      }).catch(() => {
        message.show({ type: "error", title: "Error" })
      })
  }

  onMount(() => {
    request.get(`recipes/${id}`)
      .then(({data}) => {
        form.setInitialValues({
          title: data.title,
          imageURL: data.imageURL,
          description: data.description
        })
      })
      .catch(() => {
        message.show({
          type: "error",
          title: "Error",
          text: "Failed to fetch values"
        })
      })
      .finally(() => {
        loading = false;
      });
  });
</script>

{#if loading}
  <div class="ui active centered inline loader" in:fade></div>
{/if}
<RecipeForm on:submit={handleSubmit} bind:this={form} />
