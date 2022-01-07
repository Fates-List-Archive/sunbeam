<script lang="ts">
  import { loginUser } from "$lib/request"
  import { browser } from '$app/env';
  let msg = "Please wait..."
  function riverLogin() {
      if(!browser) {
          return
      }
      const urlParams = new URLSearchParams(window.location.search);
      let redirect = urlParams.get("redirect")
      if(!redirect || !redirect.startsWith("https://api.fateslist.xyz")) {
          msg = "Invalid redirect"
      }
      localStorage.sunbeamLogin = redirect
      loginUser(true)
  }
  riverLogin()
</script>
{msg}
