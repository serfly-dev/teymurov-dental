import {
  PrismaClient,
  CallbackTime,
  ContactRequestStatus,
  ContactRequestType,
} from "../../src/generated/prisma/client";

export async function seedRequests(
  prisma: PrismaClient,
  services: {
    caries: { id: string };
    implant: { id: string };
    cleaning: { id: string };
  }
) {
  console.log("Создание заявок...");

  await prisma.contactRequest.createMany({
    data: [
      {
        type: ContactRequestType.APPOINTMENT,

        name: "Алексей Иванов",
        phone: "+7 900 111-22-33",

        callbackTime: CallbackTime.MORNING,

        serviceId: services.caries.id,

        comment:
          "Нужно записаться на лечение кариеса.",

        status: ContactRequestStatus.NEW,
      },

      {
        type: ContactRequestType.APPOINTMENT,

        name: "Елена Смирнова",
        phone: "+7 900 222-33-44",

        callbackTime: CallbackTime.AFTERNOON,

        serviceId: services.implant.id,

        comment:
          "Интересует стоимость имплантации.",

        status: ContactRequestStatus.CALLED,
      },

      {
        type: ContactRequestType.QUESTION,

        name: "Максим Петров",
        phone: "+7 900 333-44-55",

        callbackTime: CallbackTime.ANYTIME,

        comment:
          "Хотел бы получить консультацию врача.",

        status: ContactRequestStatus.COMPLETED,
      },

      {
        type: ContactRequestType.APPOINTMENT,

        name: "Ольга Васильева",
        phone: "+7 900 444-55-66",

        callbackTime: CallbackTime.EVENING,

        serviceId: services.cleaning.id,

        comment:
          "Запись на профессиональную чистку зубов.",

        status: ContactRequestStatus.CANCELED,
      },
    ],
  });

  console.log("Заявки созданы");
}