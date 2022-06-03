import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';

import useMounted from '../../hooks/useMounted';

interface Props {
  imagesRef: MutableRefObject<HTMLImageElement[]>;
  screenshotList: string[];
  size: number;
  setSize: Dispatch<SetStateAction<number>>;
  counter: number;
  setCounter: Dispatch<SetStateAction<number>>;
  willTransition: boolean;
  setWillTransition: Dispatch<SetStateAction<boolean>>;
}

const Thumbnails = ({
  imagesRef,
  screenshotList,
  size,
  setSize,
  counter,
  setCounter,
  willTransition,
  setWillTransition,
}: Props) => {
  const [isNextActive, setIsNextActive] = useState(false);
  const [isPrevActive, setIsPrevActive] = useState(false);

  const [noDelay, setNoDelay] = useState(false);

  const timer = useRef(0);

  // handlers
  const slideNext = () => {
    setIsNextActive(true);
    setNoDelay(false);
    setWillTransition(true);

    clearTimeout(timer.current);

    timer.current = window.setTimeout(() => {
      setIsNextActive(false);
    }, 1200);

    setCounter((prevCounter) => {
      return prevCounter === screenshotList.length - 1 ? 0 : prevCounter + 1;
    });
  };

  const handleNextSlide = () => {
    slideNext();
  };

  const handlePrevSlide = () => {
    setIsPrevActive(true);
    setWillTransition(true);
    setNoDelay(false);

    clearTimeout(timer.current);

    timer.current = window.setTimeout(() => {
      setIsPrevActive(false);
    }, 1200);

    setCounter((prevCounter) => {
      return prevCounter === 0 ? screenshotList.length - 1 : prevCounter - 1;
    });
  };

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    setSize(imagesRef.current[counter].clientWidth);
  }, [counter]);

  const handleDotIndicator = (index: number) => {
    setCounter(index);
    setWillTransition(true);
  };

  const mounted = useMounted();

  const translateXByCounter = `translateX(-${size * counter}px)`;

  let thumbnailsStyles = { transform: translateXByCounter };

  useEffect(() => {
    if (mounted)
      thumbnailsStyles = {
        ...thumbnailsStyles,
        transform: translateXByCounter,
      };
  }, [size, counter]);

  const [drag, setDrag] = useState(false);
  const [initPos, setInitPos] = useState(0);
  const [transformed, setTransformed] = useState(0);

  const thumbnailsRef = useRef<HTMLDivElement>(null);

  // utils
  const getTransformed = () => {
    if (!thumbnailsRef.current) return 0;

    const matrix = window
      .getComputedStyle(thumbnailsRef.current)
      .getPropertyValue('transform');

    if (matrix !== 'none') return parseInt(matrix.split(',')[4].trim());
    return 0;
  };

  const getPosX = (e: React.TouchEvent | React.MouseEvent) => {
    if (e.nativeEvent instanceof TouchEvent) {
      return e.nativeEvent.touches[0].pageX;
    }

    if (e.nativeEvent instanceof MouseEvent) {
      return e.nativeEvent.pageX;
    }

    return 0;
  };

  const gestureStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (
      (e.target as HTMLElement).closest(
        '.modal__carousel-prev-btn, .modal__carousel-next-btn'
      ) ||
      screenshotList.length === 1
    )
      return;

    setWillTransition(false);
    setDrag(true);
    setInitPos(getPosX(e));
    setTransformed(getTransformed());
  };

  const gestureMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!thumbnailsRef.current) return;

    const target = e.target as HTMLElement;
    if (
      target.closest('.modal__carousel-prev-btn, .modal__carousel-next-btn') ||
      screenshotList.length === 1
    )
      return;

    target.style.cursor = 'grab';

    if (drag) {
      const moved = getPosX(e) - initPos;
      target.style.cursor = 'grabbing';

      thumbnailsRef.current.style.transform = `translateX(${
        transformed + moved
      }px)`;
    }
  };

  const gestureEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!thumbnailsRef.current) return;

    const target = e.target as HTMLElement;

    if (
      target.closest('.modal__carousel-prev-btn, .modal__carousel-next-btn') ||
      screenshotList.length === 1
    )
      return;
    setWillTransition(true);
    setNoDelay(true);
    setDrag(false);
    target.style.cursor = 'grab';

    const movedAfter = getTransformed() - transformed;

    if (movedAfter < -100 && counter < screenshotList.length - 1)
      setCounter((prev) => prev + 1);
    else if (movedAfter > 100 && counter > 0) setCounter((prev) => prev - 1);
    else thumbnailsRef.current.style.transform = translateXByCounter;
  };

  return (
    <>
      <div
        className="modal__thumbnails-wrapper"
        onMouseDown={gestureStart}
        onMouseMove={gestureMove}
        onMouseUp={gestureEnd}
        onTouchStart={gestureStart}
        onTouchMove={gestureMove}
        onTouchEnd={gestureEnd}
      >
        <div
          className={`modal__thumbnails flex${
            willTransition ? ' modal__thumbnails--transition' : ''
          }${noDelay ? ' delay-0' : ''}`}
          ref={thumbnailsRef}
          style={thumbnailsStyles}
        >
          {screenshotList.map((s, index) => (
            <img
              onDragStart={(e) => e.preventDefault()}
              src={s}
              alt="thumbnail"
              key={index}
              ref={(el: HTMLImageElement) => (imagesRef.current[index] = el)}
              onLoad={() => (imagesRef.current[0].style.filter = 'blur(0)')}
            />
          ))}
        </div>
        <div
          className={`flex justify-between modal__carousel-btn-wrapper${
            screenshotList.length === 1 ? ' hidden' : ''
          }`}
        >
          <button
            className="modal__carousel-prev-btn"
            onClick={handlePrevSlide}
          >
            <span
              className={`chevron-left${
                isPrevActive ? ' chevron-left--active' : ''
              }`}
            ></span>
          </button>
          <button
            className="modal__carousel-next-btn"
            onClick={handleNextSlide}
          >
            <span
              className={`chevron-right${
                isNextActive ? ' chevron-right--active' : ''
              }`}
            ></span>
          </button>
        </div>
      </div>

      <ul
        className={`dot-indicators flex justify-center${
          screenshotList.length === 1 ? ' hidden' : ''
        }`}
      >
        {screenshotList.map((s, index) => (
          <li key={index}>
            <button
              className={`dot-indicators__item${
                counter === index ? ' dot-indicators__item--active' : ''
              }`}
              onClick={() => handleDotIndicator(index)}
            ></button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Thumbnails;
