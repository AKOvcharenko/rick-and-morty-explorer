export const elementIsVisibleInViewport = (el: any) => {
  let top = el.offsetTop;
  let left = el.offsetLeft;
  let width = el.offsetWidth;
  let height = el.offsetHeight;

  while (el.offsetParent) {
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return (
    top < window.scrollY + window.innerHeight &&
    left < window.scrollX + window.innerWidth &&
    top + height > window.scrollY &&
    left + width > window.scrollX
  );
};
