import { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

function AnalogClock({ hours, minutes, seconds, setCurrentTime }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef();

  useEffect(() => {
    const interval = setInterval(setCurrentTime, 1000);
    return () => clearInterval(interval);
  }, [setCurrentTime]);

  const onMouseHover = () => {
    setShowTooltip(!showTooltip);
  };

  const onMouseMove = (e) => {
    if (!showTooltip) return;

    const currentTargetRect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.pageX - currentTargetRect.left;
    const offsetY = e.pageY - currentTargetRect.top;

    tooltipRef.current.style.left = `${offsetX}px`;
    tooltipRef.current.style.top = `${offsetY - 40}px`;
  };

  const timeFormat = (n) => (n < 10 ? `0${n}` : `${n}`);

  return (
    <ClockFace
      onMouseEnter={onMouseHover}
      onMouseLeave={onMouseHover}
      onMouseMove={onMouseMove}
    >
      {Array.from({ length: 60 }).map((_, i) => (
        <Mark key={i} angle={6 * i} />
      ))}
      <HoursHand angle={30 * hours + 0.5 * minutes} />
      <MinutesHand angle={6 * minutes} />
      <SecondsHand angle={6 * seconds} />
      {showTooltip && (
        <ToolTip ref={tooltipRef}>
          {timeFormat(hours)}시 {timeFormat(minutes)}분 {timeFormat(seconds)}초
        </ToolTip>
      )}
    </ClockFace>
  );
}

const ToolTip = styled.div`
  position: absolute;
  padding: 5px 10px;
  border: 1px solid transparent;
  color: #fff;
  background-color: #222;
  opacity: 0.8;
  white-space: nowrap;
  z-index: 999;
`;

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
