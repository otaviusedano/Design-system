# Regras de Componente para IA - Quota Card (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Quota card` com fidelidade ao design system, hierarquia de informacoes e consistencia visual.

Fonte de referencia:
- Figma `Design System - Topaz`, node `498:11152` (contexto) e componente `494:1362`.
- Implementacao local: `src/stories/QuotaCard.tsx` e `src/stories/quota-card.css`.

## Contrato obrigatorio para IA
- Sempre usar `Quota card` para resumir dados de cota/credito em formato compacto.
- Sempre manter estrutura: titulo + status opcional + lista de valores + bloco de marca/icone.
- Sempre garantir que os valores tenham pares `label` e `value`.
- Sempre preservar legibilidade dos valores monetarios.
- Nunca quebrar layout com truncamento agressivo de informacoes criticas.

## Estrutura obrigatoria
- Container raiz (card) com borda e radius.
- Header:
  - titulo principal,
  - tag de status opcional.
- Body:
  - lista de itens de valor (`label + value`),
  - bloco lateral com icone e marca/logo.

## Especificacao visual base (Figma + DS)

### Card
- Largura base observada: `344px` (com comportamento responsivo no projeto).
- Padding interno: `Spacing/lg` (`16px`).
- Gap vertical entre secoes: `Spacing/base` (`8px`).
- Fundo: superficie secundaria.
- Borda: `1px` em borda primaria.
- Radius base: `8px`.

### Header
- Titulo em destaque:
  - `16px`,
  - `font-weight: 700`,
  - cor highlight.
- Tag status em formato pill:
  - padding horizontal/vertical curto,
  - radius `full`,
  - tipografia pequena semibold.

### Conteudo de valores
- Lista em coluna com espacamento consistente.
- Cada item:
  - label com cor secundaria e peso regular,
  - value com cor primaria e peso semibold.
- Estrutura compatível com `Value display` (horizontal, size pequeno).

### Bloco lateral
- Icone principal com cor highlight.
- Logo/brand abaixo do icone.
- Alinhamento central no desktop.

## Variacoes funcionais observadas
- Com status (ex.: `Cancelada`) e sem status.
- Mudar variante de tag por contexto (`purple`, `sky`, `water`, `gray`, `red`).
- Quantidade variavel de itens no array `values`.

## Tokens mapeados
- `Color/Surface/secondary = #ffffff`
- `Color/Border/primary = #e0dcdc`
- `Color/Text/highlight = #1e1e68`
- `Color/Text/primary = #242424`
- `Color/Text/secondary = #707070`
- `Color/Icon/highlight = #1e1e68`
- `Color/Tag/Surface/red = #f79292`
- `Color/Tag/Text/red = #a80b0b`
- `Spacing/sm = 4`
- `Spacing/base = 8`
- `Spacing/lg = 16`
- `Radius/base = 8`
- `Radius/full = 56`

Regra: priorizar aliases semanticos locais (`--text-highlight`, `--tag-surface-red`, `--surface-secondary`) e usar fallback apenas quando necessario.

## Acessibilidade obrigatoria
- Usar heading semantico para o titulo do card (`h2` ou equivalente contextual).
- Tag de status deve ser texto legivel (nao somente cor).
- Icones decorativos com `aria-hidden="true"`.
- Logo com nome acessivel quando necessario (`aria-label` no container de marca).
- Garantir ordem de leitura: titulo -> status -> valores -> marca.

## Regras de comportamento para geracao automatica
- Em cards de cota, manter valores padronizados no mesmo formato monetario.
- Nao misturar estilos de status no mesmo card sem regra de negocio.
- Em mobile, permitir empilhamento de header/body e reposicionar bloco de marca sem perder leitura.
- Se houver muitos itens, manter densidade consistente sem alterar hierarquia tipografica.
- Nao ocultar status quando ele representar estado de negocio relevante.

## Checklist de aceite
- [ ] Estrutura completa (header, valores, bloco de marca) implementada.
- [ ] Titulo e status renderizados corretamente.
- [ ] Lista `values` respeita padrao `label + value`.
- [ ] Variantes de status aplicam cor de fundo/texto corretas.
- [ ] Tipografia e espacamentos seguem tokens.
- [ ] Acessibilidade minima aplicada (heading, texto, icones decorativos).

## API recomendada
```ts
type QuotaStatusVariant = "purple" | "sky" | "water" | "gray" | "red";

type QuotaCardProps = {
  title: string;
  status?: {
    label: string;
    variant: QuotaStatusVariant;
  };
  values: Array<{
    label: string;
    value: string;
  }>;
  logo?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de criar cards de resumo de cota/credito.
2. Preservar estrutura e hierarquia do Quota card.
3. Aplicar tokens e variantes de status oficiais.
4. Validar o checklist de aceite antes de concluir.
