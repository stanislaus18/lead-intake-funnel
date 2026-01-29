import type { Directive } from 'vue';

interface BetweenOptions {
  min: number;
  max: number;
  errorClass?: string;
}

export const vBetweenError: Directive<HTMLInputElement, BetweenOptions> = {
  mounted(el, binding) {
    const { min, max, errorClass = 'error' } = binding.value;

    const validate = () => {
      const value = Number(el.value);

      if (isNaN(value) || value < min || value > max) {
        el.classList.add(errorClass);
      } else {
        el.classList.remove(errorClass);
      }
    };

    el.addEventListener('input', validate);
    el.addEventListener('blur', validate);
  },
};
