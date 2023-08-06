FROM python:3.9

WORKDIR /app

COPY ./Server/requirements.txt .

RUN pip install -r requirements.txt

COPY ./Server .

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0"]