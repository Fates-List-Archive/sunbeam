<!--Put all allowed Tailwind CSS classes here so they are built-->
<h1 class="text-3xl font-bold underline">
    Hello world!
</h1>
<button class="duration-75 transform hover:scale-125 transition ease-linear bg-teal-400 px-6 py-2 m-4 inline">75</button>
<button class="transition-none duration-500 transform px-6 py-2 m-4 inline
               bg-teal-400 hover:bg-indigo-400
               border-2 border-red-500 hover:border-yellow-500
               hover:text-white
               hover:opacity-50
               hover:shadow-md
               hover:scale-125">None</button>

<button class="transition-all duration-500 transform px-6 py-2 m-4 inline
               bg-teal-400 hover:bg-indigo-400
               border-2 border-red-500 hover:border-yellow-500
               hover:text-white
               hover:opacity-50
               hover:shadow-md
               hover:scale-125">All</button>

<button class="transition duration-500 transform px-6 py-2 m-4 inline
               bg-teal-400 hover:bg-indigo-400
               border-2 border-red-500 hover:border-yellow-500
               hover:text-white
               hover:opacity-50
               hover:shadow-md
               hover:scale-125">Default</button>

<button class="transition-colors duration-500 transform px-6 py-2 m-4 inline
               bg-teal-400 hover:bg-indigo-400
               border-2 border-red-500 hover:border-yellow-500
               hover:text-white
               hover:opacity-50
               hover:shadow-md
               hover:scale-125">Colors</button>

<button class="transition-opacity duration-500 transform px-6 py-2 m-4 inline
               bg-teal-400 hover:bg-indigo-400
               border-2 border-red-500 hover:border-yellow-500
               hover:text-white
               hover:opacity-50
               hover:shadow-md
               hover:scale-125">Opacity</button>

<button class="transition-shadow duration-500 transform px-6 py-2 m-4 inline
               bg-teal-400 hover:bg-indigo-400
               border-2 border-red-500 hover:border-yellow-500
               hover:text-white
               hover:opacity-50
               hover:shadow-md
               hover:scale-125">Shadow</button>

<button class="transition-transform duration-500 transform px-6 py-2 m-4 inline
               bg-teal-400 hover:bg-indigo-400
               border-2 border-red-500 hover:border-yellow-500
               hover:text-white
               hover:opacity-50
               hover:shadow-md
               hover:scale-125">Transform</button>

<Button class="vr-test" on:click={() => subNotifs(id, token)}>Test VR</Button>

<script lang="ts">
import Button from "@smui/button";
import { subNotifs } from "$lib/request";
import { session } from "$app/stores";
let token = $session.session.token
let id = ""

if(token) {
    id = $session.session.user.id
}
</script>
<div class="flex items-center">
</div>