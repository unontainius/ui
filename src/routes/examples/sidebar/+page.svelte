<script lang="ts">
	import SideBar, {type NavItem } from "$lib/components/SideBar.svelte";
    import { demoNavItems as initialNavItems } from "$lib/samples/demoData/sidebarData";
    import { default_imgURL, default_title, default_subtitle } from "$lib/components/Brand.svelte";
    import { browser } from '$app/environment';
    import IconPicker from "$lib/components/IconPicker.svelte";
    import ColorPicker from "$lib/components/ColorPicker.svelte";
    import Toggle from "$lib/components/Toggle.svelte";
	import Button from "$lib/components/Button.svelte";

    let sidebarIsOpen = $state(false);
    let showIconPicker = $state(false);
    let showBgColorPicker = $state(false);
    let showTextColorPicker = $state(false);
    let editingItem = $state<NavItem | null>(null);
    let navItems = $state<NavItem[]>(initialNavItems);
    let showConfig = $state(false);

    // Brand state
    let brandImgURL = $state(default_imgURL);
    let brandTitle = $state(default_title);
    let brandSubtitle = $state(default_subtitle);
    let brandBgColor = $state('#ffffff');
    let brandTextColor = $state('#111827');

    let configText = $derived(`const navItems: NavItem[] = ${JSON.stringify(navItems, null, 2)};`);

    function copyConfig() {
        navigator.clipboard.writeText(configText);
    }

    function handleContentInteraction(e: any) {
        if (!browser) return;
        if (sidebarIsOpen) sidebarIsOpen = false;
    }

    function addNewItem() {
        editingItem = {
            icon: 'add',
            label: 'New Item',
            href: '/',
        };
        showIconPicker = true;
    }

    function editItem(item: NavItem) {
        editingItem = { ...item };
        showIconPicker = true;
    }

    function deleteItem(item: NavItem) {
        navItems = navItems.filter(i => i !== item);
    }

    function handleIconSelect(icon: string) {
        if (editingItem) {
            editingItem.icon = icon;
        }
        showIconPicker = false;
    }

    function saveItem() {
        if (!editingItem) return;
        
        const existingIndex = navItems.findIndex(item => 
            item.label === editingItem?.label && 
            item.href === editingItem?.href
        );

        if (existingIndex >= 0) {
            navItems[existingIndex] = { ...editingItem };
        } else {
            navItems = [...navItems, { ...editingItem }];
        }

        editingItem = null;
    }

    function cancelEdit() {
        editingItem = null;
        showIconPicker = false;
    }


</script>

