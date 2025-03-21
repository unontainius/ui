<script lang="ts">
    import Button from "$lib/components/Button.svelte";
    import ColorPicker from "$lib/components/ColorPicker.svelte";
    import Select from "$lib/components/Select.svelte";
    import Toggle from "$lib/components/Toggle.svelte";
    import IconPicker from "$lib/components/IconPicker.svelte";
    import type { ShadowStyle, IconPosition } from "$lib/components/Button.svelte";

    let useDefaults = $state(false);

    // appearance
    let fontSize = $state('1rem');
    const fontSizeOptions = [
        { value: '1rem', label: 'Normal' },
        { value: '1.25rem', label: 'Big' },
        { value: '1.5rem', label: 'Large' },
        { value: '2rem', label: 'Huge' },
        { value: '4rem', label: 'Gigantic' }
    ];
    let backgroundColor = $state('#4b5563');
    let foregroundColor = $state('#ffffff');
    
    // Border
    let borderRadius = $state(8);
    let borderWidth = $state(1);
    let borderColor = $state('#374151');
    
    // Content
    let caption = $state('Click Me');
    let icon = $state('');
    let iconPosition = $state<IconPosition>('none');
    let showIconPicker = $state(false);
    
    // Layout
    let minWidth = $state('120px');
    
    // Effects
    let shadowStyle = $state<ShadowStyle>('sm');
    const shadowOptions = [
        { value: 'none', label: 'None' },
        { value: 'sm', label: 'Small' },
        { value: 'md', label: 'Medium' },
        { value: 'lg', label: 'Large' }
    ];

    const iconPositionOptions = [
        { value: 'none', label: 'None' },
        { value: 'left', label: 'Left' },
        { value: 'center', label: 'Center' },
        { value: 'right', label: 'Right' }
    ];
    
    // State
    let disabled = $state(false);

    // Configuration display
    let showConfig = $state(false);
    let showComponent = $state(false);

    function getComponentCode() {
        const props = [];
        if (backgroundColor !== '#4b5563') props.push(`backgroundColor="${backgroundColor}"`);
        if (foregroundColor !== '#ffffff') props.push(`foregroundColor="${foregroundColor}"`);
        if (borderRadius !== 8) props.push(`borderRadius={${borderRadius}}`);
        if (borderWidth !== 1) props.push(`borderWidth={${borderWidth}}`);
        if (borderColor !== '#374151') props.push(`borderColor="${borderColor}"`);
        if (caption !== 'Button') props.push(`caption="${caption}"`);
        if (fontSize !== '1rem') props.push(`fontSize="${fontSize}"`);
        if (minWidth !== '120px') props.push(`minWidth="${minWidth}"`);
        if (shadowStyle !== 'sm') props.push(`shadowStyle="${shadowStyle}"`);
        if (disabled) props.push('disabled');
        if (icon) props.push(`icon="${icon}"`);
        if (iconPosition !== 'none') props.push(`iconPosition="${iconPosition}"`);
        
        return `<Button${props.length ? '\n  ' + props.join('\n  ') : ''}\n/>`;
    }

    let componentCode = $derived(getComponentCode());

    let configText = $derived(`let {
    // Colors
    backgroundColor = '${backgroundColor}',
    foregroundColor = '${foregroundColor}',
    
    // Border
    borderRadius = ${borderRadius},
    borderWidth = ${borderWidth},
    borderColor = '${borderColor}',
    
    // Content
    caption = 'Button',
    icon = '${icon}',
    iconPosition = '${iconPosition}' as IconPosition,
    
    // Layout
    minWidth = '${minWidth}',
    
    // Effects
    shadowStyle = '${shadowStyle}' as ShadowStyle,
    
    // State
    disabled = false
} = $props();`);

    function handleClick() {
        alert('Button clicked!');
    }

    function copyConfig() {
        navigator.clipboard.writeText(configText);
    }

    function handleIconSelect(event: CustomEvent<string>) {
        icon = event.detail;
        showIconPicker = false;
    }

    function handleIconPickerClose() {
        showIconPicker = false;
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
                <div class="section">
                    <h3>State</h3>
                    <div class="property-group">
                        <div class="property-label">Disabled</div>
                        <Toggle bind:checked={disabled} size="md" />
                    </div>
                </div>
            </div>
            <div class="section">
                <h3>Preview</h3>
                <div class="preview-group">
                    {#if useDefaults}
                        <Button onclick={handleClick} {disabled} {fontSize}/>
                    {:else}
                        <Button
                            {backgroundColor}
                            {foregroundColor}
                            {borderRadius}
                            {borderWidth}
                            {borderColor}
                            {caption}
                            {icon}
                            {iconPosition}
                            {minWidth}
                            {shadowStyle}
                            {disabled}
                            {fontSize}
                            onclick={handleClick}
                        />
                    {/if}
                </div>
            </div>
            <div class="section">
                <h3>Configuration</h3>
                <div class="property-group">
                    <div class="property-label">Show Configuration</div>
                    <Toggle bind:checked={showConfig} size="md" />
                </div>
                <div class="property-group">
                    <div class="property-label">Show Component Call</div>
                    <Toggle bind:checked={showComponent} size="md" />
                </div>
                {#if showConfig}
                    <div class="config-container">
                        <pre>{configText}</pre>
                        <button class="copy-button" onclick={copyConfig}>
                            Copy to Clipboard
                        </button>
                    </div>
                {/if}
                {#if showComponent}
                    <div class="config-container">
                        <pre>{componentCode}</pre>
                        <button class="copy-button" onclick={() => {
                            const code = getComponentCode();
                            navigator.clipboard.writeText(code);
                        }}>
                            Copy to Clipboard
                        </button>
                    </div>
                {/if}
            </div>
        </div>



        {#if !useDefaults}
            <div class="card">
                <div class="section">
                    <h3>Custom Properties</h3>
                    <div class="property-group">
                        <div class="property-label">Caption</div>
                        <input 
                            type="text" 
                            bind:value={caption} 
                            placeholder="Enter button text"
                        />
                    </div>
                    <div class="property-group">
                        <div class="property-label">Icon</div>
                        <div class="icon-select">
                            <input 
                                type="text" 
                                bind:value={icon} 
                                placeholder="Material icon name"
                                readonly
                            />
                            <button class="icon-button" onclick={() => showIconPicker = true}>
                                <i class="material-icons">search</i>
                            </button>
                        </div>
                    </div>
                    <div class="property-group">
                        <div class="property-label">Icon Position</div>
                        <div class="select-wrapper">
                            <Select bind:value={iconPosition} options={iconPositionOptions} />
                        </div>
                    </div>
                </div>
                <div class="section">
                    <h3>Layout</h3>
                    <div class="property-group">
                        <div class="property-label">Min Width</div>
                        <input 
                            type="text" 
                            bind:value={minWidth} 
                            placeholder="Enter min width"
                        />
                    </div>


                    <div class="property-group">
                        <div class="property-label">Shadow</div>
                        <div class="select-wrapper">
                            <Select bind:value={shadowStyle} options={shadowOptions} />
                        </div>
                    </div>
                </div>
            </div>
            <div class="card">
                <div class="section">
                    <h3>Appearance</h3>
                    <div class="property-group">
                        <div class="property-label">Font Size</div>
                        <div class="select-wrapper">
                            <Select bind:value={fontSize} options={fontSizeOptions} />
                        </div>
                    </div>
                    <div class="property-group">
                        <div class="property-label">Background</div>
                        <ColorPicker bind:color={backgroundColor} title="Background Color" textSide="left"/>
                    </div>

                    <div class="property-group">
                        <div class="property-label">Text</div>
                        <ColorPicker bind:color={foregroundColor} title="Text Color" textSide="left"/>
                    </div>
                </div>
                <div class="section">
                    <h3>Border</h3>
                    <div class="property-group">
                        <div class="property-label">Color</div>
                        <ColorPicker bind:color={borderColor} title="Border Color" textSide="left"/>
                    </div>

                    <div class="property-group">
                        <div class="property-label">Width</div>
                        <input 
                            type="range" 
                            bind:value={borderWidth} 
                            min="0" 
                            max="4" 
                            step="1"
                        />
                        <span class="value-display">{borderWidth}px</span>
                    </div>

                    <div class="property-group">
                        <div class="property-label">Radius</div>
                        <input 
                            type="range" 
                            bind:value={borderRadius} 
                            min="0" 
                            max="24" 
                            step="2"
                        />
                        <span class="value-display">{borderRadius}px</span>
                    </div>
                </div>
                
            </div>
        {/if}
    </div>
</div>

{#if showIconPicker}
    <IconPicker
        bind:isOpen={showIconPicker}
        selectedIcon={icon}
        onselect={(selectedIcon: string) => {
            icon = selectedIcon;
            showIconPicker = false;
        }}
        onclose={() => showIconPicker = false}
    />
{/if}

<style>
    .select-wrapper {
        width: 120px;
    }
    .page-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
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

    .preview-group {
        display: flex;
        justify-content: center;
        padding: 2rem;
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

    input[type="range"] {
        width: 120px;
    }

    .value-display {
        font-size: 0.8rem;
        color: #6b7280;
        width: 40px;
        text-align: right;
    }

    input[type="text"] {
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

    .icon-select {
        display: flex;
        gap: 0.5rem;
        align-items: center;
    }

    .icon-select input {
        width: 120px;
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

    .icon-button i {
        font-size: 1rem;
        color: #4b5563;
    }
</style> 