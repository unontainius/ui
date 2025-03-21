<script lang="ts">
    import Docker from "$lib/components/Docker.svelte";
    import type { DockPosition } from "$lib/components/Docker.svelte";
    import { positions } from "$lib/components/Docker.svelte";
    import ColorPicker from "$lib/components/ColorPicker.svelte";
    import Toggle from "$lib/components/Toggle.svelte";

    let useDefaults = $state(false);
    let isOpen = $state(false);
    let dockerPosition = $state<DockPosition>("center");

    // Docker styling
    let title = $state("Select Position");
    let primaryColor = $state("#4b5563");
    let secondaryColor = $state("#FFFFFF");


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
                <div class="property-group preview-group">
                    <button 
                        class="dock-button preview-button"
                        onclick={() => isOpen = true}
                        style="--docker-primary: {secondaryColor}; --docker-secondary: {primaryColor}; border-radius: 2rem;"
                    >
                        <span class="material-icons">
                            {positions.find(p => p.value === dockerPosition)?.icon}
                        </span>
                        
                    </button>
                    <p>{positions.find(p => p.value === dockerPosition)?.value}</p>
                    {#if useDefaults}
                        <Docker 
                            bind:position={dockerPosition} 
                            bind:isOpen={isOpen}
                            {title}
                        />
                    {:else}
                        <Docker 
                            bind:position={dockerPosition} 
                            bind:isOpen={isOpen}
                            {title}
                            {primaryColor}
                            {secondaryColor}
                        />
                    {/if}
                </div>
            </div>
        </div>

        <div class="card">
            {#if !useDefaults}

                <div class="section">
                    <h3>Custom Properties</h3>
                    <div class="property-group">
                        <div class="property-label">Primary Color</div>
                        <ColorPicker bind:color={primaryColor} title="Primary Color" textSide="left"/>
                    </div>

                    <div class="property-group">
                        <div class="property-label">Secondary Color</div>
                        <ColorPicker bind:color={secondaryColor} title="Secondary Color" textSide="left"/>
                    </div>
                </div>
            {/if}

        </div>


    </div>
</div>

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
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        width: 300px;
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
        padding-block-start: 1rem;
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

    .preview-group {
        justify-content: center;
    }

    .property-label {
        font-size: 0.9rem;
        font-weight: 500;
        color: #374151;
        flex: 1;
    }

    .preview-button {
        aspect-ratio: 1;
        width: 48px;
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

    .preview-button:hover {
        border-color: var(--docker-primary);
    }

    .preview-button .material-icons {
        font-size: 1.5rem;
        color: var(--docker-primary);
    }
</style> 