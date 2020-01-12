<script>
  import request from "/utils/request";
  import message from "/messageStore";
  import RecipeForm from "/components/RecipeForm.svelte";

  let form;

  const handleSubmit = event => {
    const formData = event.detail;

    request.post("recipes", {
      title: formData.title,
      description: formData.description
    })
      .then(({data}) => {
        return request.put(data.uploadUrl, formData.image);
      })
      .then(() => {
        message.show({ type: "success", title: "Success" })
        form.reset();
      }).catch(() => {
        message.show({ type: "error", title: "Error" })
      })
  }
</script>

<RecipeForm on:submit={handleSubmit} bind:this={form} />
