<script lang=ts module>
    export const DOCKING_POSITIONS = ['top-left', 'top', 'top-right', 'left', 'center', 'right', 'bottom-left', 'bottom', 'bottom-right'] as const;
    export type DockPosition = typeof DOCKING_POSITIONS[number];
    export const DOCKING_WIDTHS = ['sm', 'md', 'lg', 'xl'] as const;
    export type DockingWidth = typeof DOCKING_WIDTHS[number];
</script>

<script lang="ts">
	let { show = $bindable(false), 
        title = 'Window Header',
        width = 'lg',
        position = 'center',
		customPosition = {x: 0, y: 0},
		styleWindow = '',
		styleHeader = '',
		styleHeaderText = '',
		styleContent = '',
		styleFooter = '',
		styleAcceptBtn = '',
		styleCancelBtn = '',
        children, 
        onDialogueResult = () => {}, 
        acceptBtnText = "Accept", 
        cancelBtnText = "Cancel", 
        showOverlay = true,
		showHeader = true,
		showFooter = true,
		showCloseBtn = true,
		showCancelBtn = true,
		draggable = true,
		resizeable = true,
		useDuration = false,
		duration = 1000,
        cancelOnOverlayClick = true } = $props();

	let isDragging = $state(false);
	let isDocked = $state(true);

	function handleClose(result: string) {
		show = false;
		onDialogueResult?.(result);
	}
	if ((!showCloseBtn && !showCancelBtn) || (!showFooter && !showCloseBtn) || useDuration) {
		setTimeout(() => {
			handleClose('cancel');
		}, duration);
	}

	function dragMe(node: HTMLElement) {
		console.log('Initializing dragMe with draggable:', draggable, 'resizeable:', resizeable);
		let moving = false;
		let resizing = false;
		let left = customPosition?.x ?? 0;
		let top = customPosition?.y ?? 0;
		let startTouchX = 0;
		let startTouchY = 0;
		let startWidth = 0;
		let startHeight = 0;
		let startMouseX = 0;
		let startMouseY = 0;
		const headerText = node.querySelector('.header-text') as HTMLElement;
		const resizeHandle = node.querySelector('.resize-handle') as HTMLElement;

		console.log('Found elements:', { headerText: !!headerText, resizeHandle: !!resizeHandle });

		if (customPosition.x !== 0 || customPosition.y !== 0) {
			isDocked = false;
			left = customPosition.x;
			top = customPosition.y;
		} else {
			isDocked = true;
			// Get the actual width of the modal
			const modalWidth = node.offsetWidth;
			const modalHeight = node.offsetHeight;
			
			switch (position) {
				case 'top-left':
					left = 0;
					top = 0;
					break;
				case 'top':
					left = (window.innerWidth - modalWidth) / 2;
					top = 0;
					break;
				case 'top-right':
					left = window.innerWidth - modalWidth;
					top = 0;
					break;
				case 'left':
					left = 0;
					top = (window.innerHeight - modalHeight) / 2;
					break;
				case 'center':
					left = (window.innerWidth - modalWidth) / 2;
					top = (window.innerHeight - modalHeight) / 2;
					break;
				case 'right':
					left = window.innerWidth - modalWidth;
					top = (window.innerHeight - modalHeight) / 2;
					break;
				case 'bottom-left':
					left = 0;
					top = window.innerHeight - modalHeight;
					break;
				case 'bottom':
					left = (window.innerWidth - modalWidth) / 2;
					top = window.innerHeight - modalHeight;
					break;  
				case 'bottom-right':
					left = window.innerWidth - modalWidth;
					top = window.innerHeight - modalHeight;
					break;
			}
		}

		node.style.position = 'absolute';
		node.style.top = `${top}px`;
		node.style.left = `${left}px`;
		node.style.userSelect = 'none';

		// Define event handlers outside the if blocks so they can be referenced in cleanup
		const mousedownHandler = (e: MouseEvent) => {
			console.log('Mouse down on header', { clientX: e.clientX, clientY: e.clientY, left, top });
			moving = true;
			isDragging = true;
			isDocked = false;
			startMouseX = e.clientX - left;
			startMouseY = e.clientY - top;
		};

		const touchstartHandler = (e: TouchEvent) => {
			console.log('Touch start on header');
			moving = true;
			startTouchX = e.touches[0].clientX - left;
			startTouchY = e.touches[0].clientY - top;
			e.preventDefault();
		};

		const resizeMousedownHandler = (e: MouseEvent) => {
			console.log('Mouse down on resize handle');
			resizing = true;
			startWidth = node.offsetWidth;
			startHeight = node.offsetHeight;
			startMouseX = e.clientX;
			startMouseY = e.clientY;
			e.stopPropagation();
		};

		const resizeTouchstartHandler = (e: TouchEvent) => {
			console.log('Touch start on resize handle');
			resizing = true;
			startWidth = node.offsetWidth;
			startHeight = node.offsetHeight;
			startTouchX = e.touches[0].clientX;
			startTouchY = e.touches[0].clientY;
			e.preventDefault();
			e.stopPropagation();
		};

		const mousemoveHandler = (e: MouseEvent) => {
			if (moving) {
				left = e.clientX - startMouseX;
				top = e.clientY - startMouseY;
				node.style.top = `${top}px`;
				node.style.left = `${left}px`;
			} else if (resizing) {
				const deltaX = e.clientX - startMouseX;
				const deltaY = e.clientY - startMouseY;
				const newWidth = Math.max(250, startWidth + deltaX);
				const newHeight = Math.max(100, startHeight + deltaY);
				node.style.width = `${newWidth}px`;
				node.style.height = `${newHeight}px`;
			}
		};

		const mouseupHandler = () => {
			moving = false;
			resizing = false;
		};

		const touchmoveHandler = (e: TouchEvent) => {
			if (moving) {
				left = e.touches[0].clientX - startTouchX;
				top = e.touches[0].clientY - startTouchY;
				node.style.top = `${top}px`;
				node.style.left = `${left}px`;
				e.preventDefault();
			} else if (resizing) {
				const deltaX = e.touches[0].clientX - startTouchX;
				const deltaY = e.touches[0].clientY - startTouchY;
				const newWidth = Math.max(250, startWidth + deltaX);
				const newHeight = Math.max(100, startHeight + deltaY);
				node.style.width = `${newWidth}px`;
				node.style.height = `${newHeight}px`;
				e.preventDefault();
			}
		};

		const touchendHandler = () => {
			moving = false;
			resizing = false;
		};

		const touchcancelHandler = () => {
			moving = false;
			resizing = false;
		};

		if (headerText && draggable) {
			console.log('Setting up drag handlers');
			headerText.style.cursor = 'move';
			headerText.style.touchAction = 'none';
			headerText.addEventListener('mousedown', mousedownHandler);
			headerText.addEventListener('touchstart', touchstartHandler);
		}

		if (resizeHandle && resizeable) {
			console.log('Setting up resize handlers');
			resizeHandle.style.cursor = 'se-resize';
			resizeHandle.style.touchAction = 'none';
			resizeHandle.addEventListener('mousedown', resizeMousedownHandler);
			resizeHandle.addEventListener('touchstart', resizeTouchstartHandler);
		}

		window.addEventListener('mousemove', mousemoveHandler);
		window.addEventListener('mouseup', mouseupHandler);
		window.addEventListener('touchmove', touchmoveHandler);
		window.addEventListener('touchend', touchendHandler);
		window.addEventListener('touchcancel', touchcancelHandler);

		return {
			destroy() {
				console.log('Cleaning up event listeners');
				if (headerText) {
					headerText.removeEventListener('mousedown', mousedownHandler);
					headerText.removeEventListener('touchstart', touchstartHandler);
				}
				if (resizeHandle) {
					resizeHandle.removeEventListener('mousedown', resizeMousedownHandler);
					resizeHandle.removeEventListener('touchstart', resizeTouchstartHandler);
				}
				window.removeEventListener('mousemove', mousemoveHandler);
				window.removeEventListener('mouseup', mouseupHandler);
				window.removeEventListener('touchmove', touchmoveHandler);
				window.removeEventListener('touchend', touchendHandler);
				window.removeEventListener('touchcancel', touchcancelHandler);
			}
		};
	}

