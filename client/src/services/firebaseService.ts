export async function saveContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  console.log("Contact message:", data);
}