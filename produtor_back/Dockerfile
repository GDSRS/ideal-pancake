FROM python:3.7-buster
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
# COPY application /app/application
# COPY migrations /app/migrations
# COPY manage.py /app/
CMD ["python", "manage.py", "run"]