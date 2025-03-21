<script lang="ts">
    import ColorPicker from "$lib/components/ColorPicker.svelte";
    import Select from "$lib/components/Select.svelte";
    import Toggle from "$lib/components/Toggle.svelte";

    let useDefaults = $state(false);
    let color = $state("#4b5563");


    // Preview box styling
    let previewSize = $state("md");
    const previewSizes = [
        { value: "sm", label: "Small" },
        { value: "md", label: "Medium" },
        { value: "lg", label: "Large" }
    ];


    // Modal text
    let title = $state("Choose Color");
    let acceptBtnText = $state("Accept");
    let cancelBtnText = $state("Cancel");
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
                <div class="property-group">
                    <div class="property-label">Preview Size</div>
                    <div class="select-wrapper">
                        <Select bind:value={previewSize} options={previewSizes} />
                    </div>
                </div>
                <div class="section">
                    <h3>Demo</h3>
                    <div class="property-group">
                        {#if useDefaults}
                            <ColorPicker bind:color  />
                        {:else}
                            <ColorPicker 
                                bind:color 
                                {title}
                                {acceptBtnText}
                                {cancelBtnText}
                            />
                        {/if}
                    </div>
                </div>
            </div>
        </div>

        {#if !useDefaults}
            <div class="card">
                <div class="section">
                    <h3>Custom Properties</h3>
                    <div class="property-group">
                        <div class="property-label">Title</div>
                        <input 
                            type="text" 
                            bind:value={title} 
                            placeholder="Enter title"
                        />
                    </div>


                </div>
                <div class="section">
                    <h3>Accept Button</h3>
                    <div class="property-group">
                        <div class="property-label">Text</div>
                        <input 
                            type="text" 
                            bind:value={acceptBtnText} 
                            placeholder="Enter button text"
                        />
                    </div>
                </div>
                <div class="section">
                    <h3>Cancel Button</h3>
                    <div class="property-group">
                        <div class="property-label">Text</div>
                        <input 
                            type="text" 
                            bind:value={cancelBtnText} 
                            placeholder="Enter button text"
                        />
                    </div>
                </div>
            </div>
        {/if}
    </div>

    <div class="preview-section">
        <h2>Preview</h2>
        <div 
            class="color-preview"
            class:sm={previewSize === "sm"}
            class:md={previewSize === "md"}
            class:lg={previewSize === "lg"}
            style="background-color: {color};"
        >
            <div class="color-info">
                <span class="color-value">{color}</span>
            </div>
        </div>
    </div>
</div>

<style>
    .page-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 100dvh;
        padding: 2rem;
        gap: 2rem;
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
        margin-block-start: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e5e7eb;
    }

    .property-group {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
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

    input[type="text"] {
        padding: 0.5rem;
        border: 1px solid #d1d5db;
        border-radius: 0.25rem;
        width: 150px;
        font-size: 0.9rem;
    }

    input[type="range"] {
        width: 120px;
    }

    .value-display {
        font-size: 0.8rem;
        color: #6b7280;
        width: 40px;
        text-align: right;
    }

    .preview-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    h2 {
        font-size: 1.5rem;
        font-weight: 600;
        color: #374151;
        margin: 0;
    }

    .color-preview {
        position: relative;
        transition: all 0.3s ease;
    }

    .color-preview.sm {
        width: 100px;
        height: 100px;
    }

    .color-preview.md {
        width: 200px;
        height: 200px;
    }

    .color-preview.lg {
        width: 300px;
        height: 300px;
    }

    .color-info {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,0.7);
        color: white;
        padding: 0.5rem;
        font-family: monospace;
        font-size: 0.9rem;
        text-align: center;
    }
</style> 