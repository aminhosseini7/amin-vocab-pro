// Simple SM-2 based SRS update
function updateSRSState(ws, quality) {
  if (quality < 3) {
    ws.reps = 0;
    ws.interval = 1;
  } else {
    if (ws.reps === 0) {
      ws.interval = 1;
    } else if (ws.reps === 1) {
      ws.interval = 6;
    } else {
      ws.interval = Math.round(ws.interval * ws.ef);
    }
    ws.reps += 1;
    ws.ef = ws.ef - 0.8 + 0.28 * quality - 0.02 * quality * quality;
    if (ws.ef < 1.3) ws.ef = 1.3;
  }
  ws.nextReview = Date.now() + ws.interval * 24 * 60 * 60 * 1000;
  if (!ws.nextReview || isNaN(ws.nextReview)) {
    ws.nextReview = Date.now();
  }
}
