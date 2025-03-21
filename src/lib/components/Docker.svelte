<script lang="ts" module>
    export type DockPosition = 'top-left' | 'top' | 'top-right' | 
                       'left' | 'center' | 'right' | 
                       'bottom-left' | 'bottom' | 'bottom-right';

    export const positions: { value: DockPosition; icon: string }[] = [
        { value: 'top-left', icon: 'north_west' },
        { value: 'top', icon: 'north' },
        { value: 'top-right', icon: 'north_east' },
        { value: 'left', icon: 'west' },
        { value: 'center', icon: 'crop_square' },
        { value: 'right', icon: 'east' },
        { value: 'bottom-left', icon: 'south_west' },
        { value: 'bottom', icon: 'south' },
        { value: 'bottom-right', icon: 'south_east' }
    ];
</script>

<script lang="ts">
    import Modal from "./Modal.svelte";

    let { 
        isOpen = $bindable(false),
        position = $bindable<DockPosition>('center'),
        title = "Dock Position",
        primaryColor = $bindable("#a8c2fa"),
        secondaryColor = $bindable("#FFFFFF")
     } = $props();

    function handleClose() {
        isOpen = false;
    }

    function handleSelect(newPosition: DockPosition) {
        position = newPosition;
        isOpen = false;
    }
</script>

{#if isOpen}
    <Modal 
        bind:isOpen
        header={title}
        onCancel={handleClose}
        onAccept={handleClose}
        actionBtns={false}
        acceptBtnText={''}
        cancelBtnText={''}
        size="sm"

    >
        <div class="docker">
            <div class="grid">
                {#each positions as pos}
                    <button 
                        class="dock-button"
                        class:active={position === pos.value}
                        onclick={() => handleSelect(pos.value)}
                        style="--docker-primary: {primaryColor}; --docker-secondary: {secondaryColor};"
                    >
                        <span class="material-icons">{pos.icon}</span>
                    </button>
                {/each}
            </div>
        </div>
    </Modal>
{/if}

<style>
    .docker {
        padding: 1rem;
        background: white;
        border-radius: 0.5rem;
        width: 280px;
        margin-inline: 0.5rem;
    }

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 0.5rem;
    }

    .dock-button {
        aspect-ratio: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--docker-secondary);
        border: 2px solid transparent;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.2s ease;
        padding: 0;
    }

    .dock-button:hover {
        border-color: var(--docker-primary);
    }

    .dock-button.active {
        background: var(--docker-primary);
    }

    .dock-button .material-icons {
        font-size: 1.5rem;
        color: var(--docker-primary);
    }

    .dock-button.active .material-icons {
        color: var(--docker-secondary);
    }
</style> 