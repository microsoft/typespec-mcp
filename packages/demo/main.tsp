import "typespec-mcp";

/**
 * Get an item value.
 */
@tool op getItem(): string;
/**
 * Set an item value.
 */
@tool op setItem(value: string): void;
