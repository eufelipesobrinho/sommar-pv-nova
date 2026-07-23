/** Cadastro no app Sommar — destino dos CTAs da landing/quiz (não é checkout). */
export const APP_SIGNUP_URL = 'https://app.sommarapp.com.br/cadastro';

const UTM_STORAGE_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'src',
] as const;

/** Persiste UTMs da URL atual no sessionStorage (sobrevive à troca / → /diagnostico). */
export function persistTrafficParams(search?: string): void {
  if (typeof window === 'undefined') return;
  const params = new URLSearchParams(
    search ?? window.location.search,
  );
  UTM_STORAGE_KEYS.forEach((key) => {
    const value = params.get(key);
    if (value) sessionStorage.setItem(key, value);
  });
  // Qualquer outro utm_* presente
  params.forEach((value, key) => {
    if (key.startsWith('utm_') && value) sessionStorage.setItem(key, value);
  });
}

/**
 * Monta a URL de cadastro preservando UTMs da URL atual + sessionStorage.
 * Ex.: /oficial?utm_source=instagram → https://app.sommarapp.com.br/cadastro?utm_source=instagram
 */
export function buildAppSignupUrl(
  searchParams?: string | URLSearchParams | Record<string, string>,
): string {
  const url = new URL(APP_SIGNUP_URL);
  const merged = new URLSearchParams();

  // 1) sessionStorage (funil quiz → diagnóstico)
  if (typeof window !== 'undefined') {
    UTM_STORAGE_KEYS.forEach((key) => {
      const value = sessionStorage.getItem(key);
      if (value) merged.set(key, value);
    });
  }

  // 2) params explícitos ou da URL atual (sobrescrevem storage)
  let params: URLSearchParams;
  if (searchParams instanceof URLSearchParams) {
    params = searchParams;
  } else if (typeof searchParams === 'string') {
    params = new URLSearchParams(
      searchParams.startsWith('?') ? searchParams.slice(1) : searchParams,
    );
  } else if (searchParams && typeof searchParams === 'object') {
    params = new URLSearchParams(searchParams);
  } else if (typeof window !== 'undefined') {
    params = new URLSearchParams(window.location.search);
  } else {
    params = new URLSearchParams();
  }

  params.forEach((value, key) => {
    if (value) merged.set(key, value);
  });

  // Não levar o parâmetro `dor` do diagnóstico para o cadastro
  merged.delete('dor');

  merged.forEach((value, key) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}
