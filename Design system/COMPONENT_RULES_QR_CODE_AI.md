# Regras de Componente para IA - QR-code (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `QR-code` com fidelidade ao design system Topaz, preservando legibilidade do código e comportamento responsivo no container.

Fonte de referencia:
- Figma `Design System - Topaz`, node `786:952` e orientacao de largura (node `786:952` / referência de uso `786:1924`).
- Implementacao local: `src/stories/QRCode.tsx` e `src/stories/qr-code.css`.

## Contrato obrigatorio para IA
- Sempre renderizar o QR Code dentro de um container visual do DS.
- Sempre manter a largura do container fluida (nao fixa).
- Sempre centralizar o QR Code no container.
- Sempre manter `alt` descritivo na imagem.
- Nunca esticar/comprimir o QR a ponto de comprometer leitura.

## Regra critica de layout (Figma)
- **Nunca deixe a largura fixa ao container.**
- **Sempre deixe a largura no maximo do container disponível.**
- Implementacao pratica:
  - container com largura adaptativa (`width: min(1200px, 100%)` ou equivalente),
  - QR centralizado dentro desse espaço,
  - padding interno para respiro visual.

## Estrutura obrigatoria
- Container principal (`div`) com estilo de card leve.
- Elemento de imagem (`img`) para o QR.
- Prop de acessibilidade para texto alternativo (`alt`).

## Especificacao visual (Figma + codigo local)

### Container
- Fundo claro (`surface/secondary`).
- Borda 1px (`border/primary`).
- Canto arredondado (`radius/base`).
- Padding horizontal e vertical (`16px`/`24px` no padrão local).
- Conteúdo centralizado (horizontal e verticalmente).

### QR image
- Tamanho base local: `300x300`.
- `object-fit: cover` no código local.
- Canto arredondado (`8px`) no padrão atual.
- Deve permanecer nítido e com contraste adequado.

## Variacoes e estados
- Variação principal: default (somente QR em container).
- Ajuste por contexto de tela:
  - container mais estreito ou mais largo, sem quebrar a regra de largura fluida.
- Estado interativo não obrigatório por padrão.

## Tokens mapeados
- `Color/Surface/secondary = #ffffff`
- `Color/Border/primary = #e0dcdc`
- `Color/Border/secondary = #9c9d9f`
- `Spacing/lg = 16`
- `Spacing/xl = 24`
- `Radius/base = 8`

Observacao: o Figma inclui diretriz visual adicional de erro/acerto com cores de apoio (`Text/negative`, `Text/positive`) para explicar boas praticas de uso, nao como estilo obrigatório do componente base.

## Acessibilidade obrigatoria
- `img` deve ter `alt` significativo (ex.: `QR Code Topaz`).
- Se houver texto adjacente com instrucoes de uso, manter leitura clara.
- Nao usar QR como unica via de acesso sem alternativa textual em fluxos criticos.

## Regras de comportamento para geracao automatica
- O componente deve adaptar largura ao container pai sem hardcode de largura fixa externa.
- O QR deve permanecer centralizado em qualquer viewport.
- Se for necessário trocar o asset, manter proporcao quadrada e nitidez.
- Evitar filtros/efeitos visuais que possam prejudicar a leitura por scanner.

## Checklist de aceite
- [ ] Container com largura fluida e maximo responsivo.
- [ ] QR centralizado e com proporcao quadrada.
- [ ] `alt` configurado corretamente.
- [ ] Borda, raio e fundo conforme tokens.
- [ ] Sem distorcao visual do QR.

## API recomendada
```ts
type QRCodeProps = {
  className?: string;
  alt?: string;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Aplicar a regra de largura fluida do container como prioridade.
2. Manter QR centralizado e legivel.
3. Preservar tokens e estilo base do Topaz.
4. Validar o checklist antes da entrega.
