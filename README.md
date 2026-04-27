# APE03 — Simulación de Autómatas Finitos (AFD vs AFND)

Universidad Nacional de Loja — FEIRNNR  
Docente: José O. Guamán Q.

---

## Integrantes

| Nombre | Rol |
|--------|-----|
| Cesar [Apellido] | AFND — Ejercicios 7, 8, 10 |
| Santiago [Apellido] | AFD — Ejercicios 1, 2, 5 |

---

## Clonar el repositorio

```bash
git clone https://github.com/cesar050/APE03_Automatas-.git
cd APE03_Automatas-
```

---

## Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python run.py
```

Corre en: `http://localhost:5000`

---

## Frontend

Abrir otra terminal desde la raíz del proyecto:

```bash
cd frontend
npm install
ng serve
```

Corre en: `http://localhost:4200`

---

## Probar endpoints

```bash
curl -X POST http://localhost:5000/api/afnd/iot/simulate \
  -H "Content-Type: application/json" \
  -d '{"input": ["HDR", "TEMP", "CRC"]}'

curl -X POST http://localhost:5000/api/afnd/genetic/simulate \
  -H "Content-Type: application/json" \
  -d '{"input": ["K", "G", "A", "F"]}'

curl -X POST http://localhost:5000/api/afnd/slack/simulate \
  -H "Content-Type: application/json" \
  -d '{"input": ["@bot", "USER", "!cmd"]}'

curl -X POST http://localhost:5000/api/afd/banking/simulate \
  -H "Content-Type: application/json" \
  -d '{"input": ["a", "b", "d"]}'

curl -X POST http://localhost:5000/api/afd/lock/simulate \
  -H "Content-Type: application/json" \
  -d '{"input": ["i", "i", "c"]}'

curl -X POST http://localhost:5000/api/afd/handshake/simulate \
  -H "Content-Type: application/json" \
  -d '{"input": ["a", "b", "c"]}'
```
