class AfndModel:
    def __init__(self, states, alphabet, transitions, initial, accepting):
        self.states = states
        self.alphabet = alphabet
        self.transitions = transitions
        self.initial = initial
        self.accepting = accepting

    def to_dict(self):
        return {
            'states': self.states,
            'alphabet': self.alphabet,
            'transitions': self.transitions,
            'initial': self.initial,
            'accepting': self.accepting
        }


class AfdModel:
    def __init__(self, states, alphabet, transitions, initial, accepting):
        self.states = states
        self.alphabet = alphabet
        self.transitions = transitions
        self.initial = initial
        self.accepting = accepting

    def to_dict(self):
        return {
            'states': self.states,
            'alphabet': self.alphabet,
            'transitions': self.transitions,
            'initial': self.initial,
            'accepting': self.accepting
        }