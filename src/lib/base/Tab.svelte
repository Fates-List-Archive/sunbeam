<div id="switcher" style='margin-bottom: 3px;' class='blackbar'>
	<div class="tab">
		{#each tabs as tab}
		<button id="{tab.id}-tab-button" class="tablinks" use:onload on:click={(event) => openf(event, tab.id, this, true, undefined)}>{tab.name}</button>
		{/each}
	</div>
	<slot />
</div>
<script lang="ts">
	import { browser } from "$app/env";

	export let tabs: any;
	export let defaultTabButton: string

	function openf(evt, idp, data, defaultTab, post) {
		var id = `${idp}-tab`
		// Declare all variables
		var i, tabcontent, tablinks;

		// Get all elements with class="tabcontent" and hide them
		tabcontent = document.getElementsByClassName("tabcontent");
		for (i = 0; i < tabcontent.length; i++) {
			tabcontent[i].style.display = "none";
		}

		// Get all elements with class="tablinks" and remove the class "active"
		tablinks = document.getElementsByClassName("tablinks");
		for (i = 0; i < tablinks.length; i++) {
			tablinks[i].className = tablinks[i].className.replace(" active", "");
		}

		// Show the current tab, and add an "active" class to the button that opened the tab
		document.getElementById(id).style.display = "block";
		evt.currentTarget.className += " active";
		if(defaultTab) {
			try {
				history.replaceState(null, "", " ")
			}
			catch {
				window.location.hash = ""
			}
		}
		else {
			window.location.hash = data.id + "-fl";
		}
		if(post != undefined) {
			post(idp, evt, data)
		}
	}

	function tabLoad(){	
		console.log("Am here", window.location.hash)
		document.querySelector(`#${defaultTabButton}`).click()
		if(window.location.hash == "") {
			document.querySelector(`#${defaultTabButton}`).click()
		}
		else {
			try {
				document.querySelector(window.location.hash.replace("-fl", "")).click()
			}
			catch {
				document.querySelector(defaultTabButton).click()
			}
		}
	};

	let flag = false

	const onload = el => {
		console.log("onload called", el.id)
		if(el.id == defaultTabButton) {
			flag = true
			return
		} 
		
		if(flag) {
			// Wait for 200ms bc js
			setTimeout(() => tabLoad(), 200)
		}
	}

</script>
<style lang="scss" global>
:global(.slider) {
	-webkit-appearance: none;
	width: 20%;
	height: 5px;
	border-radius: 5px;   
	background: #d3d3d3;
	outline: none;
	opacity: 0.7;
	-webkit-transition: .2s;
	transition: opacity .2s;
}

/* Mouse-over effects */
.slider:hover {
	opacity: 1; /* Fully shown on mouse-over */
}

.slider::-webkit-slider-thumb {
	-webkit-appearance: none;
	appearance: none;
	width: 25px;
	height: 25px;
	border-radius: 50%; 
	background: #4CAF50;
	cursor: pointer;
}

.slider::-moz-range-thumb {
	width: 25px;
	height: 25px;
	border-radius: 50%;
	background: #4CAF50;
	cursor: pointer;
}

/* Style the tab */
.tab {
	text-align: center;
	color: white !important;
	border: none;
}

/* Style the buttons that are used to open the tab content */
.tab button {
	background-color: black;
	color: white;
	border: none;
	outline: none;
	cursor: pointer;
	padding: 14px 16px;
	transition: 0.3s;
}

/* Change background color of buttons on hover */
.tab button:hover {
	background-color: #2e3033;
}

/* Create an active/current tablink class */
.tab button.active {
	border-bottom: solid !important;
	color: white !important;
}

/* Style the tab content */
:global(.tabcontent) {
	display: none;
}

:global(.tabdesign) {
	color: white !important; 
	text-align: left !important; 
	margin-left: 5%; 
	margin-right: 5%; 
	margin-top: 13px;
	border: none !important;
}

.blackbar {
	background: black; 
	border: hidden; 
	margin-top: 5px; 
	min-height: 700px;
	padding: 5px;
	margin-bottom: 0px;
}

th, td {
	padding: 23px;
	border-bottom: solid;
	border-width: thin;
}
th {
	border-right: solid;
	border-width: thin;
}
tr:last-child td {
	border-bottom: none;
}
tr:last-child th {
	border-bottom: none;
}
th {
	text-align: left;
}
#switcher {
	border-radius: 13px;
	margin-left: 1.1%;
	margin-right: 1.1%
} /* Thanks Fearful */

textarea {
	border-radius: 2em !important;
}
</style>