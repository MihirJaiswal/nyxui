const kw = "text-[#d32f2f] dark:text-neutral-400"; // keywords / control flow
const fn = "text-[#6f42c1] dark:text-[#ffc799]"; // functions
const str = "text-[#365314] dark:text-[#99ffe4]"; // strings
const num = "text-[#1976d2]"; // numbers
const pl = "text-neutral-800 dark:text-neutral-300"; // punctuation/plain
const cm = "text-neutral-500 italic"; // comments

export function ProDummyCode() {
  return (
    <pre
      aria-hidden="true"
      className="m-0 max-h-none! overflow-visible! w-max min-w-max p-4 font-mono text-[13px] leading-6 whitespace-pre"
    >
      <code className="language-tsx">
        <span className="block">
          <span className={cm}>{"// oops you removed the blur but..."}</span>
        </span>
        <span className="block">
          <span className={cm}>
            {"// devtools was not going to save you either."}
          </span>
        </span>
        <span className="block"> </span>
        <span className="block">
          <span className={kw}>{"const"}</span>{" "}
          <span className={pl}>{"source = "}</span>
          <span className={kw}>{"await"}</span>{" "}
          <span className={fn}>{"fetchProSource"}</span>
          <span className={pl}>(name, getToken);</span>
        </span>
        <span className="block">
          {"  "}
          <span className={cm}>
            {"// 403 — no active plan on this account"}
          </span>
        </span>
        <span className="block"> </span>
        <span className="block">
          <span className={cm}>
            {"// 403 Forbidden — this is the whole component:"}
          </span>
        </span>
        <span className="block">
          <span className={kw}>{"const"}</span>{" "}
          <span className={pl}>whatYouGet = {"{"}</span>
        </span>
        <span className="block">
          {"  "}
          <span className={pl}>{"error: "}</span>
          <span className={str}>{'"Unauthorized"'}</span>
          <span className={pl}>{","}</span>
        </span>
        <span className="block">
          {"  "}
          <span className={pl}>{"yourEffort: "}</span>
          <span className={num}>{"10"}</span>
          <span className={pl}>{","}</span>
        </span>
        <span className="block">
          {"  "}
          <span className={pl}>{"theCode: "}</span>
          <span className={kw}>{"undefined"}</span>
          <span className={pl}>{","}</span>
        </span>
        <span className="block">
          <span className={pl}>{"};"}</span>
        </span>
        <span className="block"> </span>
        <span className="block">
          <span className={kw}>{"function"}</span>{" "}
          <span className={fn}>{"tryToBlurBypass"}</span>
          <span className={pl}>(el) {"{"}</span>
        </span>
        <span className="block">
          {"  "}
          <span className={cm}>{"// remove the blur, see what happens"}</span>
        </span>
        <span className="block">
          {"  "}
          <span className={pl}>{"el.style.filter = "}</span>
          <span className={str}>{'"none"'}</span>
          <span className={pl}>{";"}</span>
        </span>
        <span className="block">
          {"  "}
          <span className={pl}>{"document."}</span>
          <span className={fn}>{"body"}</span>
          <span className={pl}>{".innerText = "}</span>
          <span className={str}>
            {'"it was placeholder code all along. skill issue."'}
          </span>
          <span className={pl}>{";"}</span>
        </span>
        <span className="block">
          <span className={pl}>{"}"}</span>
        </span>
        <span className="block"> </span>
        <span className="block">
          <span className={cm}>
            {"// this file contains zero (0) lines of real source"}
          </span>
        </span>
        <span className="block">
          <span className={cm}>
            {"// the actual component ships to your editor, not your browser"}
          </span>
        </span>
        <span className="block"> </span>
        <span className="block">
          <span className={kw}>{"export default"}</span>{" "}
          <span className={pl}>{"hopefullyThisWasWorthYourTime;"}</span>
        </span>
      </code>
    </pre>
  );
}
