<script lang="ts">
	import ColorPicker from '$lib/components/ColorPicker.svelte';
	import Docker from '$lib/components/Docker.svelte';
	import type { DockPosition } from '$lib/components/Docker.svelte';
	import { positions } from '$lib/components/Docker.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Select from '$lib/components/Select.svelte';
	import Toggle from '$lib/components/Toggle.svelte';
	import { createModalConfig } from '$lib/samples/demoData/modalConfig';
	import type { ModalConfig } from '$lib/samples/demoData/modalConfig';
	import Window from '$lib/components/Window.svelte';
	let useDefaults = $state(false);
	let isOpen = $state(false);
	let isDockerOpen = $state(false);
	let isWindowOpen = $state(false);
	// Layout

	const modalSizes = [
		{ value: 'sm', label: 'Small' },
		{ value: 'md', label: 'Medium' },
		{ value: 'lg', label: 'Large' }
	];
	let modalSize = $state<'sm' | 'md' | 'lg' | 'full'>('sm');

	let useBackdrop = $state(true);
	let outerClickToClose = $state(true);

	// Modal styling
	let headerBgColor = $state('#a8c2fa');
	let headerTextColor = $state('#000000');
	let footerBgColor = $state('#a8c2fa');
	let acceptBtnBgColor = $state('#a8c2fa');
	let acceptBtnTextColor = $state('#000000');
	let cancelBtnBgColor = $state('#a8c2fa');
	let cancelBtnTextColor = $state('#000000');
	let contentBgColor = $state('#f1f1f1');
	let contentTextColor = $state('#000000');

	// Modal text
	let headerText = $state('Modal Title');
	let acceptBtnText = $state('Accept');
	let cancelBtnText = $state('Cancel');

	// Border styling
	let showBorder = $state(true);
	let borderColor = $state('#d3d2d2');
	let borderWidth = $state(1);
	let borderRadius = $state(8);

	// Position
	let dockerPosition:DockPosition = $state('center');

	// Configuration display
	let showConfig = $state(false);
	let configText = $derived(`let {
		// Layout
		size = '${modalSize}',
		backdrop = ${useBackdrop},
		outerClickToClose = ${outerClickToClose},
		actionBtns = true,

		// Text Content
		header = '${headerText}',
		okText = '${acceptBtnText}',
		cancelText = '${cancelBtnText}',

		// Header Styling
		headerBgColor = '${headerBgColor}',
		headerTextColor = '${headerTextColor}',

		// Footer Styling
		footerBgColor = '${footerBgColor}',

		// Button Styling
		acceptBtnBgColor = '${acceptBtnBgColor}',
		acceptBtnTextColor = '${acceptBtnTextColor}',
		cancelBtnBgColor = '${cancelBtnBgColor}',
		cancelBtnTextColor = '${cancelBtnTextColor}',

		// Content Styling
		contentBgColor = '${contentBgColor}',
		contentTextColor = '${contentTextColor}',

		// Border Styling
		showBorder = ${showBorder},
		borderColor = '${borderColor}',
		borderWidth = ${borderWidth},
		borderRadius = ${borderRadius},

		// Position
		dockPosition = '${dockerPosition}'
	} = $props();`);

	function handleClose() {
		isOpen = false;
		isWindowOpen = false;
	}

	function onOk() {
		isOpen = false;
	}

	function copyConfig() {
		navigator.clipboard.writeText(configText);
	}
</script>

