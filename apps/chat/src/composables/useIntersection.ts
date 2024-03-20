import chatService from "@/services/chat/chat";
import { ref } from "vue";
import websocketService from "@/services/chat/websocket-chat";
import { preventBottomScrolling } from "@/helpers/scroll";

export const useIntersection = (roomId: string, elementSelector: string) => {
  const loading = ref(false);
  const page = ref(2);

  const intersectionBlock = () => {
    const intersectionElement = document.querySelector(
      elementSelector
    ) as HTMLElement;
    if (!intersectionElement) return null;

    const lastMessageTime = websocketService.messages.value.at(-1)?.timestamp;

    const onIntersection = async (entry: any) => {
      if (entry.at(0).isIntersecting) {
        try {
          loading.value = true;

          const data = await chatService.fetchRecentMessages(
            roomId,
            page.value,
            { params: { older_than: lastMessageTime } }
          );

          websocketService.messages.value = [
            ...data.results.reverse(),
            ...websocketService.messages.value,
          ];
          loading.value = false;
          checkIfNextExists(data.next);
          preventBottomScrolling(".vue-recycle-scroller");
        } catch (e: any) {
          throw new Error("Something went wrong");
        }
      }
    };
    const observer: IntersectionObserver = new IntersectionObserver(
      onIntersection,
      {
        root: null,
        threshold: 0.5,
      }
    );
    observer.observe(intersectionElement);

    const checkIfNextExists = (next: string | null) => {
      if (next) {
        page.value += 1;
      } else {
        observer.unobserve(intersectionElement);
      }
    };
  };
  return {
    loading,
    page,
    intersectionBlock,
  };
};