<div class="page-container">
	<SideBar 
		bind:isOpen={sidebarIsOpen} 
		imgURL={brandImgURL} 
		title={brandTitle} 
		subtitle={brandSubtitle} 
		navItems={navItems} 
		dockSide="right"
        headerBgColor={brandBgColor}
        headerTextColor={brandTextColor}
	/>

	<div 
        class="content"
        role="button"
        tabindex="0"
        onclick={(e) => handleContentInteraction(e)}
        onmouseover={(e) => handleContentInteraction(e)}
        onfocus={(e) => handleContentInteraction(e)}
        onkeydown={(e) => {
            if (e.key === 'Escape') {
                handleContentInteraction(e);
            }
        }}
    >
		<div class="cards-container">
			<div class="card">
				<div class="section">
					<h3>Header (Brand Settings)</h3>
					<div class="form-group">
						<label for="brand-image">Brand Image URL</label>
						<input 
							id="brand-image" 
							type="text" 
							bind:value={brandImgURL}
							placeholder="Enter image URL"
						/>
					</div>
					<div class="form-group">
						<label for="brand-title">Brand Title</label>
						<input 
							id="brand-title" 
							type="text" 
							bind:value={brandTitle}
							placeholder="Enter title"
						/>
					</div>
					<div class="form-group">
						<label for="brand-subtitle">Brand Subtitle</label>
						<input 
							id="brand-subtitle" 
							type="text" 
							bind:value={brandSubtitle}
							placeholder="Enter subtitle"
						/>
					</div>
                    <div class="property-row">
                        <p>Background Color</p>
                        <ColorPicker
                            bind:color={brandBgColor}
                            title="Background"
                            textSide="left"
                        />
                    </div>
                    <div class="property-row">
                        <p>Text Color</p>
                        <ColorPicker
                            bind:color={brandTextColor}
                            title="Text"
                            textSide="left"
                        />
                    </div>
                    <div class="preview-container" style:background-color={brandBgColor} style:color={brandTextColor}>
                        <h1>Hello World</h1>
                    </div>
				</div>
			</div>
			<div class="card">
				<div class="section">
					<h3>Navigation Items</h3>
					<button class="add-button" onclick={addNewItem}>
						<span class="material-icons">add</span>
						Add New Item
					</button>
					<div class="nav-items-list">
						{#each navItems as item}
							<div class="nav-item">
								<div class="nav-item-content">
									<span class="material-icons">{item.icon || 'radio_button_unchecked'}</span>
									<span class="nav-item-label">{item.label}</span>
									{#if item.badge}
										<span class="badge">{item.badge}</span>
									{/if}
								</div>
								<div class="nav-item-actions">
									<button class="icon-button" onclick={() => editItem(item)}>
										<span class="material-icons">edit</span>
									</button>
									<button class="icon-button delete" onclick={() => deleteItem(item)}>
										<span class="material-icons">delete</span>
									</button>
								</div>
							</div>
						{/each}
					</div>
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
		</div>
	</div>
</div>

<div class="demo-pointer">
    <Button
        backgroundColor="#F06000"
        borderRadius={24}
        borderWidth={0}
        caption="Demo Here"
        fontSize="2rem"
        minWidth="250px"
        icon="arrow_forward"
        iconPosition="right"
        />
</div>

{#if showIconPicker && editingItem}
	<IconPicker
		bind:isOpen={showIconPicker}
		selectedIcon={editingItem.icon}
		onselect={handleIconSelect}
		onclose={() => showIconPicker = false}
	/>
{/if}

{#if editingItem}
	<div class="modal-overlay">
		<div class="edit-modal">
			<h3>{editingItem.label ? 'Edit' : 'New'} Navigation Item</h3>
			<div class="form-group">
				<label for="label-input">Label</label>
				<input id="label-input" type="text" bind:value={editingItem.label} placeholder="Enter label" />
			</div>
			<div class="form-group">
				<label for="icon-input">Icon</label>
				<div class="icon-select">
					<input 
						id="icon-input"
						type="text" 
						bind:value={editingItem.icon} 
						placeholder="Material icon name"
						readonly
					/>
					<button class="icon-button" onclick={() => showIconPicker = true}>
						<span class="material-icons">search</span>
					</button>
				</div>
			</div>
			<div class="form-group">
				<label for="url-input">URL</label>
				<input id="url-input" type="text" bind:value={editingItem.href} placeholder="Enter URL" />
			</div>
			<div class="form-group">
				<label for="badge-input">Badge (optional)</label>
				<input id="badge-input" type="text" bind:value={editingItem.badge} placeholder="Enter badge text" />
			</div>
			<div class="form-actions">
				<button class="cancel-button" onclick={cancelEdit}>Cancel</button>
				<button class="save-button" onclick={saveItem}>Save</button>
			</div>
		</div>
	</div>
{/if}

<style>
    .demo-pointer {
        position: absolute;
        top: 1rem;
        right: 6rem;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        font-size: 0.875rem;
        font-weight: 500;
        text-transform: uppercase;
        
    }
     .preview-container {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 90px;
        overflow: hidden;
        border-radius: 0.5rem;
    }
	.page-container {
		display: flex;
		flex-direction: row;
        justify-content: center;
        align-items: center;
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

	.cards-container {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        gap: 1rem;
        max-width: 1200px;
        justify-content: center;
        width: 100%;
    }

    .card {
        background: white;
        border: 1px solid #ccc;
        border-radius: 0.5rem;
        padding: 1.5rem;
        padding-block-start: 0;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        width: 100%;
        max-width: 360px;
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
    .property-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        font-size: 0.9rem;
        font-weight: 500;
        color: #374151;
        width: 100%;
    }
    .add-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: #4b5563;
        color: white;
        border: none;
        border-radius: 0.375rem;
        cursor: pointer;
        transition: background-color 0.2s;
        width: fit-content;
    }

    .add-button:hover {
        background: #374151;
    }

    .nav-items-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .nav-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.75rem;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 0.375rem;
    }

    .nav-item-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        flex: 1;
        min-width: 0;
        padding-inline-end: 1rem;
    }

    .nav-item-content .material-icons {
        flex-shrink: 0;
        width: 1.5rem;
        height: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .nav-item-label {
        font-size: 0.9rem;
        font-weight: 500;
        color: #374151;
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .badge {
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.25rem 0.5rem;
        background: #a8c2fa;
        color: #1f2937;
        border-radius: 1rem;
    }

    .nav-item-actions {
        display: flex;
        gap: 0.5rem;
    }

    .icon-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.25rem;
        background: white;
        cursor: pointer;
        transition: all 0.2s;
    }

    .icon-button:hover {
        background: #f3f4f6;
        border-color: #9ca3af;
    }

    .icon-button.delete:hover {
        background: #fee2e2;
        border-color: #ef4444;
        color: #ef4444;
    }

    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
    }

    .edit-modal {
        background: white;
        padding: 1.5rem;
        border-radius: 0.5rem;
        width: 100%;
        max-width: 400px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin-bottom: 1rem;
    }

    .form-group label {
        font-size: 0.9rem;
        font-weight: 500;
        color: #374151;
    }

    .form-group input {
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.25rem;
        width: 100%;
        font-size: 0.9rem;
    }

    .icon-select {
        display: flex;
        gap: 0.5rem;
    }

    .form-actions {
        display: flex;
        justify-content: flex-end;
        gap: 0.75rem;
        margin-top: 1.5rem;
    }

    .cancel-button, .save-button {
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s;
    }

    .cancel-button {
        background: white;
        border: 1px solid #d1d5db;
        color: #374151;
    }

    .cancel-button:hover {
        background: #f3f4f6;
        border-color: #9ca3af;
    }

    .save-button {
        background: #4b5563;
        border: none;
        color: white;
    }

    .save-button:hover {
        background: #374151;
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

    .color-select {
        display: flex;
        gap: 0.5rem;
    }

    .color-select input {
        flex: 1;
    }

    .color-select .icon-button {
        width: 2.5rem;
        color: white;
        text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
    }
</style>

