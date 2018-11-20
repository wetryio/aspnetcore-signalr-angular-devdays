import { AuthService } from './auth.service';
import { QuoteService } from './quote.service';

export const services = [
    AuthService,
    QuoteService
];

export * from './auth.service';
export * from './quote.service';
