export const createOrder = async ({
  name,
  address,
  phone,
  paymentMethod,
  total,
}) => {
  const res = await fetch("/api/order", {
    method: "POST",
    body: JSON.stringify({
      name: name,
      address: address,
      phone: phone,
      total: parseFloat(total),
      method: paymentMethod,
      status: 1,
    }),
  });

  const id = await res.json();
  return id;
};
