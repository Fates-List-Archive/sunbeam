<script>
    rerender = () => {
        console.log("Called render")
        hljs.configure({ignoreUnescapedHTML: true})
        hljs.highlightAll()
        window.highlightJsBadge({
            onBeforeCodeCopied: (text) => {
                alert("Copied snippet!")
                return text
            }
        }) 
    }
    
    if(browser) {
        setTimeout(rerender, 400) // 400 seconds should be plenty of time    
    }
</script>
