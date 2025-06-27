// hooks/useLocalStorage.ts - Hook personalizado para gerenciar localStorage
// Permite salvar e recuperar dados do localStorage com TypeScript

import { useState } from 'react';

/**
 * Hook personalizado para gerenciar dados no localStorage
 * 
 * @param key - Chave para armazenar no localStorage
 * @param initialValue - Valor inicial se não existir no localStorage
 * @returns [value, setValue] - Valor atual e função para atualizar
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  // Estado para armazenar o valor
  // Inicializa com o valor do localStorage ou valor inicial
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Tenta buscar o item do localStorage
      const item = window.localStorage.getItem(key);
      
      // Retorna o valor parseado ou o valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Se houver erro, retorna o valor inicial
      console.error(`Erro ao ler localStorage para a chave "${key}":`, error);
      return initialValue;
    }
  });

  /**
   * Função para atualizar o valor
   * Aceita um valor direto ou uma função que recebe o valor anterior
   */
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permite que o valor seja uma função para atualização baseada no estado anterior
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Atualiza o estado
      setStoredValue(valueToStore);
      
      // Salva no localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // Log do erro se a operação falhar
      console.error(`Erro ao salvar no localStorage para a chave "${key}":`, error);
    }
  };

  return [storedValue, setValue] as const;
}
