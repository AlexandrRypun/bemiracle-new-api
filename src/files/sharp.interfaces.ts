export interface ISharpResizeOptions {
    width?: number;
    height?: number;
    fit?: string;
    position?: string;
    background?: string | object;
    kernel?: string;
    withoutEnlargement?: boolean;
    fastShrinkOnLoad?: boolean;
}
