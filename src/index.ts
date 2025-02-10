import { songTitles } from "./songTitles.js";
import {
  addSong,
  doesTitleExist,
  getErrorMessage,
  getSongsCount,
  isPlaylistFull,
  isTitleEmpty,
  isTitleShort,
  removeSongByPosition,
  sortSongs,
} from "./songs.js";

const newSongForm = document.querySelector(".form");
const newSongTitle = document.querySelector(
  ".form__control#title"
) as HTMLInputElement;
const songsList = document.querySelector(".songs");
const errorBox = document.querySelector(".error");
const totalBox = document.querySelector(".total");

if (!newSongForm || !newSongTitle || !songsList || !errorBox || !totalBox) {
  throw new Error("Missing elements");
}

newSongForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const songTitle = newSongTitle.value;

  if (isTitleEmpty(songTitle)) {
    showError(getErrorMessage("required"));
    return;
  }

  if (doesTitleExist(songTitle, songTitles)) {
    showError(getErrorMessage("exists"));
    return;
  }

  if (isTitleShort(songTitle)) {
    showError(getErrorMessage("too-short"));
    return;
  }

  if (isPlaylistFull(songTitles)) {
    showError(getErrorMessage("limit"));
    return;
  }

  addSong(songTitle, songTitles);
  sortSongs(songTitles);
  newSongTitle.value = "";

  updatePlaylist();
});

const updateSongs = (): void => {
  songsList.innerHTML = songTitles
    .map(
      (title) =>
        `<li class="song">
          <span class="song__title">${title}</span>
          <button class="button">quitar</button>
         </li>`
    )
    .join("");
};

const hydrateButtons = (): void => {
  const removeButtons = document.querySelectorAll(".song .button");

  removeButtons.forEach((button, index) => {
    button.addEventListener("click", () => {
      removeSongByPosition(songTitles, index);

      updatePlaylist();
    });
  });
};

const showError = (message: string): void => {
  errorBox.textContent = message;

  setTimeout(() => {
    errorBox.textContent = "";
  }, 2000);
};

const updateTotal = (): void => {
  totalBox.textContent = `${getSongsCount(songTitles)}`;
};

const updatePlaylist = (): void => {
  updateSongs();
  updateTotal();
  hydrateButtons();
};
