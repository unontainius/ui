<script lang="ts">
    import ColorPicker from './ColorPicker.svelte';
    import Select from './Select.svelte';
    import BorderStyle from './BorderStyle.svelte';
    import BorderRadiusStyle from './BorderRadiusStyle.svelte';
	import Toggle from './Toggle.svelte';
    import Accordion from './Accordion.svelte';

    let { onChange = () => {}} = $props();

    const fontSizeOptions = [
        { value: '0.75rem', label: '0.75rem' },
        { value: '0.875rem', label: '0.875rem' },
        { value: '1rem', label: '1rem' },
        { value: '1.25rem', label: '1.25rem' },
        { value: '1.5rem', label: '1.5rem' },
        { value: '2rem', label: '2rem' },
        { value: '3rem', label: '3rem' }
    ];

    const fontWeightOptions = [
        { value: '100', label: 'light' },
        { value: '200', label: 'normal' },
        { value: '300', label: 'medium' },
        { value: '400', label: 'semibold' },
        { value: '500', label: 'bold' },
        { value: '600', label: 'extra bold' },
        { value: '700', label: 'black' },
    ];
    
    const defaultFontSize = '';
    const defaultFontWeight = '400';
    const defaultBackgroundColor = '#ffffff';
    const defaultTextColor = '#000000';
    let borderCSS = $state('');
    let borderRadiusCSS = $state('');

    let fontSize = $state(defaultFontSize);
    let fontWeight = $state(defaultFontWeight);
    let backgroundColor = $state(defaultBackgroundColor);
    let textColor = $state(defaultTextColor);

    // let borders = [{type: 'all', width: '1px', style: 'solid', color: '#000000'}];
    // let borderRadei = [{type: 'all', radius: '4px'}];
    let showDropShadow = $state(false);
    let boxShadow = $state({x: '5px', y: '5px', blur: '11px', color: '#828282'});
    let boxShadowCSS = $derived(showDropShadow ? `box-shadow: ${boxShadow.x} ${boxShadow.y} ${boxShadow.blur} ${boxShadow.color}` : '');

    let showTextShadow = $state(false);
    let textShadow = $state({x: '2px', y: '2px', blur: '4px', color: '#828282'});
    let textShadowCSS = $derived(showTextShadow ? `text-shadow: ${textShadow.x} ${textShadow.y} ${textShadow.blur} ${textShadow.color}` : '');

    function handleBoxShadowChange(e: Event, property: 'x' | 'y' | 'blur') {
        const input = e.target as HTMLInputElement;
        const newValue = `${input.value}px`;
        boxShadow = { ...boxShadow, [property]: newValue };
    }

    function handleTextShadowChange(e: Event, property: 'x' | 'y' | 'blur') {
        const input = e.target as HTMLInputElement;
        const newValue = `${input.value}px`;
        textShadow = { ...textShadow, [property]: newValue };
    }

    function formatStyles(styles: (string | undefined)[]): string {
        const filteredStyles = styles.filter((style): style is string => Boolean(style));
        if (filteredStyles.length === 0) return '';
        
        return filteredStyles
            .map(style => style.trim())
            .join(';');
    }

    function formatDisplayStyles(styles: (string | undefined)[]): string {
        const filteredStyles = styles.filter((style): style is string => Boolean(style));
        if (filteredStyles.length === 0) return '';
        
        const formattedStyles = filteredStyles
            .map(style => {
                const [property, value] = style.split(':');
                return `    <span class="property">${property.trim()}</span>: <span class="value">${value.trim()}</span>`;
            })
            .join(';\n');
        
        return `<span class="selector">.preview-style</span> <span class="brace">{</span>\n${formattedStyles};\n<span class="brace">}</span>`;
    }

    let previewStyle = $derived(formatStyles([
        fontSize !== defaultFontSize ? `font-size: ${fontSize}` : undefined,
        fontWeight !== defaultFontWeight ? `font-weight: ${fontWeight}` : undefined,
        backgroundColor !== defaultBackgroundColor ? `background-color: ${backgroundColor}` : undefined,
        textColor !== defaultTextColor ? `color: ${textColor}` : undefined,
        ...(borderCSS ? borderCSS.split(';') : []),
        ...(borderRadiusCSS ? borderRadiusCSS.split(';') : []),
        boxShadowCSS || undefined,
        textShadowCSS || undefined,

    ]));

    let displayStyle = $derived(formatDisplayStyles([
        fontSize !== defaultFontSize ? `font-size: ${fontSize}` : undefined,
        fontWeight !== defaultFontWeight ? `font-weight: ${fontWeight}` : undefined,
        backgroundColor !== defaultBackgroundColor ? `background-color: ${backgroundColor}` : undefined,
        textColor !== defaultTextColor ? `color: ${textColor}` : undefined,
        ...(borderCSS ? borderCSS.split(';') : []),
        ...(borderRadiusCSS ? borderRadiusCSS.split(';') : []),
        boxShadowCSS || undefined,
        textShadowCSS || undefined
    ]));

    function copyToClipboard() {
        navigator.clipboard.writeText(previewStyle);
    }

