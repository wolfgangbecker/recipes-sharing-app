<script>
  import { createEventDispatcher } from 'svelte';
  import { fade } from 'svelte/transition';

  export let submitting = false;

  const dispatch = createEventDispatcher();
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
      image: resetField(),
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

    ["title", "description"].forEach(field => {
      if(fields[field].value.length === 0) {
        fields[field].error = true;
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

    body.image = body.image[0];

    dispatch('submit', body);
  }

  export const reset = () => {
    resetFields();
    titleElement.focus();
  }

  export const setInitialValues = (initialValues) => {
    Object.entries(initialValues).forEach(([key, value]) => {
      fields[key].value = value
    })
  }
</script>

<form class="ui form" on:submit|preventDefault={handleSubmit} in:fade>
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
  <div class="field" class:error={fields.image.error}>
    <label for="image">Image</label>
    <input
      placeholder="Paste an image URL here"
      type="file"
      id="image"
      accept="image/*"
      name="image"
      autocomplete="off"
      on:keydown={resetValidation}
      bind:files={fields.image.value}>
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

  <button class="ui button" type="submit" class:loading={submitting}>
    Submit
  </button>
</form>
