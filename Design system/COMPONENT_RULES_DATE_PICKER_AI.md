# Regras de Componente para IA - Date Picker (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem o componente `Date picker` com consistencia visual, semantica correta e comportamento previsivel em telas geradas automaticamente.

Fonte de referencia:
- Figma `Design System - Topaz`, node `195:4723` e subnodes de campo (`195:4745`, `195:4869`, `InputField` correlatos).
- Implementacao do projeto em `src/stories/DatePicker.tsx` e `src/stories/date-picker.css`.

## Contrato obrigatorio para IA
- Sempre usar o componente `Date picker` quando a entrada for data unica ou intervalo.
- Nunca substituir por `Text input` livre sem criterio de negocio.
- Sempre manter mascara/formatacao de data conforme regra do produto.
- Nunca remover o indicador visual de calendario.
- Nunca hardcodar estilos quando houver token equivalente.

## Especificacao visual base do campo

### Estrutura obrigatoria
- `Label` do campo.
- `Field` clicavel/editavel.
- `Value/placeholder` interno.
- `Icon` de calendario.
- `Error text` opcional.
- `Calendar panel` quando aberto.

### Medidas e estilo (Figma + padrao do DS)
- Altura visual de campo no frame: `23px` (escala Figma exportada).
- Borda no estado base: `1px solid #141414` (equivalente no DS: `1px var(--border-primary)`).
- Raio: base visual pequena no Figma (`2px`), padrao componente do DS (`4px`).
- Padding interno observado: `7px` (x) e `5px` (y), com gap interno `5px`.
- Fundo base: branco/superficie primaria.
- Mensagem de erro abaixo do campo, em vermelho.

Regra pratica: na implementacao do produto, priorizar tokens e escala oficial do DS; usar valores crus do export apenas como referencia de fidelidade.

## Estados obrigatorios

### `default`
- Campo fechado.
- Placeholder de data (ex.: `00/00/0000`).
- Icone secundario.

### `focus`
- Campo ativo.
- Calendario aberto.
- Borda de foco visivel.

### `filled`
- Data valida preenchida.
- Calendario pode abrir para edicao.
- Em `range`, duas datas preenchidas.

### `disabled`
- Campo e calendario inativos.
- Sem abertura do painel.
- Contraste reduzido com semantica desabilitada.

### `error`
- Borda de erro.
- Texto de erro abaixo.
- Exemplos observados:
  - `Ocorreu um erro. Tente novamente.`
  - `Campo vazio, preencha e tente novamente.`

## Variacoes
- `Default` (data unica).
- `Range` (intervalo de datas com dois campos).

Regra: nao converter `Default` em `Range` automaticamente. A variacao vem do contexto da tela.

## Regras do calendario (quando aberto)
- Header com navegacao de mes anterior/proximo.
- Titulo de mes/ano.
- Grade semanal fixa (7 colunas).
- Dias fora do mes com estilo diferenciado.
- Dia selecionado com destaque.
- Em `range`, destacar inicio/fim e dias intermediarios.

## Tokens mapeados e diretrizes
- `Color/Text/negative = #f01010`
- `Color/Border/secondary = #9c9d9f`
- `Color/Text/positive = #0dd829`
- `Color/Surface/primary = #f5f6f9`

No componente do projeto, priorizar tokens semanticos do DS (`--border-primary`, `--text-primary`, `--surface-primary`, `--text-negative`, etc.). Hex e fallback.

## Acessibilidade obrigatoria
- Campo com `label` associado.
- Em erro: `aria-invalid=true` e mensagem ligada por `aria-describedby`.
- Painel do calendario com `role="dialog"` e rotulo acessivel.
- Navegacao por teclado:
  - abrir/fechar calendario;
  - navegar dias;
  - selecionar data;
  - fechar com `Esc`.
- Em `disabled`, aplicar semantica `disabled`/`aria-disabled`.

## Regras de comportamento para IA geradora
- Nao inventar formato de data; usar formato do produto/localidade.
- Nao aceitar datas invalidas sem feedback.
- Nao perder valor selecionado ao fechar/reabrir calendario.
- Nao sobrepor calendario em conteudo critico sem ajuste de camada.
- Em formularios, manter alinhamento e largura consistentes com os demais campos.

## Checklist de aceite
- [ ] Componente de data renderizado com label, campo e icone.
- [ ] Estado correto aplicado (`default`, `focus`, `filled`, `disabled`, `error`).
- [ ] Calendario abre e fecha corretamente.
- [ ] Selecao de data funciona (e intervalo quando `Range`).
- [ ] Mensagem de erro aparece com token negativo quando aplicavel.
- [ ] Semantica e acessibilidade estao corretas.
- [ ] Tokens do DS usados no lugar de valores soltos.

## API recomendada (referencia para IA)
```ts
type DatePickerState = 'default' | 'focus' | 'filled' | 'disabled' | 'error';
type DatePickerVariation = 'default' | 'range';

type DatePickerProps = {
  label?: string;
  value?: string;
  startDate?: string;
  endDate?: string;
  variation?: DatePickerVariation;
  state?: DatePickerState;
  errorText?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onRangeChange?: (start: string, end: string) => void;
  onOpenChange?: (open: boolean) => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de montar entradas de data.
2. Selecionar variacao (`default`/`range`) pelo contexto da tarefa.
3. Renderizar campo e calendario com tokens oficiais do DS.
4. Validar checklist de aceite antes de concluir.
