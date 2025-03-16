import { useState, useRef } from "react";
import ResultModal from "./ResultModal";

export default function TimerChallenge({ title, targetTime }) {
  const [timeElapsed, setTimeElapsed] = useState(targetTime * 1000);
  let timerIsActive = timeElapsed > 0 && timeElapsed < targetTime * 1000;
  const timerRef = useRef();
  const dialogRef = useRef();

  if (timeElapsed <= 0) {
    clearInterval(timerRef.current);
    dialogRef.current.open();
  }
  function handleReset() {
    setTimeElapsed(targetTime * 1000);
  }
  function handleStart() {
    timerRef.current = setInterval(() => {
      setTimeElapsed((prevTimeElapsed) => prevTimeElapsed - 10);
    }, 10);
  }
  function handleStop() {
    clearInterval(timerRef.current);
    dialogRef.current.open();
  }
  return (
    <>
      <ResultModal
        ref={dialogRef}
        targetTime={targetTime}
        timeElapsed={timeElapsed}
        onReset={handleReset}
      />

      <section className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime > 1 ? "s" : ""}
        </p>
        <p>
          <button
            ref={timerRef}
            onClick={timerIsActive ? handleStop : handleStart}
          >
            {timerIsActive ? "Stop" : "Start"} Challenge
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {timerIsActive ? "Time is running..." : "Timer is inactive"}
        </p>
      </section>
    </>
  );
}
