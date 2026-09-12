import assert from "node:assert/strict";
import test from "node:test";
import { VIDEO_EPISODES, YOUTUBE_CHANNEL_URL } from "./video-series";

test("the public video series contains nine uniquely numbered episodes", () => {
  assert.equal(VIDEO_EPISODES.length, 9);
  assert.equal(
    new Set(VIDEO_EPISODES.map((episode) => episode.number)).size,
    9,
  );
  assert.equal(new Set(VIDEO_EPISODES.map((episode) => episode.slug)).size, 9);
});

test("all nine episodes link to the owner-supplied public videos", () => {
  assert.equal(
    YOUTUBE_CHANNEL_URL,
    "https://www.youtube.com/@InnovationByAttaf",
  );
  assert.deepEqual(
    VIDEO_EPISODES.map((episode) => episode.youtubeUrl),
    [
      "https://youtu.be/26vz2tGKAlk",
      "https://youtu.be/mkIj0Ulnf9g",
      "https://youtu.be/-hUVW8BBq5w",
      "https://youtu.be/FdmVwhnunlc",
      "https://youtu.be/yC_zqVd5xQQ",
      "https://youtu.be/bv7iZ2SBtNw",
      "https://youtu.be/ll_YpSKriXw",
      "https://youtu.be/cv9IefEpplA",
      "https://youtu.be/T9OXpXyWgh4",
    ],
  );
  assert.equal(
    VIDEO_EPISODES.filter((episode) => episode.shortUrl).length,
    5,
  );
  assert.equal(
    VIDEO_EPISODES.every((episode) => episode.status === "ready"),
    true,
  );
});
