import { renderSpinningWheel } from './renderSpinningWheel';

const toggleLoadingState = (
  $element,
  shouldShow,
  spinningWheelColor,
  spinningWheelSize
) => {
  if (shouldShow) {
    $element.classList.add('loading');
    const spinningWheel = renderSpinningWheel(
      spinningWheelColor,
      spinningWheelSize
    );
    $element.innerHTML += spinningWheel;
  } else {
    $element.classList.remove('loading');
    const spinningWheel = $element.querySelector('.spinning-wheel-container');
    spinningWheel?.remove();
  }
};

export default toggleLoadingState;
