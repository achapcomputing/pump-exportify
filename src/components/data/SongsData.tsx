import { apiCall } from "helpers"

// Handles cached loading of all or subsets of playlist data
class SongsData {
  PLAYLIST_LIMIT = 50
  SEARCH_LIMIT = 20

  userId: string
  private accessToken: string
  private onSongsLoadingStarted?: () => void
  private onSongsLoadingDone?: () => void
  private data: any[]
  private dataInitialized = false

  constructor(accessToken: string, userId: string, onSongsLoadingStarted?: () => void, onSongsLoadingDone?: () => void) {
    this.accessToken = accessToken
    this.userId = userId
    this.onSongsLoadingStarted = onSongsLoadingStarted
    this.onSongsLoadingDone = onSongsLoadingDone
    this.data = []
  }

  async total() {
    if (!this.dataInitialized) {
      await this.loadSlice()
    }

    return this.data.length
  }

  async slice(start: number, end: number) {
    return await this.loadSlice(start, end)
  }

  async all() {
    await this.loadAll()

    return this.data
  }

  async search(query: string) {
    await this.loadAll()

    // Case-insensitive search in playlist name
    // TODO: Add lazy evaluation for performance?
    return this.data
      .filter(p => p.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, this.SEARCH_LIMIT)
  }

  async loadAll() {
    if (this.onSongsLoadingStarted) {
      this.onSongsLoadingStarted()
    }

    await this.loadSlice()

    // Get the rest of them if necessary
    for (var offset = this.PLAYLIST_LIMIT; offset < this.data.length; offset = offset + this.PLAYLIST_LIMIT) {
      await this.loadSlice(offset, offset + this.PLAYLIST_LIMIT)
    }

    if (this.onSongsLoadingDone) {
      this.onSongsLoadingDone()
    }
  }

  private async loadSlice(start = 0, end = start + this.PLAYLIST_LIMIT) {
    if (this.dataInitialized) {
      const loadedData = this.data.slice(start, end)

      if (loadedData.filter(i => !i).length === 0) {
        return loadedData
      }
    }

    const playlistsUrl = `https://api.spotify.com/v1/users/${this.userId}/playlists?offset=${start}&limit=${end-start}`
    const playlistsResponse = await apiCall(playlistsUrl, this.accessToken)
    const playlistsData = playlistsResponse.data

    if (!this.dataInitialized) {
      this.data = Array(playlistsData.total).fill(null)
      this.dataInitialized = true
    }

    this.data.splice(start, playlistsData.items.length, ...playlistsData.items)

    return playlistsData.items
  }
}

export default SongsData
