# Regras de Componente para IA - Tabs (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Tabs` com fidelidade ao design system, navegacao clara entre seções e acessibilidade.

Fonte de referencia:
- Figma `Design System - Topaz`, node `557:10779` (contexto) e instancias de Tabs (ex.: `563:8105`, `563:8211`, `563:8782`).
- Implementacao local: `src/stories/Tabs.tsx` e `src/stories/Tabs.css`.

## Contrato obrigatorio para IA
- Sempre usar `Tabs` para alternar entre conteúdos relacionados no mesmo contexto.
- Sempre manter apenas uma aba ativa por vez.
- Sempre refletir estado ativo com estilo visual evidente.
- Sempre preservar estrutura semantica de tablist/tab.
- Nunca usar tabs para navegação não relacionada (usar menu/rotas quando apropriado).

## Estrutura obrigatoria
- Container raiz.
- Lista de abas (`tablist`).
- Cada aba (`tab`) com:
  - ícone opcional,
  - label textual,
  - badge opcional.
- Indicador visual da aba ativa (underline/border inferior).
- Painel associado (quando aplicável no contexto de tela).

## Especificacao visual base (Figma + DS)

### Trilho / base
- Linha de base inferior em borda secundaria.
- Espaçamento horizontal entre abas.

### Aba ativa
- Cor de texto e ícone em highlight.
- Peso tipografico maior (semibold).
- Indicador inferior (linha/borda highlight).

### Aba inativa
- Cor de texto e ícone secundária.
- Peso tipografico regular/normal.
- Sem indicador ativo.

### Medidas e espaçamentos observados
- Padding horizontal de aba: `Spacing/lg` (`16px`).
- Padding vertical de aba: `Spacing/base` (`8px`).
- Gap interno ícone-label: `Spacing/base` (`8px`).
- Tipografia de label: `14px` (varia por size no código local).

## Variacoes implementadas no projeto
- `size`: `sm` | `md` | `lg`.
- Itens com ícone opcional.
- Itens com badge opcional.
- Valor ativo controlado (`value`) ou não-controlado (`defaultValue`).

## Tokens mapeados
- `Color/Border/primary = #e0dcdc`
- `Color/Border/secondary = #9c9d9f`
- `Color/Border/highlight = #1e1e68`
- `Color/Icon/highlight = #1e1e68`
- `Color/Icon/secondary = #9c9d9f`
- `Color/Text/highlight = #1e1e68`
- `Color/Text/secondary = #707070`
- `Color/Surface/primary = #f5f6f9` (contexto)
- `Spacing/base = 8`
- `Spacing/lg = 16`

Regra: priorizar aliases semanticos locais (`--text-highlight`, `--border-secondary`, `--surface-highlight`) e manter valores fixos apenas como fallback.

## Acessibilidade obrigatoria
- Lista com `role="tablist"`.
- Cada aba com `role="tab"`.
- Estado ativo via `aria-selected`.
- Associação com painel via `aria-controls` e `id` correspondente no painel.
- Navegação por teclado recomendada:
  - setas esquerda/direita para trocar foco entre tabs,
  - Enter/Space para ativar.
- Foco visivel obrigatorio (`:focus-visible`).

## Regras de comportamento para geracao automatica
- Ao clicar em uma aba, atualizar estado ativo imediatamente.
- Em modo controlado, delegar atualização para `onValueChange`.
- Em modo não-controlado, manter estado interno consistente.
- Não renderizar tabs vazias (sem label).
- Quando houver ícone, manter alinhamento vertical com label.

## Checklist de aceite
- [ ] Estrutura semântica `tablist/tab` implementada.
- [ ] Apenas uma aba ativa por vez.
- [ ] Estilo ativo/inativo aplicado corretamente.
- [ ] Associação tab/painel consistente (quando houver painel).
- [ ] Navegação por teclado e foco visível funcionando.
- [ ] Tokens do DS aplicados.

## API recomendada
```ts
type TabsSize = "sm" | "md" | "lg";

type TabItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
};

type TabsProps = {
  id?: string;
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  size?: TabsSize;
  onValueChange?: (value: string) => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de criar navegação por abas.
2. Implementar Tabs com estado ativo claro e semântica correta.
3. Aplicar tokens oficiais para borda, texto e ícones.
4. Validar o checklist de aceite antes de concluir.
