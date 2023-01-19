import { Injectable } from '@angular/core';
import { Message, MessageService } from 'primeng/api';

@Injectable()
export class AppToastService {
    messageService: MessageService | undefined;

    setMessageService(messageService: MessageService) {
        this.messageService = messageService;
    }

    successToast(message?: Message) {
        if (!this.messageService) {
            return;
        }

        this.messageService.add({
            key: 'app-toast',
            severity: 'success',
            summary: 'Success',
            detail: 'บันทึกข้อมูลสำเร็จแล้ว',
            ...message,
        });
    }

    errorToast(message?: Message) {
        if (!this.messageService) {
            return;
        }

        this.messageService.add({
            key: 'app-toast',
            severity: 'error',
            summary: 'Error',
            detail: 'มีบางอย่างผิดพลาด กรุณาติดต่อเจ้าหน้าที่',
            ...message,
        });
    }
}
