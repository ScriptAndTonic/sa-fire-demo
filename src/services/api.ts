import axios from 'axios';
import type { ExecutionStartResponse, ExecutionStatusResponse, FileData } from '../types/api';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_TOKEN = import.meta.env.VITE_API_TOKEN;
const ACCOUNT_ID = import.meta.env.VITE_ACCOUNT_ID;
const AGENT_ID = import.meta.env.VITE_AGENT_ID;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Authorization': `Bearer ${API_TOKEN}`,
    'Content-Type': 'application/json',
  },
});

export const startExecution = async (userPrompt: string, file?: FileData): Promise<ExecutionStartResponse> => {
  const inputs: { userPrompt: string; file?: FileData; supabaseKey: string; supabaseUrl: string } = {
    userPrompt,
    supabaseKey: SUPABASE_KEY,
    supabaseUrl: SUPABASE_URL,
  };

  if (file) {
    inputs.file = file;
  }

  const response = await apiClient.post(`/${ACCOUNT_ID}/agent/${AGENT_ID}/execute`, {
    inputs,
  });
  return response.data;
};

export const getExecutionStatus = async (executionId: string): Promise<ExecutionStatusResponse> => {
  const response = await apiClient.get(`/${ACCOUNT_ID}/agent/${executionId}/status`);
  return response.data;
};

export const pollExecutionStatus = async (
  executionId: string,
  onUpdate?: (status: string) => void
): Promise<string> => {
  const maxAttempts = 60; // 5 minutes max
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      const statusResponse = await getExecutionStatus(executionId);
      const { execution } = statusResponse;
      
      onUpdate?.(execution.status);
      
      if (execution.status === 'finished') {
        return execution.outputs?.aianswer || 'No response received';
      }
      
      if (execution.status === 'failed') {
        throw new Error('Execution failed');
      }
      
      // Wait 5 seconds before next poll
      await new Promise(resolve => setTimeout(resolve, 5000));
      attempts++;
    } catch (error) {
      console.error('Error polling execution status:', error);
      throw error;
    }
  }
  
  throw new Error('Execution timeout');
};