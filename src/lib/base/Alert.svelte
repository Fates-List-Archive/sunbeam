<script lang="ts">
    export let show: boolean
    export let close = () => {
        show = false
    }
    export let title: string
    export let id: string
</script>
  
  {#if show}
    <!-- svelte-ignore a11y-no-redundant-roles -->
    <dialog 
        open 
        role='dialog'
        aria-labelledby={`${id}-title`}
        aria-describedby={`${id}-content`}    
    >
      <section>
        <header id={`${id}-title`}>
          <strong>
            <h2>{title}</h2>
          </strong>
        </header>
    
        <div id={`${id}-content`}>
          <slot />
        </div>
        <button on:click={close} id="alert-close" class="block mx-auto">
            Close
        </button>
      </section>
    </dialog>
  {/if}
  
  <style>
      dialog {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        z-index: 9999;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background: transparent; 
        color: black !important; 
    }

    dialog::after {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: black;
        opacity: .5;
        z-index: -1;
        pointer-events: none;
    }

    section {
        width: 500px;
        min-height: 200px;
        max-height: 500px;
        padding: 10px;
        border-radius: 4px 4px 4px 4px;
        background: white;
    }

    #alert-close {
        position: relative;
        text-align: center !important;
        top: 0 !important;
        bottom: 0 !important;
        cursor: pointer;
    }

    h2 {
        color: black !important;
    }
    
    button {
        background-color: white !important;
        color: black !important;
        font-weight: bold !important;
        border: black solid 1px !important;
        margin-top: 3px;
        padding: 15px;
        border-radius: 5px;
    }
  </style>