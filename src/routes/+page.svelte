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
	<section class="hero">
		<div class="hero-content">
			<h1>{greeting}!</h1>
			<p class="tagline">Welcome to my Modern UI Component Library</p>
		</div>
		<div class="hero-image">
			<span class="material-icons hero-icon">dashboard</span>
		</div>
	</section>

	<section class="features">
		<h2>Why Choose my Components?</h2>
		<div class="features-grid">
			{#each features as feature}
				<div class="feature-card">
					<span class="material-icons feature-icon">{feature.icon}</span>
					<h3>{feature.title}</h3>
					<p>{feature.description}</p>
				</div>
			{/each}
		</div>
	</section>
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

	.hero {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 2rem;
		padding: 4rem 0;
	}

	.hero-content {
		flex: 1;
	}

	h1 {
		font-size: 3.5rem;
		font-weight: 700;
		color: #1f2937;
		margin: 0;
		background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.tagline {
		font-size: 1.5rem;
		color: #4b5563;
		margin: 1rem 0 2rem 0;
	}

	.hero-image {
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
		border-radius: 2rem;
		padding: 4rem;
	}

	.hero-icon {
		font-size: 12rem;
		color: #3b82f6;
	}

	.features {
		width: 100%;
		padding: 4rem 0;
	}

	h2 {
		font-size: 2.5rem;
		font-weight: 700;
		color: #1f2937;
		text-align: center;
		margin-bottom: 3rem;
	}

	.features-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 2rem;
	}

	.feature-card {
		background: white;
		padding: 2rem;
		border-radius: 1rem;
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
		transition: transform 0.2s ease;
	}

	.feature-card:hover {
		transform: translateY(-4px);
	}

	.feature-icon {
		font-size: 2.5rem;
		color: #3b82f6;
		margin-bottom: 1rem;
	}

	.feature-card h3 {
		font-size: 1.25rem;
		font-weight: 600;
		color: #1f2937;
		margin: 0 0 0.5rem 0;
	}

	.feature-card p {
		color: #6b7280;
		line-height: 1.5;
		margin: 0;
	}

	@media (max-width: 768px) {
		.hero {
			flex-direction: column;
			text-align: center;
			padding: 2rem 0;
		}


		h1 {
			font-size: 2.5rem;
		}

		.tagline {
			font-size: 1.25rem;
		}

		.hero-icon {
			font-size: 8rem;
		}

		h2 {
			font-size: 2rem;
		}
	}
</style>

