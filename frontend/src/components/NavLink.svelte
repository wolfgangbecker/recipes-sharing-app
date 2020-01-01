<script>
  import { Link } from "svelte-routing";

  export let to = "";

  function getProps({ isCurrent }) {
    if(isCurrent) {
      return { class: "item active" };
    }

    return { class: "item" };
  }
</script>

<Link {to} {getProps}>
  <slot />
</Link>
