export interface Player {
	id: number
}

export interface StartBody {
	version?: string
	players?: Player[]
}
export interface UpdateBody {
	players: Player[]
}