<script>
  import { Link } from "svelte-routing";

  export let id;
  export let title;
  export let imageURL;
  export let author;
  export let description;
</script>

<div class="ui card">
  <div class="image">
    <img src={imageURL}>
  </div>
  <div class="content">
    <Link to="recipes/{id}">
      <span class="header">{title}</span>
    </Link>
    <div class="meta">
      by {author}
    </div>
    <div class="description">
      {description}
    </div>
  </div>
</div>
