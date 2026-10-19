/**
 * Decides when the floating header hides (scrolling down) and returns
 * (scrolling up).
 *
 * Direction is judged against an anchor — the last scroll position where a
 * decision was made — not against the previous frame. Smooth scrolling (Lenis)
 * ends every scroll with a run of tiny steps of a pixel or less; comparing
 * frame to frame read those as "not going down any more" and popped the
 * header back in. Measured from the anchor, small steps simply add up until
 * they cross the threshold in one direction or the other.
 */
export const TOP_ZONE = 320; // always shown near the top of the page
export const THRESHOLD = 12; // px of travel needed to change state

export function createHeaderScroll(startY = 0) {
  let anchor = startY;
  let hidden = false;
  return function update(y) {
    if (y <= TOP_ZONE) {
      hidden = false;
      anchor = y;
    } else if (y - anchor > THRESHOLD) {
      hidden = true;
      anchor = y;
    } else if (anchor - y > THRESHOLD) {
      hidden = false;
      anchor = y;
    }
    return hidden;
  };
}
