# Regras de Componente para IA - Signature (Topaz Design System)

## Objetivo
Este documento define regras para agentes de IA implementarem `Signature` (Digital Signature) com fidelidade ao design system Topaz, garantindo leitura da assinatura, contexto visual e comportamento responsivo.

Fonte de referencia:
- Figma `Design System - Topaz`, node `786:2180` e instancias de `Digital signature` (ex.: `799:856`, `799:1156`, referência de uso `796:732`).
- Implementacao local: `src/stories/DigitalSignature.tsx` e `src/stories/digital-signature.css`.

## Contrato obrigatorio para IA
- Sempre usar `Signature` em área dedicada para assinatura digital.
- Sempre manter logo institucional no canto inferior direito.
- Sempre centralizar a assinatura no plano principal.
- Sempre preservar a largura fluida do container (nao fixar largura externa).
- Nunca distorcer a imagem da assinatura.

## Regra critica de layout (Figma)
- **Nunca deixe a largura fixa ao container.**
- **Sempre deixe a largura no máximo do container disponível.**
- Aplicacao pratica:
  - container com largura responsiva (ex.: `min(1200px, 100%)`),
  - assinatura centralizada,
  - logo alinhada ao canto inferior direito.

## Estrutura obrigatoria
- Container principal com estilo de superfície.
- Área de assinatura (centro absoluto/visual).
- Logo da marca no canto inferior direito.
- Estados:
  - `default` (pré-assinatura),
  - `signed` (assinatura exibida).

## Especificacao visual (Figma + codigo local)

### Container
- Fundo `surface/secondary`.
- Borda 1px `border/primary`.
- Raio `radius/base`.
- Padding interno horizontal/vertical.
- Conteúdo ancorado para priorizar logo no canto inferior direito.

### Assinatura
- Em `signed`, assinatura no centro da área.
- Dimensão de referência local: `320x138` (aprox.), sem deformação.
- Não deve capturar interação quando for apenas visual.

### Logo
- Logo com dimensão consistente (local: `152x40`).
- Alinhada ao canto inferior direito.

### Estado default
- Exibido como botão clicável para iniciar captura/ação de assinatura.
- Foco visível obrigatório.

## Variacoes e estados
- `default`: apenas logo, aguardando ação.
- `signed`: assinatura + logo.
- Ajuste por largura do container mantendo regra fluida.

## Tokens mapeados
- `Color/Surface/secondary = #ffffff`
- `Color/Border/primary = #e0dcdc`
- `Spacing/md = 12`
- `Spacing/lg = 16`
- `Spacing/xl = 24`
- `Radius/base = 8`

Observacao: o guia visual do Figma usa `Text/negative` e `Text/positive` para ilustrar boas praticas de uso (erro/acerto de largura), nao como estilo obrigatório do componente base.

## Acessibilidade obrigatoria
- Em `default`, usar elemento interativo (`button`) com `aria-label` descritivo.
- Foco visível no estado interativo.
- Imagens decorativas (logo/assinatura) podem usar `alt=""` + `aria-hidden`.
- Se assinatura for conteúdo essencial, fornecer alternativa textual no fluxo quando necessário.

## Regras de comportamento para geracao automatica
- Em `default`, acionar fluxo de assinatura ao clique/teclado.
- Em `signed`, renderizar assinatura central sem deslocar logo.
- Não permitir que assinatura ultrapasse os limites do container.
- Preservar proporção de assinatura e logo com `object-fit: contain`.
- Priorizar responsividade horizontal do container.

## Checklist de aceite
- [ ] Largura fluida aplicada ao container.
- [ ] Estado `default` interativo com foco visível.
- [ ] Estado `signed` com assinatura centralizada.
- [ ] Logo no canto inferior direito.
- [ ] Borda, fundo e raio conforme tokens.
- [ ] Sem distorção visual da assinatura.

## API recomendada
```ts
type SignatureState = "default" | "signed";

type SignatureProps = {
  className?: string;
  state?: SignatureState;
};
```

## Decisao final para geracao por IA
Em qualquer tela gerada automaticamente, o agente deve:
1. Aplicar a regra de largura fluida como prioridade.
2. Manter assinatura central e logo no canto inferior direito.
3. Garantir acessibilidade no estado interativo.
4. Validar o checklist antes da entrega.
