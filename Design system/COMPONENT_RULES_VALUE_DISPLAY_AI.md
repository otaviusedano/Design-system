# Regras de Componente para IA - Value Display (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Value display` com fidelidade ao design system, clareza de leitura e consistencia de hierarquia tipografica.

Fonte de referencia:
- Figma `Design System - Topaz`, node `472:6363` (contexto) e componente `472:8081`.
- Implementacao local: `src/stories/ValueDisplay.tsx` e `src/stories/value-display.css`.

## Contrato obrigatorio para IA
- Sempre usar `Value display` para apresentar pares `label` + `value`.
- Sempre garantir contraste hierarquico entre rotulo (secundario) e valor (primario).
- Sempre manter unidade visual entre variantes de tamanho e layout.
- Nunca inverter sem motivo semantico (valor como secundario e label como primario).
- Nunca quebrar formatação monetaria/numérica do valor quando aplicavel.

## Estrutura obrigatoria
- Container raiz do componente.
- Bloco de conteudo com:
  - `label` (descricao do dado),
  - `value` (dado principal).
- Icone opcional (prefixo) quando o contexto exigir.

## Especificacao visual base (Figma + DS)

### Layouts observados
- `horizontal`:
  - label e value na mesma linha,
  - suporte a icone antes do label,
  - espacamento maior nas variantes `md`/`lg`.
- `vertical`:
  - label acima de value,
  - espacamento curto entre linhas (`Spacing/sm`).

### Tamanhos observados
- `sm`:
  - textos menores,
  - boa densidade para contextos compactos.
- `md`:
  - equilibrio entre leitura e densidade (padrao).
- `lg`:
  - maior destaque no valor principal.

### Tipografia e hierarquia
- `label`:
  - cor secundaria,
  - peso regular.
- `value`:
  - cor primaria,
  - peso semibold/bold (mais destaque).
- Em `horizontal`, o `value` tende a ser visualmente mais forte e imediato.
- Em `vertical`, primeiro contexto (label), depois destaque (value).

## Variacoes implementadas no projeto
- `layout`: `inline` | `stacked`.
- `size`: `small` | `medium` | `large`.
- `icon`: opcional.

Mapeamento semantico:
- `inline` ~ `horizontal` (Figma).
- `stacked` ~ `vertical` (Figma).
- `small/medium/large` ~ `sm/md/lg`.

## Tokens mapeados
- `Color/Text/secondary = #707070`
- `Color/Text/primary = #242424`
- `Spacing/base = 8`
- `Spacing/lg = 16`
- `Spacing/sm = 4`

Regra: priorizar tokens semanticos locais (`--text-primary`, `--text-secondary`, `--spacing-*`) e usar valores fixos apenas como fallback.

## Acessibilidade obrigatoria
- `label` e `value` devem estar em texto real (nao imagem).
- Quando houver icone decorativo, marcar como decorativo (`aria-hidden="true"`).
- Evitar abreviacoes ambíguas no label (texto autoexplicativo).
- Em contextos financeiros sensiveis, manter formatacao local (`R$`, separadores, casas decimais).

## Regras de comportamento para geracao automatica
- Para dashboards/listas, usar `inline` quando economia de espaco for prioridade.
- Para cards/detalhes, usar `stacked` quando legibilidade for prioridade.
- Nao truncar valores monetarios importantes sem estrategia de fallback.
- Em multiplos `Value display` na mesma tela, padronizar tamanho/layout no mesmo bloco.
- Se houver icone, ele deve reforcar contexto e nao competir visualmente com o valor.

## Checklist de aceite
- [ ] Estrutura `label + value` aplicada corretamente.
- [ ] Hierarquia visual entre label e valor respeitada.
- [ ] Variacoes `inline/stacked` funcionando.
- [ ] Variacoes `small/medium/large` funcionando.
- [ ] Icone opcional alinhado e sem ruido visual.
- [ ] Tokens do DS utilizados.

## API recomendada
```ts
type ValueDisplayLayout = "inline" | "stacked";
type ValueDisplaySize = "small" | "medium" | "large";

type ValueDisplayProps = {
  label: string;
  value: string;
  icon?: React.ReactNode;
  layout?: ValueDisplayLayout;
  size?: ValueDisplaySize;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de apresentar valores de negocio.
2. Aplicar hierarquia correta entre label e value.
3. Escolher layout/tamanho conforme densidade e contexto da tela.
4. Validar o checklist de aceite antes de concluir.
