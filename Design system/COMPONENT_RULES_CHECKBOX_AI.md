# Regras de Componente para IA - Checkbox (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Checkbox` com consistencia visual, semantica correta e comportamento acessivel.

Fonte de referencia:
- Figma `Design System - Topaz`, node `326:5941` (com instancias de `Checkbox`, ex.: `330:1403`, `330:1446`).
- Implementacao do projeto em `src/stories/Checkbox.tsx` e `src/stories/checkbox.css`.

## Contrato obrigatorio para IA
- Sempre usar `Checkbox` para selecoes binarias independentes.
- Nunca substituir checkbox por switch/radio sem mudanca de regra de negocio.
- Sempre manter area clicavel com label associada.
- Nunca remover estados visuais de foco, erro e desabilitado.
- Reutilizar componente base com props existentes (`label`, `helperText`, `errorText`, `checked`, `disabled`).

## Estrutura obrigatoria
- Container do checkbox (label clicavel).
- Caixa de selecao (`box`) com marcador.
- `input type="checkbox"` real (nao apenas div estilizada).
- Label textual opcional.
- Helper/error opcional abaixo do label.

## Especificacao visual base (Figma + DS)

### Layout
- Disposicao: inline, alinhamento vertical central.
- Gap entre caixa e texto: token base (projeto usa `10px`; Figma aponta `Spacing/base` para relacoes internas).

### Caixa do checkbox
- Tamanho base observado no projeto: `18x18`.
- Radius pequeno: `4px`.
- Estado `unchecked`:
  - fundo de superficie primaria,
  - borda secundaria.
- Estado `checked`:
  - fundo e borda em cor de pressed/highlight,
  - icone de check com cor invertida.

### Tipografia
- Label principal:
  - peso alto (bold/medium conforme contexto),
  - tamanho legivel de corpo.
- Helper:
  - menor que label,
  - cor secundaria.
- Error helper:
  - cor negativa.

## Estados obrigatorios

### `default` (unchecked)
- Caixa vazia.
- Label em cor primaria.

### `checked`
- Check visivel.
- Fundo da caixa preenchido.

### `hover`
- Realce de borda/fundo sem quebrar contraste.

### `focus`
- Indicador de foco visivel (outline ou ring).

### `error`
- Borda em negativo.
- Mensagem de erro visivel abaixo.
- Em checked+error, manter leitura do check.

### `disabled`
- Sem interacao.
- Cores de texto/caixa reduzidas.
- Cursor e semantica condizentes.

## Tokens mapeados
- `Color/Icon/invert = #ffffff`
- `Color/Icon/secondary = #9c9d9f`
- `Color/Text/primary = #242424`
- `Color/Text/negative = #f01010`
- `Color/Text/positive = #0dd829`
- `Color/Border/secondary = #9c9d9f`
- `Color/Surface/primary = #f5f6f9`
- `Spacing/base = 8`

Regra: priorizar tokens semanticos locais (`--border-secondary`, `--surface-pressed`, `--text-negative`, etc.) e usar hex apenas como fallback.

## Acessibilidade obrigatoria
- Usar `input type="checkbox"` real.
- Associar `label` ao input (wrapper label ou `htmlFor`/`id`).
- Em erro, aplicar `aria-invalid=true` e associar helper por `aria-describedby`.
- Suporte total a teclado:
  - foco por Tab,
  - alternancia por Space.
- Em disabled, usar atributo `disabled`.

## Regras de comportamento para geracao automatica
- Nao esconder helper/error quando existir validacao de formulario.
- Nao usar checkbox para escolha exclusiva (use radio nesse caso).
- Nao perder estado checked em re-render sem razao.
- Em listas de checkboxes, manter alinhamento e espacamento consistentes.

## Checklist de aceite
- [ ] Checkbox renderizado com input real.
- [ ] Label clicavel e vinculada ao input.
- [ ] Estados `default/checked/hover/focus/error/disabled` implementados.
- [ ] Erro exibe helper negativo quando aplicavel.
- [ ] Keyboard e ARIA corretos.
- [ ] Tokens do DS utilizados.

## API recomendada
```ts
type CheckboxProps = {
  label?: string;
  helperText?: string;
  errorText?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de criar selecoes binarias.
2. Renderizar checkbox com semantica nativa e estados completos.
3. Aplicar tokens oficiais para borda/fundo/texto/erro.
4. Validar o checklist de aceite antes de concluir.
