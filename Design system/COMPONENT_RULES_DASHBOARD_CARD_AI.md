# Regras de Componente para IA - Dashboard card (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Dashboard card` com fidelidade ao design system Topaz, preservando hierarquia de informacao para indicadores e métricas.

Fonte de referencia:
- Figma `Design System - Topaz`, node `751:7377` (contexto) e instancias de `Dashboard card` (ex.: `751:33765`, `751:33826`).
- Implementacao local: `src/stories/DashboardCard.tsx` e `src/stories/dashboard-card.css`.

## Contrato obrigatorio para IA
- Sempre usar `Dashboard card` para exibir indicador resumido (valor principal + contexto).
- Sempre manter destaque visual no valor principal.
- Sempre renderizar título/contexto abaixo do valor.
- Sempre manter ícone no cabeçalho alinhado ao valor.
- Sempre usar tag de variação (trend) apenas quando houver dado de tendência.

## Estrutura obrigatoria
- Container de card (`article` recomendado).
- Header com:
  - valor principal,
  - ícone.
- Footer com:
  - título do indicador,
  - tag opcional de tendência (`Tag`).
- Estado clicável opcional via `onClick`.

## Especificacao visual (Figma + codigo local)

### Card
- Fundo claro (`surface/secondary`).
- Borda 1px (`border/primary`).
- Cantos arredondados (`radius/base`).
- Padding interno médio/grande.
- Layout em coluna com espaçamento vertical entre header e footer.

### Valor e ícone
- Valor principal com peso forte e alta hierarquia.
- Cor do valor em `text/highlight`.
- Ícone em `icon/highlight`.
- Alinhamento horizontal com distribuição entre extremidades.

### Rodape (titulo + tag)
- Título em cor secundária para contraste hierárquico.
- Tag opcional ao lado do título, geralmente indicando variação (%).
- Tag com pill radius e contraste por variante.

### Interacao opcional
- Quando clicável, exibir cursor pointer.
- Hover opcional com leve elevação/sombra e ajuste de borda.

## Variacoes e estados
- Sem tendência (`trend` ausente).
- Com tendência (`trend.value` presente).
- Variações de `trend.variant`:
  - `purple`, `sky`, `water`, `gray`, `red`.
- Estado clicável (com `onClick`) e não clicável.

## Tokens mapeados
- `Color/Surface/secondary = #ffffff`
- `Color/Border/primary = #e0dcdc`
- `Color/Text/highlight = #1e1e68`
- `Color/Icon/highlight = #1e1e68`
- `Color/Text/secondary = #707070`
- `Color/Tag/Surface/red = #f79292`
- `Color/Tag/Text/red = #a80b0b`
- `Spacing/sm = 4`
- `Spacing/base = 8`
- `Spacing/md = 12`
- `Spacing/lg = 16`
- `Radius/base = 8`
- `Radius/full = 56`

Regra: priorizar tokens semanticos locais do projeto e usar valores hex apenas como fallback.

## Acessibilidade obrigatoria
- Usar texto real para `value` e `title` (nao imagem).
- Se o card for clicavel:
  - usar elemento interativo apropriado ou suporte de teclado,
  - garantir foco visivel.
- Ícone decorativo pode usar `aria-hidden="true"`.
- Se o card representar ação de navegação, o nome acessível deve deixar claro o destino/contexto.

## Regras de comportamento para geracao automatica
- `value` deve ser o elemento de maior destaque visual do card.
- `title` deve explicar claramente o significado do valor.
- `trend` so aparece quando existir dado de variação.
- Se `onClick` existir, aplicar affordance visual de clique.
- Manter consistência entre variante da tag e semântica do dado (ex.: negativo em tom de alerta).

## Checklist de aceite
- [ ] Estrutura `header` + `footer` respeitada.
- [ ] Valor principal com maior hierarquia visual.
- [ ] Ícone alinhado e proporcional ao conteúdo.
- [ ] Título legível em tom secundário.
- [ ] Tag de tendência opcional e consistente com variante.
- [ ] Estado clicável implementado somente quando aplicável.
- [ ] Tokens do DS aplicados.

## API recomendada
```ts
type DashboardCardTrendVariant = "purple" | "sky" | "water" | "gray" | "red";

type DashboardCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    variant?: DashboardCardTrendVariant;
  };
  onClick?: () => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Usar `Dashboard card` para destacar KPI com leitura imediata.
2. Manter hierarquia clara entre valor, título e tendência.
3. Aplicar tokens oficiais e variantes corretas de tag.
4. Validar o checklist antes da entrega.
