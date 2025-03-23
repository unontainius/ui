<script lang="ts">
    import Modal from './Modal.svelte';
    import { materialIcons } from '$lib/data/materialIcons';
	import Window from './Window.svelte';

    let { 
        isOpen = $bindable(false),
        selectedIcon = '',
        size = "lg",
        onselect = $bindable<string>(),
        onclose = $bindable<void>(),
        onok = $bindable<void>()
    } = $props();

    let searchQuery = $state('');
    let tempSelectedIcon = $state(selectedIcon);

    let filteredIcons = $derived(
        materialIcons.filter(icon => 
            icon.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    function handleIconSelect(icon: string) {
        tempSelectedIcon = icon;
    }

    function handleAccept() {
        if (tempSelectedIcon) {
            onselect(tempSelectedIcon);
            onok?.();
            onclose?.();
        }
    }

    function handleClose() {
        onclose?.();
    }

    $effect(() => {
        if (isOpen) {
            tempSelectedIcon = selectedIcon;
            searchQuery = '';
        }
    });

    function renderContent() {
        return `
            
        `;
    }

    function handleContentClick(e: MouseEvent) {
        const target = e.target as HTMLElement;
        const button = target.closest('.icon-button');
        if (button) {
            const icon = button.getAttribute('data-icon');
            if (icon) handleIconSelect(icon);
        }
        if (target.closest('.clear-button')) {
            searchQuery = '';
        }
        if (target.closest('.search-input')) {
            const input = target.closest('.search-input') as HTMLInputElement;
            input.oninput = (e) => {
                searchQuery = (e.target as HTMLInputElement).value;
            };
        }
    }
</script>

{#if isOpen}
    <!-- <Modal
        bind:isOpen
        header="Select Icon"
        {size}
        onCancel={handleClose}
        onAccept={handleAccept}
        >
        <div class="picker-content">
            <div class="search-container">
                <i class="material-icons search-icon">search</i>
                <input
                    type="text"
                    bind:value={searchQuery}
                    placeholder="Search icons..."
                    class="search-input"
                />
                {#if searchQuery}
                    <button class="clear-button" onclick={() => searchQuery = ''}>
                        <i class="material-icons">close</i>
                    </button>
                {/if}
            </div>

            <div class="icons-grid">
                {#each filteredIcons as icon}
                    <button
                        class="icon-button"
                        class:selected={icon === tempSelectedIcon}
                        onclick={() => {
                            tempSelectedIcon = icon;
                            onselect(icon);
                            onclose?.();
                        }}
                    >
                        <i class="material-icons">{icon}</i>
                        <span class="icon-name">{icon}</span>
                    </button>
                {/each}
                {#if filteredIcons.length === 0}
                    <div class="no-results">
                        No icons found for "{searchQuery}"
                    </div>
                {/if}
            </div>
        </div>
    </Modal> -->

    <Window
        bind:show={isOpen}
        title="Select Icon"
        width="lg"
        position="center"
        onDialogueResult={handleAccept}
        showFooter={false}
    >
    <div class="picker-content">
        <div class="search-container">
            <i class="material-icons search-icon">search</i>
            <input
                type="text"
                bind:value={searchQuery}
                placeholder="Search icons..."
                class="search-input"
            />
            {#if searchQuery}
                <button class="clear-button" onclick={() => searchQuery = ''}>
                    <i class="material-icons">close</i>
                </button>
            {/if}
        </div>

        <div class="icons-grid">
            {#each filteredIcons as icon}
                <button
                    class="icon-button"
                    class:selected={icon === tempSelectedIcon}
                    onclick={() => {
                        tempSelectedIcon = icon;
                        onselect(icon);
                        onclose?.();
                    }}
                >
                    <i class="material-icons">{icon}</i>
                    <span class="icon-name">{icon}</span>
                </button>
            {/each}
            {#if filteredIcons.length === 0}
                <div class="no-results">
                    No icons found for "{searchQuery}"
                </div>
            {/if}
        </div>
    </div>
    </Window>
{/if}

<style>
    :global(.picker-content) {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    :global(.search-container) {
        position: relative;
        width: 100%;
        margin-bottom: 1rem;
    }

    :global(.search-icon) {
        position: absolute;
        left: 0.75rem;
        top: 50%;
        transform: translateY(-50%);
        color: #6b7280;
        font-size: 1.25rem;
    }

    :global(.search-input) {
        width: 100%;
        padding: 0.625rem 2.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        font-size: 0.875rem;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
    }

    :global(.search-input:focus) {
        border-color: #3b82f6;
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    :global(.clear-button) {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        transform: translateY(-50%);
        background: none;
        border: none;
        color: #6b7280;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 9999px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :global(.clear-button:hover) {
        background-color: #f3f4f6;
    }

    :global(.icons-grid) {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 1rem;
        padding: 1rem 0;
        width: 100%;
    }

    :global(.icon-button) {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.75rem;
        padding: 1.25rem 0.75rem;
        border: 1px solid transparent;
        border-radius: 0.375rem;
        background: none;
        cursor: pointer;
        transition: all 0.2s;
        width: 100%;
        min-width: 0;
    }

    :global(.icon-button:hover) {
        background-color: #f3f4f6;
    }

    :global(.icon-button.selected) {
        background-color: #e5e7eb;
        border-color: #3b82f6;
    }

    :global(.icon-name) {
        font-size: 0.75rem;
        color: #4b5563;
        text-align: center;
        word-break: break-all;
    }

    :global(.no-results) {
        grid-column: 1 / -1;
        text-align: center;
        padding: 2rem;
        color: #6b7280;
        font-size: 0.875rem;
    }

    :global(.icon-button .material-icons) {
        font-size: 2.25rem !important;
        color: #111827;
        width: 2.25rem;
        height: 2.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style> 