<script lang="ts">
    import Modal from "./Modal.svelte";
    import { onMount } from 'svelte';
    import Select from './Select.svelte';

    type WebColor = {
        value: string;
        label: string;
    };

  
    let { 
        color = $bindable("#a8c2fa"),
        alpha = 1,
        title = "Choose Color",
        acceptBtnText = "Accept",
        cancelBtnText = "Cancel",
        textSide = "right",
        onSelect,
        onClose
    } = $props<{
        color?: string;
        alpha?: number;
        title?: string;
        acceptBtnText?: string;
        cancelBtnText?: string;
        textSide?: "left" | "right";
        onSelect?: (color: string) => void;
        onClose?: () => void;
    }>();

    let isOpen = $state(false);
    // Temporary state for the picker
    let tempHue = $state(0);
    let tempSaturation = $state(50);
    let tempLightness = $state(50);
    let tempAlpha = $state(1);
    let tempColor = $state("#a8c2fa");

    const webColors: WebColor[] = [
        { value: '', label: 'Custom Color' },
        { value: '#F0F8FF', label: 'AliceBlue' },
        { value: '#FAEBD7', label: 'AntiqueWhite' },
        { value: '#00FFFF', label: 'Aqua' },
        { value: '#7FFFD4', label: 'Aquamarine' },
        { value: '#F0FFFF', label: 'Azure' },
        { value: '#F5F5DC', label: 'Beige' },
        { value: '#FFE4C4', label: 'Bisque' },
        { value: '#000000', label: 'Black' },
        { value: '#FFEBCD', label: 'BlanchedAlmond' },
        { value: '#0000FF', label: 'Blue' },
        { value: '#8A2BE2', label: 'BlueViolet' },
        { value: '#A52A2A', label: 'Brown' },
        { value: '#DEB887', label: 'BurlyWood' },
        { value: '#5F9EA0', label: 'CadetBlue' },
        { value: '#7FFF00', label: 'Chartreuse' },
        { value: '#D2691E', label: 'Chocolate' },
        { value: '#FF7F50', label: 'Coral' },
        { value: '#6495ED', label: 'CornflowerBlue' },
        { value: '#FFF8DC', label: 'Cornsilk' },
        { value: '#DC143C', label: 'Crimson' },
        { value: '#00FFFF', label: 'Cyan' },
        { value: '#00008B', label: 'DarkBlue' },
        { value: '#008B8B', label: 'DarkCyan' },
        { value: '#B8860B', label: 'DarkGoldenRod' },
        { value: '#A9A9A9', label: 'DarkGray' },
        { value: '#006400', label: 'DarkGreen' },
        { value: '#BDB76B', label: 'DarkKhaki' },
        { value: '#8B008B', label: 'DarkMagenta' },
        { value: '#556B2F', label: 'DarkOliveGreen' },
        { value: '#FF8C00', label: 'DarkOrange' },
        { value: '#9932CC', label: 'DarkOrchid' },
        { value: '#8B0000', label: 'DarkRed' },
        { value: '#E9967A', label: 'DarkSalmon' },
        { value: '#8FBC8F', label: 'DarkSeaGreen' },
        { value: '#483D8B', label: 'DarkSlateBlue' },
        { value: '#2F4F4F', label: 'DarkSlateGray' },
        { value: '#00CED1', label: 'DarkTurquoise' },
        { value: '#9400D3', label: 'DarkViolet' },
        { value: '#FF1493', label: 'DeepPink' },
        { value: '#00BFFF', label: 'DeepSkyBlue' },
        { value: '#696969', label: 'DimGray' },
        { value: '#1E90FF', label: 'DodgerBlue' },
        { value: '#B22222', label: 'FireBrick' },
        { value: '#FFFAF0', label: 'FloralWhite' },
        { value: '#228B22', label: 'ForestGreen' },
        { value: '#FF00FF', label: 'Fuchsia' },
        { value: '#DCDCDC', label: 'Gainsboro' },
        { value: '#F8F8FF', label: 'GhostWhite' },
        { value: '#FFD700', label: 'Gold' },
        { value: '#DAA520', label: 'GoldenRod' },
        { value: '#808080', label: 'Gray' },
        { value: '#008000', label: 'Green' },
        { value: '#ADFF2F', label: 'GreenYellow' },
        { value: '#F0FFF0', label: 'HoneyDew' },
        { value: '#FF69B4', label: 'HotPink' },
        { value: '#CD5C5C', label: 'IndianRed' },
        { value: '#4B0082', label: 'Indigo' },
        { value: '#FFFFF0', label: 'Ivory' },
        { value: '#F0E68C', label: 'Khaki' },
        { value: '#E6E6FA', label: 'Lavender' },
        { value: '#FFF0F5', label: 'LavenderBlush' },
        { value: '#7CFC00', label: 'LawnGreen' },
        { value: '#FFFACD', label: 'LemonChiffon' },
        { value: '#ADD8E6', label: 'LightBlue' },
        { value: '#F08080', label: 'LightCoral' },
        { value: '#E0FFFF', label: 'LightCyan' },
        { value: '#FAFAD2', label: 'LightGoldenRodYellow' },
        { value: '#D3D3D3', label: 'LightGray' },
        { value: '#90EE90', label: 'LightGreen' },
        { value: '#FFB6C1', label: 'LightPink' },
        { value: '#FFA07A', label: 'LightSalmon' },
        { value: '#20B2AA', label: 'LightSeaGreen' },
        { value: '#87CEFA', label: 'LightSkyBlue' },
        { value: '#778899', label: 'LightSlateGray' },
        { value: '#B0C4DE', label: 'LightSteelBlue' },
        { value: '#FFFFE0', label: 'LightYellow' },
        { value: '#00FF00', label: 'Lime' },
        { value: '#32CD32', label: 'LimeGreen' },
        { value: '#FAF0E6', label: 'Linen' },
        { value: '#FF00FF', label: 'Magenta' },
        { value: '#800000', label: 'Maroon' },
        { value: '#66CDAA', label: 'MediumAquaMarine' },
        { value: '#0000CD', label: 'MediumBlue' },
        { value: '#BA55D3', label: 'MediumOrchid' },
        { value: '#9370DB', label: 'MediumPurple' },
        { value: '#3CB371', label: 'MediumSeaGreen' },
        { value: '#7B68EE', label: 'MediumSlateBlue' },
        { value: '#00FA9A', label: 'MediumSpringGreen' },
        { value: '#48D1CC', label: 'MediumTurquoise' },
        { value: '#C71585', label: 'MediumVioletRed' },
        { value: '#191970', label: 'MidnightBlue' },
        { value: '#F5FFFA', label: 'MintCream' },
        { value: '#FFE4E1', label: 'MistyRose' },
        { value: '#FFE4B5', label: 'Moccasin' },
        { value: '#FFDEAD', label: 'NavajoWhite' },
        { value: '#000080', label: 'Navy' },
        { value: '#FDF5E6', label: 'OldLace' },
        { value: '#808000', label: 'Olive' },
        { value: '#6B8E23', label: 'OliveDrab' },
        { value: '#FFA500', label: 'Orange' },
        { value: '#FF4500', label: 'OrangeRed' },
        { value: '#DA70D6', label: 'Orchid' },
        { value: '#EEE8AA', label: 'PaleGoldenRod' },
        { value: '#98FB98', label: 'PaleGreen' },
        { value: '#AFEEEE', label: 'PaleTurquoise' },
        { value: '#DB7093', label: 'PaleVioletRed' },
        { value: '#FFEFD5', label: 'PapayaWhip' },
        { value: '#FFDAB9', label: 'PeachPuff' },
        { value: '#CD853F', label: 'Peru' },
        { value: '#FFC0CB', label: 'Pink' },
        { value: '#DDA0DD', label: 'Plum' },
        { value: '#B0E0E6', label: 'PowderBlue' },
        { value: '#800080', label: 'Purple' },
        { value: '#663399', label: 'RebeccaPurple' },
        { value: '#FF0000', label: 'Red' },
        { value: '#BC8F8F', label: 'RosyBrown' },
        { value: '#4169E1', label: 'RoyalBlue' },
        { value: '#8B4513', label: 'SaddleBrown' },
        { value: '#FA8072', label: 'Salmon' },
        { value: '#F4A460', label: 'SandyBrown' },
        { value: '#2E8B57', label: 'SeaGreen' },
        { value: '#FFF5EE', label: 'SeaShell' },
        { value: '#A0522D', label: 'Sienna' },
        { value: '#C0C0C0', label: 'Silver' },
        { value: '#87CEEB', label: 'SkyBlue' },
        { value: '#6A5ACD', label: 'SlateBlue' },
        { value: '#708090', label: 'SlateGray' },
        { value: '#FFFAFA', label: 'Snow' },
        { value: '#00FF7F', label: 'SpringGreen' },
        { value: '#4682B4', label: 'SteelBlue' },
        { value: '#D2B48C', label: 'Tan' },
        { value: '#008080', label: 'Teal' },
        { value: '#D8BFD8', label: 'Thistle' },
        { value: '#FF6347', label: 'Tomato' },
        { value: '#40E0D0', label: 'Turquoise' },
        { value: '#EE82EE', label: 'Violet' },
        { value: '#F5DEB3', label: 'Wheat' },
        { value: '#FFFFFF', label: 'White' },
        { value: '#F5F5F5', label: 'WhiteSmoke' },
        { value: '#FFFF00', label: 'Yellow' },
        { value: '#9ACD32', label: 'YellowGreen' }
    ];

    let selectedWebColor = $state('');
    let lastControl = $state<'select' | 'slider'>('slider');
    let label: string = $state('');
    let buttonRect: DOMRect | null = null;

    // Convert hex to HSL on modal open
    function initializeTempValues() {
        if (color.startsWith('#')) {
            const r = parseInt(color.slice(1, 3), 16) / 255;
            const g = parseInt(color.slice(3, 5), 16) / 255;
            const b = parseInt(color.slice(5, 7), 16) / 255;

            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            
            tempHue = Math.round(
                ((max === min ? 0 :
                max === r ? (g - b) / (max - min) + (g < b ? 6 : 0) :
                max === g ? (b - r) / (max - min) + 2 :
                (r - g) / (max - min) + 4) * 60)
            );

            tempLightness = Math.round(((max + min) / 2) * 100);
            tempSaturation = Math.round(
                max === min ? 0 :
                tempLightness > 50 ? ((max - min) / (2 - max - min)) * 100 :
                ((max - min) / (max + min)) * 100
            );
            tempAlpha = alpha;
            tempColor = color;
        }
    }

    function handleHueChange(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        const input = e.target as HTMLInputElement;
        tempHue = Number(input.value);
        selectedWebColor = '';  // Clear the web color selection
        lastControl = 'slider';
    }

    function handleAlphaChange(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        const input = e.target as HTMLInputElement;
        tempAlpha = Number(input.value);
    }

    function handleClose() {
        isOpen = false;
        onClose?.();
    }

    function handleAccept() {
        if (lastControl === 'select' && selectedWebColor) {
            color = selectedWebColor;
        } else {
            color = tempColor;
        }
        alpha = tempAlpha;
        isOpen = false;
        onSelect?.(color);
        onClose?.();
    }

    function handleOpen() {
        const button = document.querySelector('.picker-trigger') as HTMLButtonElement;
        buttonRect = button.getBoundingClientRect();
        initializeTempValues();
        isOpen = true;
    }

    $effect(() => {
        if (selectedWebColor) {
            handleWebColorSelect(selectedWebColor);
        }
    });

    function handleWebColorSelect(color: string) {
        if (color) {
            // Convert hex to HSL
            const r = parseInt(color.slice(1,3), 16) / 255;
            const g = parseInt(color.slice(3,5), 16) / 255;
            const b = parseInt(color.slice(5,7), 16) / 255;
            
            const max = Math.max(r, g, b);
            const min = Math.min(r, g, b);
            
            let h = 0;
            let s = 0;
            const l = (max + min) / 2;
            
            if (max !== min) {
                const d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                
                if (max === r) h = (g - b) / d + (g < b ? 6 : 0);
                else if (max === g) h = (b - r) / d + 2;
                else if (max === b) h = (r - g) / d + 4;
                
                h *= 60;
            }
            
            tempHue = h;
            tempSaturation = s * 100;
            tempLightness = l * 100;
            tempAlpha = 1;
            lastControl = 'select';
        }
    }

    // Update temporary color when HSL or alpha changes
    $effect(() => {
        updateTempColor();
    });

    function updateTempColor() {
        const hslColor = `hsla(${tempHue}, ${tempSaturation}%, ${tempLightness}%, ${tempAlpha})`;
        // Convert HSLA to HEX
        const div = document.createElement('div');
        div.style.color = hslColor;
        document.body.appendChild(div);
        const rgbColor = window.getComputedStyle(div).color;
        document.body.removeChild(div);
        
        const [r, g, b] = rgbColor.match(/\d+/g)!.map(Number);
        tempColor = '#' + [r, g, b].map(x => {
            const hex = x.toString(16).toUpperCase();
            return hex.length === 1 ? '0' + hex : hex;
        }).join('');
    }

    function ensureHexLength(color: string): string {
        if (!color.startsWith('#')) return color;
        const hex = color.slice(1);
        if (hex.length === 3) {
            // Convert 3-char hex to 6-char
            return '#' + hex.split('').map(char => char + char).join('');
        }
        return color.toUpperCase();
    }
