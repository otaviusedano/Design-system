# Regras de Componente para IA - Breadcrumbs (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Breadcrumbs` com fidelidade ao design system Topaz, garantindo contexto de navegacao, legibilidade e consistencia semantica.

Fonte de referencia:
- Figma `Design System - Topaz`, node `742:5540` (contexto) e instancias de breadcrumbs (ex.: `744:11148`, `744:11186`).
- Implementacao local: `src/stories/Breadcrumbs.tsx` e `src/stories/breadcrumbs.css`.

## Contrato obrigatorio para IA
- Sempre usar `Breadcrumbs` para representar hierarquia de navegacao da pagina atual.
- Sempre marcar apenas o ultimo item como pagina atual.
- Sempre manter separador visual entre os niveis.
- Sempre renderizar texto de trilha em linha e titulo/contexto abaixo quando houver.
- Nunca tornar o ultimo item clicavel.

## Estrutura obrigatoria
- Container principal.
- Bloco de navegacao com:
  - `<nav aria-label="Breadcrumb">`
  - `<ol>` com itens na ordem hierarquica.
- Cada item com:
  - label textual obrigatoria,
  - link (`<a>`) ou botao (`<button>`) para itens navegaveis,
  - `span` para item atual com `aria-current="page"`.
- Separador entre itens (`chevron-right` por padrao).
- Titulo da pagina atual opcional abaixo da trilha.

## Especificacao visual (Figma + codigo local)

### Trilha de breadcrumb
- Layout horizontal com `gap` uniforme entre item e separador.
- Texto dos itens navegaveis em tom primario discreto.
- Separador em cor secundaria.
- Hover em itens navegaveis com realce de cor e sublinhado.

### Item atual
- Nao clicavel.
- Peso/contraste maior em relacao aos itens anteriores.
- Sem efeito de hover.

### Titulo (abaixo da trilha)
- Exibir a pagina/etapa atual com destaque.
- Tipografia bold em destaque (`text/highlight`), conforme padrao local.

## Variacoes e estados
- Variação por quantidade de itens:
  - curta (2-4 itens),
  - longa (mais de 4 itens).
- Em trilha longa, implementar truncamento do segundo item com `...` e tooltip no hover.
- Item pode ser navegavel por `href` ou por `onClick`.
- Separador customizavel via prop, com fallback para chevron.

## Tokens mapeados
- `Color/Text/primary = #242424`
- `Color/Icon/secondary = #9c9d9f`
- `Color/Text/highlight = #1e1e68`
- `Spacing/Spacing-8 = 8`
- `Spacing/Spacing-16 = 16`

Regra: preferir aliases semanticos locais para texto, icone e destaque; usar hex apenas como fallback.

## Acessibilidade obrigatoria
- Usar `<nav aria-label="Breadcrumb">` para semantica de navegacao contextual.
- Estruturar trilha com lista ordenada (`<ol>` e `<li>`).
- Ultimo item com `aria-current="page"`.
- Separadores com `aria-hidden="true"`.
- Elementos clicaveis com foco visivel por teclado.
- Evitar links vazios; se nao houver `href`, usar botao com acao explicita.

## Regras de comportamento para geracao automatica
- Se item tiver `href`, renderizar link; se tiver apenas `onClick`, renderizar botao.
- Se houver `href` e `onClick` simultaneamente, permitir `onClick` com `preventDefault` quando necessario.
- O ultimo item deve ser sempre texto estatico (nao interativo).
- Em listas longas (>4), manter:
  - primeiro item visivel,
  - item truncado (`...`) com tooltip do item ocultado,
  - itens finais visiveis (incluindo o ultimo).
- O titulo abaixo deve refletir o label do item atual.

## Checklist de aceite
- [ ] Estrutura semantica `nav > ol > li` aplicada.
- [ ] Ultimo item com `aria-current="page"` e sem clique.
- [ ] Separadores entre itens com `aria-hidden`.
- [ ] Hover/foco apenas em itens navegaveis.
- [ ] Truncamento para trilhas longas funcionando.
- [ ] Titulo final consistente com item atual.
- [ ] Tokens do design system aplicados.

## API recomendada
```ts
type BreadcrumbItem = {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Construir a trilha de breadcrumb com semantica e ordem corretas.
2. Garantir item atual nao interativo e destacado.
3. Aplicar truncamento para caminhos longos sem perder contexto.
4. Validar o checklist antes de concluir.
