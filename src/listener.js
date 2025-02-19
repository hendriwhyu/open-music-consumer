class Listener {
  constructor(playlistsService, mailSender) {
    this._playlistsService = playlistsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const { playlistId, targetEmail } = JSON.parse(
        message.content.toString(),
      );

      const playlists = await this._playlistsService.getPlaylistById(
        playlistId,
      );
      const songs = await this._playlistsService.getPlaylistSongs(playlistId);
      const formattedPlaylist = {
        playlist: {
          id: playlists.id,
          name: playlists.name,
          songs,
        },
      };

      const result = await this._mailSender.sendEmail(
        targetEmail,
        JSON.stringify(formattedPlaylist),
      );
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
