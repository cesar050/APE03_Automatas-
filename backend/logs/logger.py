import logging
import os

def get_logger(name: str) -> logging.Logger:
    logger = logging.getLogger(name)
    logger.setLevel(logging.DEBUG)

    if not logger.handlers:
        logs_dir = os.path.join(os.path.dirname(__file__), '../../logs')
        os.makedirs(logs_dir, exist_ok=True)

        fh = logging.FileHandler(os.path.join(logs_dir, 'app.log'))
        fh.setLevel(logging.DEBUG)

        ch = logging.StreamHandler()
        ch.setLevel(logging.INFO)

        formatter = logging.Formatter('[%(asctime)s] %(levelname)s %(name)s: %(message)s')
        fh.setFormatter(formatter)
        ch.setFormatter(formatter)

        logger.addHandler(fh)
        logger.addHandler(ch)

    return logger