</script>

<div class="style-builder">
    <div class="preview-section">
        <h3>Preview</h3>
        <div class="preview-box" style={previewStyle}>
            Demo Element
        </div>
        <div class="preview-css">
            <div class="preview-css-header">
                <h3>Generated CSS</h3>
                <button 
                    onclick={copyToClipboard}
                    class="copy-button"
                    aria-label="Copy to clipboard"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M16 1H4C3 1 2 2 2 3v14h2V3h12V1zm3 4H8C7 5 6 6 6 7v14c0 1 1 2 2 2h11c1 0 2-1 2-2V7c0-1-1-2-2-2zm0 16H8V7h11v14z"/>
                    </svg>
                </button>
            </div>
            {@html displayStyle}
        </div>
        <button 
            class="accept-button"
            onclick={() => onChange(previewStyle)}
            aria-label="Accept changes"
        >
            Accept
        </button>
    </div>

    <div class="controls-section">
        <Accordion title="Typography" isOpen={false}>
            <div class="control-row">
                <div class="label">Font Size</div>
                <div class="select-container">
                    <Select
                        bind:value={fontSize}
                            options={fontSizeOptions}
                        />
                </div>
                <div class="label">Font Weight</div>
                <div class="select-container">
                    <Select
                        bind:value={fontWeight}
                        options={fontWeightOptions}
                    />
                </div>
            </div>
        </Accordion>

        <Accordion title="Colors" isOpen={false}>
            <div class="color-controls">
                <div class="control-row">
                    <h4>Background</h4>
                    <ColorPicker
                        bind:color={backgroundColor}
                    />

                    <h4>Text</h4>
                    <ColorPicker
                        bind:color={textColor}
                    />
                </div>
            </div>
            <div class="control-row" style={showTextShadow ? 'border-bottom-left-radius: 0; border-bottom-right-radius: 0;' : ''}>
                <h4>Text Shadow</h4>
                <Toggle
                    bind:checked={showTextShadow}
                />
            </div>
            <div class="control-row" style={showTextShadow ? 'margin-top: -0.25rem; border-top: none;border-top-left-radius: 0; border-top-right-radius: 0;' : 'display: none;'}>
                {#if showTextShadow}
                    <div class="label">Details</div>
                    <ColorPicker
                        bind:color={textShadow.color}
                    />
                    <div class="slider-container">
                        <h3>Offset X ({textShadow.x})</h3>
                        <input 
                            type="range"
                            min="-50"
                            max="50"
                            value={parseInt(textShadow.x)}
                            class="shadow-slider"
                            onchange={(e) => handleTextShadowChange(e, 'x')}
                            oninput={(e) => handleTextShadowChange(e, 'x')}
                        />
                    </div>
                    <div class="slider-container">
                        <h3>Offset Y ({textShadow.y})</h3>
                        <input 
                            type="range"
                            min="-50"
                            max="50"
                            value={parseInt(textShadow.y)}
                            class="shadow-slider"
                            onchange={(e) => handleTextShadowChange(e, 'y')}
                            oninput={(e) => handleTextShadowChange(e, 'y')}
                        />
                    </div>
                    <div class="slider-container">
                        <h3>Blur ({textShadow.blur})</h3>
                        <input 
                            type="range"
                            min="0"
                            max="50"
                            value={parseInt(textShadow.blur)}
                            class="shadow-slider"
                            onchange={(e) => handleTextShadowChange(e, 'blur')}
                            oninput={(e) => handleTextShadowChange(e, 'blur')}
                        />
                    </div>
                {/if}
            </div>
            <div class="control-row" style={showDropShadow ? 'border-bottom-left-radius: 0; border-bottom-right-radius: 0;' : ';'}>
                <h4>Box Shadow</h4>
                <Toggle
                    bind:checked={showDropShadow}
                />
            </div>
            <div class="control-row" style={showDropShadow ? 'margin-top: -0.25rem; border-top: none; border-top-left-radius: 0; border-top-right-radius: 0;' : 'display: none;'}>
                {#if showDropShadow}
                    <div class="label">Details</div>
                    <ColorPicker
                        bind:color={boxShadow.color}
                    />

                    <div class="slider-container">
                        <h3>Offset X ({boxShadow.x})</h3>
                        <input 
                            type="range"
                            min="-50"
                            max="50"
                            value={parseInt(boxShadow.x)}
                            class="shadow-slider"
                            onchange={(e) => handleBoxShadowChange(e, 'x')}
                            oninput={(e) => handleBoxShadowChange(e, 'x')}
                        />
                    </div>
                    <div class="slider-container">
                        <h3>Offset Y ({boxShadow.y})</h3>
                        <input 
                            type="range"
                            min="-50"
                            max="50"
                            value={parseInt(boxShadow.y)}
                            class="shadow-slider"
                            onchange={(e) => handleBoxShadowChange(e, 'y')}
                            oninput={(e) => handleBoxShadowChange(e, 'y')}
                        />
                    </div>
                    <div class="slider-container">
                        <h3>Blur ({boxShadow.blur})</h3>
                        <input 
                            type="range"
                            min="0"
                            max="50"
                            value={parseInt(boxShadow.blur)}
                            class="shadow-slider"
                            onchange={(e) => handleBoxShadowChange(e, 'blur')}
                            oninput={(e) => handleBoxShadowChange(e, 'blur')}
                        />
                    </div>
                {/if}
            </div>
        </Accordion>

        <Accordion title="Border" isOpen={false}>
            <BorderStyle bind:borderCSS 
                rowStyle = {`
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 1rem;
                    border: 1px solid rgb(212, 212, 212);
                    background-color: #dfdddd;
                    flex-wrap: wrap;
                    flex: 1;
                    border-radius: 10px;
                    padding-block: 0.5rem;
                    padding-inline-start: 1rem;
                    margin-block: 0.25rem;
                `}
            />
        </Accordion>

        <Accordion title="Border Radius" isOpen={false}>
            <BorderRadiusStyle bind:borderRadiusCSS 
                rowStyle = {`
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                    gap: 1rem;
                    border: 1px solid rgb(212, 212, 212);
                    background-color: #dfdddd;
                    flex-wrap: wrap;
                    flex: 1;
                    border-radius: 10px;
                    padding-block: 0.5rem;
                    padding-inline-start: 1rem;
                    margin-block: 0.25rem;
                `}
            />
        </Accordion>
    </div>
</div>

<style>
    h3,h4 {
        margin: 0;
    }

    .style-builder {
        display: flex;
        gap: 2rem;
        padding: 1rem;
        background-color: #02273d8e;
        border-radius: 8px;
        width: 100%;
        flex-direction: column;
        position: relative;
    }

    @media (min-width: 1024px) {
        .style-builder {
            flex-direction: row;
        }
    }

    .preview-section {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1rem;
        background-color: rgb(228, 228, 228);
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        gap: 1.5rem;
        min-width: 0;
    }

    .preview-box {
        padding: 2rem;
        width: 100%;
        max-width: 400px;
        text-align: center;
        transition: all 0.2s ease;
    }

    .controls-section {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        position: relative;
        min-width: 0;
    }

    .control-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        border: 1px solid rgb(212, 212, 212);
        background-color: #dfdddd;
        flex-wrap: wrap;
        border-radius: 10px;
        padding: 0.75rem;
        margin-block: 0.25rem;
        width: 100%;
    }

    .control-row > * {
        flex: 0 1 auto;
    }

    .control-row .label {
        min-width: 80px;
        white-space: nowrap;
    }

    .control-row h4 {
        min-width: 100px;
        white-space: nowrap;
    }

    .slider-container {
        flex: 1 1 150px;
        min-width: 120px;
        max-width: none;
    }

    .select-container {
        flex: 1 1 150px;
        min-width: 150px;
        max-width: none;
    }

    .color-controls {
        display: flex;
        gap: 1rem;
        flex-wrap: wrap;
        width: 100%;
    }

    .color-controls .control-row {
        flex: 1 1 300px;
        min-width: 0;
    }

    :global(.color-picker) {
        flex: 1 1 auto;
        min-width: 120px;
    }

    .preview-css {
        width: 100%;
        padding: 1rem;
        background-color: #464646;
        border-radius: 4px;
        font-family: monospace;
        white-space: pre-wrap;
        word-break: break-all;
        color: white;
        font-size: 0.875rem;
        overflow-x: auto;
    }

    .preview-css-header {
        display: flex;
        color: rgb(18, 197, 252);
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 1px solid #e0e0e0;
    }

    .copy-button {
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0.5rem;
        background-color: #4CAF50;
        border: none;
        border-radius: 4px;
        color: white;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }

    .copy-button:hover {
        background-color: #45a049;
    }

    .copy-button:active {
        transform: scale(0.95);
    }

    :global(.preview-css .selector) {
        color: #ffa500; /* orange */
    }

    :global(.preview-css .brace) {
        color: #ffff00; /* yellow */
    }

    :global(.preview-css .property) {
        color: #00ffff; /* cyan */
    }

    :global(.preview-css .value) {
        color: #f0e68c; /* light khaki */
    }

    .shadow-slider {
        width: 100%;
        height: 15px;
        appearance: none;
        -webkit-appearance: none;
        background: transparent;
        cursor: pointer;
    }

    .shadow-slider::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: #e5e7eb;
    }

    .shadow-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #4CAF50;
        margin-top: -6px;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        cursor: pointer;
    }

    .shadow-slider::-moz-range-track {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: #e5e7eb;
    }

    .shadow-slider::-moz-range-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #4CAF50;
        border: none;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        cursor: pointer;
    }

    .shadow-slider:hover::-webkit-slider-thumb {
        background: #45a049;
    }

    .shadow-slider:hover::-moz-range-thumb {
        background: #45a049;
    }

    .shadow-slider:focus {
        outline: none;
    }

    .shadow-slider:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }

    .shadow-slider:focus::-moz-range-thumb {
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }

    .slider-container h3 {
        margin: 0;
        font-size: 1rem;
        font-weight: 400;
        color: #333;
    }

    .accept-button {
        width: 100%;
        padding: 0.75rem;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        margin-top: 0.5rem;
    }

    .accept-button:hover {
        background-color: #45a049;
        transform: translateY(-1px);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .accept-button:active {
        transform: translateY(0);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .accept-button:focus {
        outline: none;
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2), 0 2px 4px rgba(0, 0, 0, 0.1);
    }

</style> 