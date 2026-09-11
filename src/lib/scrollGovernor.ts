/**
 * Governador de rolagem.
 *
 * As cenas registram aqui quando o seu scrub está ativo (seção fixada na
 * viewport). O hook de rolagem consulta esse estado a cada evento de roda e
 * aperta o limite de delta durante a narrativa: um flick violento deixa de
 * atravessar meio vídeo num único evento, sem tornar o resto da página lenta.
 */

const activeScrubs = new Set<object>()

export const governor = {
  enter(owner: object) {
    activeScrubs.add(owner)
  },
  leave(owner: object) {
    activeScrubs.delete(owner)
  },
  scrubbing() {
    return activeScrubs.size > 0
  },
}