</script>

<div class="color-picker-button">
    {#if textSide === "left"}
        <span class="color-code">{ensureHexLength(color)}</span>
    {/if}
    <button 
        class="picker-trigger"
        onclick={handleOpen}
        style={`--current-color: hsla(${tempHue}, ${tempSaturation}%, ${tempLightness}%, ${alpha})`}
    >
        <span class="material-icons">palette</span>
    </button>
    {#if label}
        <span class="label">{label}</span>
    {/if}
    {#if textSide === "right"}
        <span class="color-code">{ensureHexLength(color)}</span>
    {/if}
</div>

{#if isOpen}
    <div class="color-picker-portal">
        <div 
            class="color-picker-modal"
        >
            <Modal 
                bind:isOpen 
                header={title}
                onCancel={handleClose}
                onAccept={handleAccept}
                {acceptBtnText}
                {cancelBtnText}
                isInline={true}
                size="sm"

            >
                <div class="color-picker-container">
                    <div class="preview" style={`background-color: hsla(${tempHue}, ${tempSaturation}%, ${tempLightness}%, ${tempAlpha})`}>
                        <div class="color-value">{ensureHexLength(tempColor)}</div>
                    </div>

                    <div class="web-colors-select"
                        onclick={(e) => e.stopPropagation()}
                        onmousedown={(e) => e.stopPropagation()}
                        onkeydown={(e) => e.stopPropagation()}
                        role="listbox"
                        aria-label="Web Colors"
                        tabindex="0"
                    >
                        <Select
                            options={webColors}
                            bind:value={selectedWebColor}
                            accentColor={tempColor}
                        />
                    </div>

                    <div class="sliders">
                        <div class="slider-group">
                            <label for="hue-slider">Hue</label>
                            <input 
                                type="range"
                                id="hue-slider"
                                min="0" 
                                max="360" 
                                value={tempHue}
                                class="hue-slider"
                                onchange={(e) => handleHueChange(e)}
                                oninput={(e) => handleHueChange(e)}
                                onclick={(e) => e.stopPropagation()}
                            />
                        </div>

                        <div class="slider-group">
                            <label for="saturation-slider">Saturation</label>
                            <input 
                                type="range"
                                id="saturation-slider"
                                min="0" 
                                max="100" 
                                value={tempSaturation}
                                class="saturation-slider"
                                onchange={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const input = e.target as HTMLInputElement;
                                    tempSaturation = Number(input.value);
                                    selectedWebColor = '';
                                    lastControl = 'slider';
                                }}
                                oninput={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const input = e.target as HTMLInputElement;
                                    tempSaturation = Number(input.value);
                                    selectedWebColor = '';
                                    lastControl = 'slider';
                                }}
                                onclick={(e) => e.stopPropagation()}
                                style={`--hue: ${tempHue}`}
                            />
                        </div>

                        <div class="slider-group">
                            <label for="lightness-slider">Lightness</label>
                            <input 
                                type="range"
                                id="lightness-slider"
                                min="0"
                                max="100"
                                value={tempLightness}
                                class="lightness-slider"
                                onchange={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const input = e.target as HTMLInputElement;
                                    tempLightness = Number(input.value);
                                    selectedWebColor = '';
                                    lastControl = 'slider';
                                }}
                                oninput={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    const input = e.target as HTMLInputElement;
                                    tempLightness = Number(input.value);
                                    selectedWebColor = '';
                                    lastControl = 'slider';
                                }}
                                onclick={(e) => e.stopPropagation()}
                                style={`--hue: ${tempHue}; --saturation: ${tempSaturation}%`}
                            />
                        </div>

                        <div class="slider-group">
                            <label for="opacity-slider">Opacity</label>
                            <input 
                                type="range"
                                id="opacity-slider"
                                min="0"
                                max="1"
                                step="0.01"
                                value={tempAlpha}
                                class="alpha-slider"
                                onchange={(e) => handleAlphaChange(e)}
                                oninput={(e) => handleAlphaChange(e)}
                                onclick={(e) => e.stopPropagation()}
                                style={`--hue: ${tempHue}; --saturation: ${tempSaturation}%; --lightness: ${tempLightness}%`}
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    </div>
{/if}

