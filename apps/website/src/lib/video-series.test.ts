import assert from "node:assert/strict";
import test from "node:test";
import { VIDEO_EPISODES, YOUTUBE_CHANNEL_URL } from "./video-series";

test("the public video series contains eight uniquely numbered episodes", () => {
  assert.equal(VIDEO_EPISODES.length, 8);
  assert.equal(
    new Set(VIDEO_EPISODES.map((episode) => episode.number)).size,
    8,
  );
  assert.equal(new Set(VIDEO_EPISODES.map((episode) => episode.slug)).size, 8);
});

test("only the verified public YouTube channel URL is exposed", () => {
  assert.equal(
    YOUTUBE_CHANNEL_URL,
    "https://www.youtube.com/@InnovationByAttaf",
  );
  assert.equal(
    VIDEO_EPISODES.some((episode) => "youtubeId" in episode),
    false,
  );
});
