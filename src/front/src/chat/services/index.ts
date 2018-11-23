import { ChatService } from './chat/chat.service';
import { ChatUtilsService } from './chat-utils/chat-utils.service';

export const services = [
    ChatService,
    ChatUtilsService
];

export * from './chat/chat.service';
export * from './chat-utils/chat-utils.service';
