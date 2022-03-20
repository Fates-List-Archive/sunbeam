<script lang="ts">
    interface Translation {
        [lang: string]: string;
    }

    interface TranslationData {
        [key: string]: Translation;
    }

    let translations: TranslationData = {
        "index.best_bots": {
            en: "Find the best bots for your servers!",
        }
    };

	import { session } from '$app/stores';

    export let key: string;

    let lang = "en";

    if($session.session.user) {
        lang = $session.session.site_lang;
    }

    if(!lang) {
        lang = "en";
    }
</script>

{#if translations[key] && translations[key][lang]}
    {translations[key][lang]}
{:else if translations[key] && translations[key]["en"]}
    {translations[key]["en"]}
{:else}
    {key}
{/if}