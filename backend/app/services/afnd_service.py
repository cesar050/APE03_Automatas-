from app.models.automata_model import AfndModel
from app.utils.logger import get_logger

logger = get_logger(__name__)


def _run_afnd(model: AfndModel, cadena: list) -> dict:
    current_states = {model.initial}
    steps = [{'symbol': None, 'states': list(current_states)}]

    for symbol in cadena:
        next_states = set()
        for state in current_states:
            destinations = model.transitions.get(state, {}).get(symbol, [])
            next_states.update(destinations)
        current_states = next_states
        steps.append({'symbol': symbol, 'states': list(current_states)})

    accepted = bool(current_states & set(model.accepting))
    logger.info(f'AFND cadena={cadena} accepted={accepted}')
    return {
        'input': cadena,
        'accepted': accepted,
        'steps': steps,
        'final_states': list(current_states),
        'definition': model.to_dict()
    }


def simulate_iot(cadena: list) -> dict:
    model = AfndModel(
        states=['q0', 'q1', 'q2', 'q3'],
        alphabet=['HDR', 'TEMP', 'HUM', 'CRC'],
        transitions={
            'q0': {'HDR': ['q1']},
            'q1': {'TEMP': ['q2'], 'HUM': ['q2'], 'CRC': ['q3']},
            'q2': {'TEMP': ['q2'], 'HUM': ['q2'], 'CRC': ['q3']},
            'q3': {}
        },
        initial='q0',
        accepting=['q3']
    )
    return _run_afnd(model, cadena)


def simulate_slack(cadena: list) -> dict:
    model = AfndModel(
        states=['q0', 'q1', 'q2', 'q3'],
        alphabet=['@bot', 'USER', '!cmd', '?help'],
        transitions={
            'q0': {'@bot': ['q1']},
            'q1': {'USER': ['q2'], '!cmd': ['q3'], '?help': ['q3']},
            'q2': {'!cmd': ['q3'], '?help': ['q3']},
            'q3': {}
        },
        initial='q0',
        accepting=['q3']
    )
    return _run_afnd(model, cadena)


def simulate_genetic(cadena: list) -> dict:
    model = AfndModel(
        states=['q0', 'q1', 'q2', 'q3'],
        alphabet=['K', 'G', 'A', 'F'],
        transitions={
            'q0': {'K': ['q1']},
            'q1': {'G': ['q2']},
            'q2': {'K': ['q2'], 'G': ['q2'], 'A': ['q2'], 'F': ['q3']},
            'q3': {}
        },
        initial='q0',
        accepting=['q3']
    )
    return _run_afnd(model, cadena)