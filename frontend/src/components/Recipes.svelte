<script>
  import Recipe from "./Recipe.svelte";

  const recipes = [
    {
      title: "Lemon pie",
      author: "John Doe",
      image: "https://placeralplato.com/files/2015/06/lemon-pie.jpg",
      description: "A pie with a pastry shell and lemon flavored filling."
    },
    {
      title: "Tiramisu",
      author: "Jane Doe",
      image: "https://natashaskitchen.com/wp-content/uploads/2019/11/Tiramisu-Cake-5.jpg",
      description: "A coffee-flavoured Italian dessert. It is made of ladyfingers dipped in coffee, layered with a whipped mixture of eggs, sugar, and mascarpone cheese, flavoured with cocoa."
    },
    {
      title: "Vitello tonnato",
      author: "Jane Doe",
      image: "https://www.cronista.com/__export/1577126490468/sites/diarioelcronista/img/2019/12/23/vitel_tone_1.jpg_1866758231.jpg",
      description: " A Piedmontese dish of cold, sliced veal covered with a creamy, mayonnaise-like sauce that has been flavored with tuna."
    }
  ];
</script>

<div class="ui cards">
  {#each recipes as recipe}
    <Recipe {...recipe} />
  {/each}
</div>
