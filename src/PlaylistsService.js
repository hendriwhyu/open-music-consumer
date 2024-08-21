const autoBind = require('auto-bind');
const { Pool } = require('pg');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();

    autoBind(this);
  }

  async getPlaylistById(id) {
    const query = {
      text: 'SELECT id, name FROM playlists WHERE id = $1',
      values: [id],
    };
    const { rows, rowCount } = await this._pool.query(query);
    if (!rowCount) throw new Error('Playlist tidak ditemukan', 404);
    return rows[0];
  }

  async getPlaylistSongs(playlistId) {
    const query = {
      text: 'SELECT songs.id, songs.title, songs.performer FROM playlist_songs JOIN songs ON playlist_songs.song_id = songs.id WHERE playlist_songs.playlist_id = $1',
      values: [playlistId],
    };

    const { rows, rowCount } = await this._pool.query(query);
    if (!rowCount) throw new Error('Playlist tidak ditemukan', 404);
    return rows;
  }
}

module.exports = PlaylistsService;
