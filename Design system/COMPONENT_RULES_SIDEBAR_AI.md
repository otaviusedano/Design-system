# Regras de Componente para IA - Sidebar (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Sidebar` com fidelidade ao design system Topaz, mantendo hierarquia de navegação, consistência visual e acessibilidade.

Fonte de referencia:
- Figma `Design System - Topaz`, node `728:12363` (contexto) e instancias de Sidebar (ex.: `738:1213`, `738:761`).
- Implementacao local: `src/stories/Sidebar.tsx` e `src/stories/Sidebar.css`.

## Contrato obrigatorio para IA
- Sempre usar `Sidebar` como navegacao lateral principal.
- Sempre manter estrutura em 3 blocos: `header`, `nav`, `footer`.
- Sempre destacar item ativo de forma evidente.
- Sempre usar icones e labels legiveis nos itens.
- Nunca remover semantica de navegacao (`aside` + `nav`).

## Estrutura obrigatoria
- `aside` (container principal da sidebar).
- `header` opcional com:
  - botao voltar opcional,
  - ícone da marca opcional,
  - texto da marca opcional.
- `nav` com lista de itens:
  - item clicavel (botao),
  - ícone opcional,
  - label obrigatoria,
  - seta opcional para itens com submenu/acoes.
- `footer` opcional com:
  - separador,
  - bloco de usuario (avatar, status online opcional, nome),
  - copyright.

## Especificacao visual (Figma + codigo local)

### Container
- Fundo principal em `surface/highlight` (azul escuro do DS).
- Largura fixa desktop no código local (`280px`).
- Estrutura em coluna com distribuicao vertical (`header` e `nav` no topo, `footer` no fim).

### Itens de navegacao
- Altura por item guiada por padding vertical/horizontal.
- Layout horizontal: ícone + label + seta opcional.
- Estado ativo:
  - fundo contrastante (`surface/primary` no Figma; no código local usa overlay claro),
  - ícone e texto em `highlight` quando fundo claro.
- Estado default:
  - fundo da sidebar,
  - ícone e texto em `invert` (branco).
- Estado hover:
  - realce sutil de fundo.
- Estado disabled:
  - opacidade reduzida e sem interacao.

### Footer
- Separador horizontal antes do bloco de usuario.
- Avatar com indicador de online opcional.
- Texto de usuario e copyright em cor invertida.

## Variacoes e estados
- Header:
  - com ou sem botao voltar.
  - com ou sem marca textual/icone.
- Navegacao:
  - item normal,
  - item ativo,
  - item com seta (`hasArrow`),
  - item desabilitado.
- Footer:
  - com usuario + copyright,
  - sem usuario,
  - sem copyright.

## Tokens mapeados
- `Color/Surface/highlight = #1e1e68`
- `Color/Surface/primary = #f5f6f9`
- `Color/Icon/invert = #ffffff`
- `Color/Text/invert = #ffffff`
- `Color/Icon/highlight = #1e1e68`
- `Color/Text/highlight = #1e1e68`
- `Color/Border/primary = #e0dcdc`
- `Spacing/base = 8`
- `Spacing/md = 12`
- `Spacing/lg = 16`
- `Radius/xs = 4`

Regra: preferir tokens semanticos locais; usar valores hex apenas como fallback.

## Acessibilidade obrigatoria
- Container principal como `<aside>`.
- Navegacao com `<nav aria-label="Sidebar navigation">`.
- Itens interativos como `<button type="button">`.
- Item ativo com `aria-current="page"`.
- Botao de voltar com `aria-label` claro (ex.: `Voltar`).
- Estados desabilitados com `disabled` real no elemento interativo.
- Foco visivel obrigatorio para navegacao por teclado.

## Regras de comportamento para geracao automatica
- Clique em item ativo nao deve quebrar navegacao; pode manter estado atual.
- Clique em item desabilitado nao dispara `onSelect`.
- `onSelect(id)` deve receber sempre o `id` do item.
- Quando `hasArrow` for `true`, renderizar indicador visual sem perder alinhamento do label.
- Em layout responsivo, sidebar pode ocupar largura total.

## Checklist de aceite
- [ ] Estrutura `aside > header/nav/footer` respeitada.
- [ ] Item ativo visualmente destacado.
- [ ] Itens desabilitados sem interacao.
- [ ] `aria-current`, `aria-label` e semantica de navegação aplicados.
- [ ] Footer com separador e bloco de usuario consistente (quando presente).
- [ ] Tokens oficiais do DS aplicados.

## API recomendada
```ts
type SidebarItem = {
  id: string;
  label: string;
  icon?: React.ReactNode;
  hasArrow?: boolean;
  disabled?: boolean;
};

type SidebarHeader = {
  onBack?: () => void;
  brandIcon?: React.ReactNode;
  brandText?: string;
};

type SidebarUser = {
  avatar?: React.ReactNode;
  name: string;
  isOnline?: boolean;
};

type SidebarProps = {
  header?: SidebarHeader;
  items: SidebarItem[];
  user?: SidebarUser;
  copyright?: string;
  activeId?: string;
  onSelect?: (id: string) => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Implementar a Sidebar com hierarquia clara de navegacao.
2. Garantir contraste e legibilidade dos itens.
3. Manter estados ativo/hover/disabled coerentes.
4. Validar o checklist antes da entrega.
