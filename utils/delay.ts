export async function delay() {
  const delay = Math.random() * 2000;
  await new Promise<void>((resolve) => setTimeout(resolve, delay));
}
