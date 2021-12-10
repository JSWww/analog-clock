import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { setTime } from './modules/clock';
import GlobalStyle from './styles/global';
import Tooltip from './components/Tooltip';
import AnalogClock from './components/AnalogClock';

function App() {
  const clock = useSelector((state) => state.clock);
  const dispatch = useDispatch();

  const setCurrentTime = useCallback(() => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    dispatch(setTime(hours, minutes, seconds));
  }, [dispatch]);

  const timeFormat = (n) => (n < 10 ? `0${n}` : `${n}`);

  const currentTimeToString = () =>
    `${timeFormat(clock.hours)}시 ${timeFormat(clock.minutes)}분 ${timeFormat(
      clock.seconds,
    )}초`;

  return (
    <>
      <GlobalStyle />
      <Container>
        <Tooltip message={currentTimeToString()}>
          <AnalogClock
            hours={clock.hours}
            minutes={clock.minutes}
            seconds={clock.seconds}
            setCurrentTime={setCurrentTime}
          />
        </Tooltip>
      </Container>
    </>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export default App;
