# Talkers

A live chat application built using Python Django, Rest Framework, and ReactJS.

```bash
Talkers               # Project Structure
├── talkers/          # Backend Server
│   ├── .env          # Environment variables
│   └── package.json  # Server dependencies
├── website/          # Frontend
│   ├── src/
│   └── package.json  # Website dependencies
├── README.md         # Project documentation
```

## Setup Instructions

### Backend Setup

To run the command below, make sure you are in the `talkers` directory.

```bash
cd talkers
pip3 install -r requirements.txt
```

**Generating a Secret Key**

Before running the application, you need to set up a `SECRET_KEY` for Django. Follow these steps:

- Open a terminal and type the following command to generate a random secret key.

```bash
python3 -c 'from django.core.management.utils import get_random_secret_key; print(get_random_secret_key())'
```

- Open the `.env-example` file and paste the generated key. Save the file and rename to `.env`.

**Running the server**

```bash
./run_server.sh
```

You can now access the backend at `http://127.0.0.1:8000` in your browser.

### Frontend Setup

To run the command below, make sure you are in the `website` directory.

```bash
cd website
yarn install
```

**Running a local development server**

```bash
yarn dev
```

By default, a browser window will open at `http://127.0.0.1:5173`.

Congratulations! You have just created your live chat application.
