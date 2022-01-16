import { useReducer } from "react";

type TimerAction = {
  type: "count" | "reset" | "time-round" | "set-ticker" | "remove-ticker";
  ticker?: NodeJS.Timer | null;
};

export type TimerState = {
  maxRounds: number;
  currentRound: number;
  timeInMs: number;
  countUp: boolean;
  ticker: NodeJS.Timer | null;
  roundTimes: number[];
  done: boolean;
};

export type TimerModel = {
  state: TimerState;
  start: () => void;
  stop: () => void;
  reset: () => void;
  countDown: () => void;
};

export default function useTimer(
  rounds: number,
  incrementInMs: number
): TimerModel {
  const initialState: TimerState = {
    timeInMs: 0,
    currentRound: 1,
    maxRounds: rounds,
    countUp: true,
    ticker: null,
    roundTimes: [],
    done: false,
  };

  function timerReducer(state: TimerState, action: TimerAction): TimerState {
    switch (action.type) {
      case "count":
        const timerZero = state.timeInMs === 0;
        const newRound = !state.countUp && timerZero;

        const currentRound = newRound
          ? state.currentRound + 1
          : state.currentRound;

        if (currentRound > state.maxRounds && state.ticker) {
          console.log("Stop ticker", state.roundTimes);

          clearInterval(state.ticker);
          return { ...state, ticker: null, done: true };
        }

        const countUp = state.countUp || newRound;

        const timeInMs = countUp
          ? state.timeInMs + incrementInMs
          : state.timeInMs - incrementInMs;

        return {
          ...state,
          timeInMs,
          countUp,
          currentRound,
        };
      case "time-round":
        return {
          ...state,
          countUp: false,
          roundTimes: [...state.roundTimes, state.timeInMs],
        };
      case "set-ticker":
        if (!action.ticker)
          throw new Error("Missing arg action.ticker when setting ticker");
        return { ...state, ticker: action.ticker };
      case "remove-ticker":
        if (state.ticker) clearInterval(state.ticker);
        return { ...state, ticker: null };
      case "reset":
        return { ...initialState };
      default:
        throw new Error("Not implemented timer action");
    }
  }

  const [timer, dispatchTimer] = useReducer(timerReducer, initialState);

  const start = () => {
    if (timer.ticker) return;

    const ticker = setInterval(() => {
      dispatchTimer({ type: "count" });
    }, incrementInMs);
    dispatchTimer({ type: "set-ticker", ticker });
  };

  const stop = () => dispatchTimer({ type: "remove-ticker" });
  const reset = () => dispatchTimer({ type: "reset" });
  const countDown = () => dispatchTimer({ type: "time-round" });

  return {
    state: timer,
    start,
    stop,
    reset,
    countDown,
  };
}
