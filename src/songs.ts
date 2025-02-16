export const isTitleEmpty = (songTitle: string): boolean => {
  const isEmpty: boolean = songTitle === "";

  return isEmpty;
};

export const doesTitleExist = (
  songTitle: string,
  songTitles: string[]
): boolean => {
  const doesExist: boolean = songTitles.includes(songTitle);

  return doesExist;
};

export const isTitleShort = (songTitle: string): boolean => {
  const minimumTitleLength = 3;
  const isShort: boolean = songTitle.length < minimumTitleLength;

  return isShort;
};

export const isPlaylistFull = (songTitles: string[]): boolean => {
  const maximumSongsNumber = 5;
  const isFull: boolean = songTitles.length >= maximumSongsNumber;

  return isFull;
};

export const addSong = (songTitle: string, songTitles: string[]): void => {
  songTitles.push(songTitle);
};

export const sortSongs = (songTitles: string[]): void => {
  songTitles.sort();
};

export const getSongsCount = (songTitles: string[]): number => {
  const songsCount: number = songTitles.length;

  return songsCount;
};

export const removeSongByPosition = (
  songTitles: string[],
  position: number
): void => {
  songTitles.splice(position, 1);
};

export const getErrorMessage = (errorCode: string): string => {
  let errorMessage: string;

  switch (errorCode) {
    case "required":
      errorMessage = "No has introducido ningún título";
      break;
    case "exists":
      errorMessage = "La canción ya existe";
      break;
    case "too-short":
      errorMessage = "El título es demasiado corto";
      break;
    case "limit":
      errorMessage = "La playlist está llena";
      break;
    default:
      errorMessage = "Error";
  }

  return errorMessage;
};
