import { useCallback } from "react";
import { useTone } from "../hooks/useTone.js";

/**
 * A page section that claims a colour tone while it is on screen. The page
 * colours cross-fade to the tone (see tokens.css), so consecutive sections
 * blend into each other instead of meeting at a hard edge.
 *
 * A caller's own `ref` (a plain prop in React 19) is merged with the tone ref.
 */
export default function Section({ tone, as: Tag = "section", className = "", children, ref, ...rest }) {
  const toneRef = useTone(tone);
  const setRefs = useCallback(
    (node) => {
      toneRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    },
    [toneRef, ref]
  );
  return (
    <Tag ref={setRefs} data-tone={tone} className={className} {...rest}>
      {children}
    </Tag>
  );
}