<div class="page-container">
	<div class="cards-container">
		<div class="card">
			<div class="section">
				<h3>Settings</h3>
				<div class="property-group">
					<div class="property-label">Use Defaults</div>
					<Toggle bind:checked={useDefaults} size="md" />
				</div>
			</div>
			<div class="section">
				<h3>Demo</h3>
				<button onclick={() => (isOpen = true)}>Open Window</button>
			</div>
			<div class="section">
				<h3>Configuration</h3>
				<div class="property-group">
					<div class="property-label">Show Configuration</div>
					<Toggle bind:checked={showConfig} size="md" />
				</div>
				{#if showConfig}
					<div class="config-container">
						<pre>{configText}</pre>
						<button class="copy-button" onclick={copyConfig}>
							Copy to Clipboard
						</button>
					</div>
				{/if}
			</div>
		</div>

		{#if !useDefaults}
			<div class="card">
				<div class="section">
					<h3>Layout</h3>
					<div class="property-group">
						<div class="property-label">Size</div>
						<div class="select-wrapper">
							<Select bind:value={modalSize} options={modalSizes} />
						</div>
					</div>

					<div class="property-group">
						<div class="property-label">Backdrop?</div>
						<Toggle bind:checked={useBackdrop} size="md" />
					</div>

					<div class="property-group">
						<div class="property-label">Outer click to close?</div>
						<Toggle bind:checked={outerClickToClose} size="md" />
					</div>
				</div>
				<div class="section">
					<h3>Position</h3>
					<div class="property-group">
						<div class="property-label">Docked</div>
						<button class="dock-button" onclick={() => (isDockerOpen = true)}>
							<span class="material-icons">
								{positions.find(
									(p: { value: string; icon: string }) => p.value === dockerPosition
								)?.icon}
							</span>
						</button>
						<Docker
							bind:position={dockerPosition}
							bind:isOpen={isDockerOpen}
							primaryColor={headerBgColor}
							secondaryColor={headerTextColor}
						/>
					</div>
				</div>
				<div class="section">
					<h3>Border</h3>
					<div class="property-group">
						<div class="property-label">Show Border?</div>
						<Toggle bind:checked={showBorder} size="md" />
					</div>

					{#if showBorder}
						<div class="property-group">
							<div class="property-label">Color</div>
							<ColorPicker bind:color={borderColor} title="Border Color" textSide='left' />
						</div>

						<div class="property-group">
							<div class="property-label">Width</div>
							<input type="range" bind:value={borderWidth} min="1" max="10" step="1" />
							<span class="value-display">{borderWidth}px</span>
						</div>

						<div class="property-group">
							<div class="property-label">Radius</div>
							<input type="range" bind:value={borderRadius} min="0" max="60" step="1" />
							<span class="value-display">{borderRadius}px</span>
						</div>
					{/if}
				</div>
			</div>

			<div class="card">
				<div class="section">
					<h3>Header</h3>
					<div class="property-group">
						<div class="property-label">Text</div>
						<input type="text" bind:value={headerText} placeholder="Enter header text" />
					</div>

					<div class="property-group">
						<div class="property-label">Background</div>
						<ColorPicker bind:color={headerBgColor} title="Header Background" textSide='left' />
					</div>

					<div class="property-group">
						<div class="property-label">Text Color</div>
						<ColorPicker bind:color={headerTextColor} title="Header Text" textSide='left' />
					</div>
				</div>
				<div class="section">
					<h3>Content</h3>
					<div class="property-group">
						<div class="property-label">Background</div>
						<ColorPicker bind:color={contentBgColor} title="Content Background" textSide='left' />
					</div>

					<div class="property-group">
						<div class="property-label">Text</div>
						<ColorPicker bind:color={contentTextColor} title="Content Text" textSide='left' />
					</div>
				</div>
			</div>

			<div class="card">
				<div class="section">
					<h3>Footer</h3>
					<div class="property-group">
						<div class="property-label">Background</div>
						<ColorPicker bind:color={footerBgColor} title="Footer Background" textSide='left' />
					</div>
				</div>
				<div class="section">
					<h3>Accept Button</h3>
					<div class="property-group">
						<div class="property-label">Text</div>
						<input type="text" bind:value={acceptBtnText} placeholder="Enter button text" />
					</div>

					<div class="property-group">
						<div class="property-label">Background</div>
						<ColorPicker bind:color={acceptBtnBgColor} title="Accept Button Background" textSide='left' />
					</div>

					<div class="property-group">
						<div class="property-label">Text Color</div>
						<ColorPicker bind:color={acceptBtnTextColor} title="Accept Button Text" textSide='left' />
					</div>
				</div>
				<div class="section">
					<h3>Cancel Button</h3>
					<div class="property-group">
						<div class="property-label">Text</div>
						<input type="text" bind:value={cancelBtnText} placeholder="Enter button text" />
					</div>

					<div class="property-group">
						<div class="property-label">Background</div>
						<ColorPicker bind:color={cancelBtnBgColor} title="Cancel Button Background" textSide='left' />
					</div>

					<div class="property-group">
						<div class="property-label">Text Color</div>
						<ColorPicker bind:color={cancelBtnTextColor} title="Cancel Button Text" textSide='left' />
					</div>
				</div>
			</div>
		{/if}


	</div>
</div>
{#if isOpen}
	<Window 
		show={isOpen} 
		title="Window Title"
		width={modalSize}
		position={dockerPosition}
		draggable={true}
		resizeable={true}
		onDialogueResult={handleClose} 
		acceptBtnText="Accept" 
		cancelBtnText="Cancel"
		showOverlay={false}
		cancelOnOverlayClick={true}
		showHeader={true}
		showFooter={false}
		showCloseBtn={true}
		useDuration={false}
		duration={2000}
	>
		<div>Window Content</div>
	</Window>
{/if}
<style>
	.page-container {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		min-height: 100dvh;
		gap: 2rem;
		padding: 2rem;
	}

	.cards-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		gap: 1rem;
		max-width: 1200px;
		justify-content: center;
	}

	.card {
		background: white;
		border: 1px solid #ccc;
		border-radius: 0.5rem;
		padding: 1.5rem;
		padding-block-start: 0;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		width: 280px;
	}

	.section {
		display: flex;
		flex-direction: column;
		gap: 1rem;
	}

	h3 {
		font-size: 1.1rem;
		font-weight: 600;
		color: #374151;
		margin: 0;
		padding-bottom: 0.5rem;
		padding-block-start: 2rem;
		border-bottom: 1px solid #e5e7eb;
	}

	.property-group {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		gap: 1rem;
	}

	.property-label {
		font-size: 0.9rem;
		font-weight: 500;
		color: #374151;
		flex: 1;
	}

	.select-wrapper {
		width: 120px;
	}

	input[type='range'] {
		width: 120px;
	}

	.value-display {
		font-size: 0.8rem;
		color: #6b7280;
		width: 40px;
		text-align: right;
	}

	button {
		padding: 1rem;
		cursor: pointer;
		font-size: 1rem;
		font-weight: 500;
		transition: all 0.3s ease;
	}
	button:hover {
		background-color: #c7d9fa;
	}

	input[type='text'] {
		padding: 0.5rem;
		border: 1px solid #d1d5db;
		border-radius: 0.25rem;
		width: 150px;
		font-size: 0.9rem;
	}

	.config-container {
		background: #f3f4f6;
		border-radius: 0.375rem;
		padding: 1rem;
		position: relative;
	}

	pre {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 0.875rem;
		line-height: 1.5;
		margin: 0;
		white-space: pre-wrap;
		word-wrap: break-word;
	}

	.copy-button {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		background: #4b5563;
		color: white;
		border: none;
		border-radius: 0.25rem;
		padding: 0.25rem 0.5rem;
		font-size: 0.75rem;
		cursor: pointer;
		transition: background-color 0.2s;
	}

	.copy-button:hover {
		background: #374151;
	}
</style>
