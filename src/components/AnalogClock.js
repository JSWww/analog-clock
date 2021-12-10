import React, { useEffect } from 'react';
import styled from 'styled-components';

function AnalogClock({ hours, minutes, seconds, setCurrentTime }) {
  useEffect(() => {
    const interval = setInterval(setCurrentTime, 1000);
    return () => clearInterval(interval);
  }, [setCurrentTime]);

  return (
    <ClockFace>
      {marks}
      <HoursHand angle={30 * hours + 0.5 * minutes} />
      <MinutesHand angle={6 * minutes} />
      <SecondsHand angle={6 * seconds} />
    </ClockFace>
  );
}

const ClockFace = styled.div`
  position: relative;
  min-width: 500px;
  min-height: 500px;
  border: 10px solid black;
  border-radius: 50%;
  background-color: #fff;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: black;
  }
`;

const Mark = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  transform: ${({ angle }) => `rotate(${angle}deg)`};

  &::before {
    content: '';
    margin-top: 10px;
    width: ${({ angle }) => (angle % 30 === 0 ? '6px' : '2px')};
    height: ${({ angle }) => (angle % 30 === 0 ? '20px' : '12px')};
    background-color: black;
  }

  &::after {
    content: ${({ angle }) => `'${(angle === 0 ? 360 : angle) / 30}'`};
    display: ${({ angle }) => (angle % 30 === 0 ? 'block' : 'none')};
    font-size: 36px;
    font-weight: 600;
    transform: ${({ angle }) => `rotate(${-angle}deg)`};
  }
`;

const marks = Array.from({ length: 60 }).map((_, i) => (
  <Mark key={i} angle={6 * i} />
));

const Hand = styled.div.attrs(({ angle }) => ({
  style: {
    transform: `translate(-50%, 20%) rotate(${angle}deg)`,
  },
}))`
  position: absolute;
  bottom: 50%;
  left: 50%;
  transform-origin: 50% 80%;
`;

const HoursHand = styled(Hand)`
  width: 8px;
  height: 140px;
  background-color: black;
`;

const MinutesHand = styled(Hand)`
  width: 6px;
  height: 220px;
  background-color: black;
`;

const SecondsHand = styled(Hand)`
  width: 2px;
  height: 240px;
  background-color: red;
`;

export default AnalogClock;
