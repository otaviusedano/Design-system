# Regras de Componente para IA - Category Carousel (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Category Carousel` com fidelidade ao design system, navegacao horizontal eficiente e boa acessibilidade.

Fonte de referencia:
- Figma `Design System - Topaz`, node informado `616:4443` (contexto consultado).
- Implementacao local: `src/stories/CategoryCarousel.tsx`, `src/stories/category-carousel.css` e `src/stories/CategoryCarousel.stories.tsx`.

## Contrato obrigatorio para IA
- Sempre usar `Category Carousel` para selecao rapida de categorias em lista horizontal.
- Sempre renderizar itens como elementos interativos clicaveis.
- Sempre manter estado visual de item selecionado.
- Sempre preservar navegacao horizontal suave quando houver overflow.
- Nunca remover feedback visual de disponibilidade dos botoes de navegacao.

## Estrutura obrigatoria
- Container principal do carrossel.
- Botao de navegacao esquerda (opcional por prop).
- Area scrollavel horizontal com itens.
- Botao de navegacao direita (opcional por prop).
- Cada item de categoria deve conter:
  - icone,
  - label textual.

## Especificacao visual base (implementacao atual)

### Layout geral
- Estrutura em linha com alinhamento central.
- Gap entre elementos: `12px`.
- Largura total: `100%`.

### Container de scroll
- Overflow horizontal habilitado.
- Scrollbar oculta visualmente.
- Scroll suave.
- Conteudo interno com gap consistente entre cards.

### Item de categoria
- Formato card vertical (`icone` sobre `label`).
- Largura minima observada: `100px` (desktop), `80px` (mobile).
- Padding:
  - desktop: `16px 12px`,
  - mobile: `12px 8px`.
- Borda e radius (`8px`) com estado de hover e selecionado.
- Estado selecionado com realce de borda/fundo/sombra.

### Icone e label
- Icone:
  - desktop: `32px`,
  - mobile: `28px`.
- Label:
  - desktop: `14px`,
  - mobile: `12px`,
  - peso semibold,
  - alinhamento central.

### Botoes de navegacao
- Tamanho base: `40x40` (desktop), `36x36` (mobile).
- Estado desabilitado com opacidade reduzida e sem interacao.
- `aria-label` obrigatorio (`Anterior` e `Próximo`).

## Variacoes funcionais observadas
- `showNavigation`:
  - `true`: mostra setas de navegacao.
  - `false`: exibe apenas area scrollavel.
- `selectedId`:
  - define item selecionado.
- `onSelect`:
  - callback ao clicar em uma categoria.

## Tokens e cores
No codigo atual, ha uso predominante de cores hex diretas (`#1a1a6b`, `#e2e8f0`, `#f8fafc`).

Regra para IA:
- Preferir tokens semanticos do projeto quando disponiveis (`text-highlight`, `border-primary`, `surface-secondary`, etc.).
- Manter os valores atuais apenas como fallback quando nao houver token mapeado.

## Acessibilidade obrigatoria
- Itens devem ser `button` reais (ou equivalente semantico) para foco por teclado.
- Botoes de navegacao com `aria-label` claro.
- Estado `disabled` real nos botoes de navegacao indisponiveis.
- Garantir navegacao por Tab em:
  - seta esquerda,
  - itens de categoria,
  - seta direita.
- Nao usar icone sem label textual da categoria.

## Regras de comportamento para geracao automatica
- Atualizar estado selecionado imediatamente ao clique.
- Em overflow, habilitar/desabilitar setas conforme posicao de scroll.
- Scroll por setas deve mover por fração da largura visivel (atual: ~80%).
- Em resize de tela, recalcular scrollabilidade.
- Evitar que o item selecionado fique sem contraste visual.

## Checklist de aceite
- [ ] Estrutura do carrossel com scroll horizontal implementada.
- [ ] Itens renderizam `icone + label`.
- [ ] Estado selecionado aplicado corretamente.
- [ ] Setas de navegacao habilitam/desabilitam conforme scroll.
- [ ] `showNavigation` funciona.
- [ ] Navegacao por teclado e `aria-label` presentes.

## API recomendada
```ts
type CategoryItem = {
  id: string;
  label: string;
  icon: React.ReactNode;
};

type CategoryCarouselProps = {
  categories: CategoryItem[];
  selectedId?: string;
  onSelect?: (categoryId: string) => void;
  showNavigation?: boolean;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de construir seletores horizontais de categoria.
2. Implementar `Category Carousel` com estados visuais completos.
3. Garantir navegacao horizontal acessivel e responsiva.
4. Validar o checklist de aceite antes de concluir.
