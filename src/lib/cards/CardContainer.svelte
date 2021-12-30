<div class="container">
    <slot />
</div>

<style>
  .container {
    display: flex;
    flex-wrap: wrap;
    padding-left: 0;
  }
  
  slot {
    list-style: none;
    flex: 0 0 33%;
  }  
</style>