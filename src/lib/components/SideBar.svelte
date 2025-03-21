<script lang="ts" module>


	export interface NavItem {
		icon: string;
		label: string;
		href: string;
		badge?: string;
		notification?: string;
	}
</script>

<script lang="ts">
	import { page } from '$app/state';
	import Brand from './Brand.svelte';
	let activeUrl = $state(page.url.pathname);
	
	const demoNavItems: NavItem[] = [
		{
			icon: 'home',
			label: 'Dashboard',
			href: '/',
		},
		{
			icon: 'view_kanban',
			label: 'Kanban',
			href: '/kanban',
			badge: 'Pro',
		},
		{
			icon: 'inbox',
			label: 'Inbox',
			href: '/inbox',
			notification: '3',
		},
		{
			icon: 'menu_open',
			label: 'Sidebar',
			href: '/examples/sidebar',
		},
	];

	let {
		isOpen = $bindable(false), 
		imgURL = "/favicon.png", 
		title = "Svelte 5 Runes", 
		subtitle = "Demo UI Elements", 
		navItems = demoNavItems, 
		dockSide = "left",
		headerBgColor = "#DF4111",
		headerTextColor = "#ffffff"
	} = $props();

	$effect(() => {
		activeUrl = page.url.pathname;
	});

	function toggleSidebar() {
		isOpen = !isOpen;
	}
</script>

<button 
    class="toggle-button"
    class:right={dockSide === "right"}
    aria-label="Toggle sidebar"
    onclick={toggleSidebar} onkeydown={(e) => {
		if (e.key === 'Enter' || e.key === ' ') {
			toggleSidebar();
		}
	}}>

	<span class="material-icons">menu</span>
</button>

<nav class="sidebar" class:open={isOpen} class:right={dockSide === "right"}>
	<div class="sidebar-header" style:background-color={headerBgColor} style:color={headerTextColor}>
		<Brand imgURL={imgURL} title={title} subtitle={subtitle} backgroundColor={headerBgColor} color={headerTextColor}/>
	</div>
		
	<div class="nav-list">
		{#each navItems as item}
			<a href={item.href} class="nav-item" class:active={activeUrl === item.href}>
				<span class="material-icons">{item.icon || 'radio_button_unchecked'}</span>
				<span>{item.label}</span>
				{#if item.badge}
					<span class="badge">{item.badge}</span>
				{/if}
				{#if item.notification}
					<span class="notification-badge">{item.notification}</span>
				{/if}
			</a>
		{/each}
	</div>
</nav>

<style>
	.toggle-button {
		position: fixed;
		top: 1rem;
		left: 1rem;
		z-index: 60;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 2.5rem;
		height: 2.5rem;
		color: #111827;
		background-color: white;
		border: 1px solid #e5e7eb;
		border-radius: 0.5rem;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
		cursor: pointer;
		transition: all 0.2s ease;
		padding: 0;
		margin: 0;
	}

	.toggle-button.right {
		left: auto;
		right: 1rem;
	}

	.toggle-button:hover {
		transform: translateY(-1px);
		box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
	}

	.toggle-button .material-icons {
		font-size: 1.5rem;
	}

	.material-icons {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		flex-shrink: 0;
	}

	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		height: 100dvh;
		width: 16rem;
		background-color: white;
		border-right: 1px solid #e5e7eb;
		transform: translateX(-100%);
		transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
		z-index: 50;
		display: flex;
		flex-direction: column;
		overflow: hidden;
	}

	.sidebar.right {
		left: auto;
		right: 0;
		transform: translateX(100%);
		border-right: none;
		border-left: 1px solid #e5e7eb;
	}

	.sidebar.open {
		transform: translateX(0);
	}

	.sidebar.right.open {
		transform: translateX(0);
	}

	.nav-list {
		display: flex;
		flex-direction: column;
		gap: 0.5rem;
		padding-inline-start: 2rem;
		margin-block-start: 2rem;
		overflow-y: auto;
		padding-right: 1rem;
		width: 17.5rem;
	}

	.nav-item {
		display: flex;
		align-items: center;
		gap: 1.5rem;
		padding: 0.75rem;
		color: #111827;
		font-weight: 600;
		text-decoration: none;
		border-radius: 0.75rem;
		transition: all 0.2s ease;
		transform: translateX(-20px);
		width: 100%;
	}

	.nav-item > span:nth-child(2) {
		flex: 1;
		min-width: 0;
	}

	.nav-item:hover {
		background-color: #bfdbfe;
		color: #2563eb;
	}

	.nav-item.active {
		background-color: #bfdbfe;
		color: #2563eb;
		padding: 1rem;
	}

	.badge {
		margin-left: auto;
		padding: 0.375rem 0.875rem;
		font-size: 0.75rem;
		font-weight: 500;
		color: #2563eb;
		background-color: #dbeafe;
		border-radius: 9999px;
	}

	.notification-badge {
		margin-left: auto;
		min-width: 1.75rem;
		height: 1.75rem;
		padding: 0 0.625rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 0.8125rem;
		font-weight: 500;
		color: white;
		background-color: #2563eb;
		border-radius: 9999px;
	}

	@media (min-width: 1024px) {
		/* .toggle-button {
			display: none;
		} */

		/* .sidebar {
			position: relative;
			transform: translateX(0);
		} */
	}
</style>

