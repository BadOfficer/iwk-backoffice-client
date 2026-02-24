export async function getOrders() {
  const response = await fetch('/orders.json');

  if (!response.ok) throw new Error('Something went wrong...');

  return response.json();
}
