import React, { Children, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';
import styled from 'styled-components';

const Control = styled.div`
  top: calc(50% + 40px);
  position: absolute;
  background: white;
  border-radius: 30px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  cursor: pointer;
  font-weight: bold;
  font-size: 18px;
  z-index: 2;
`;

const variants = {
  enter: (direction) => {
    return {
      x: direction > 0 ? 500 : -500,
      opacity: 0,
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction) => {
    return {
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function Slider({ children, ...props }) {
  const [[page, direction], setPage] = useState([0, 0]);
  const [sliding, setSliding] = useState(false);
  // We only have 3 components, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 components.
  const componentIndex = wrap(0, Children.count(children), page);

  const paginate = (newDirection) => {
    setSliding(true);
    setPage([page + newDirection, newDirection]);
    setSliding(false);
  };

  return (
    <>
      <AnimatePresence initial={false} custom={direction} exitBeforeEnter>
        <motion.div
          className="slider"
          {...props}
          key={page}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.9 },
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
        >
          {!sliding && children[componentIndex]}
        </motion.div>
      </AnimatePresence>
      <Control
        className="next"
        style={{ right: 0 }}
        onClick={() => paginate(1)}
      >
        {'Next'}
      </Control>
      <Control className="prev" onClick={() => paginate(-1)}>
        {'Prev'}
      </Control>
    </>
  );
}