</script>

{#if show}
	{#if showOverlay}
		<button
			onclick={() => {
				cancelOnOverlayClick ? handleClose('cancel') : {};
			}}
			class="overlay"
			aria-label="Close"
		>
		</button>
	{/if}

	<div 
		class="my-form" 
		use:dragMe 
		class:dragging={isDragging}
		class:undocked={!isDocked}
		style="width: {
			width === 'sm' ? 'clamp(250px, 95vw, 500px)' : 
			width === 'md' ? 'clamp(500px, 95vw, 750px)' : 
			width === 'lg' ? 'clamp(750px, 95vw, 950px)' : 
			'95vw'} {styleWindow}">

		{#if showHeader}
			<div class="header" style="{styleHeader}">
				<div class="header-text" style="{styleHeaderText}">{title}</div>
				{#if showCloseBtn}
				<button onclick={() => {handleClose('cancel');}}
					class="form-close"
					aria-label="Close"
				>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
						<path fill="currentColor" d="M16 2C8.2 2 2 8.2 2 16s6.2 14 14 14s14-6.2 14-14S23.8 2 16 2m0 26C9.4 28 4 22.6 4 16S9.4 4 16 4s12 5.4 12 12s-5.4 12-12 12"/>
						<path fill="currentColor" d="M21.4 23L16 17.6L10.6 23L9 21.4l5.4-5.4L9 10.6L10.6 9l5.4 5.4L21.4 9l1.6 1.6l-5.4 5.4l5.4 5.4z"/>
					</svg>
				</button>
				{/if}
			</div>
		{/if}
		<div class="content-wrapper" style="{styleContent}">
			<div class="detail">
				<form action="" class="form">
					{@render children()}
				</form>
			</div>
			{#if showFooter}
				<div class="footer" style="{styleFooter}">
					{#if showCancelBtn}
						<button onclick={() => {handleClose('cancel');}}
							class="footer-button cancel" style="{styleCancelBtn}">
							{cancelBtnText}
						</button>
					{/if}

					<button onclick={() => {handleClose('accept');}}
						class="footer-button accept" style="{styleAcceptBtn}">
						{acceptBtnText}
					</button>

				</div>
			{/if}
		</div>
        {#if resizeable}
            <div class="resize-handle"></div>
        {/if}
	</div>
{/if}

<style>
	.overlay {
		position: absolute;
		top: 0;
        left: 0;
        right: 0;
        bottom: 0;
  
		z-index: 100;
		padding: 0;
		margin: 0;
		opacity: 0.5;
		width: 100%;
		height: 100%;
		/* background-color: darkgrey; */
        background: rgb(19,19,19);
        background: -moz-radial-gradient(circle, rgba(19,19,19,1) 0%, rgba(126,126,126,1) 100%);
        background: -webkit-radial-gradient(circle, rgba(19,19,19,1) 0%, rgba(126,126,126,1) 100%);
        background: radial-gradient(circle, rgba(19,19,19,1) 0%, rgba(126,126,126,1) 100%);
        filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#131313",endColorstr="#7e7e7e",GradientType=1);
	}
	.my-form {
		position: absolute;
		z-index: 200;
		background-color: lightgrey;
		outline: 2px solid white;
		box-shadow: 0px 8px 15px darkgrey;
		border-radius: 12px;
		border: solid 1px grey;
		max-width: 95vw;
		min-width: 250px;
		min-height: 100px;
		display: flex;
		flex-direction: column;
		transition: all 0.2s ease;
	}

	.my-form.dragging {
		transition: none;
		opacity: 0.95;
		box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
		cursor: grabbing;
	}

	.my-form.undocked {
		top: 0;
		left: 0;
	}

	.header {
		display: flex;
		flex-direction: row;

		font-size: 1.4rem;
		font-weight: 600;
		background-color: #325266;
		color: white;
		padding: 8px 8px 8px 32px;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		/* box-shadow: 0 4px 8px #156387; */
	}
	.header-text {
		flex-grow: 1;
	}
	.form-close {
		margin-block-start: 4px;
		margin-inline-end: 4px;
		height: 24px;
		width: 24px;
	}
	button {
		padding: 0;
		margin: 0;
		color: white;
		background-color: transparent;
		border: 0;
		cursor: pointer;
        transform: scale(1);
	}

	.content-wrapper {
		flex: 1;
		display: flex;
		flex-direction: column;
		min-height: 0; /* Important for Firefox */
		max-height: 90dvh;
	}
	.detail {
		flex: 1;
		padding: 1rem;
		overflow-y: auto;
		min-height: 0; /* Important for Firefox */
	}
	.footer {
		display: flex;
		flex-direction: row;
		justify-content: end;
		font-size: 1.4rem;
		font-weight: 600;
		background-color: #325266;
		color: white;
		padding: 8px 32px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		flex-shrink: 0; /* Prevent footer from shrinking */
	}
	.footer-button {
		font-size: 1.1rem;
		padding: 8px 22px;
		margin: 4px;
		border-radius: 8px;
		color: white;
		box-shadow: 2px 2px 5px #092536;
		cursor: pointer;
	}
	.accept {
		background-color: green;
	}
	.cancel {
		background-color: red;
	}

	.form {
		align-self: center;
	}

	.resize-handle {
        position: absolute;
        bottom: 0;
        right: 0;
        width: 20px;
        height: 20px;
        cursor: se-resize;
        background: linear-gradient(135deg, transparent 50%, rgba(0,0,0,0.1) 50%);
    }

</style>
