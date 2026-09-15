type Props = { kind: "stars" | "flowers" | "puppy" };

/** Decorative ink drawings live in their own layout boxes, away from copy. */
export default function ReceiptDoodle({ kind }: Props) {
  return (
    <svg
      className={`receipt-doodle doodle-${kind}`}
      viewBox={kind === "stars" ? "0 0 180 75" : "0 0 140 130"}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {kind === "stars" && (
        <>
          <path
            d="M13 48C35 64 53 57 65 48M112 28c22-18 44-13 56-2M113 56c20 7 38 0 46-10"
            strokeWidth="1.4"
          />
          <path d="M81 12c4-3 10 15 13 17 3 1 22-5 23-1 2 4-14 14-14 18 0 3 10 18 6 21-3 2-19-10-22-9-4 1-13 14-17 11-3-2 1-21 0-24-2-3-19-10-17-14 1-4 20-1 23-3 2-3 2-13 5-16Z" />
          <path
            d="m33 15 4 8 8 3-8 4-3 9-4-9-8-3 8-4Zm110 35 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"
            strokeWidth="1.6"
          />
          <circle cx="20" cy="58" r="2" fill="currentColor" stroke="none" />
          <circle cx="158" cy="12" r="2" fill="currentColor" stroke="none" />
        </>
      )}
      {kind === "flowers" && (
        <>
          <path d="M66 119C49 93 84 60 69 19M66 92c-22-7-27-19-26-28 12 3 22 14 26 28Zm4-25c18-6 23-14 26-25-14 4-22 13-26 25ZM66 100c13-9 26-8 33-5-9 11-24 13-33 5ZM70 42C59 30 48 32 43 36M74 66c13-5 24-1 28 5" />
          <path d="M34 37c0-9 14-12 20-5l8 12c-6 5-10 3-12 0-1 7-9 8-12 2-7 4-11-2-8-7Zm63 38c1-9 13-13 20-5l7 12c-5 4-9 3-11 0-2 6-9 7-11 1-6 4-11-1-8-5ZM64 17c-2-9 10-12 14-5 5 8-7 15-12 9" />
          <path
            d="M94 24c-4-8-2-16 3-15 5 1 3 8 6 9 6-11 14-9 11-2-2 4-7 7-13 9 10 0 15 4 12 8-3 4-11-1-14-6M23 88v10m-5-5h10M114 111v7m-4-3h8"
            strokeWidth="1.6"
          />
          <circle cx="28" cy="61" r="3" />
          <circle cx="100" cy="53" r="1.8" fill="currentColor" stroke="none" />
        </>
      )}
      {kind === "puppy" && (
        <>
          <path d="M39 54c-9-3-21 5-25 19-5 15 0 23 10 19 6-2 10-10 13-16M102 54c11-2 20 7 24 20 5 14-2 22-11 17-6-3-10-10-12-16M38 66c-3 20 3 35 32 36 31 1 38-16 33-35M36 58c6-16 22-22 35-21 16-1 29 6 34 22" />
          <path d="M52 39c0-7 12-13 22-11 9 0 18 4 18 10-9 4-28 6-40 1ZM70 29c-2-7 3-10 5-6M48 104c-5 7-19 7-24 2m66-2c6 6 18 6 23 0M53 77c-2 5 4 8 9 5 4-2 5-8 5-8s2 8 7 8c6 1 9-3 6-6" />
          <ellipse
            cx="52"
            cy="63"
            rx="2.5"
            ry="3.5"
            fill="currentColor"
            stroke="none"
          />
          <ellipse
            cx="84"
            cy="63"
            rx="2.5"
            ry="3.5"
            fill="currentColor"
            stroke="none"
          />
          <path d="M63 71q5-5 10 0l-5 5Z" fill="currentColor" />
          <path
            d="M23 35c-9-8-11 4 0 9 12-8 8-15 0-9ZM113 24v10m-5-5h10M14 110h112"
            strokeWidth="1.5"
          />
        </>
      )}
    </svg>
  );
}
