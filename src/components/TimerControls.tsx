import React, { FC, useState } from "react";
import { useEffect } from "react";
import { Button, Text } from "react-native";
import { TimerModel } from "../hooks/useTimer";

type TimerControlsProps = {
  timer: TimerModel;
};

export const TimerControls: FC<TimerControlsProps> = ({ timer }) => {
  const running = !!timer.state.ticker;
  const up = timer.state.countUp;

  // if (!running)
  //   return (
  //     <>
  //       <Button title="Play" onPress={timer.start} />
  //       <Button title="Reset" onPress={timer.reset} />
  //     </>
  //   );

  // if (up)
  //   return (
  //     <>
  //       <Button title="Count down" onPress={timer.countDown} />
  //       <Button title="Pause" onPress={timer.stop} />
  //     </>
  //   );

  // if (!up) return;
  // <Button title="Pause" onPress={timer.stop} />;

  return running && up ? (
    <>
      <Button title="Count down" onPress={timer.countDown} />
      <Button title="Pause" onPress={timer.stop} />
    </>
  ) : running ? (
    <Button title="Pause" onPress={timer.stop} />
  ) : (
    <>
      <Button title="Play" onPress={timer.start} />
      <Button title="Reset" onPress={timer.reset} />
    </>
  );

  return !running ? (
    <Button title="Play" onPress={timer.start} />
  ) : up ? (
    <Button title="Count down" onPress={timer.countDown} />
  ) : (
    <Button title="Pause" onPress={timer.stop} />
  );

  return (
    <>
      {running ? (
        <Button title="Pause" onPress={timer.stop} />
      ) : (
        <Button title="Play" onPress={timer.start} />
      )}
      {!running && <Button title="Reset" onPress={timer.reset} />}
      {timer.state.countUp && running && (
        <Button title="Count down" onPress={timer.countDown} />
      )}

      {timer.state.done && <Text>{timer.state.roundTimes}</Text>}
    </>
  );
};
