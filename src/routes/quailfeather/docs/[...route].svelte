<script lang="ts" context="module">
    import { lynxUrl } from "$lib/config";
    import markdownit from "markdown-it";
    import markdownItAnchor from "markdown-it-anchor";
    import markdownitContainer from "markdown-it-container"

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
            })

            md.use(markdownItAnchor, {
                permalink: markdownItAnchor.permalink.linkInsideHeader({
                    symbol: "\u00B6",
                }),
                slugify: s => {
                    return s.toLowerCase().replaceAll(")", "").replaceAll("!", "").replaceAll(".", "").replace(/[^a-zA-Z0-9]/g, '-').replaceAll("--", "-");
                },
                level: [1, 2, 3, 4, 5]
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
export let data: any;
export let path: string[];

function title(str) {
    return str.replaceAll("-", " ").replaceAll("_", " ").replace(/(^|\s)\S/g, function(t) { return t.toUpperCase() });
}

</script>

<QuailTree>
    <h1>{title(path[path.length-1].replaceAll('-', ' '))}</h1>
    <script src="https://use.fontawesome.com/releases/v5.15.4/js/all.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/styles/a11y-dark.min.css">
    {@html data}
    <style>
        h2 {
            font-size: 1.5em;
        }

        h3 {
            font-size: 1.3em;
        }

        .header-anchor {
            display: none;
            color: #81e69b !important;
        }
        h2:hover > .header-anchor {
            display: initial;
        }
        h3:hover > .header-anchor {
            display: initial;
        }

        .info, .warning, .aonly, .guidelines, .generic {
            border: 3px solid;
            margin-bottom: 3px;
            padding: 3px;
        }

        .info:before {
            content: "Info";
            font-size: 26px;
            font-weight: bold;
            color: cyan;
        }

        .guidelines:before {
            content: "Guidelines";
            font-size: 26px;
            font-weight: bold;
            color: green;
        }


        .warning:before {
            content: "Warning";
            font-size: 26px;
            font-weight: bold;
            color: red;
        }

        .generic {
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .aonly:before {
            content: "Admin Only!";
            font-size: 26px;
            font-weight: bold;
            color: yellow;
        }

        .info {
            border-color: blue;
            background-color: rgba(0, 0, 255, 0.1);
        }

        .warning {
            border-color: red;
            background-color: rgba(255, 0, 0, 0.1);
        }

        .generic {
            border-color: red;
            background-color: rgba(255, 20, 10, 0.1);
        }

        .aonly {
            border-color: yellow;
            background-color: rgba(255, 255, 0, 0.1);
        }

        .guidelines {
            border-color: green;
            background-color: rgba(255, 0, 0, 0.1);
        }

        .admin-only {
            display: none;
        }

        .refresh-btn {
            position: fixed !important; 
            bottom: 0; 
            right: 0; 
            background-color: white;
            color: black;
            border: none;
            border-radius: 50% 50% 50% 50%;
            box-shadow: -1px 0px 1px 1px inset;
            width: 50px;
            height: 50px;
        }

        blockquote h3 {
            color: cyan !important;
        }

        blockquote {
            border-left: cyan !important;
        }

        table, .ul, .li {
            color: white !important;
        }

        thead {
            border-bottom: 1px solid white !important;
        }

        tr:hover {
            background-color: rgba(255, 255, 255, 0.1) !important;
        }

        .button {
            display: block;
            width: 100px;
            background-color: red !important;
            color: white;
            border: none;
            border-radius: 5px;
            margin-top: 10px;
            padding: 10px;
        }
    </style>
</QuailTree>