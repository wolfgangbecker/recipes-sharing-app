<script>
  import { fade } from 'svelte/transition';

  import message from "/messageStore";
</script>

{#if $message}
  <div class="ui message {$message.type}" transition:fade>
    <i class="close icon" on:click={message.hide}></i>
    <div class="header">
      {$message.title}
    </div>
    {#if $message.text}
      <p>{$message.text}</p>
    {/if}
  </div>
{/if}
