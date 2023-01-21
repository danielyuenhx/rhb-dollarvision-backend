import supabase from "../../supabaseClient.js";

export const getAllWallets = async (req, res) => {
  const query = supabase.from("wallets").select("*");

  const { data, error } = await query;
  if (error) {
    res.status;
    res.send;
  }

  res.send(data);
};
