<script lang="ts">
    import type { DockPosition } from "./Docker.svelte";

    let {
        isOpen = $bindable(false),
        header = "",
        children, 
        size = "sm", 
        actionBtns = true, 
        onCancel,
        onAccept,
        cancelBtnText = "Cancel",
        acceptBtnText = "Accept",
        headerBgColor = "#a8c2fa",
        headerTextColor = "#000",
        footerBgColor = "#a8c2fa",
        acceptBtnBgColor = "transparent",
        acceptBtnTextColor = "#000",
        cancelBtnBgColor = "transparent",
        cancelBtnTextColor = "#000",
        contentBgColor = "#f1f1f1",
        contentTextColor = "#000",
        outerClickToClose = true,
        backDropColor = "rgba(0, 0, 0, 0.5)",
        backdrop = true,
        dockPosition = $bindable<DockPosition>("center"),
        showBorder = true,
        borderColor = "#d3d2d2",
        borderWidth = 1,
        borderRadius = 8,
        isInline = false
    } = $props<{
        isOpen?: boolean;
        header?: string;
        children?: any;
        size?: "sm" | "md" | "lg" | "full";
        actionBtns?: boolean;
        onAccept?: () => void;
        onCancel?: () => void;
        cancelBtnText?: string;
        acceptBtnText?: string;
        headerBgColor?: string;
        headerTextColor?: string;
        footerBgColor?: string;
        acceptBtnBgColor?: string;
        acceptBtnTextColor?: string;
        cancelBtnBgColor?: string;
        cancelBtnTextColor?: string;
        contentBgColor?: string;
        contentTextColor?: string;
        outerClickToClose?: boolean;
        backDropColor?: string;
        backdrop?: boolean;
        dockPosition?: DockPosition;
        showBorder?: boolean;
        borderColor?: string;
        borderWidth?: number;
        borderRadius?: number;
        isInline?: boolean;
    }>();

    let modalX = $state(0);
    let modalY = $state(0);
    let isDragging = $state(false);
    let startX = $state(0);
    let startY = $state(0);

    function handleMousedown(event: MouseEvent) {
        event.preventDefault();
        isDragging = true;
        dockPosition = undefined;
        startX = event.clientX - modalX;
        startY = event.clientY - modalY;

        window.addEventListener('mousemove', handleMousemove);
        window.addEventListener('mouseup', handleMouseup);
    }

    function handleMousemove(event: MouseEvent) {
        if (!isDragging) return;
        event.preventDefault();
        modalX = event.clientX - startX;
        modalY = event.clientY - startY;
    }

    function handleMouseup() {
        isDragging = false;
        window.removeEventListener('mousemove', handleMousemove);
        window.removeEventListener('mouseup', handleMouseup);
    }

    function handleCancel() {
        if (outerClickToClose) {
            onCancel?.();
        }
    }

    function handleAccept() {
        onAccept?.();
    }

    $effect(() => {
        if (isOpen && dockPosition) {
            modalX = 0;
            modalY = 0;
        }
    });
</script>

<div 
    class="backdrop-container"
    class:inline={isInline}
    role="button"
    tabindex="0"
    onclick={(e) => {
        if (e.target === e.currentTarget) {
            handleCancel();
        }
    }}
    onkeydown={(e) => {
        if (e.key === 'Escape') {
            handleCancel();
        }
    }}
    style={`pointer-events: ${backdrop ? 'auto' : 'none'};`}
