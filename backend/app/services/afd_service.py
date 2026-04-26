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
    model = AfdModel(
        states=['q0', 'q1', 'q2', 'q3', 'q4'],
        #Autorizar: a, Capturar: b, Liquidar: d, Cancelar: e
        alphabet=['a', 'b', 'd', 'e'],
        transitions={
            'q0':{'a': 'q1', 'e': 'q4'},
            'q1':{'b': 'q2', 'e': 'q4'},
            'q2':{'d': 'q3', 'e': 'q4'},
            'q3':{},
            'q4':{},
        },
        initial='q0',
        accepting=['q3']
    )
    return _run_afd(model, cadena)


def simulate_lock(cadena: list) -> dict:
    model = AfdModel(
        states=['q0', 'q1', 'q2', 'q3', 'q4'],
        #Incorrecta: i, Correcta: c
        alphabet=['c', 'i'],
        transitions={
            'q0':{'i': 'q1', 'c': 'q4'},
            'q1':{'i': 'q2', 'c': 'q4'},
            'q2':{'i': 'q3', 'c': 'q4'},
            'q3':{},
            'q4':{}
        },
        initial='q0',
        accepting=['q4']
    )
    return _run_afd(model, cadena)

def simulate_handshake(cadena: str) -> dict:
    model = AfdModel(
        states=['q0', 'q1', 'q2', 'q3', 'q4'],
        alphabet=['a', 'b', 'c'],
        transitions={
          'q0':{'a':'q1', 'b':'q4', 'c':'q4'},
          'q1':{'b':'q2', 'a':'q4', 'c':'q4'},
          'q2':{'c':'q3', 'a':'q4', 'b':'q4'},
          'q3':{},
          'q4':{}
        },
        initial='q0',
        accepting=['q3']
    )
    return _run_afd(model, cadena)