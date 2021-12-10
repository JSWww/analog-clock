import { useRef } from 'react';
import styled from 'styled-components';

function Tooltip({ children, message }) {
  const tooltipRef = useRef();

  const onMouseEnter = () => {
    tooltipRef.current.style.display = 'block';
  };

  const onMouseLeave = () => {
    tooltipRef.current.style.display = 'none';
  };

  const onMouseMove = (e) => {
    if (e.target === e.currentTarget) {
      tooltipRef.current.style.display = 'none';
      return;
    }

    const currentTargetRect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - currentTargetRect.left;
    const offsetY = e.clientY - currentTargetRect.top;

    tooltipRef.current.style.display = 'block';
    tooltipRef.current.style.left = `${offsetX + 12}px`;
    tooltipRef.current.style.top = `${offsetY - 40}px`;
  };

  return (
    <Container
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={onMouseMove}
    >
      {children}
      <Content ref={tooltipRef}>{message}</Content>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
`;

const Content = styled.div`
  position: absolute;
  display: none;
  padding: 5px 10px;
  border: 1px solid transparent;
  color: #fff;
  background-color: #222;
  opacity: 0.8;
  white-space: nowrap;
  z-index: 999;
`;

export default Tooltip;