>
    <div 
        class="backdrop-background" 
        style={`background-color: ${backdrop ? backDropColor : "transparent"}; opacity: ${backdrop ? 1 : 0};`}
    ></div>

    <div class="modal" 
        class:open={isOpen}
        class:dragging={isDragging}
        class:undocked={!dockPosition}
        class:top-left={dockPosition === "top-left"}
        class:top={dockPosition === "top"}
        class:top-right={dockPosition === "top-right"}
        class:left={dockPosition === "left"}
        class:center={dockPosition === "center"}
        class:right={dockPosition === "right"}
        class:bottom-left={dockPosition === "bottom-left"}
        class:bottom={dockPosition === "bottom"}
        class:bottom-right={dockPosition === "bottom-right"}
        style={`
            --header-bg: ${headerBgColor};
            --header-text: ${headerTextColor};
            --footer-bg: ${footerBgColor};
            --accept-btn-bg: ${acceptBtnBgColor};
            --accept-btn-text: ${acceptBtnTextColor};
            --cancel-btn-bg: ${cancelBtnBgColor};
            --cancel-btn-text: ${cancelBtnTextColor};
            --content-bg: ${contentBgColor};
            --content-text: ${contentTextColor};
            --border-radius: ${borderRadius}px;
            width: ${size === "sm" ? 'clamp(250px, 95vw, 500px)' : 
                   size === "md" ? 'clamp(300px, 95vw, 750px)' : 
                   size === "lg" ? 'clamp(400px, 95vw, 1000px)' : 
                   '95vw'};
            border: ${showBorder ? `${borderWidth}px solid ${borderColor}` : 'none'};
            border-radius: var(--border-radius);
            background-color: var(--content-bg);
            color: var(--content-text);
            pointer-events: auto;
            ${!dockPosition ? `transform: translate3d(${modalX}px, ${modalY}px, 0);` : ''}
        `}
    >
        <div class="header">
            <button 
                class="drag-handle"
                onmousedown={handleMousedown}
                type="button"
            >
                <span class="material-icons compass-icon">north</span>
                {header}
            </button>
            <button class="close-btn" onclick={() => onCancel?.()}>
                <span class="material-icons">close</span>
            </button>
        </div>
        <div class="content">
            {@render children()}
        </div>
        {#if actionBtns}
            <div class="action-btns">
                {#if cancelBtnText}
                    <button class="cancel-btn" onclick={() => onCancel?.()}>{cancelBtnText}</button>
                {/if}
                {#if acceptBtnText}
                    <button class="accept-btn" onclick={() => onAccept?.()}>{acceptBtnText}</button>
                {/if}
            </div>
        {/if}
    </div>
</div>

<style>
    .backdrop-container {
        display: flex;
        justify-content: center;
        align-items: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100dvh;
        z-index: 1000;
    }

    .backdrop-container.inline {
        position: absolute;
        height: auto;
        min-height: 100%;
    }

    .backdrop-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: opacity 0.2s ease;
    }

    .modal {
        position: fixed;
        border: none;
        box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
        z-index: 1001;
        transition: all 0.2s ease;
        --border-radius: 8px;
        max-width: 95vw;
    }

    .modal.dragging {
        transition: none;
        opacity: 0.95;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
        cursor: grabbing;
        user-select: none;
    }

    .modal.undocked {
        top: 0;
        left: 0;
    }

    .modal.top-left {
        top: 1rem;
        left: 1rem;
        margin: 0;
    }

    .modal.top {
        top: 1rem;
        left: 50%;
        transform: translateX(-50%);
        margin: 0;
    }

    .modal.top-right {
        top: 1rem;
        right: 1rem;
        margin: 0;
    }

    .modal.left {
        top: 50%;
        left: 1rem;
        transform: translateY(-50%);
        margin: 0;
    }

    .modal.center {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
    }

    .modal.right {
        top: 50%;
        right: 1rem;
        transform: translateY(-50%);
        margin: 0;
    }

    .modal.bottom-left {
        bottom: 1rem;
        left: 1rem;
        margin: 0;
    }

    .modal.bottom {
        bottom: 1rem;
        left: 50%;
        transform: translateX(-50%);
        margin: 0;
    }

    .modal.bottom-right {
        bottom: 1rem;
        right: 1rem;
        margin: 0;
    }

    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0;
        height: 3rem;
        background-color: var(--header-bg);
        color: var(--header-text);
        border-bottom: 1px solid #d3d2d2;
        border-top-left-radius: calc(var(--border-radius, 8px) - 6px);
        border-top-right-radius: calc(var(--border-radius, 8px) - 6px);
    }

    .drag-handle {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
        color: var(--header-text);
        padding: 0.5rem;
        padding-inline-start: 1rem;
        cursor: grab;
        user-select: none;
        width: 100%;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        touch-action: none;
    }

    .drag-handle:active {
        cursor: grabbing !important;
    }

    .compass-icon {
        font-size: 1.25rem;
        opacity: 0.7;
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        min-height: 5rem;
        padding: 1rem;
    }

    .action-btns {
        display: flex;
        justify-content: flex-end;
        padding: 0.25rem;
        background-color: var(--footer-bg);
        border-top: 1px solid #d3d2d2;
        border-bottom-left-radius: calc(var(--border-radius, 8px) - 6px);
        border-bottom-right-radius: calc(var(--border-radius, 8px) - 6px);
        gap: 0.5rem;
    }

    .accept-btn {
        background-color: var(--accept-btn-bg);
        color: var(--accept-btn-text);
        transition: all 0.2s ease;
    }

    .accept-btn:hover {
        background-color: var(--accept-btn-text);
        color: var(--accept-btn-bg);
    }

    .cancel-btn {
        background-color: var(--cancel-btn-bg);
        color: var(--cancel-btn-text);
        transition: all 0.2s ease;
    }

    .cancel-btn:hover {
        background-color: var(--cancel-btn-text);
        color: var(--cancel-btn-bg);
    }

    button {
        border: none;
        cursor: pointer;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
    }

    .close-btn {
        background-color: transparent;
        color: var(--header-text);
        border: none;
        cursor: pointer;
        padding: 0;
        margin: 0;
        width: 2rem;
        height: 2rem;
        margin-inline-end: 0.5rem;
        transition: all 0.2s ease;
    }

    .close-btn:hover {
        border-radius: 50%;
        background-color: rgba(255, 255, 255, 0.2);
    }

    .close-btn:active {
        background-color: rgba(255, 255, 255, 0.3);
    }

    .modal:not(.undocked) {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
</style>    