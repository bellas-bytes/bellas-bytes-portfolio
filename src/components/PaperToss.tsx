import { useEffect, useRef, useState } from "react";
import "./PaperToss.css";

export default function PaperToss() {
  const [crumpling, setCrumpling] = useState(false);
  const receiptCopy = useRef<HTMLElement | null>(null);
  const ballPrint = useRef<HTMLDivElement>(null);
  const restoreReceipt = useRef<() => void>(() => {});
  const transition = useRef<Animation | null>(null);
  const transitionLayer = useRef<HTMLElement | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [open, setOpen] = useState(false);
  const [angle, setAngle] = useState(0);
  const [power, setPower] = useState(65);
  const [bin, setBin] = useState(180);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [flying, setFlying] = useState(false);
  const [message, setMessage] = useState("One last thing before you go…");
  const [ball, setBall] = useState({ x: 180, y: 340 });
  const drag = useRef(false);
  const frame = useRef(0);

  useEffect(
    () => () => {
      transition.current?.cancel();
      transitionLayer.current?.remove();
      restoreReceipt.current();
    },
    [],
  );

  useEffect(() => {
    if (open && ballPrint.current && receiptCopy.current) {
      const copy = receiptCopy.current.cloneNode(true) as HTMLElement;
      const width = Number(copy.dataset.printWidth);
      const height = Number(copy.dataset.printHeight);
      copy.style.cssText = `width:${width}px;height:${height}px;margin:0;transform-origin:top left;transform:scale(${48 / width},${48 / height});pointer-events:none;`;
      ballPrint.current.replaceChildren(copy);
    }
  }, [open]);

  const crumple = async () => {
    if (crumpling) return;
    const receipt = trigger.current?.closest<HTMLElement>(".receipt-paper");
    if (!receipt) return;
    const rect = receipt.getBoundingClientRect();
    const copy = receipt.cloneNode(true) as HTMLElement;
    copy.querySelectorAll("[id]").forEach((node) => node.removeAttribute("id"));
    copy.removeAttribute("id");
    copy.classList.add("thermal-colors");
    const creases = document.createElement("div");
    creases.className = "receipt-crumple-creases";
    copy.appendChild(creases);
    copy.querySelectorAll("button, dialog").forEach((node) => node.remove());
    copy.setAttribute("aria-hidden", "true");
    copy.setAttribute("inert", "");
    copy.dataset.printWidth = String(rect.width);
    copy.dataset.printHeight = String(rect.height);
    receiptCopy.current = copy;
    setCrumpling(true);
    const previousVisibility = receipt.style.visibility;
    const previousOverflow = document.body.style.overflow;
    restoreReceipt.current = () => {
      receipt.style.visibility = previousVisibility;
      document.body.style.overflow = previousOverflow;
    };
    document.body.style.overflow = "hidden";
    receipt.style.visibility = "hidden";
    const layer = copy.cloneNode(true) as HTMLElement;
    layer.style.cssText = `position:fixed;left:${rect.left}px;top:${rect.top}px;width:${rect.width}px;height:${rect.height}px;margin:0;z-index:9999;pointer-events:none;transform-origin:top left;overflow:hidden;`;
    document.body.appendChild(layer);
    transitionLayer.current = layer;
    const x = window.innerWidth / 2 - rect.left;
    const y = window.innerHeight / 2 - rect.top;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const shape =
      "polygon(8% 28%,28% 3%,64% 0%,94% 28%,100% 65%,73% 100%,28% 96%,0% 64%)";
    const animation = layer.animate(
      [
        {
          transform: "translate(0,0) scale(1)",
          filter: "brightness(1)",
          clipPath:
            "polygon(0% 0%,33% 0%,66% 0%,100% 0%,100% 100%,66% 100%,33% 100%,0% 100%)",
        },
        {
          transform: `translate(${x - rect.width * 0.28}px,${y - 190}px) scale(.56,${380 / rect.height}) skew(-7deg,3deg)`,
          offset: 0.4,
          filter: "brightness(.96)",
        },
        {
          transform: `translate(${x - 65}px,${y - 75}px) scale(${130 / rect.width},${150 / rect.height}) skew(12deg,-8deg)`,
          offset: 0.72,
          clipPath: shape,
          filter: "contrast(1.3)",
        },
        {
          transform: `translate(${x - 24}px,${y - 24}px) scale(${48 / rect.width},${48 / rect.height})`,
          clipPath: shape,
          filter: "contrast(1.4)",
        },
      ],
      { duration: reduce ? 0 : 1300, easing: "ease-in-out", fill: "forwards" },
    );
    transition.current = animation;
    try {
      await animation.finished;
    } catch {
      return;
    }
    layer.remove();
    transitionLayer.current = null;
    document.body.style.overflow = previousOverflow;
    setCrumpling(false);
    setBall({ x: 180, y: 340 });
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    dialog.current?.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
      clearTimeout(timer.current);
      cancelAnimationFrame(frame.current);
    };
  }, [open]);

  const close = () => {
    restoreReceipt.current();
    dialog.current?.close();
    setOpen(false);
    setFlying(false);
    drag.current = false;
    trigger.current?.focus();
  };
  const launch = () => {
    if (flying) return;
    const radians = (angle * Math.PI) / 180;
    const end = {
      x: 180 + Math.sin(radians) * power * 3,
      y: 340 - Math.cos(radians) * power * 3,
    };
    const hit = Math.abs(end.x - bin) < 25 && Math.abs(end.y - 110) < 23;
    setFlying(true);
    setAttempts((n) => n + 1);
    setMessage("Receipt in flight…");
    const duration = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches
      ? 0
      : 700;
    const start = performance.now();
    const animate = (now: number) => {
      const t = duration ? Math.min(1, (now - start) / duration) : 1;
      setBall({
        x: 180 + (end.x - 180) * t,
        y: 340 + (end.y - 340) * t - Math.sin(t * Math.PI) * 75,
      });
      if (t < 1) frame.current = requestAnimationFrame(animate);
      else {
        if (hit) setScore((n) => n + 1);
        setMessage(
          hit
            ? "Nothing but bin! Another receipt?"
            : "Almost! Adjust your aim or power and try again.",
        );
        timer.current = setTimeout(() => {
          setBall({ x: 180, y: 340 });
          setFlying(false);
          if (hit) setBin(85 + Math.round(Math.random() * 190));
        }, 700);
      }
    };
    frame.current = requestAnimationFrame(animate);
  };
  const aim = (event: React.PointerEvent<SVGSVGElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = ((event.clientX - rect.left) / rect.width) * 360 - 180;
    const dy = 340 - ((event.clientY - rect.top) / rect.height) * 400;
    setAngle(
      Math.round(
        Math.max(
          -50,
          Math.min(50, (Math.atan2(dx, Math.max(1, dy)) * 180) / Math.PI),
        ),
      ),
    );
    setPower(Math.round(Math.max(40, Math.min(100, Math.hypot(dx, dy) / 3))));
  };
  return (
    <>
      <button
        ref={trigger}
        className="crumple-trigger"
        disabled={crumpling}
        onClick={crumple}
      >
        Done reading? Crumple this receipt ↗
      </button>
      {open && (
        <dialog
          ref={dialog}
          className="paper-toss"
          aria-labelledby="toss-title"
          aria-describedby="toss-help"
          onCancel={(event) => {
            event.preventDefault();
            close();
          }}
        >
          <button
            className="toss-close"
            onClick={close}
            aria-label="Return to portfolio"
          >
            ×
          </button>
          <p className="toss-eyebrow">A LITTLE DESK BREAK</p>
          <h2 id="toss-title">Receipt, meet bin.</h2>
          <p id="toss-help">
            Drag from the paper toward the bin, then release. Or adjust the
            controls and toss.
          </p>
          <div className="toss-score">
            BASKETS {score} / TOSSES {attempts}
          </div>
          <p className="toss-target-description" aria-live="polite">
            Bin target: aim{" "}
            {Math.round((Math.atan2(bin - 180, 230) * 180) / Math.PI)} degrees,
            power {Math.round(Math.hypot(bin - 180, 230) / 3)} percent.
          </p>
          <svg
            className="toss-court"
            viewBox="0 0 360 400"
            role="img"
            aria-label="Paper toss court with a wire bin and crumpled receipt"
            onPointerDown={(event) => {
              if (flying) return;
              const rect = event.currentTarget.getBoundingClientRect();
              const x = ((event.clientX - rect.left) / rect.width) * 360;
              const y = ((event.clientY - rect.top) / rect.height) * 400;
              if (Math.hypot(x - 180, y - 340) > 42) return;
              drag.current = true;
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerMove={(event) => {
              if (drag.current) aim(event);
            }}
            onPointerUp={() => {
              if (drag.current) {
                drag.current = false;
                launch();
              }
            }}
            onPointerCancel={() => {
              drag.current = false;
            }}
          >
            <ellipse
              cx={bin}
              cy="190"
              rx="43"
              ry="8"
              fill="#242720"
              opacity=".09"
            />
            <g fill="none" stroke="#4e5147" strokeWidth="2">
              <path
                d={`M${bin - 35} 110 L${bin - 25} 183 Q${bin} 197 ${bin + 25} 183 L${bin + 35} 110`}
              />
              <ellipse cx={bin} cy="110" rx="35" ry="11" />
              {[-20, -10, 0, 10, 20].map((x) => (
                <path key={x} d={`M${bin + x} 120 L${bin + x * 0.72} 187`} />
              ))}
              {[135, 153, 171].map((y) => (
                <path
                  key={y}
                  d={`M${bin - 31 + (y - 135) * 0.13} ${y} Q${bin} ${y + 12} ${bin + 31 - (y - 135) * 0.13} ${y}`}
                />
              ))}
            </g>
            {!flying && (
              <path
                d={`M180 313 l${Math.sin((angle * Math.PI) / 180) * power * 1.5} ${-Math.cos((angle * Math.PI) / 180) * power * 1.5}`}
                stroke="#9d4238"
                strokeWidth="2"
                strokeDasharray="3 7"
                fill="none"
              />
            )}
            <g transform={`translate(${ball.x} ${ball.y})`}>
              <g
                className="toss-paper-ball"
                fill="#fffcf2"
                stroke="#4e5147"
                strokeWidth="1.5"
              >
                <path d="M-20-9 -10-21 8-22 21-9 24 7 11 23 -9 22 -23 7Z" />
                <foreignObject
                  x="-24"
                  y="-24"
                  width="48"
                  height="48"
                  className="toss-printed-ball"
                >
                  <div ref={ballPrint} aria-hidden="true" />
                </foreignObject>
                <path
                  d="m-20-9 16 5 12-18 -2 23 18 6 -19 5 6 11 -15-12 -19-4 19-11 10 5 -1 11"
                  fill="none"
                />
              </g>
            </g>
          </svg>
          <p className="toss-status" role="status">
            {message}
          </p>
          <div className="toss-controls">
            <label>
              Aim <span>{angle}°</span>
              <input
                aria-label="Aim"
                type="range"
                min="-50"
                max="50"
                value={angle}
                disabled={flying}
                onChange={(e) => setAngle(Number(e.target.value))}
              />
            </label>
            <label>
              Power <span>{power}%</span>
              <input
                aria-label="Power"
                type="range"
                min="40"
                max="100"
                value={power}
                disabled={flying}
                onChange={(e) => setPower(Number(e.target.value))}
              />
            </label>
            <button onClick={launch} disabled={flying}>
              {flying ? "In the air…" : "Toss receipt ↗"}
            </button>
          </div>
          <button className="toss-return" onClick={close}>
            Uncrumple & return
          </button>
        </dialog>
      )}
    </>
  );
}
