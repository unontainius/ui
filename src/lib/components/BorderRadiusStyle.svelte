<script lang="ts">
	import Button from './Button.svelte';
    import type { IconPosition } from './Button.svelte';
    import ColorPicker from './ColorPicker.svelte';
    import Select from './Select.svelte';
    import type { MouseEventHandler } from 'svelte/elements';

    // type IconPosition = 'start' | 'end' | 'center';

    let {borderRadiusCSS = $bindable(''), rowStyle = ''} = $props();
    const PositionOptions = [
        { value: 'all', label: 'All Corners' },
        { value: 'top-left', label: 'Top Left' },
        { value: 'top-right', label: 'Top Right' },
        { value: 'bottom-left', label: 'Bottom Left' },
        { value: 'bottom-right', label: 'Bottom Right' }
    ];

    let borderRadii = $state([{type: 'all', radius: '16px'}]);
    
    const handleRemove: MouseEventHandler<HTMLButtonElement> = (e) => {
        const index = parseInt((e.currentTarget as HTMLElement).dataset.index || '0');
        borderRadii = borderRadii.filter((_, i) => i !== index);
    };

    const handleAdd: MouseEventHandler<HTMLButtonElement> = () => {
        borderRadii = [...borderRadii, {type: 'all', radius: '16px'}];
    };

    function handleRadiusChange(e: Event, index: number) {
        const input = e.target as HTMLInputElement;
        const newRadius = `${input.value}px`;
        borderRadii = borderRadii.map((borderRadius, i) => 
            i === index ? { ...borderRadius, radius: newRadius } : borderRadius
        );
    }
    
    $effect(() => {
        const radiusString = borderRadii.map(br => {
            if (br.type === 'all') {
                return `border-radius: ${br.radius}`;
            } else {
                return `border-${br.type}-radius: ${br.radius}`;
            }
        }).join(';');
        borderRadiusCSS = radiusString;
        console.log('Border Radius CSS:', borderRadiusCSS);
    });

</script>

    <div class="header-row">
        <div class="select-container">
            <h5>Position</h5>
        </div>
        <div class="slider-container">
            <h5>Radius</h5>
        </div>
        <div class="action-container">
            <h5>Action</h5>
        </div>
    </div>
    {#each borderRadii as borderRadius, index}
        <div style={rowStyle}>
            <div class="label">Details</div>
            <div class="select-container">
                <Select
                    bind:value={borderRadius.type}
                    options={PositionOptions}
                />
            </div>

            <div class="slider-container">
                <h5>{borderRadius.radius}</h5>
                <input 
                    type="range"
                    min="0"
                    max="50"
                    value={parseInt(borderRadius.radius)}
                    class="radius-slider"
                    onchange={(e) => handleRadiusChange(e, index)}
                    oninput={(e) => handleRadiusChange(e, index)}
                />
            </div>

            <div class="action-container">
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
            caption="Add Border Radius" 
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
    h5 {
        font-size: 1rem;
        font-weight: 200;
        margin: 0;
        margin-inline-start: 0.5rem;
    }
    .header-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        padding-inline-start: 6rem;
        color: #bebebe;
    }
    .select-container {
        width: 170px;
    }

    .action-container {
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
        justify-content: flex-start;
        width: 170px;
        height:100%;
    }

    .radius-slider {
        width: 100%;
        height: 45px;
        appearance: none;
        -webkit-appearance: none;
        background: transparent;
        cursor: pointer;

    }

    .radius-slider::-webkit-slider-runnable-track {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: #e5e7eb;
    }

    .radius-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #4CAF50;
        margin-top: -6px;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        cursor: pointer;

    }

    .radius-slider::-moz-range-track {
        width: 100%;
        height: 4px;
        border-radius: 2px;
        background: #e5e7eb;
    }

    .radius-slider::-moz-range-thumb {
        height: 16px;
        width: 16px;
        border-radius: 50%;
        background: #4CAF50;
        border: none;
        box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
        cursor: pointer;

    }

    .radius-slider:hover::-webkit-slider-thumb {
        background: #45a049;
    }

    .radius-slider:hover::-moz-range-thumb {
        background: #45a049;
    }

    .radius-slider:focus {
        outline: none;
    }

    .radius-slider:focus::-webkit-slider-thumb {
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }

    .radius-slider:focus::-moz-range-thumb {
        box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
    }
</style> 