<script lang="ts">
    import '../app.css';
    import SideBar from "$lib/components/SideBar.svelte";
    import { demoNavItems } from "$lib/samples/demoData/sidebarData";
    import { default_imgURL, default_title, default_subtitle } from "$lib/components/Brand.svelte";
    let sidebarIsOpen = $state(true);
    let {children} = $props();
</script>

<svelte:head>
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" />
</svelte:head>


<div class="page-container">
	<div class="content">
    	{@render children()}
	</div>
</div>

<style>

	.page-container {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100dvh;
		overflow: hidden;
	}

	.content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
		flex: 1;
		padding: 4rem 1rem 1rem 1rem;
		background-color: #f9fafb;
		overflow-y: auto;
		width: 100%;
	}

	@media (min-width: 1024px) {
		.content {
			padding: 2rem;
		}
	}
</style>
