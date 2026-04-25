from app.models.automata_model import AfdModel
from app.utils.logger import get_logger

logger = get_logger(__name__)


def _run_afd(model: AfdModel, cadena: list) -> dict:
    current_state = model.initial
    steps = [{'symbol': None, 'state': current_state}]

    for symbol in cadena:
        current_state = model.transitions.get(current_state, {}).get(symbol, None)
        steps.append({'symbol': symbol, 'state': current_state})
        if current_state is None:
            break

    accepted = current_state in model.accepting if current_state else False
    logger.info(f'AFD cadena={cadena} accepted={accepted}')
    return {
        'input': cadena,
        'accepted': accepted,
        'steps': steps,
        'final_state': current_state,
        'definition': model.to_dict()
    }


def simulate_banking(cadena: list) -> dict:
    # TODO: compañero — AFD Validador Bancario
    # Patrón: AUTORIZACIÓN -> CAPTURA -> LIQUIDACIÓN
    raise NotImplementedError


def simulate_lock(cadena: list) -> dict:
    # TODO: compañero — AFD Cerradura Inteligente
    # Bloqueo tras 3 intentos fallidos
    raise NotImplementedError


def simulate_scientific(cadena: str) -> dict:
    # TODO: compañero — AFD Notación Científica
    # Ej: +3.14e-10, .5e2
    raise NotImplementedError