<style>
    .color-picker-button {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        position: relative;
    }

    .picker-trigger {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 0.5rem;
        border: 2px solid #e5e7eb;
        background-color: white;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        transition: all 0.2s ease;
    }

    .picker-trigger::after {
        content: '';
        position: absolute;
        inset: 0;
        background-color: var(--current-color);
        border-radius: 0.35rem;
        opacity: 0.2;
    }

    .picker-trigger:hover {
        border-color: var(--current-color);
    }

    .picker-trigger .material-icons {
        font-size: 1.5rem;
        color: #4b5563;
    }

    .color-code {
        font-family: monospace;
        font-size: 0.875rem;
        color: #4b5563;
        background: #f3f4f6;
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
    }

    .label {
        font-size: 0.875rem;
        color: #4b5563;
    }

    .color-picker-container {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 1rem;
        background: white;
        border-radius: 0.5rem;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        width: 100%;
    }

    .preview {
        height: 60px;
        border-radius: 0.5rem;
        border: 2px solid #e5e7eb;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .color-value {
        background: rgba(255, 255, 255, 0.9);
        padding: 0.25rem 0.5rem;
        border-radius: 0.25rem;
        font-family: monospace;
        font-size: 0.875rem;
    }

    .sliders {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    .slider-group {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .slider-group label {
        font-size: 0.875rem;
        color: #4b5563;
    }

    input[type="range"] {
        width: 100%;
        height: 15px;
        appearance: none;
        -webkit-appearance: none;
        background: transparent;
        cursor: pointer;
    }

    input[type="range"]::-webkit-slider-runnable-track {
        width: 100%;
        height: 15px;
        border-radius: 8px;
    }

    input[type="range"]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: white;
        border: 2px solid #e5e7eb;
        margin-top: -4.5px;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    }

    .hue-slider::-webkit-slider-runnable-track {
        background: linear-gradient(
            to right,
            #ff0000 0%,
            #ffff00 17%,
            #00ff00 33%,
            #00ffff 50%,
            #0000ff 67%,
            #ff00ff 83%,
            #ff0000 100%
        );
    }

    .saturation-slider::-webkit-slider-runnable-track {
        background: linear-gradient(
            to right,
            hsl(var(--hue), 0%, 50%) 0%,
            hsl(var(--hue), 100%, 50%) 100%
        );
    }

    .lightness-slider::-webkit-slider-runnable-track {
        background: linear-gradient(
            to right,
            hsl(var(--hue), var(--saturation), 0%) 0%,
            hsl(var(--hue), var(--saturation), 50%) 50%,
            hsl(var(--hue), var(--saturation), 100%) 100%
        );
    }

    .alpha-slider::-webkit-slider-runnable-track {
        background: linear-gradient(
            to right,
            hsla(var(--hue), var(--saturation), var(--lightness), 0) 0%,
            hsla(var(--hue), var(--saturation), var(--lightness), 1) 100%
        );
        border: 1px solid #e5e7eb;
    }

    /* Firefox styles */
    input[type="range"]::-moz-range-track {
        width: 100%;
        height: 15px;
        border-radius: 8px;
    }

    input[type="range"]::-moz-range-thumb {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: white;
        border: 2px solid #e5e7eb;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
    }

    .hue-slider::-moz-range-track {
        background: linear-gradient(
            to right,
            #ff0000 0%,
            #ffff00 17%,
            #00ff00 33%,
            #00ffff 50%,
            #0000ff 67%,
            #ff00ff 83%,
            #ff0000 100%
        );
    }

    .saturation-slider::-moz-range-track {
        background: linear-gradient(
            to right,
            hsl(var(--hue), 0%, 50%) 0%,
            hsl(var(--hue), 100%, 50%) 100%
        );
    }

    .lightness-slider::-moz-range-track {
        background: linear-gradient(
            to right,
            hsl(var(--hue), var(--saturation), 0%) 0%,
            hsl(var(--hue), var(--saturation), 50%) 50%,
            hsl(var(--hue), var(--saturation), 100%) 100%
        );
    }

    .alpha-slider::-moz-range-track {
        background: linear-gradient(
            to right,
            hsla(var(--hue), var(--saturation), var(--lightness), 0) 0%,
            hsla(var(--hue), var(--saturation), var(--lightness), 1) 100%
        );
        border: 1px solid #e5e7eb;
    }

    .web-colors-select {
        width: 100%;
        margin-bottom: 1rem;
        padding: 0 1rem;
    }

    .color-picker-portal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1000;
    }

    .color-picker-modal {
        pointer-events: auto;
        width: 300px;
    }
</style> 