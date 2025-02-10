export const DivisionUrl = {
    get:()=>'/division'
}

export const PositionsUrl = {
    get:()=>'/positions',
    post:()=>'/positions',
}

export const PositionsByIdUrl = {
    get:(positionId)=>`/positions/${positionId}`,
    delete:(positionId)=>`/positions/${positionId}`,
}