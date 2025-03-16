import { forwardRef, useImperativeHandle, useRef } from "react";

const ResultModal = forwardRef(function ResultModal(
  { result, targetTime, timeElapsed, onReset },
  ref
) {
  const dialogRef = useRef();
  const userLost = timeElapsed <= 0;
  const formattedTimeElapsed = (timeElapsed / 1000).toFixed(2);
  const score = Math.round((1 - timeElapsed / (targetTime * 1000)) * 100);
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialogRef.current.showModal();
      },
    };
  });
  return (
    <dialog onClose={onReset} ref={dialogRef} className="result-modal">
      {userLost && <h2>You Lost</h2>}
      {!userLost && <h2>Your Score {score}</h2>}
      <p>
        The target time was <strong>{targetTime} seconds</strong>
      </p>
      <p>
        You stopped the timer with{" "}
        <strong>{formattedTimeElapsed} seconds left</strong>
      </p>
      <form method="dialog">
        <button onClick={onReset}>Close</button>
      </form>
    </dialog>
  );
});

export default ResultModal;
