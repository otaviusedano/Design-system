# Regras de Componente para IA - Summary Card (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Summary card` com fidelidade ao design system, clareza de leitura de valores e consistencia semantica.

Fonte de referencia:
- Figma `Design System - Topaz`, node `501:11366` (contexto) e instancias `Summary card` (ex.: `505:3693`, `505:3734`, `505:4234`).
- Implementacao local: `src/stories/SummaryCard.tsx` e `src/stories/summary-card.css`.

## Contrato obrigatorio para IA
- Sempre usar `Summary card` para consolidar valores de um resumo financeiro/operacional.
- Sempre manter estrutura com titulo, lista de itens, divisor e resultado final (total).
- Sempre destacar o `total` em relacao aos itens intermediarios.
- Sempre sinalizar valores negativos com tratamento visual apropriado.
- Nunca remover divisor entre itens e total quando houver subtotalizacao.

## Estrutura obrigatoria
- Container principal (card).
- Header com titulo.
- Corpo com:
  - lista de itens (`label` + `value`),
  - divisor horizontal,
  - bloco final de resultado (`totalLabel` + `totalValue`).

## Especificacao visual base (Figma + DS)

### Card
- Fundo: `Color/Surface/secondary`.
- Borda: `1px` em `Color/Border/primary`.
- Radius base: `8px`.
- Padding interno: `Spacing/lg` (`16px`).
- Gap vertical entre secoes: `Spacing/md` (`12px`).

### Titulo
- Cor: `Color/Text/highlight`.
- Peso forte (`bold`).
- Tamanho de referencia observado: `14px` no Figma da instancia.

### Itens de resumo
- Cada linha com `label` (esquerda) e `value` (direita).
- `label`:
  - cor secundaria,
  - peso regular.
- `value`:
  - cor primaria,
  - peso semibold.
- Espacamento horizontal entre label e value: `Spacing/lg`.
- Altura/ritmo visual coerente para leitura em lista.

### Valor negativo
- Quando `isNegative=true`, usar cor negativa para o `value`.
- Nao depender apenas de sinal grafico; manter semantica no dado.

### Divider e total
- Divider fino entre lista e resultado.
- Linha final `Total` com mesmo grid de alinhamento dos itens.
- `totalValue` com destaque visual (peso maior ou maior contraste que itens).

## Variacoes funcionais observadas
- Lista com quantidade variavel de itens.
- Presenca de item negativo no meio da lista.
- Label de total customizavel (`Total:`, `Saldo:` etc.).

## Tokens mapeados
- `Color/Surface/secondary = #ffffff`
- `Color/Border/primary = #e0dcdc`
- `Color/Text/highlight = #1e1e68`
- `Color/Text/secondary = #707070`
- `Color/Text/primary = #242424`
- `Color/Text/negative = #f01010`
- `Spacing/base = 8`
- `Spacing/md = 12`
- `Spacing/lg = 16`

Regra: priorizar aliases semanticos locais (`--text-highlight`, `--border-primary`, etc.) e manter hex apenas como fallback.

## Acessibilidade obrigatoria
- Usar heading semantico no titulo (`h2` ou contexto equivalente).
- Itens devem ser texto real (nao imagem).
- Garantir leitura linear: titulo -> itens -> total.
- Em valores monetarios, manter formatacao local consistente (`R$`, separadores e casas decimais).

## Regras de comportamento para geracao automatica
- Nao truncar `totalValue` sem fallback visual.
- Manter alinhamento das colunas de label/value em todas as linhas.
- Em dados negativos, aplicar `isNegative` no item correspondente.
- Se houver muitos itens, manter densidade consistente sem alterar hierarquia tipografica.
- Nao misturar estilos de card que comprometam comparabilidade entre cards de resumo.

## Checklist de aceite
- [ ] Estrutura completa (titulo, itens, divider, total) implementada.
- [ ] Itens renderizam `label + value` com alinhamento consistente.
- [ ] Valor negativo usa estilo de erro/negativo.
- [ ] `totalValue` possui destaque em relacao aos itens.
- [ ] Tokens do DS aplicados.
- [ ] Semantica e leitura acessivel preservadas.

## API recomendada
```ts
type SummaryItem = {
  label: string;
  value: string;
  isNegative?: boolean;
};

type SummaryCardProps = {
  title: string;
  items: SummaryItem[];
  totalLabel?: string;
  totalValue: string;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de criar cards de consolidacao.
2. Preservar estrutura de resumo e hierarquia de destaque do total.
3. Aplicar corretamente regra de valor negativo e tokens oficiais.
4. Validar o checklist de aceite antes de concluir.
