export interface SFlashListProps {
    data: any[],
    estimatedItemSize?: number,
    estimatedListSize?: { width: number, height: number },
    renderItem: (o: { item: any, index: number }) => any,
    keyExtractor?: ((item: any, index: number) => string) | undefined,
    scrollEnabled?: boolean
}