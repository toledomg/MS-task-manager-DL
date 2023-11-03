import { MailerService } from '@nestjs-modules/mailer';
import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

type NotificationDto = {
  name: string;
  description: string;
  email: string;
  startAt: Date;
  endAt: Date;
  title: string;
};

@Controller()
export class AppController {
  constructor(private mailService: MailerService) {}

  @MessagePattern('tp_task_notification')
  async taskNotification(data: NotificationDto) {
    console.log(`=== MENSAGEM RECEBIDA === ` + JSON.stringify(data));

    const result = await this.mailService.sendMail({
      to: data.email,
      subject: 'Notificação Tarefa',
      from: 'taskmanager@devtoledo.com.br',
      html: `
        <body>
            <h1>Olá ${data.name} </h1>

            <span>Você tem uma tarefa para hoje </span>
            <br/>
            <span>Título: ${data.title}</span>
            <br/>
            <span>Descrição: ${data.description}</span>
            <br/>
            <span>Início: ${data.startAt}</span>
            <br/>
            <span>Fim: ${data.endAt}</span>
        </body>
        
      `,
    });
    console.log(result);
  }
}
