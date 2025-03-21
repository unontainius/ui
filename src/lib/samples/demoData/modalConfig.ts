export type ModalSize = 'sm' | 'md' | 'lg';

export interface ModalConfig {
    // Layout
    size: ModalSize;
    useBackdrop: boolean;
    outerClickToClose: boolean;
    actionBtns: boolean;

    // Text Content
    header: string;
    acceptBtnText: string;
    cancelBtnText: string;

    // Header Styling
    headerBgColor: string;
    headerTextColor: string;

    // Footer Styling
    footerBgColor: string;

    // Button Styling
    acceptBtnBgColor: string;
    acceptBtnTextColor: string;
    cancelBtnBgColor: string;
    cancelBtnTextColor: string;

    // Content Styling
    contentBgColor: string;
    contentTextColor: string;

    // Border Styling
    showBorder: boolean;
    borderColor: string;
    borderWidth: number;
    borderRadius: number;
}

export const defaultModalConfig: ModalConfig = {
    // Layout
    size: 'md',
    useBackdrop: true,
    outerClickToClose: true,
    actionBtns: true,

    // Text Content
    header: 'Modal Title',
    acceptBtnText: 'Accept',
    cancelBtnText: 'Cancel',

    // Header Styling
    headerBgColor: '#a8c2fa',
    headerTextColor: '#000000',

    // Footer Styling
    footerBgColor: '#a8c2fa',

    // Button Styling
    acceptBtnBgColor: '#a8c2fa',
    acceptBtnTextColor: '#000000',
    cancelBtnBgColor: '#a8c2fa',
    cancelBtnTextColor: '#000000',

    // Content Styling
    contentBgColor: '#f1f1f1',
    contentTextColor: '#000000',

    // Border Styling
    showBorder: true,
    borderColor: '#d3d2d2',
    borderWidth: 1,
    borderRadius: 8
};

// Helper function to merge custom config with defaults
export function createModalConfig(customConfig: Partial<ModalConfig> = {}): ModalConfig {
    return {
        ...defaultModalConfig,
        ...customConfig
    };
} 