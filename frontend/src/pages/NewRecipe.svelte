<script>
  import request from "/utils/request";
  import message from "/messageStore";
  import RecipeForm from "/components/RecipeForm.svelte";

  let form;

  const handleSubmit = event => {
    request.post("recipes", event.detail)
      .then(() => {
        message.show({ type: "success", title: "Success" })
        form.reset();
      }).catch(() => {
        message.show({ type: "error", title: "Error" })
      })
  }
</script>

<RecipeForm on:submit={handleSubmit} bind:this={form} />
