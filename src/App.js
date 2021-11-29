import React, { useCallback } from 'react';
import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';

import { setTime } from './modules/clock';
import GlobalStyle from './styles/global';
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

  return (
    <>
      <GlobalStyle />
      <Container>
        <AnalogClock
          hours={clock.hours}
          minutes={clock.minutes}
          seconds={clock.seconds}
          setCurrentTime={setCurrentTime}
        />
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

export default React.memo(App);
