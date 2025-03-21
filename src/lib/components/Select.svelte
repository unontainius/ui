<script lang="ts">
    import Toggle from "./Toggle.svelte";

    interface Option {
        value: string;
        label: string;
    }

    let { value = $bindable(""), options = [], accentColor = "#a8c2fa" } = $props();
    let isOpen = $state(false);
    let selectedLabel = $derived(options.find(opt => opt.value === value)?.label ?? "Select...");
    let buttonElement: HTMLButtonElement;
    let optionsContainer: HTMLDivElement;
    let showAbove = $state(false);
    
    // For keystroke matching
    let keyBuffer = $state('');
    let keyBufferTimeout: number;

    function checkPosition() {
        if (!buttonElement || !optionsContainer) return;
        
        const buttonRect = buttonElement.getBoundingClientRect();
        const containerHeight = optionsContainer.offsetHeight;
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - buttonRect.bottom;
        
        showAbove = spaceBelow < containerHeight && buttonRect.top > containerHeight;
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === 'Escape') {
            isOpen = false;
            return;
        }

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const currentIndex = options.findIndex(opt => opt.value === value);
            let newIndex;
            
            if (event.key === 'ArrowDown') {
                newIndex = currentIndex < options.length - 1 ? currentIndex + 1 : 0;
            } else {
                newIndex = currentIndex > 0 ? currentIndex - 1 : options.length - 1;
            }
            
            value = options[newIndex].value;
            return;
        }

        // Handle character keys
        if (event.key.length === 1) {
            clearTimeout(keyBufferTimeout);
            keyBuffer += event.key.toLowerCase();

            // Find first matching option
            const matchingOption = options.find(opt => 
                opt.label.toLowerCase().startsWith(keyBuffer)
            );

            if (matchingOption) {
                value = matchingOption.value;
            }

            // Clear buffer after 500ms of no keystrokes
            keyBufferTimeout = setTimeout(() => {
                keyBuffer = '';
            }, 500);
        }
    }

    function toggleDropdown() {
        isOpen = !isOpen;
        if (isOpen) {
            // Use setTimeout to ensure the options container is rendered
            setTimeout(checkPosition, 0);
        }
    }
</script>

<div class="select-container">
    <button 
        type="button"
        class="select-button"
        bind:this={buttonElement}
        onclick={toggleDropdown}
        onkeydown={handleKeydown}
        style={`--accent-color: ${accentColor}`}
    >
        <span>{selectedLabel}</span>
        <span class="material-icons">{isOpen ? 'expand_less' : 'expand_more'}</span>
    </button>

    {#if isOpen}
        <div class="options-container" 
            bind:this={optionsContainer}
            role="listbox"
            style={`
                --accent-color: ${accentColor};
                ${showAbove ? 'bottom: 100%; top: auto; margin-top: 0; margin-bottom: 0.25rem;' : ''}
            `}
        >
            {#each options as option}
                <button
                    class="option"
                    class:selected={value === option.value}
                    role="option"
                    aria-selected={value === option.value}
                    onclick={() => {
                        value = option.value;
                        isOpen = false;
                    }}
                >
                    {option.label}
                </button>
            {/each}
        </div>
    {/if}
</div>

<style>
    .select-container {
        position: relative;
        width: 100%;
    }

    .select-button {
        width: 100%;
        padding: 0.5rem 1rem;
        border-radius: 0.5rem;
        border: 1px solid #d3d2d2;
        background-color: white;
        color: #000;
        cursor: pointer;
        font-size: 1rem;
        font-weight: 500;
        display: flex;
        align-items: center;
        justify-content: space-between;
        transition: all 0.2s ease;
    }

    .select-button:hover {
        border-color: var(--accent-color);
    }

    .select-button:focus {
        outline: none;
        border-color: var(--accent-color);
        box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
    }

    .options-container {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: 0.25rem;
        background-color: white;
        border: 1px solid #d3d2d2;
        border-radius: 0.5rem;
        max-height: 15rem;
        overflow-y: auto;
        padding: 0.5rem;
        z-index: 50;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }

    .option {
        width: 100%;
        padding: 0.5rem 1rem;
        text-align: left;
        background: none;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #1f2937;
    }

    .option:hover {
        background-color: #f3f4f6;
    }

    .option.selected {
        background-color: var(--accent-color);
        color: white;
    }

    /* Scrollbar styling */
    .options-container::-webkit-scrollbar {
        width: 8px;
    }

    .options-container::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 0 0.5rem 0.5rem 0;
    }

    .options-container::-webkit-scrollbar-thumb {
        background: var(--accent-color);
        border-radius: 4px;
    }
</style> 