import { useShowcase } from "../store/useShowcase";

export const useToggleReactionsActivated = () => {
  const { toggleReactionsActivated } = useShowcase();

  const toggle = () => {
    toggleReactionsActivated();
    const timer = setTimeout(() => {
      toggleReactionsActivated();
      clearTimeout(timer);
    }, 1000);
  };
  return toggle;
};
