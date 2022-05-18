<script lang="ts" context="module">
    import { lynxUrl } from "$lib/config";
    import markdownit from "markdown-it";
    import markdownItAnchor from "markdown-it-anchor";
    import markdownitContainer from "markdown-it-container"

    import hljs from "highlight.js";

	export const prerender = false
	export async function load({ params, url, fetch, session, stuff }) {
        let id = "0";
        if(session.session.token) {
            id = session.session.user.id
        }
        let res = await fetch(`${lynxUrl}/docs/${params.route}`)
		if(res.ok) {

            let data = await res.json()

            let md = markdownit({
                html: true,
                linkify: true,
                highlight: function (str, lang) {
                    if (lang && hljs.getLanguage(lang)) {
                        try {
                            let v = `<div class="hljs-quail-block"><span class="hljs-snip">${lang}</span>` + hljs.highlight(str, { language: lang }).value + "</div>";
                            return v
                        } catch (__) {}
                    }

                    return ''; // use external default escaping
                }
            })

            md.use(markdownItAnchor, {
                permalink: markdownItAnchor.permalink.linkInsideHeader({
                    symbol: "\u00B6",
                }),
                slugify: s => {
                    return s.toLowerCase().replaceAll(")", "").replaceAll("!", "").replaceAll(".", "").replace(/[^a-zA-Z0-9]/g, '-').replaceAll("--", "-");
                },
                level: [1, 2, 3, 4, 5],
            });
            md.use(markdownitContainer, 'info')
            md.use(markdownitContainer, 'warning')
            md.use(markdownitContainer, 'aonly')
            md.use(markdownitContainer, 'guidelines')
            md.use(markdownitContainer, 'generic', {
                validate: function (...args) {
                    return true;
                }
            })

            data = md.render(data)
            .replaceAll("<li", '<li class="li"')
            .replaceAll("<ul", '<ul class="ul"')
            .replaceAll("<button", '<button class="button"')

            return {
                props: {
                    data: data,
                    path: params.route.split("/"),
                }
            }
        } else {
			return {
				status: res.status,
				error: new Error(`Could not load ${url}`)
			}
		}
	}
</script>
<script lang="ts">
import QuailTree from "../_helpers/QuailTree.svelte";
import Highlight from "../_helpers/doc.svelte";

export let data: any;
export let path: string[];

function title(str) {
    return str.replaceAll("-", " ").replaceAll("_", " ").replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
}
</script>

<QuailTree>
    <h1>{title(path[path.length-1].replaceAll('-', ' '))}</h1>
    <Highlight data={data}/>
</QuailTree>