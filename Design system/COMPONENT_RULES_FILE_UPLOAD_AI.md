# Regras de Componente para IA - File Upload (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `File Upload` com fidelidade ao design system, semantica correta e acessibilidade.

Fonte de referencia:
- Figma `Design System - Topaz`, nodes `357:1321` (guideline de largura) e `358:438` (estados do componente).
- Subnos observados: `364:1310`, `364:1328`.
- Implementacao local: `src/stories/FileUploader.tsx` e `src/stories/FileUploader.css`.

## Contrato obrigatorio para IA
- Sempre usar `File Upload` para selecao de arquivo (click e/ou drop quando aplicavel).
- Nunca fixar largura do componente; ocupar largura disponivel do container.
- Sempre exibir orientacao de formato/tamanho aceito.
- Sempre contemplar estados `default`, `focus`, `uploaded` e `error`.
- Nunca hardcodar estilos quando existir token equivalente.

## Estrutura obrigatoria
- Container principal com borda tracejada e raio.
- Area de acao central com:
  - icone (`upload`, `check`, `xmark` conforme estado),
  - texto de acao (ex.: `clique para selecionar`),
  - helper/error.
- No estado `uploaded`:
  - nome do arquivo,
  - acao de remover arquivo,
  - mensagem de sucesso.

## Especificacao visual base (Figma + DS)

### Largura e responsividade
- Regra obrigatoria do Figma: nao deixar largura fixa.
- Componente deve esticar ate o maximo do container pai.
- Em layouts com multiplos uploads na mesma linha, dividir espaco de forma fluida.

### Layout interno
- Direcao em coluna com conteudo centralizado.
- Gap vertical principal: `Spacing/lg` (`16px`).
- Gap entre textos: `Spacing/sm` (`4px`).
- Padding interno: `Spacing/xl` (`24px`).
- Borda: `1px dashed` com `border-radius: 8px`.

### Tipografia
- Acao (`clique para selecionar`):
  - `14px`,
  - `font-weight: 700`,
  - sublinhado.
- Helper / sucesso / erro:
  - `12px`,
  - `line-height: 20px`.
- Nome do arquivo (uploaded):
  - `14px`,
  - `font-weight: 500`.

### Iconografia
- Icone principal com destaque visual (aprox. `40px`).
- `default/focus`: `upload`.
- `uploaded`: `check`.
- `error`: `xmark`.

## Estados obrigatorios

### `default`
- Borda secundaria tracejada.
- Icone e texto em cores primarias/secundarias.
- Helper com regra de formato/tamanho (ex.: maximo 25mb, PNG/JPEG).

### `focus`
- Borda solida com token de foco.
- Mantem conteudo do estado default.

### `uploaded`
- Borda de destaque.
- Icone de sucesso.
- Exibir nome do arquivo + controle de remocao.
- Exibir mensagem de sucesso.

### `error`
- Borda negativa.
- Icone negativo.
- Helper substituido por mensagem de erro.

## Tokens mapeados
- `Color/Surface/primary = #f5f6f9`
- `Color/Border/secondary = #9c9d9f`
- `Color/Border/highlight = #1e1e68`
- `Color/Border/negative = #d80e0e`
- `Color/Border/focus = #000000`
- `Color/Icon/primary = #242424`
- `Color/Icon/highlight = #1e1e68`
- `Color/Icon/negative = #f01010`
- `Color/Text/primary = #242424`
- `Color/Text/secondary = #707070`
- `Color/Text/highlight = #1e1e68`
- `Color/Text/negative = #f01010`
- `Spacing/sm = 4`
- `Spacing/lg = 16`
- `Spacing/xl = 24`
- `Number/8 = 8`

Regra: priorizar tokens semanticos locais (`--color-border-secondary`, `--color-text-negative`, etc.), mantendo hex apenas como fallback.

## Acessibilidade obrigatoria
- Usar `input type="file"` real, mesmo quando oculto visualmente.
- Vincular area clicavel ao input (`label` + `htmlFor` ou `aria-controls` equivalente).
- Fornecer nome acessivel para a acao (ex.: "Selecionar arquivo").
- Informar restricoes de arquivo de forma textual visivel (nao apenas visual).
- Botao de remocao no estado `uploaded` deve ser focavel e ter `aria-label`.
- Em erro, associar mensagem ao controle com `aria-describedby` quando aplicavel.

## Regras de comportamento para geracao automatica
- Validar tipo e tamanho de arquivo conforme regra da tela.
- Ao sucesso, trocar para estado `uploaded` imediatamente.
- Ao falha de validacao/upload, trocar para `error` e exibir mensagem clara.
- Permitir reenvio/substituicao de arquivo apos erro ou sucesso.
- Nao bloquear foco de teclado na area de upload ou no botao de remocao.

## Checklist de aceite
- [ ] Componente usa largura fluida (sem largura fixa).
- [ ] Estrutura visual (icone + acao + helper) implementada.
- [ ] Estados `default`, `focus`, `uploaded`, `error` implementados.
- [ ] Estado `uploaded` mostra nome do arquivo e remocao.
- [ ] Erro exibe mensagem negativa e estilo correspondente.
- [ ] Input de arquivo nativo e acessibilidade funcionando.
- [ ] Tokens do DS utilizados.

## API recomendada
```ts
type FileUploaderState = "default" | "focus" | "uploaded" | "error";

type FileUploaderProps = {
  className?: string;
  state?: FileUploaderState;
  actionText?: string;
  helperText?: string;
  errorText?: string;
  fileName?: string;
  successText?: string;
  onRemove?: () => void;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Ler este documento antes de criar fluxos de upload de arquivo.
2. Implementar `File Upload` com largura fluida e estados completos.
3. Aplicar tokens oficiais para borda, icone, texto e espacamento.
4. Validar o checklist de aceite antes de concluir.
