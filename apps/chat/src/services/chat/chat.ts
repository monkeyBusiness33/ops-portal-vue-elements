import Api from "@/services";
import { IRoom } from "@/types/rooms.types";

class chatService extends Api {
  async fetchConversations() {
    try {
      const { data }: { data: IRoom[] } = await this.get("chat/conversations/");
      return data;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async fetchConversationDetail(id: string) {
    try {
      const { data }: { data: IRoom } = await this.get(
        `chat/conversations/${id}/`
      );
      return data;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async fetchRecentMessages(id: string, page: number, params?: any) {
    try {
      const { data }: any = await this.get(
        `chat/messages/?conversation=${id}&page=${page}`,
        params
      );
      return data;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async fetchChatMeta() {
    try {
      const { data }: any = await this.get("chat/meta/");
      return data;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async fetchUserSettings() {
    try {
      const { data }: any = await this.get("api/v1/user/settings/");
      return data;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async putUserSettings(user_setting: boolean) {
    try {
      await this.patch("api/v1/user/settings/", user_setting);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async joinConversation(conversation_id: string) {
    try {
      await this.post(`chat/conversations/${conversation_id}/join/`);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async leaveConversation(conversation_id: string) {
    try {
      const { data }: { data: IRoom } = await this.post(
        `chat/conversations/${conversation_id}/leave/`
      );
      return data;
    } catch (e: any) {
      throw new Error(e);
    }
  }

  async deleteConversation(conversation_id: string) {
    try {
      await this.delete(`chat/conversations/${conversation_id}/`);
    } catch (e: any) {
      throw new Error(e);
    }
  }
}

export default new chatService();
