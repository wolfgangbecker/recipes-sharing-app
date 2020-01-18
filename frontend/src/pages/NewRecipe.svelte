<script>
  import axios from "axios";
  import request from "/utils/request";
  import message from "/messageStore";
  import RecipeForm from "/components/RecipeForm.svelte";

  let form;
  let creating = false;

  const handleSubmit = event => {
    const formData = event.detail;
    creating = true;

    request.post("recipes", {
      title: formData.title,
      description: formData.description,
      hasImage: Boolean(formData.image) // signalize if signed url is required
    })
      .then(({data}) => {
        if(formData.image)
          return axios.put(data.uploadUrl, formData.image);
      })
      .then(() => {
        message.show({ type: "success", title: "Success" })
        form.reset();
      }).catch(() => {
        message.show({ type: "error", title: "Error" })
      })
      .finally(() => {
        creating = false;
      })
  }
</script>

<RecipeForm on:submit={handleSubmit} bind:this={form} submitting={creating} />
