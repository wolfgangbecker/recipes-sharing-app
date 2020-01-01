<script>
  import request from "/utils/request";
  import message from "/messageStore";

  let title = "";
  let description = "";

  const handleSubmit = event => {
    request.post("/recipes", {
      title,
      description
    }).then(() => {
      message.show({ type: "success", title: "Success" })
      title = ""
      description = ""
    }).catch(() => {
      message.show({ type: "error", title: "Error" })
    })
  }
</script>

<form class="ui form" on:submit|preventDefault={handleSubmit}>
  <div class="field">
    <label for="title">Title</label>
    <input placeholder="E. g. Meat balls" type="text" id="title" autocomplete="off" bind:value={title}>
  </div>
  <div class="field">
    <label for="description">Description</label>
    <textarea placeholder="E. g. Ground meat rolled into a small ball..." type="text" id="description" bind:value={description}></textarea>
  </div>
  <button class="ui button" type="submit">Submit</button>
</form>
