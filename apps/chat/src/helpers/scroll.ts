/**
 * Change scroll position at bottom of the element
 *
 * @param selector - class selector of element
 */
export const scrollToBottom = (selector: string): void => {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    element.scrollTop = element?.scrollHeight;
  }
};
/**
 * Preventing scrolling to bottom
 * @selector - class selector of message element
 **/
export const preventBottomScrolling = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement;
  if (element) {
    const currentScrollHeight = element.scrollHeight;
    const observer = new ResizeObserver(() => {
      element.scrollTop = element.scrollHeight - currentScrollHeight;
    });
    observer.observe(element);
  }
};
/**
 * Method checked if element message position in bottom of element
 * @selector - class selector of message element
 **/
export const checkIfBottomScroll = (selector: string) => {
  const element = document.querySelector(selector) as HTMLElement;
  const elementBox = document.querySelectorAll(
    ".vue-recycle-scroller__item-view:last-child"
  ) as NodeListOf<HTMLElement>;
  if (element) {
    return (
      Math.abs(
        element.scrollHeight - element.scrollTop - element.clientHeight
      ) <= elementBox[0].clientHeight
    );
  }
  return false;
};
/**
 * Method checked if message is in viewport
 * @id - identification of message element
 **/
export const isInViewport = (id: string) => {
  const messagesBox = document.getElementById(`room-messages`) as HTMLElement;
  const element = document.getElementById(id) as HTMLElement;
  if (element) {
    const rect = element?.getBoundingClientRect();
    return (
      rect?.top >= 0 &&
      rect?.left >= 0 &&
      rect?.bottom <= messagesBox.getBoundingClientRect().bottom &&
      rect?.right <= messagesBox.getBoundingClientRect().right
    );
  }
  return false;
};

/**
 * Method check if element has scrollbar
 * @selector - class selector of message element
 * **/
export const hasScrollBar = (selector: string) => {
  const element = document.querySelector(selector);
  if (element) {
    return element.scrollHeight > element.clientHeight;
  }
  return false;
};
