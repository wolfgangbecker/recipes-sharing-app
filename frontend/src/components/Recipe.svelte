<script>
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
    <span class="header">{title}</span>
    <div class="meta">
      by {author}
    </div>
    <div class="description">
      {description}
    </div>
  </div>
</div>
