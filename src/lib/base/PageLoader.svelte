<script>
    import navigationState from '$lib/navigationState';
</script>

{#if $navigationState == "loading"}
    <style>
        #loading-opaque {
            opacity: 0.6 !important;
            background-color: #1D1E23 !important;
        }

        :global(main, html, body) {
            display: block !important;
            background-color: #1D1E23 !important;
            width: 100% !important;
            height: 100% !important;
            margin: 0px !important;
	        padding: 0px !important;
        }

        .loader {
            border: 16px solid #f3f3f3; /* Light grey */
            border-top: 16px solid #3498db; /* Blue */
            border-radius: 50%;
            width: 120px;
            height: 120px;
            animation: spin 2s linear infinite;
            margin-left: auto;
            margin-right: auto;
        }

        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
{/if}
<div id="loading-opaque">
    <div class="loader"></div>
    <slot/>
</div>
