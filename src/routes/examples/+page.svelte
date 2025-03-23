<script lang="ts">
	import Button from "$lib/components/Button.svelte";

	const features = [
		{
			icon: 'rocket_launch',
			title: 'Fast & Modern',
			description: 'Built with Svelte 5 runes for optimal performance and developer experience.'
		},
		{
			icon: 'widgets',
			title: 'Component Library',
			description: 'A growing collection of beautiful, customizable UI components.'
		},
		{
			icon: 'palette',
			title: 'Customizable',
			description: 'Easily customize colors, sizes, and behaviors to match your brand.'
		},
		{
			icon: 'code',
			title: 'Developer Friendly',
			description: 'Well-documented, type-safe components with intuitive APIs.'
		}
	];

	let currentTime = $state(new Date());
	let greeting = $derived(getGreeting(currentTime));

	function getGreeting(date: Date): string {
		const hour = date.getHours();
		if (hour < 12) return 'Good Morning';
		if (hour < 18) return 'Good Afternoon';
		return 'Good Evening';
	}

	$effect(() => {
		const timer = setInterval(() => {
			currentTime = new Date();
		}, 60000); // Update every minute

		return () => clearInterval(timer);
	});
</script>

<div class="page-container">

</div>

<style>
	.page-container {
		display: flex;
		flex-direction: column;
		gap: 3rem;
		padding: 2rem;
		width: clamp(300px, 90%, 1200px);
		margin: 0 auto;
		min-height: 100dvh;
	}

</style>

