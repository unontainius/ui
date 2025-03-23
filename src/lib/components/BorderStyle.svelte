<script lang="ts">
	import Button from "./Button.svelte";
	import type { IconPosition } from './Button.svelte';
	import ColorPicker from "./ColorPicker.svelte";
	import Select from "./Select.svelte";
    import type { MouseEventHandler } from 'svelte/elements';

    let {borderCSS = $bindable(''), rowStyle = ''} = $props();

    const PositionOptions = [
        { value: 'all', label: 'All' },
        { value: 'top', label: 'Top' },
        { value: 'bottom', label: 'Bottom' },
        { value: 'left', label: 'Left' },
        { value: 'right', label: 'Right' }
    ];

    const StyleOptions = [
        { value: 'solid', label: 'Solid' },
        { value: 'dashed', label: 'Dashed' },
        { value: 'dotted', label: 'Dotted' }
    ];

    let borders = $state([{position: 'all', style: 'solid', width: '0px', color: '#000000'}]);

    const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
        const index = parseInt((e.currentTarget as HTMLElement).dataset.index || '0');
        borders = borders.filter((_, i) => i !== index);
    };

    const handleAdd: MouseEventHandler<HTMLButtonElement> = () => {
        borders = [...borders, {position: 'all', style: 'solid', width: '1px', color: '#000000'}];
    };

    function handleWidthChange(e: Event, index: number) {
        const input = e.target as HTMLInputElement;
        const newWidth = `${input.value}px`;
        borders = borders.map((border, i) => 
            i === index ? { ...border, width: newWidth } : border
        );
    }

    $effect(() => {
        const borderString = borders.map(border => {
            const position = border.position === 'all' ? '' : `-${border.position}`;
            return `border${position}: ${border.width} ${border.style} ${border.color}`;
        }).join(';');
        borderCSS = borderString;
    });
</script>

    <div class="header-row">
        <div class="position-col">
            <h5>Position</h5>
        </div>
        <div class="width-col">
            <h5>Width</h5>
        </div>
        <div class="style-col">
            <h5>Style</h5>
        </div>
        <div class="color-col">
            <h5>Color</h5>
        </div>
        <div class="action-col">
            <h5>Action</h5>
        </div>
    </div>
    {#each borders as border, index}
        <div style={rowStyle}>
            <div class="position-col">
            <Select
                bind:value={border.position}
                options={PositionOptions}
            />
            </div>
            <div class="width-col">
                <div class="slider-container">
                    <h5>{border.width}</h5>
                    <input 
                        type="range"
                        min="0"
                        max="24"
                        value={parseInt(border.width)}
                        class="width-slider"
                        onchange={(e) => handleWidthChange(e, index)}
                        oninput={(e) => handleWidthChange(e, index)}
                    />
                </div>
            </div>
            <div class="style-col">
                <Select
                    bind:value={border.style}
                    options={StyleOptions}
                />
            </div>
            <div class="color-col">
                <ColorPicker
                    bind:color={border.color}
                />
            </div>  
            <div class="action-col">
                <Button 
                    onclick={handleRemove}
                    caption="" 
                    icon="close" 
                    iconPosition="center" 
                    fontSize='1.5rem' 
                    borderRadius={24} 
                    backgroundColor="white" 
                    foregroundColor="red" 
                    borderWidth={0} 
                    borderColor="red" 
                />
            </div>
        </div>
    {/each}

<div class="add-button-row">
    <Button 
        onclick={handleAdd}
        caption="Add Border" 
        icon="add" 
        iconPosition="left" 
        fontSize='1rem' 
        borderRadius={8} 
        backgroundColor="#4CAF50" 
        foregroundColor="white" 
        borderWidth={0} 
    />
</div>

<style>
    .header-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        padding-inline-start: 1rem;
        color: #bebebe;
    }
    h5 {
        font-size: 1rem;
        font-weight: 200;
        margin: 0;
        margin-inline-start: 0.5rem;
    }

    .position-col {
        width: 90px;
    }
    .width-col {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        width: 150px;
    }
    .style-col {
        width: 120px;
    }
    .color-col {
        width: 120px;
    }
    .action-col {
        width: 60px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .add-button-row {
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;
    }
    .slider-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 1rem;
        width: 150px;
        padding: 0.5rem 0;
    }

    .width-slider {
        width: 100%;
        height: 15px;
        appearance: none;
        -webkit-appearance: none;
        background: transparent;
        cursor: pointer;
    }

    .width-slider::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: #e5e7eb;
    }

    .width-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #4CAF50;
        margin-top: -6px;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        cursor: pointer;
    }

    .width-slider::-moz-range-track {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: #e5e7eb;
    }

    .width-slider::-moz-range-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #4CAF50;
        border: none;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        cursor: pointer;
    }

    .width-slider:hover::-webkit-slider-thumb {
        background: #45a049;
    }

    .width-slider:hover::-moz-range-thumb {
        background: #45a049;
    }

    .width-slider:focus {
        outline: none;
    }

    .width-slider:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }

    .width-slider:focus::-moz-range-thumb {
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }
</style>
