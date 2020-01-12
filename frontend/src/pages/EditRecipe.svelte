<script>
  import { onMount } from "svelte";
  import { navigate } from "svelte-routing";

  export let id;

  import request from "/utils/request";
  import message from "/messageStore";

  let titleElement;
  let fields = {}

  const resetField = () => {
    return {
      value: "",
      error: false
    }
  };

  const resetFields = () => {
    fields = {
      title: resetField(),
      imageURL: resetField(),
      description: resetField()
    };
  };

  resetFields()

  const resetValidation = event => {
    if(!["Tab", "Meta"].includes(event.key)) {
      fields[event.target.name].error = false;
    }
  }

  const validateFields = () => {
    let errorsPresent = false;
    const fieldsArray = Object.values(fields);

    Object.values(fields).forEach(field => {
      if(field.value.length === 0) {
        field.error = true;
        errorsPresent = true
      }
    })

    fields = fields; // Necessary to trigger reactivity

    return errorsPresent;
  }

  const handleSubmit = event => {
    if(validateFields()) {
      return
    }

    const body = Object.entries(fields).reduce((acc, [field, values]) => {
      acc[field] = values.value;
      return acc;
    }, {})

    request.patch(`recipes/${id}`, body)
      .then(() => {
        message.show({ type: "success", title: "Success" })
        navigate('/recipes')
      }).catch(() => {
        message.show({ type: "error", title: "Error" })
      })
  }

  onMount(() => {
    if(id) {
      request.get(`recipes/${id}`).then(response => {
        Object.entries(response.data).forEach(([key, value]) => {
          if(fields[key]) {
            fields[key].value = value
          }
        })
      });
    }
  });
</script>

<form class="ui form" on:submit|preventDefault={handleSubmit}>
  <div class="field" class:error={fields.title.error}>
    <label for="title">Title</label>
    <input
      placeholder="E. g. Meat balls"
      type="text"
      id="title"
      name="title"
      autocomplete="off"
      autofocus
      bind:this={titleElement}
      on:keydown={resetValidation}
      bind:value={fields.title.value}>
  </div>
  <div class="field" class:error={fields.imageURL.error}>
    <label for="imageURL">ImageURL</label>
    <input
      placeholder="Paste an image URL here"
      type="text"
      id="imageURL"
      name="imageURL"
      autocomplete="off"
      on:keydown={resetValidation}
      bind:value={fields.imageURL.value}>
  </div>
  <div class="field" class:error={fields.description.error}>
    <label for="description">Description</label>
    <textarea
      placeholder="E. g. Ground meat rolled into a small ball..."
      type="text"
      id="description"
      name="description"
      on:keydown={resetValidation}
      bind:value={fields.description.value}></textarea>
  </div>
  <button class="ui button" type="submit">Submit</button>
</form>
