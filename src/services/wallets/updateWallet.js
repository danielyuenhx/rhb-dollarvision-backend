import supabase from '../../supabaseClient.js';

export const updateWallet = async (req, res) => {
  const walletId = req.params.id;
  const { name, initial_balance, type, isFav } = req.body;

  let params = {};
  if (name) params.name = name;
  if (initial_balance) params.initial_balance = initial_balance;
  if (type) params.type = type;
  if (isFav !== undefined) params.isFav = isFav;

  const { data, error } = await supabase
    .from('wallets')
    .update(params)
    .eq('id', walletId)
    .select(`*`);

  if (error) {
    res.status;
    res.send;
  }

  res.send({ data });
};
