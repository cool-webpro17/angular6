import { Locale } from './locale';

export class Firm {
    firmInstanceId: string;
    approvedDateTime: string;
    mainCategory: string[];
    lc: Locale;
    showFlag: boolean;
}