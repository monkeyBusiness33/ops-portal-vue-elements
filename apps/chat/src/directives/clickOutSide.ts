import { DirectiveBinding, ObjectDirective } from "vue";

interface HTMLElementWithClickOutsideEvent extends HTMLElement {
  clickOutsideEvent?: (event: MouseEvent) => void;
}

const clickOutSide: ObjectDirective<HTMLElementWithClickOutsideEvent> = {
  mounted(
    el: HTMLElementWithClickOutsideEvent,
    binding: DirectiveBinding<(event: MouseEvent) => void>
  ) {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(el === event.target || el.contains(event.target as Node))) {
        binding.value(event);
      }
    };
    el.clickOutsideEvent = handleClickOutside;
    document.addEventListener("click", handleClickOutside);
  },
  unmounted(el: HTMLElementWithClickOutsideEvent) {
    document.removeEventListener(
      "click",
      el.clickOutsideEvent as (event: MouseEvent) => void
    );
    el.clickOutsideEvent = undefined;
  },
};

export default clickOutSide;
