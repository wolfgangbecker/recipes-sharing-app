<script>
  import { fade } from 'svelte/transition';
  import auth from "/utils/auth";

  export let location;

  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication()
  }
</script>

<div class="ui active centered inline loader" in:fade></div>
