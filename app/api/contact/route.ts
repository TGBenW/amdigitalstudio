import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

type Language = "en" | "ru" | "lv";

const messages: Record<
  Language,
  {
    nameShort: string;
    emailInvalid: string;
    messageShort: string;
    fileType: string;
    fileSize: string;
    invalidAttachment: string;
    unavailable: string;
    deliveryFailed: string;
    unexpected: string;
  }
> = {
  en: {
    nameShort: "Name must be at least 2 characters.",
    emailInvalid: "Please enter a valid email.",
    messageShort: "Message must be at least 10 characters.",
    fileType: "File type not supported. Use JPG, PNG, GIF, WebP, PDF, or DOC.",
    fileSize: "File is too large. Maximum size is 10MB.",
    invalidAttachment: "Invalid attachment payload.",
    unavailable: "Contact form is temporarily unavailable. Please email andreymanuilovweb@gmail.com.",
    deliveryFailed: "Unable to deliver your message right now. Please try again shortly.",
    unexpected: "Unexpected server error. Please try again.",
  },
  ru: {
    nameShort: "Имя должно содержать минимум 2 символа.",
    emailInvalid: "Введите корректный email.",
    messageShort: "Сообщение должно содержать минимум 10 символов.",
    fileType: "Неподдерживаемый тип файла. Используйте JPG, PNG, GIF, WebP, PDF или DOC.",
    fileSize: "Файл слишком большой. Максимальный размер — 10MB.",
    invalidAttachment: "Некорректный формат вложения.",
    unavailable: "Форма временно недоступна. Напишите на andreymanuilovweb@gmail.com.",
    deliveryFailed: "Сейчас не удалось доставить сообщение. Пожалуйста, попробуйте чуть позже.",
    unexpected: "Непредвиденная ошибка сервера. Пожалуйста, попробуйте снова.",
  },
  lv: {
    nameShort: "Vārdam jābūt vismaz 2 rakstzīmēm.",
    emailInvalid: "Lūdzu, ievadiet korektu e-pastu.",
    messageShort: "Ziņai jābūt vismaz 10 rakstzīmēm.",
    fileType: "Fails nav atbalstīts. Izmantojiet JPG, PNG, GIF, WebP, PDF vai DOC.",
    fileSize: "Fails ir pārāk liels. Maksimālais izmērs ir 10MB.",
    invalidAttachment: "Nekorekts pielikuma formāts.",
    unavailable: "Forma īslaicīgi nav pieejama. Rakstiet uz andreymanuilovweb@gmail.com.",
    deliveryFailed: "Ziņu šobrīd neizdevās piegādāt. Lūdzu, mēģiniet vēlreiz vēlāk.",
    unexpected: "Neplānota servera kļūda. Lūdzu, mēģiniet vēlreiz.",
  },
};

function getLanguage(value: FormDataEntryValue | null): Language {
  if (value === "ru" || value === "lv" || value === "en") {
    return value;
  }
  return "en";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const message = String(formData.get("message") ?? "").trim();
    const fileField = formData.get("file");
    const lang = getLanguage(formData.get("lang"));
    const m = messages[lang];

    if (name.length < 2) {
      return NextResponse.json({ error: m.nameShort }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: m.emailInvalid }, { status: 400 });
    }

    if (message.length < 10) {
      return NextResponse.json({ error: m.messageShort }, { status: 400 });
    }

    let attachment:
      | {
          fileName: string;
          fileType: string;
          fileSize: number;
        }
      | null = null;

    if (fileField instanceof File) {
      if (!ALLOWED_TYPES.has(fileField.type)) {
        return NextResponse.json({ error: m.fileType }, { status: 400 });
      }

      if (fileField.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: m.fileSize }, { status: 400 });
      }

      attachment = {
        fileName: fileField.name,
        fileType: fileField.type,
        fileSize: fileField.size,
      };
    } else if (fileField !== null) {
      return NextResponse.json({ error: m.invalidAttachment }, { status: 400 });
    }

    const payload = {
      name,
      email,
      message,
      attachment,
      submittedAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json({ error: m.unavailable }, { status: 503 });
    }

    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!webhookResponse.ok) {
      return NextResponse.json({ error: m.deliveryFailed }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: messages.en.unexpected }, { status: 500 });
  }
}
