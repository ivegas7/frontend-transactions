import axios from 'axios';
import { API_URL } from '../config';

// Solicitudes de transacción GET/DELETE/PUT/POST

export const getTransactions = () => axios.get(`${API_URL}/allTransactions`);

export const createTransaction = (transaction) => axios.post(`${API_URL}/create`, transaction);

export const updateTransaction = (id, transaction) => axios.put(`${API_URL}/update/${id}`, transaction);

export const deleteTransaction = (id) => axios.delete(`${API_URL}/delete/${id}`);
