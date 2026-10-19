/** A title with its accent phrase set in the italic accent face. */
export default function AccentTitle({ title, accent }) {
  const at = accent ? title.indexOf(accent) : -1;
  if (at < 0) return title;
  return (
    <>
      {title.slice(0, at)}
      <em className="accent-word">{accent}</em>
      {title.slice(at + accent.length)}
    </>
  );
}
