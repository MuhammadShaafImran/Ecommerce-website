import supabase from '../supabase';

export const createPayment = async (orderId, paymentData) => {
  const { data, error } = await supabase
    .from('payments')
    .insert({
      order_id: orderId,
      amount: paymentData.amount,
      method: paymentData.method,
      status: 'pending',
      transaction_id: paymentData.transactionId
    })
    .select()
    .single();

  if (error) {
    throw new Error('Failed to create payment');
  }

  return data;
};

export const updatePaymentStatus = async (paymentId, status) => {
  const { error } = await supabase
    .from('payments')
    .update({ status })
    .eq('id', paymentId);

  if (error) {
    throw new Error('Failed to update payment status');
  }
};

export const getPaymentsByOrderId = async (orderId) => {
  const { data, error } = await supabase
    .from('payments')
    .select('*')
    .eq('order_id', orderId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Failed to get payments');
  }

  return data;
};

export const validatePayment = async (paymentId) => {
  // Add payment validation logic here
  // This could involve checking with a payment gateway API
  return true;
};
